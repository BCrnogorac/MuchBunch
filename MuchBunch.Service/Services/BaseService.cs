using AutoMapper;
using MuchBunch.EF.Database;

namespace MuchBunch.Service.Services
{
    public class BaseService
    {
        protected MBDBContext dbContext;
        protected IMapper mapper;

        public BaseService(MBDBContext dbContext, IMapper mapperConfiguration)
        {
            this.dbContext = dbContext;
            this.mapper = mapperConfiguration;
        }
    }
}
