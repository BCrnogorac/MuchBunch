namespace MuchBunch.Service.Models.DTO
{
    public class ProductTypeWithSubtypesDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ProductTypeWithSubtypesDTO> SubTypes { get; set; }
    }
}
