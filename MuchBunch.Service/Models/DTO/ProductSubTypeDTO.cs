﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MuchBunch.Service.Models.DTO
{
    public class ProductSubTypeDTO : ProductTypeDTO
    {
        public int ParentId { get; set; }
    }
}
