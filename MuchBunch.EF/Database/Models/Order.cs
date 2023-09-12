namespace MuchBunch.EF.Database.Models
{
    public class Order
    {
        public int UserId { get; set; }
        public int BunchId { get; set; }
        public User User { get; set; }
        public Bunch Bunch { get; set; }
        public DateTime OrderedAt { get; set; }
    }
}
