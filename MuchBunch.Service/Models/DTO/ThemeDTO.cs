namespace MuchBunch.Service.Models.DTO
{
    public class ThemeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<BunchDTO> Bunches { get; set; }
    }
}
