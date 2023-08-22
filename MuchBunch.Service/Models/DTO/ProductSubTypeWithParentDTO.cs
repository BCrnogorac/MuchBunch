namespace MuchBunch.Service.Models.DTO
{
    public class ProductSubTypeWithParentDTO : ProductTypeDTO
    {
        public ProductTypeDTO Parent { get; set; }
    }
}
