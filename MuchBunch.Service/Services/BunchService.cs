using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class BunchService : BaseService
    {
        public BunchService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<BunchDTO> GetBunches()
        {
            var bunches = dbContext.Bunches
                .Include(b => b.Company)
                .Include(b => b.Theme)
                .Include(b => b.Products)
                    .ThenInclude(p => p.Type)
                .Include(b => b.Products)
                    .ThenInclude(p => p.SubTypes);
            return mapper.Map<IEnumerable<BunchDTO>>(bunches);
        }

        public BunchDTO GetBunchById(int id)
        {
            var bunch = dbContext.Bunches
                .Include(b => b.Company)
                .Include(b => b.Theme)
                .Include(b => b.Products)
                    .ThenInclude(p => p.Type)
                .Include(b => b.Products)
                    .ThenInclude(p => p.SubTypes)
                .FirstOrDefault(b => b.Id == id);

            return mapper.Map<BunchDTO>(bunch);
        }

        public IEnumerable<BunchDTO> GetBunchesByUserId(int id)
        {
            var user = dbContext.Users
                .Include(u => u.Bunches)
                    .ThenInclude(b => b.Products)
                        .ThenInclude(p => p.Type)
                .Include(u => u.Bunches)
                    .ThenInclude(b => b.Products)
                        .ThenInclude(p => p.SubTypes)
                .Include(u => u.Bunches)
                    .ThenInclude(b => b.Theme)
                .FirstOrDefault(u => u.Id == id);

            return mapper.Map<IEnumerable<BunchDTO>>(user?.Bunches);
        }


        public void InsertBunch(InsertBunchBM model)
        {
            var data = mapper.Map<Bunch>(model);
            var products = dbContext.Products.Where(p => model.ProductIds.Contains(p.Id)).ToList();

            data.Products = products;

            dbContext.Bunches.Add(data);
            dbContext.SaveChanges();
        }

        public void EditBunch(EditBunchBM model)
        {
            var bunch = dbContext.Bunches.Include(b => b.Products).First(b => b.Id == model.Id);

            var products = dbContext.Products.Where(p => model.ProductIds.Contains(p.Id)).ToList();

            bunch.Products.Clear();
            bunch.Name = model.Name;
            bunch.Price = model.Price;
            bunch.ImageUrl = model.ImageUrl;
            bunch.ThemeId = model.ThemeId;
            bunch.CompanyId = model.CompanyId;
            bunch.Products = products;

            dbContext.Bunches.Update(bunch);
            dbContext.SaveChanges();
        }

        public void DeleteBunch(int id, int userId)
        {
            var bunch = dbContext.Bunches.Find(id);
            var isAdmin = dbContext.Users
                .Include(u => u.Role)
                .Where(u => u.Role.Name == Enums.Role.Admin)
                .Any(u => u.Id == userId);

            if (bunch != null && (isAdmin || bunch.CompanyId == userId))
            {
                dbContext.Remove(bunch);
                dbContext.SaveChanges();
            }
        }

        public void PlaceOrder(OrderBM model)
        {
            var bunch = dbContext.Bunches
                .Include(b => b.Products)
                .FirstOrDefault(b => b.Id == model.BunchId);

            var products = bunch.Products.ToList();

            products.ForEach(p => p.Quantity--);

            dbContext.Products.UpdateRange(products);

            var order = mapper.Map<Order>(model);
            order.OrderedAt = DateTime.UtcNow;

            dbContext.Order.Add(order);
            dbContext.SaveChanges();
        }
    }
}
