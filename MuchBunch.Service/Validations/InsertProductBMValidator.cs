using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertProductBMValidator : AbstractValidator<InsertProductBM>
    {
        private const string InvalidProductType = "One of given ProductTypeIds is invalid!";

        public InsertProductBMValidator(MBDBContext dbContext)
        {
            RuleForEach(x => x.ProductTypeIds)
                .MustAsync(async (model, ct) =>
                {
                    var exists = await dbContext.ProductTypes.AnyAsync(pt => pt.Id == model, ct);
                    return exists;
                }).WithMessage(InvalidProductType);

        }
    }
}
