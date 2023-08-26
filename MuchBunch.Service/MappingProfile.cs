using AutoMapper;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.BM;
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
            CreateMap<ProductSubType, ProductSubTypeDTO>();
            CreateMap<Product, ProductTypeBM>();
            CreateMap<Product, ProductDTO>();
            CreateMap<Role, RoleDTO>();
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.Name));
            CreateMap<Bunch, BunchDTO>();
            CreateMap<Theme, ThemeDTO>();
            CreateMap<Theme, ThemeSimpleDTO>();

            CreateMap<InsertThemeBM, Theme>();
            CreateMap<InsertBunchBM, Bunch>()
                .ForMember(dest => dest.Products, opt => opt.Ignore());

        }
    }
}