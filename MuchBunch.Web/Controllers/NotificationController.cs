using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : Controller
    {

        private readonly NotificationService notificationService;

        public NotificationController(NotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [HttpPost("theme")]
        public IActionResult SetupThemeNotification([FromBody] ThemeNotificationBM notification)
        {
            notificationService.SetupThemeNotification(notification);
            return Ok();
        }

        [HttpGet()]
        public IActionResult SendOrderMail()
        {
            notificationService.SendOrderMail(new OrderBM { BunchId = 3003, UserId = 3002});
            return Ok();
        }
    }
}
