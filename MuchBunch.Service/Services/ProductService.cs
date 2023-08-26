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
            var products = dbContext.Products.Include(p => p.SubTypes).Include(p => p.Type).Include(p => p.Company);
            return mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        public IEnumerable<ProductDTO> GetProductsByTypeId(int id)
        {
            var products = dbContext.Products.Where(p => p.TypeId == id).Include(p => p.SubTypes);

            return mapper.Map<IEnumerable<ProductDTO>>(products);
        }

        public void InsertProduct(InsertProductBM model)
        {
            UpsertProduct(new Product(), model);
        }

        public void EditProduct(EditProductBM model)
        {
            var product = dbContext.Products.Include(p => p.SubTypes).Include(p => p.Type).FirstOrDefault(i => i.Id == model.Id);
            UpsertProduct(product, model);
        }

        public void DeleteProduct(int id)
        {
            var product = dbContext.Products.Find(id);

            if (product != null)
            {
                dbContext.Products.Remove(product);
                dbContext.SaveChanges();
            }
        }

        private void UpsertProduct(Product? product, InsertProductBM model)
        {
            if (product == null)
            {
                return;
            }

            var newSubTypesIds = model.SubTypes.Select(st => st.Id).ToList();
            var newSubTypes = dbContext.ProductSubTypes.Where(i => newSubTypesIds.Contains(i.Id)).ToList();

            var newType = dbContext.ProductTypes.Find(model.Type.Id);

            var company = dbContext.Users.Find(model.Company.Id);

            // In case of Update
            product?.SubTypes?.Clear();

            // Update Product
            product.Price = model.Price;
            product.Quantity = model.Quantity;
            product.ImageUrl = model.ImageUrl;
            product.Name = model.Name;
            product.SubTypes = newSubTypes;
            product.Type = newType;
            product.Company = company;

            dbContext.Products.Update(product);
            dbContext.SaveChanges();
        }
    }
}
