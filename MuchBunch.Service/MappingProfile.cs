using AutoMapper;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductType, ProductTypeWithSubtypesDTO>();
            CreateMap<ProductType, ProductTypeDTO>();
            CreateMap<ProductSubType, ProductTypeDTO>();
            CreateMap<ProductSubType, ProductSubTypeWithParentDTO>();
            CreateMap<Product, ProductTypeBM>();
            CreateMap<Product, ProductDTO>();
        }
    }
}