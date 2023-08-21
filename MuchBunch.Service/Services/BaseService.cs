using MuchBunch.EF.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MuchBunch.Service.Services
{
    public class BaseService
    {
        protected MBDBContext dbContext;

        public BaseService(MBDBContext dbContext) { 
            this.dbContext = dbContext;
        }
    }
}
