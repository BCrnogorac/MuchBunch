using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductTypeController : Controller
    {
        private readonly ProductTypeService productTypeService;

        public ProductTypeController(ProductTypeService productTypeService)
        {
            this.productTypeService = productTypeService;
        }

        [HttpGet]
        public IActionResult GetProductTypes()
        {
            return Ok(productTypeService.GetProductTypes());
        }

        [HttpPost]
        public IActionResult GetProductTypeProducts([FromBody] int value)
        {
            return Ok(productTypeService.GetProductsForType(value));
        }
    }
}
