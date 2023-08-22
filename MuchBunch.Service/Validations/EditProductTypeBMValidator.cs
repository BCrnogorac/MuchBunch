using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class EditProductTypeBMValidator : AbstractValidator<EditProductTypeBM>
    {
        private const string InvalidParent = "ParentId is invalid!";
        private const string InvalidId = "ProductType id is invalid!";

        public EditProductTypeBMValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.ParentId)
                .MustAsync(async (id, ct) =>
                {
                    var exists = await dbContext.ProductTypes.AnyAsync(pt => pt.Id == id, ct);
                    return exists || id is null;
                }).WithMessage(InvalidParent);

            RuleFor(x => x.Id)
                .MustAsync(async (id, ct) =>
                {
                    var exists = await dbContext.ProductTypes.AnyAsync(pt => pt.Id == id, ct);
                    return exists;
                }).WithMessage(InvalidId);
        }
    }
}