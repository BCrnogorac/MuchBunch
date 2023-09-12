using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    internal class EditRoleBMValidator : AbstractValidator<EditRoleBM>
    {
        private const string InvalidId = "Role with given role id does not exist!";

        public EditRoleBMValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.Id)
                .MustAsync(async (roleId, ct) =>
                {
                    var exists = await dbContext.Roles.AnyAsync(r => r.Id == roleId, ct);
                    return exists;
                }).WithMessage(InvalidId);
        }
    }
}
