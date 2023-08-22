using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductTypeController : Controller
    {
        private readonly ProductTypeService productTypeService;
        private readonly ValidationService validationService;

        public ProductTypeController(ProductTypeService productTypeService, ValidationService validationService)
        {
            this.productTypeService = productTypeService;
            this.validationService = validationService;
        }

        [HttpGet]
        public IActionResult GetProductTypes()
        {
            return Ok(productTypeService.GetProductTypes());
        }


        [HttpGet("id")]
        public IActionResult GetProductTypeProducts([FromBody] int id)
        {
            return Ok(productTypeService.GetProductsForType(id));
        }

        [HttpPost]
        public async Task<IActionResult> InsertProductType(InsertProductTypeBM model)
        {
            var result = await validationService.ValidateInsertProductType(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            productTypeService.InsertProductType(model);

            return Ok();
        }
    }
}
