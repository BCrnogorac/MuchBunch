using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly ProductService productService;
        private readonly ValidationService validationService;

        public ProductController(ProductService productService, ValidationService validationService)
        {
            this.productService = productService;
            this.validationService = validationService;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            return Ok(productService.GetProducts());
        }

        [HttpPost]
        public async Task<IActionResult> InsertProduct(InsertProductBM model)
        {
            var result = await validationService.ValidateInsertProduct(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            productService.InsertProduct(model);

            return Ok();
        }
    }
}
