namespace MuchBunch.EF.Database.Models
{
    public class Bunch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public float Price { get; set; }
        public int ThemeId { get; set; }
        public Theme Theme { get; set; }
        public int? CompanyId { get; set; }
        public User? Company { get; set; }
        public ICollection<Product>? Products { get; set; }
    }
}
