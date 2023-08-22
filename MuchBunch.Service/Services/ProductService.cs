using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class ProductService : BaseService
    {
        public ProductService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<ProductDTO> GetProducts()
        {
            var products = dbContext.Products.Include(p => p.ProductTypes);
            return mapper.Map<IEnumerable<ProductDTO>>(products);
        }
    }
}
