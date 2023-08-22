﻿namespace MuchBunch.EF.Database.Models
{
    public class ProductType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ProductSubType>? SubTypes { get; } = new List<ProductSubType>();
        public ICollection<Product>? Products { get; } = new List<Product>();
    }
}
