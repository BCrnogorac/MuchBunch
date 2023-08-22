using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.BM;
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

        public void InsertProduct(InsertProductBM model)
        {
            var productTypeModels = model.ProductTypeIds
                .Select(id =>
                    dbContext.ProductTypes.FirstOrDefault(i => i.Id == id)).ToList();

            var product = new Product()
            {
                ImageUrl = model.ImageUrl,
                Name = model.Name,
                Price = model.Price,
                Quantity = model.Quantity,
                ProductTypes = productTypeModels
            };

            dbContext.Products.Add(product);

            dbContext.SaveChanges();
        }
    }
}
