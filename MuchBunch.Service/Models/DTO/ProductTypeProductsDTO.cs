﻿namespace MuchBunch.Service.Models.DTO
{
    public class ProductTypeProductsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ProductTypeBM> Products { get; set; }
    }
}
