using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class RoleService : BaseService
    {
        public RoleService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<RoleDTO> GetRoles()
        {
            return mapper.Map<IEnumerable<RoleDTO>>(dbContext.Roles);
        }

        public IEnumerable<UserDTO> GetUsersByRole(int roleId)
        {
            var users = dbContext.Roles.Include(r => r.Users).FirstOrDefault(r => r.Id == roleId)?.Users;

            return mapper.Map<IEnumerable<UserDTO>>(users);
        }

        public void InsertRole(string name)
        {
            dbContext.Roles.Add(new Role() { Name = name });
            dbContext.SaveChanges();
        }

        public void EditRole(EditRoleBM model)
        {
            var role = dbContext.Roles.Find(model.Id);

            if (role == null)
            {
                return;
            }

            role.Name = model.Name;

            dbContext.Update(role);
            dbContext.SaveChanges();
        }

        public void DeleteRole(int roleId)
        {
            var role = dbContext.Roles.Find(roleId);

            if (role == null)
            {
                return;
            }

            dbContext.Remove(role);
            dbContext.SaveChanges();
        }
    }
}
