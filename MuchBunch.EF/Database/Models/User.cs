using System.ComponentModel.DataAnnotations;

namespace MuchBunch.EF.Database.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string HashedPassword { get; set; }
        public bool IsSubscribed { get; set; }
        [Required]
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public ICollection<Product>? Products { get; set; }
        public ICollection<Bunch>? Bunches { get; set; }
        public ICollection<Bunch>? BoughtBunches { get; set; }
        public ICollection<Order>? Orders { get; set; }
    }
}
