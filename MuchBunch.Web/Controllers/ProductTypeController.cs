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
            return Ok(productTypeService.GetProductParentTypes());
        }

        [HttpGet("{id}/subtypes")]
        public IActionResult GetProductSubTypes([FromRoute] int id)
        {
            return Ok(productTypeService.GetProductSubTypes(id));
        }

        [HttpGet("{id}/productsBySubtype")]
        public IActionResult GetProductSubTypeProducts([FromRoute] int id)
        {
            return Ok(productTypeService.GetProductsForSubType(id));
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

        [HttpPost("edit")]
        public async Task<IActionResult> EditProductType(EditProductTypeBM model)
        {
            var result = await validationService.ValidateEditProductType(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            productTypeService.EditProductType(model);

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProductType(EditProductTypeBM model)
        {
            var result = await validationService.ValidateEditProductType(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            productTypeService.EditProductType(model);

            return Ok();
        }
    }
}
