using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MuchBunch.EF.Database;
using MuchBunch.Service.Services;

namespace MuchBunch.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false)
                .Build();


            // Add services
            builder.Services.AddControllers();

            builder.Services.AddDbContext<MBDBContext>();

            builder.Services.AddScoped<UserService>();

            var app = builder.Build();

            // Configure middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            //app.UseAuthorization();

            app.MapControllers();

            app.UseStaticFiles(); // Serve static files from wwwroot folder

            app.Run();
        }
    }
}