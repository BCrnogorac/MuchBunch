namespace MuchBunch.Service.Models.DTO
{
    public class ProductTypeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ProductTypeDTO> SubTypes { get; set; }
    }
}
