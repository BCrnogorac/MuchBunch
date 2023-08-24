using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertProductBMValidator : AbstractValidator<InsertProductBM>
    {
        private const string InvalidProductType = "One of given ProductTypeIds is invalid!";
        private const string InvalidCompanyId = "User with given Id does not exist!";


        public InsertProductBMValidator(MBDBContext dbContext)
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
                }).WithMessage(InvalidProductType);

            RuleFor(x => x.CompanyId)
                .MustAsync(async (id, ct) =>
                {
                    var exists = await dbContext.Users.AnyAsync(u => u.Id == id, ct);
                    return exists;
                }).WithMessage(InvalidCompanyId);
        }
    }
}