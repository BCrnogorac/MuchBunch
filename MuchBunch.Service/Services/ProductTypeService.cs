
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class ProductTypeService : BaseService
    {
        public ProductTypeService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<ProductTypeWithSubtypesDTO> GetProductTypes()
        {
            var productTypes = dbContext.ProductTypes
                .Select(pt => new ProductTypeWithSubtypesDTO()
                {
                    Id = pt.Id,
                    Name = pt.Name,
                    SubTypes = mapper.Map<List<ProductTypeWithSubtypesDTO>>(pt.SubTypes)
                });


            return productTypes;
        }

        public IEnumerable<ProductTypeDTO> GetProductParentTypes()
        {
            var productTypes = dbContext.ProductTypes
                .Where(pt => pt.ParentId == null);


            return mapper.Map<IEnumerable<ProductTypeDTO>>(productTypes);
        }

        public IEnumerable<ProductTypeDTO> GetProductSubTypes(int id)
        {
            var productTypes = dbContext.ProductTypes
                .Where(pt => pt.ParentId == id);


            return mapper.Map<IEnumerable<ProductTypeDTO>>(productTypes);
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

        public void InsertProductType(InsertProductTypeBM model)
        {
            var productTypeModel = new ProductType()
            {
                Name = model.Name,
                ParentId = model.ParentId
            };

            dbContext.ProductTypes.Add(productTypeModel);
            dbContext.SaveChanges();
        }
    }
}
