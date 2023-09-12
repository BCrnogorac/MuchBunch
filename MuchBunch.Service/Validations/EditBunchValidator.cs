using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class EditBunchValidator : AbstractValidator<EditBunchBM>
    {
        private const string InvalidId = "Theme with given id does not exist!";

        public EditBunchValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.Id)
                .MustAsync(async (bunchId, ct) =>
                {
                    var exists = await dbContext.Bunches.AnyAsync(b => b.Id == bunchId, ct);
                    return exists;
                }).WithMessage(InvalidId);
        }
    }
}
