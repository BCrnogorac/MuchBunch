namespace MuchBunch.Service.Models.DTO
{
    public class BunchDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string ImageUrl { get; set; }    
        public ThemeSimpleDTO Theme { get; set; }
        public UserDTO Company { get; set; }
        public IEnumerable<ProductDTO> Products { get; set; }
    }
}
