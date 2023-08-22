
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class ProductTypeService : BaseService
    {
        public ProductTypeService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<ProductTypeDTO> GetProductTypes()
        {
            var productTypes = dbContext.ProductTypes
                .Select(pt => new ProductTypeDTO()
                {
                    Name = pt.Name,
                    SubTypes = mapper.Map<List<ProductTypeDTO>>(pt.SubTypes)
                });


            return productTypes;
        }

        public ProductTypeProductsDTO GetProductsForType(int id)
        {
            var productType = dbContext.ProductTypes.Include(pt => pt.Products).Where(pt => pt.Id == id).FirstOrDefault();

            if (productType == null)
            {
                return null;
            }

            var productsDTO = new ProductTypeProductsDTO()
            {
                Id = productType.Id,
                Name = productType.Name,
                Products = mapper.Map<IEnumerable<ProductDTO>>(productType.Products)
            };


            return productsDTO;
        }
    }
}
