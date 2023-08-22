using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MuchBunch.EF.Database;
using MuchBunch.Service;
using MuchBunch.Service.Extensions;
using MuchBunch.Service.Models;
using MuchBunch.Service.Services;
using System.Security.Claims;
using System.Text;

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
            builder.Services.AddAutoMapper(typeof(MappingProfile));

            builder.Services.AddScoped<UserService>();
            builder.Services.AddScoped<ValidationService>();
            builder.Services.AddScoped<ProductService>();
            builder.Services.AddScoped<ProductTypeService>();
            builder.Services.AddScoped<IdentityService>();

            var jwtSettings = builder.Configuration.GetSection<JwtSettings>(GlobalConstants.JWT_SETTINGS_KEY);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: GlobalConstants.CORS_POLICY,
                                  policy =>
                                  {
                                      policy.WithOrigins(GlobalConstants.SPA_URL)
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials();
                                  });
            });

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
            app.UseCors(GlobalConstants.CORS_POLICY);
            app.UseAuthorization();

            app.MapControllers();

            app.UseStaticFiles(); // Serve static files from wwwroot folder

            app.Run();
        }
    }
}