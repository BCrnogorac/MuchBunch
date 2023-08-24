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
            CreateMap<Product, ProductTypeBM>();
            CreateMap<Product, ProductDTO>();
            CreateMap<Role, RoleDTO>();
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name));
        }
    }
}