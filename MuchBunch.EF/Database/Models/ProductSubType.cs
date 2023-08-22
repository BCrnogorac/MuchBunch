namespace MuchBunch.EF.Database.Models
{
    public class ProductSubType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ParentId { get; set; }
        public ProductType Parent { get; set; }
        public ICollection<Product>? Products { get; } = new List<Product>();
    }
}
