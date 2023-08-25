namespace MuchBunch.Service.Models.BM
{
    public class InsertBunchBM
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public float Price { get; set; }
        public int ThemeId { get; set; }
        public int CompanyId { get; set; }
        public IEnumerable<int> ProductIds { get; set; }
    }
}
