using AutoMapper;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class ProductSubTypeService : BaseService
    {
        public ProductSubTypeService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {

        }

        public IEnumerable<ProductTypeDTO> GetProductSubTypesById(int id)
        {
            var productTypes = dbContext.ProductSubTypes
                .Where(x => x.ParentId == id)
                .Select(pt => new ProductTypeDTO()
                {
                    Id = pt.Id,
                    Name = pt.Name,
                });


            return productTypes;
        }
    }
}
