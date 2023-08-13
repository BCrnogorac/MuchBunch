using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MuchBunch.Service.Extensions
{
    public static class ConfigExtensions
    {
        public static T GetSection<T>(this IConfiguration config, string sectionName) where T: class
        {
            return config.GetSection(sectionName).Get<T>();
        }
    }
}
