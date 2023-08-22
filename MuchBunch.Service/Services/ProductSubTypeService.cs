using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class ProductSubTypeService : BaseService
    {
        public ProductSubTypeService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {

        }

        public IEnumerable<ProductTypeDTO> GetProductSubTypesById(int parentId)
        {
            var parentType = dbContext.ProductTypes.Include(x => x.SubTypes)
                .FirstOrDefault(x => x.Id == parentId);
            var subTypes = parentType.SubTypes
                .Select(pt => new ProductTypeDTO()
                {
                    Id = pt.Id,
                    Name = pt.Name,
                });


            return subTypes;
        }
    }
}
