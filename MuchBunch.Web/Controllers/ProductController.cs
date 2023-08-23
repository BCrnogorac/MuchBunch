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

        [HttpGet("type/{id}")]
        public IActionResult GetProductsByTypeId([FromRoute] int id)
        {
            return Ok(productService.GetProductsByTypeId(id));
        }

        [HttpPost]
        public async Task<IActionResult> InsertProduct([FromBody] InsertProductBM model)
        {
            var result = await validationService.ValidateInsertProduct(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            productService.InsertProduct(model);

            return Ok();
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditProduct([FromBody] EditProductBM model)
        {
            var result = await validationService.ValidateEditProduct(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            productService.EditProduct(model);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct([FromRoute] int id)
        {
            productService.DeleteProduct(id);
            return NoContent();
        }
    }
}
