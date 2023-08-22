using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class EditProductBMValidator : AbstractValidator<EditProductBM>
    {
        private const string InvalidProductType = "One of given ProductTypeIds is invalid!";
        private const string InvalidId = "Product with given Id does not exist!";
        private const string ProductTypeInvalidId = "ProductType with given Id does not exist!";

        public EditProductBMValidator(MBDBContext dbContext)
        {
            RuleForEach(x => x.SubTypes)
                .MustAsync(async (model, ct) =>
                {
                    var exists = await dbContext.ProductSubTypes.AnyAsync(pt => pt.Id == model.Id, ct);
                    return exists;
                }).WithMessage(InvalidProductType);

            RuleFor(x => x.Type)
                .MustAsync(async (model, ct) =>
                {
                    var exists = await dbContext.ProductTypes.AnyAsync(pt => pt.Id == model.Id, ct);
                    return exists;
                }).WithMessage(ProductTypeInvalidId);

            RuleFor(x => x.Id)
                .MustAsync(async (id, ct) =>
                {
                    var exists = await dbContext.Products.AnyAsync(pt => pt.Id == id, ct);
                    return exists;
                }).WithMessage(InvalidId);
        }
    }
}