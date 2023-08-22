namespace MuchBunch.Service.Enums
{
    public class Role
    {
        public const string Customer = "Customer";
        public const string Company = "Company";
        public const string Admin = "Admin";

        public static bool ValidRole(string role)
        {
            if (string.IsNullOrEmpty(role))
            {
                return false;
            }

            var roles = new List<string>() { Customer, Company, Admin };

            return roles.Contains(role, StringComparer.OrdinalIgnoreCase);
        }
    }
}
