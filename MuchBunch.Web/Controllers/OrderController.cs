using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly OrderService orderService;

        public OrderController(OrderService orderService)
        {
            this.orderService = orderService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(orderService.GetOrders());
        }

        [HttpDelete("user/{userId}/bunch/{bunchId}")]
        public IActionResult Delete(int userId, int bunchId)
        {
            orderService.Delete(userId, bunchId);

            return NoContent();
        }
    }
}
