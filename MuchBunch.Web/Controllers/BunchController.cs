using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BunchController : Controller
    {
        private readonly BunchService bunchService;
        private readonly ValidationService validationService;

        public BunchController(BunchService bunchService, ValidationService validationService)
        {
            this.bunchService = bunchService;
            this.validationService = validationService;
        }

        [HttpGet]
        public IActionResult GetBunches()
        {
            return Ok(bunchService.GetBunches());
        }

        [HttpGet("user/{id}")]
        public IActionResult GetBunchesByUserId(int id)
        {
            return Ok(bunchService.GetBunchesByUserId(id));
        }

        [HttpPost]
        public async Task<IActionResult> InsertBunch([FromBody] InsertBunchBM model)
        {
            var result = await validationService.ValidateInsertBunch(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            bunchService.InsertBunch(model);

            return Ok();
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditProduct([FromBody] EditBunchBM model)
        {
            var result = await validationService.ValidateEditBunch(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            bunchService.EditBunch(model);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct([FromRoute] int id)
        {
            bunchService.DeleteBunch(id);
            return NoContent();
        }
    }
}
