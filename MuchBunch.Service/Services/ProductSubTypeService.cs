using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class ProductSubTypeService : BaseService
    {
        public ProductSubTypeService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {

        }

        public IEnumerable<ProductTypeDTO> GetProductSubTypes()
        {
            var subtypes = dbContext.ProductSubTypes.Include(x => x.Parent);

            return mapper.Map<IEnumerable<ProductSubTypeWithParentDTO>>(subtypes);
        }

        public IEnumerable<ProductTypeDTO> GetProductSubTypesById(int parentId)
        {
            var parentType = dbContext.ProductTypes.Include(x => x.SubTypes)
                .FirstOrDefault(x => x.Id == parentId);
            var subTypes = parentType?.SubTypes
                .Select(pt => new ProductTypeDTO()
                {
                    Id = pt.Id,
                    Name = pt.Name,
                });


            return subTypes;
        }

        public void InsertProductSubType(InsertProductSubTypeBM model)
        {
            var subType = new ProductSubType()
            {
                Name = model.Name,
                ParentId = model.ParentId,
            };

            dbContext.ProductSubTypes.Add(subType);
            dbContext.SaveChanges();
        }

        public void EditProductSubType(EditProductSubTypeBM model)
        {
            var subType = dbContext.ProductSubTypes.Find(model.Id);

            subType.ParentId = model.ParentId;
            subType.Name = model.Name;

            dbContext.ProductSubTypes.Update(subType);
            dbContext.SaveChanges();
        }

        public void DeleteProductSubType(int id)
        {
            var subType = dbContext.ProductSubTypes.FirstOrDefault(pt => pt.Id == id);

            if (subType != null)
            {
                dbContext.ProductSubTypes.Remove(subType);
                dbContext.SaveChanges();
            }
        }
    }
}
