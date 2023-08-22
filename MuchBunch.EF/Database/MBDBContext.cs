using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database.Models;

namespace MuchBunch.EF.Database
{
    public class MBDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MuchBunch");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
