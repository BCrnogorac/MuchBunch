using AutoMapper;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ProductType, ProductTypeDTO>();
            CreateMap<Product, ProductDTO>();
        }
    }
}