using AutoMapper;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;
        private readonly UserService userService;
        public NotificationService(MBDBContext dbContext, IMapper mapperConfiguration, IConfiguration config, UserService userService) : base(dbContext, mapperConfiguration)
        {
            _configuration = config;
            this.userService = userService;
        }

        public void SendMail(EmailBM model)
        {
            var smtpConfig = _configuration.GetSection<SmtpConfig>(GlobalConstants.SMTP_CONFIG_KEY);

            var companyUsers = userService.GetCompanyUsers().ToList();
            companyUsers.Add(CreateTestAccount(smtpConfig));

            using var smtp = new SmtpClient();
            smtp.Connect(smtpConfig.Host, smtpConfig.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(smtpConfig.Username, smtpConfig.Password);

            foreach (var companyUser in companyUsers)
            {
                var emailInfo = new EmailInfo()
                {
                    Title = model.Title,
                    Body = model.Body,
                    Sender = smtpConfig.Username,
                    Recepient = companyUser.Email
                };

                var email = CreateEmail(emailInfo);

                smtp.Send(email);
            }

            smtp.Disconnect(true);
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
