using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertRoleBMValidator : AbstractValidator<RoleBM>
    {
        private const string InvalidName = "Given name is already taken!";
        public InsertRoleBMValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.Name).MaximumLength(200).NotEmpty();

            RuleFor(x => x.Name)
                .MustAsync(async (name, ct) =>
                {
                    var exists = await dbContext.Roles.AnyAsync(r => r.Name == name, ct);
                    return !exists;
                }).WithMessage(InvalidName);
        }
    }
}