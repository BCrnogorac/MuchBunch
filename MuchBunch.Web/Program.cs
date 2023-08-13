using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MuchBunch.EF.Database;
using MuchBunch.Service;
using MuchBunch.Service.Services;
using MuchBunch.Service.Extensions;
using System.Text;
using MuchBunch.Service.Models;
using MuchBunch.Service.Enums;
using System.Security.Claims;

namespace MuchBunch.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services
            builder.Services.AddControllers();
            builder.Services.AddDbContext<MBDBContext>();
            builder.Services.AddScoped<UserService>();
            builder.Services.AddScoped<IdentityService>();

            var jwtSettings = builder.Configuration.GetSection<JwtSettings>(GlobalConstants.JWT_SETTINGS_KEY);

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    RoleClaimType = ClaimTypes.Role
                };
            });

            var app = builder.Build();

            // Configure middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.MapControllers();

            app.UseStaticFiles(); // Serve static files from wwwroot folder

            app.Run();
        }
    }
}