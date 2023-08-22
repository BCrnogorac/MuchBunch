using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertProductSubTypeBMValidator : AbstractValidator<InsertProductSubTypeBM>
    {
        private const string InvalidParent = "ParentId is invalid!";
        public InsertProductSubTypeBMValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.Name).MaximumLength(200).NotEmpty();

            RuleFor(x => x.ParentId)
                .MustAsync(async (id, ct) =>
                {
                    var exists = await dbContext.ProductTypes.AnyAsync(pt => pt.Id == id, ct);
                    return exists;
                }).WithMessage(InvalidParent);
        }
    }
}
