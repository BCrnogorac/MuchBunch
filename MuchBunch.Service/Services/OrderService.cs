using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class OrderService : BaseService
    {
        public OrderService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<OrderDTO> GetOrders()
        {
            var order = dbContext.Order.
                Include(o => o.User).
                Include(o => o.Bunch);
            return mapper.Map<IEnumerable<OrderDTO>>(order);
        }

        public void Delete(int userId, int bunchId)
        {
            var order = dbContext.Order.FirstOrDefault(o => o.UserId == userId && o.BunchId == bunchId);

            if (order == null)
            {
                return;
            }

            dbContext.Order.Remove(order);
            dbContext.SaveChanges();
        }
    }
}
