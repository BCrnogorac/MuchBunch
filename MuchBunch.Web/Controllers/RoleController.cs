using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : Controller
    {
        private readonly RoleService roleService;
        private readonly ValidationService validationService;

        public RoleController(RoleService roleService, ValidationService validationService)
        {
            this.roleService = roleService;
            this.validationService = validationService;
        }

        [HttpGet]
        public IActionResult GetRoles()
        {
            return Ok(roleService.GetRoles());
        }


        [HttpGet("{id}/users")]
        public IActionResult GetUsersByRole([FromRoute] int id)
        {
            return Ok(roleService.GetUsersByRole(id));
        }

        [HttpPost]
        public async Task<IActionResult> InsertRole(RoleBM model)
        {
            var result = await validationService.ValidateInsertRole(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            roleService.InsertRole(model.Name);

            return Ok();
        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditRole(EditRoleBM model)
        {
            var result = await validationService.ValidateEditRole(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            roleService.EditRole(model);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteRole([FromRoute] int id)
        {
            roleService.DeleteRole(id);
            return NoContent();
        }
    }
}
