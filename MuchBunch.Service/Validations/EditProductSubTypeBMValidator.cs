using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class EditProductSubTypeBMValidator : AbstractValidator<EditProductSubTypeBM>
    {
        private const string InvalidId = "ProductType id is invalid!";

        public EditProductSubTypeBMValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.Name).MaximumLength(200).NotEmpty();

            RuleFor(x => x.Id)
                .MustAsync(async (id, ct) =>
                {
                    var exists = await dbContext.ProductSubTypes.AnyAsync(pt => pt.Id == id, ct);
                    return exists;
                }).WithMessage(InvalidId);

            RuleFor(x => x.ParentId)
                .MustAsync(async (id, ct) =>
                {
                    var exists = await dbContext.ProductTypes.AnyAsync(pt => pt.Id == id, ct);
                    return exists;
                }).WithMessage(InvalidId);
        }
    }
}
