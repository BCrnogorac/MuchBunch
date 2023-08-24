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
        public int TypeId { get; set; }
        public ProductType Type { get; set; }
        public int CompanyId { get; set; }
        public User Company { get; set; }
        public ICollection<ProductSubType>? SubTypes { get; set; }
    }
}
