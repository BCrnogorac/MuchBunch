namespace MuchBunch.Service.Models.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public bool IsSubscribed { get; set; }
        public IEnumerable<UserOrderDTO>? Orders { get; set; }
        
    }
}
