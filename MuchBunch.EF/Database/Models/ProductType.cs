namespace MuchBunch.EF.Database.Models
{
    public class ProductType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public ProductType? Parent { get; set; }
        public ICollection<ProductType> SubTypes { get; } = new List<ProductType>();
        public ICollection<Product> Products { get; } = new List<Product>();
    }
}
