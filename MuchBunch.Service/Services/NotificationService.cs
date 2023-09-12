using AutoMapper;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MimeKit;
using MimeKit.Text;
using MuchBunch.EF.Database;
using MuchBunch.Service.Extensions;
using MuchBunch.Service.Models;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class NotificationService : BaseService
    {
        public readonly IConfiguration _configuration;
        public readonly UserService userService;
        public NotificationService(MBDBContext dbContext, IMapper mapperConfiguration, IConfiguration config, UserService userService) : base(dbContext, mapperConfiguration)
        {
            _configuration = config;
            this.userService = userService;
        }

        public async Task SetupNotification(EmailBM model)
        {
            SendInitialEmails(model);
            SetupReminder(model);
        }

        public void SendInitialEmails(EmailBM model)
        {
            var smtpConfig = _configuration.GetSection<SmtpConfig>(GlobalConstants.SMTP_CONFIG_KEY);
            var companyUsers = userService.GetCompanyUsers().ToList();
            companyUsers.Add(CreateTestAccount(smtpConfig));

            foreach (var companyUser in companyUsers)
            {
                var emailInfo = new EmailInfo()
                {
                    Title = model.EventTitle,
                    Body = model.EventBody,
                    Sender = smtpConfig.Username,
                    Recepient = companyUser.Email
                };

                SendMail(emailInfo, smtpConfig);
            }
        }

        public void SendReminderEmails(EmailBM model)
        {
            var smtpConfig = _configuration.GetSection<SmtpConfig>(GlobalConstants.SMTP_CONFIG_KEY);
            var users = userService.GetUsers().ToList();
            users.Add(CreateTestAccount(smtpConfig));

            foreach (var user in users)
            {
                var emailInfo = new EmailInfo()
                {
                    Title = model.ReminderTitle,
                    Body = model.ReminderBody,
                    Sender = smtpConfig.Username,
                    Recepient = user.Email
                };

                SendMail(emailInfo, smtpConfig);
            }
        }

        private static void SendMail(EmailInfo emailInfo, SmtpConfig smtpConfig)
        {
            using var smtp = new SmtpClient();
            smtp.Connect(smtpConfig.Host, smtpConfig.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(smtpConfig.Username, smtpConfig.Password);

            var email = CreateEmail(emailInfo);

            smtp.Send(email);
            smtp.Disconnect(true);
            Console.WriteLine(DateTime.UtcNow.ToString());
        }

        private async Task SetupReminder(EmailBM model)
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

                    themeService.SetThemeAsActive(model.ThemeId);
                    notificationService.SendReminderEmails(model);
                }
                ((Timer)state).Dispose();
            });
            timer.Change(delay, TimeSpan.Zero);
        }

        private static MimeMessage CreateEmail(EmailInfo info)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(info.Sender));
            email.To.Add(MailboxAddress.Parse(info.Recepient));

            email.Subject = info.Title;
            email.Body = new TextPart(TextFormat.Html) { Text = info.Body };

            return email;
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
