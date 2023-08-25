using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThemeController : Controller
    {
        private readonly ThemeService themeService;
        private readonly ValidationService validationService;

        public ThemeController(ThemeService themeService, ValidationService validationService)
        {
            this.themeService = themeService;
            this.validationService = validationService;
        }

        [HttpGet]
        public IActionResult GetThemes()
        {
            return Ok(themeService.GetThemes());
        }

        //[HttpGet("type/{id}")]
        //public IActionResult GetProductsByTypeId([FromRoute] int id)
        //{
        //    return Ok(productService.GetProductsByTypeId(id));
        //}

        [HttpPost]
        public async Task<IActionResult> InsertProduct([FromBody] InsertThemeBM model)
        {
            var result = await validationService.ValidateInsertTheme(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            themeService.InsertTheme(model);

            return Ok();
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditProduct([FromBody] EditThemeBM model)
        {
            var result = await validationService.ValidateEditTheme(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            themeService.EditTheme(model);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTheme([FromRoute] int id)
        {
            themeService.DeleteTheme(id);

            return NoContent();
        }
    }
}
