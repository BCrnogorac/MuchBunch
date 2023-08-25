using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class EditThemeValidator : InsertThemeValidator<EditThemeBM>
    {
        private const string InvalidId = "Theme with given id does not exist!";

        public EditThemeValidator(MBDBContext dbContext) : base(dbContext)
        {
            RuleFor(x => x.Id)
                .MustAsync(async (themeId, ct) =>
                {
                    var exists = await dbContext.Themes.AnyAsync(t => t.Id == themeId, ct);
                    return exists;
                }).WithMessage(InvalidId);
        }
    }
}
