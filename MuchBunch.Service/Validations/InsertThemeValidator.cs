using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertThemeValidator<T> : AbstractValidator<T> where T : InsertThemeBM
    {
        private const string InvalidName = "Given name is already taken!";

        public InsertThemeValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.Name).MaximumLength(200).NotEmpty();

            RuleFor(x => x.Name)
                .MustAsync(async (name, ct) =>
                {
                    var exists = await dbContext.Themes.AnyAsync(t => t.Name == name, ct);
                    return !exists;
                }).WithMessage(InvalidName);
        }
    }
}
