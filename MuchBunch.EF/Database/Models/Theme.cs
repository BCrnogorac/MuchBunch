namespace MuchBunch.EF.Database.Models
{
    public class Theme
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Bunch>? Bunches { get; set; }
    }
}
