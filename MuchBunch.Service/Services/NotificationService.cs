using AutoMapper;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MimeKit;
using MimeKit.Text;
using MuchBunch.EF.Database;
using MuchBunch.Service.Enums;
using MuchBunch.Service.Extensions;
using MuchBunch.Service.Models;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;
using System.Text;

namespace MuchBunch.Service.Services
{
    public class NotificationService : BaseService
    {
        public readonly IConfiguration _configuration;
        public readonly UserService userService;
        public readonly ThemeService themeService;
        public NotificationService(MBDBContext dbContext, IMapper mapperConfiguration, IConfiguration config, UserService userService, ThemeService themeService) : base(dbContext, mapperConfiguration)
        {
            _configuration = config;
            this.userService = userService;
            this.themeService = themeService;
        }

        public async Task SetupThemeNotification(ThemeNotificationBM data)
        {
            var upcomingThemeEmail = GetThemeEmailText(EmailTemplate.UpcomingTheme, EmailTemplate.UpcomingThemeTitle, data);
            SendUpcomingThemeMail(upcomingThemeEmail);

            var liveThemeEmail = GetThemeEmailText(EmailTemplate.LiveTheme, EmailTemplate.LiveThemeTitle, data);
            SetupLiveTheme(liveThemeEmail, data.ThemeId);
        }


        public void SendUpcomingThemeMail(EmailText model)
        {
            var smtpConfig = _configuration.GetSection<SmtpConfig>(GlobalConstants.SMTP_CONFIG_KEY);
            var companyUsers = userService.GetCompanyUsers().ToList();
            companyUsers.Add(CreateTestAccount(smtpConfig));

            foreach (var companyUser in companyUsers)
            {
                var emailInfo = new Email()
                {
                    Title = model.Title,
                    Body = model.Body,
                    Sender = smtpConfig.Username,
                    Recepient = companyUser.Email
                };

                SendMail(emailInfo, smtpConfig);
            }
        }

        public void SendLiveThemeEmail(EmailText model)
        {
            var smtpConfig = _configuration.GetSection<SmtpConfig>(GlobalConstants.SMTP_CONFIG_KEY);
            var buyers = userService.GetSubscribers();
            var companyUsers = userService.GetCompanyUsers();

            var users = buyers.Union(companyUsers).ToList();
            users.Add(CreateTestAccount(smtpConfig));

            foreach (var user in users)
            {
                var emailInfo = new Email()
                {
                    Title = model.Title,
                    Body = model.Body,
                    Sender = smtpConfig.Username,
                    Recepient = user.Email
                };

                SendMail(emailInfo, smtpConfig);
            }
        }

        public void SendOrderMail(OrderBM order)
        {
            var smtpConfig = _configuration.GetSection<SmtpConfig>(GlobalConstants.SMTP_CONFIG_KEY);
            var user = dbContext.Users.Find(order.UserId);
            var bunch = dbContext.Bunches
                              .Include(b => b.Products)
                              .FirstOrDefault(b => b.Id == order.BunchId);

            var bunchDTO = mapper.Map<BunchDTO>(bunch);
            var emailText = GetOrderEmailText(order, bunchDTO);

            var emailInfo = new Email()
            {
                Title = emailText.Title,
                Body = emailText.Body,
                Sender = smtpConfig.Username,
                Recepient = user.Email
            };

            SendMail(emailInfo, smtpConfig);
        }

        public EmailText GetOrderEmailText(OrderBM order, BunchDTO bunch)
        {
            var baseDirectory = Directory.GetCurrentDirectory();
            var orderRelPath = EmailTemplate.GetRelativePath("Order");
            var productRelPath = EmailTemplate.GetRelativePath("Product");

            // Combine the base directory with the relative path
            var orderAbsPath = Path.Combine(baseDirectory, orderRelPath);
            var productAbsPath = Path.Combine(baseDirectory, productRelPath);
            if (!File.Exists(orderAbsPath) || !File.Exists(productAbsPath))
            {
                return null;
            }

            var orderHtml = File.ReadAllText(orderAbsPath);
            var productHtml = File.ReadAllText(productAbsPath);
            var productsHtml = bunch.Products.Select(p =>
            {
                var html = productHtml;
                html = html
                        .Replace("{{ product.name }}", p.Name)
                        .Replace("{{ product.imageUrl }}", p.ImageUrl);
                return html;
            });

            var productsSB = new StringBuilder();
            foreach (var html in productsHtml)
            {
                productsSB.AppendLine(html);
            }

            orderHtml = orderHtml
                .Replace("{{ products }}", productsSB.ToString())
                .Replace("{{ bunch.name }}", bunch.Name)
                .Replace("{{ bunch.price }}", bunch.Price.ToString())
                ;

            return new EmailText()
            {
                Body = orderHtml,
                Title = "Your MuchBunch Order"
            };
        }

        private async Task SetupLiveTheme(EmailText model, int themeId)
        {
            //DateTime scheduledTime = DateTime.UtcNow.Date.AddMonths(1);
            DateTime scheduledTime = DateTime.UtcNow.AddSeconds(20);
            TimeSpan delay = scheduledTime - DateTime.UtcNow;

            if (delay < TimeSpan.Zero)
            {
                throw new Exception("Delay is negative");
            }

            // Setup worker environment
            IServiceCollection services = new ServiceCollection();

            services.AddDbContext<MBDBContext>();
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddScoped<NotificationService>();
            services.AddScoped<IdentityService>();
            services.AddScoped<UserService>();
            services.AddScoped<ThemeService>();
            services.AddSingleton(_configuration);

            IServiceProvider serviceProvider = services.BuildServiceProvider();

            var timer = new Timer((state) =>
            {
                using (var scope = serviceProvider.CreateScope())
                {
                    var notificationService = scope.ServiceProvider.GetRequiredService<NotificationService>();
                    var themeService = scope.ServiceProvider.GetRequiredService<ThemeService>();

                    themeService.SetThemeAsActive(themeId);
                    notificationService.SendLiveThemeEmail(model);
                }
                ((Timer)state).Dispose();
            });
            timer.Change(delay, TimeSpan.Zero);
        }

        public EmailText GetThemeEmailText(string templateName, string title, ThemeNotificationBM data)
        {
            var baseDirectory = Directory.GetCurrentDirectory();
            var relativePath = EmailTemplate.GetRelativePath(templateName);

            // Combine the base directory with the relative path
            var absolutePath = Path.Combine(baseDirectory, relativePath);
            if (!File.Exists(absolutePath))
            {
                return null;
            }

            var html = File.ReadAllText(absolutePath);
            var theme = themeService.GetThemeById(data.ThemeId);
            var emailBody = html.Replace(ThemeEmailIdentifiers.GetHTMLIdentifier(ThemeEmailIdentifiers.ThemeName), theme.Name)
                .Replace(ThemeEmailIdentifiers.GetHTMLIdentifier(ThemeEmailIdentifiers.ProductsQuantity), data.ProductsQuantity.ToString())
                .Replace(ThemeEmailIdentifiers.GetHTMLIdentifier(ThemeEmailIdentifiers.BgQuantity), data.BgQuantity.ToString())
                .Replace(ThemeEmailIdentifiers.GetHTMLIdentifier(ThemeEmailIdentifiers.MiniaturesQuantity), data.MiniaturesQuantity.ToString())
                .Replace(ThemeEmailIdentifiers.GetHTMLIdentifier(ThemeEmailIdentifiers.BooksQuantity), data.BooksQuantity.ToString())
                .Replace(ThemeEmailIdentifiers.GetHTMLIdentifier(ThemeEmailIdentifiers.AccessoriesQuantity), data.AccessoriesQuantity.ToString())
                .Replace(ThemeEmailIdentifiers.GetHTMLIdentifier(ThemeEmailIdentifiers.Price), data.Price.ToString());

            return new EmailText()
            {
                Body = emailBody,
                Title = title
            };
        }

        private static MimeMessage CreateEmail(Email info)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(info.Sender));
            email.To.Add(MailboxAddress.Parse(info.Recepient));

            email.Subject = info.Title;
            email.Body = new TextPart(TextFormat.Html) { Text = info.Body };

            return email;
        }

        private static void SendMail(Email emailInfo, SmtpConfig smtpConfig)
        {
            using var smtp = new SmtpClient();
            smtp.Connect(smtpConfig.Host, smtpConfig.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(smtpConfig.Username, smtpConfig.Password);

            var email = CreateEmail(emailInfo);

            smtp.Send(email);
            smtp.Disconnect(true);
            Console.WriteLine(DateTime.UtcNow.ToString());
        }

        private static UserDTO CreateTestAccount(SmtpConfig smtpConfig)
        {
            return new UserDTO
            {
                Email = smtpConfig.Username
            };
        }
    }
}
