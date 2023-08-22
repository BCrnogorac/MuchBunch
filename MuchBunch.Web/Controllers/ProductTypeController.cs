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


        [HttpPost]
        public IActionResult InsertProductType(InsertProductTypeBM model)
        {
            var result = validationService.ValidateInsertProductType(model);

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

        [HttpDelete("{id}")]
        public IActionResult DeleteProductType([FromRoute] int id)
        {
            productTypeService.DeleteProductType(id);

            return Ok();
        }
    }
}
