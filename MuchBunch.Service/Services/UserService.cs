using MuchBunch.EF.Database;
using MuchBunch.EF.Database.Models;

namespace MuchBunch.Service.Services
{
    public class UserService
    {
        private MBDBContext dbContext;
        public UserService(MBDBContext mBDBContext) { 
            this.dbContext = mBDBContext;
        }

        public IEnumerable<User> GetUsers()
        {
            return dbContext.Users;
        }
    }
}
