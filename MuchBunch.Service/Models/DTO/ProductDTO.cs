namespace MuchBunch.Service.Models.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public List<ProductTypeDTO> ProductTypes { get; } = new List<ProductTypeDTO>();
    }
}
