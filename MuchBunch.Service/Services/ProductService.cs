using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;
using System.Data;

namespace MuchBunch.Service.Services
{
    public class ProductService : BaseService
    {
        public ProductService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<ProductDTO> GetProducts()
        {
            var products = dbContext.Products.Include(p => p.SubTypes).Include(p => p.Type);
            return mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        public IEnumerable<ProductDTO> GetProductsByTypeId(int id)
        {
            var products = dbContext.Products.Where(p => p.TypeId == id).Include(p => p.SubTypes);

            return mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        public void InsertProduct(InsertProductBM model)
        {
            var subTypesIds = model.SubTypes.Select(e => e.Id).ToList();
            var productSubTypes = dbContext.ProductSubTypes.Where(i => subTypesIds.Contains(i.Id)).ToList();

            var parent = dbContext.ProductTypes.First(i => i.Id == model.Type.Id);

            var product = new Product()
            {
                ImageUrl = model.ImageUrl,
                Name = model.Name,
                Price = model.Price,
                Quantity = model.Quantity,
                Type = parent,
                SubTypes = productSubTypes
            };

            dbContext.Products.Add(product);

            dbContext.SaveChanges();
        }

        public void EditProduct(EditProductBM model)
        {
            var product = dbContext.Products.FirstOrDefault(i => i.Id == model.Id);

            if (product == null)
            {
                return;
            }

            product.Price = model.Price;
            product.Quantity = model.Quantity;
            product.ImageUrl = model.ImageUrl;
            product.Name = model.Name;

            dbContext.Products.Update(product);
            dbContext.SaveChanges();
        }
    }
}
