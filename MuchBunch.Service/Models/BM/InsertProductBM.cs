namespace MuchBunch.Service.Models.BM
{
    public class InsertProductBM
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public IEnumerable<int> ProductTypeIds { get; set; }
    }
}
