using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertProductTypeBMValidator : AbstractValidator<InsertProductTypeBM>
    {
        private const string InvalidParent = "ParentId is invalid!";

        public InsertProductTypeBMValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.ParentId)
                .MustAsync(async (model, ct) =>
                {
                    var exists = await dbContext.ProductTypes.AnyAsync(pt => pt.Id == model, ct);
                    return exists;
                }).WithMessage(InvalidParent);

        }
    }
}
