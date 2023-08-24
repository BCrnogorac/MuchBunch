using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductSubTypeController : Controller
    {
        private readonly ProductSubTypeService productSubTypeService;
        private readonly ValidationService validationService;

        public ProductSubTypeController(ProductSubTypeService productSubTypeService, ValidationService validationService)
        {
            this.productSubTypeService = productSubTypeService;
            this.validationService = validationService;
        }

        [HttpGet]
        public IActionResult GetProductSubTypes()
        {
            return Ok(productSubTypeService.GetProductSubTypes());
        }

        [HttpGet("{id}")]
        public IActionResult GetProductSubTypesByParentId([FromRoute] int id)
        {
            return Ok(productSubTypeService.GetProductSubTypesById(id));
        }

        [HttpPost]
        public async Task<IActionResult> InsertProductSubType(InsertProductSubTypeBM model)
        {
            var result = await validationService.ValidateInsertProductSubType(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            productSubTypeService.InsertProductSubType(model);

            return Ok();
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditProductType(EditProductSubTypeBM model)
        {
            var result = await validationService.ValidateEditProductSubType(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            productSubTypeService.EditProductSubType(model);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProductSubType([FromRoute] int id)
        {
            productSubTypeService.DeleteProductSubType(id);

            return Ok();
        }

    }
}
