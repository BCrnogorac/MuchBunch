﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MuchBunch.Service.Enums;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Services;

namespace MuchBunch.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserService userService;
        private readonly ValidationService validationService;

        public UserController(UserService userService, ValidationService validationService)
        {
            this.userService = userService;
            this.validationService = validationService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginBM model)
        {
            var token = userService.Login(model);

            return token != null ? Ok(token) : BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterBM model)
        {
            var result = await validationService.ValidateRegister(model);

            if (!result.IsValid)
            {
                return BadRequest(result);
            }

            userService.Register(model);

            var loginModel = new LoginBM()
            {
                Email = model.Email,
                Password = model.Password,
            };

            return Ok(userService.Login(loginModel));
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(userService.GetUsers());
        }

        [HttpGet("{id}/orders")]
        public IActionResult GetOrders([FromRoute] int id)
        {
            return Ok(userService.GetOrders(id));
        }

        //[Authorize(Roles = Role.Company)]
        [HttpGet("{id}/products")]
        public IActionResult GetCompanyProductsByUserId(int id)
        {
            return Ok(userService.GetCompanyProducts(id));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            userService.DeleteUser(id);
            return NoContent();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet("userProtected")]
        public IActionResult GetUsersProtected()
        {
            return Ok(userService.GetUsers());
        }
    }
}