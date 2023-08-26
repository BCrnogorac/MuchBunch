using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Extensions;
using MuchBunch.Service.Models;
using MuchBunch.Service.Models.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MuchBunch.Service.Services
{
    public class IdentityService
    {

        private IConfiguration config;
        public IdentityService(IConfiguration config)
        {
            this.config = config;
        }

        public TokenDTO GetToken(User user)
        {
            var jwtSettings = config.GetSection<JwtSettings>(GlobalConstants.JWT_SETTINGS_KEY);

            // Create claims
            var claims = new List<Claim>
            {
                new (JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new (JwtRegisteredClaimNames.Name, user.Name),
                new (JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.Name)
            };

            // Create token credentials
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create token
            var token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30), // Token expiration time
                signingCredentials: creds);

            // Generate token
            var tokenHandler = new JwtSecurityTokenHandler();
            var generatedToken = tokenHandler.WriteToken(token);

            return new TokenDTO { Token = generatedToken };
        }
    }
}
