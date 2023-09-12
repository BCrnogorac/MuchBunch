using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database.Models;

namespace MuchBunch.EF.Database
{
    public class MBDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductSubType> ProductSubTypes { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Bunch> Bunches { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<Order> Order { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MuchBunch");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(e => e.Type)
                .WithMany(e => e.Products)
                .HasForeignKey(e => e.TypeId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<ProductSubType>()
                .HasOne(e => e.Parent)
                .WithMany(e => e.SubTypes)
                .HasForeignKey(e => e.ParentId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Product>()
                .HasOne(e => e.Company)
                .WithMany(e => e.Products)
                .HasForeignKey(e => e.CompanyId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Bunch>()
                .HasOne(e => e.Company)
                .WithMany(e => e.Bunches)
                .HasForeignKey(e => e.CompanyId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<User>()
                .HasMany(e => e.BoughtBunches)
                .WithMany(e => e.Buyers)
                .UsingEntity<Order>();
        }
    }
}
