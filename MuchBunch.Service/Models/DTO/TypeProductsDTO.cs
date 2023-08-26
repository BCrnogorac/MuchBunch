using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MuchBunch.Service.Models.DTO
{
    public class TypeProductsDTO
    {
        public ProductTypeDTO Type { get; set; }
        public IEnumerable<ProductDTO>? Products { get; set; }
    }
}
