using System.ComponentModel.DataAnnotations;

namespace MuchBunch.EF.Database.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public ICollection<ProductType> ProductTypes { get; } = new List<ProductType>();
    }
}
