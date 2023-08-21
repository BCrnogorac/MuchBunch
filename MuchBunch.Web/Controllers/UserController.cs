using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Enums;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserService userService;
        private readonly IdentityService identityService;

        public UserController(UserService userService, IdentityService identityService)
        {
            this.userService = userService;
            this.identityService = identityService;
        }

        [HttpGet("token")]
        public IActionResult GetJwtToken()
        {
            var model = new TokenGenerationBM() { Username = "hehe", Password = "asdasd" };
            return Ok(identityService.GetToken(model));
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(userService.GetUsers());
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet("userProtected")]
        public IActionResult GetUsersProtected()
        {
            return Ok(userService.GetUsers());
        }
    }
}