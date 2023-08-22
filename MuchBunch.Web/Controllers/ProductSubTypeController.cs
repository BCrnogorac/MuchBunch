using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{id}")]
        public IActionResult GetProductSubTypesById([FromRoute] int id)
        {
            return Ok(productSubTypeService.GetProductSubTypesById(id));
        }

    }
}
