using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertBunchValidator : AbstractValidator<InsertBunchBM>
    {
        private const string InvalidThemeId = "Theme with given id does not exist!";
        private const string InvalidCompanyId = "Company with given id does not exist!";
        private const string InvalidProductId = "One of products with given id does not exist!";

        public InsertBunchValidator(MBDBContext dbContext)
        {

            RuleFor(x => x.Name).MaximumLength(200).NotEmpty();
            RuleFor(x => x.Price).NotNull();

            RuleFor(x => x.ThemeId)
                .MustAsync(async (themeId, ct) =>
                {
                    var exists = await dbContext.Themes.AnyAsync(t => t.Id == themeId, ct);
                    return exists;
                }).WithMessage(InvalidThemeId);

            RuleFor(x => x.CompanyId)
               .MustAsync(async (companyId, ct) =>
               {
                   var exists = await dbContext.Users.AnyAsync(u => u.Id == companyId, ct);
                   return exists;
               }).WithMessage(InvalidCompanyId);

            RuleFor(x => x.ProductIds)
              .MustAsync(async (productIds, ct) =>
              {
                  var exists = await dbContext.Products.AnyAsync(p => productIds.Contains(p.Id), ct);
                  return exists;
              }).WithMessage(InvalidProductId);
        }
    }
}
