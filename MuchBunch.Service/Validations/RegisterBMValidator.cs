using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class RegisterBMValidator : AbstractValidator<RegisterBM>
    {
        private const string InvalidRole = "Given role does not exist!";
        private const string ExistingUsername = "Given username is taken!";
        private const string ExistingEmail = "Given email is taken!";

        public RegisterBMValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.Email)
                .MustAsync(async (model, ct) =>
                {
                    var exists = await dbContext.Users.AnyAsync(user => user.Email == model, ct);
                    return !exists;
                }).WithMessage(ExistingEmail);

            RuleFor(x => x.Username)
                .MustAsync(async (model, ct) =>
                {
                    var exists = await dbContext.Users.AnyAsync(user => user.Name == model, ct);
                    return !exists;
                }).WithMessage(ExistingUsername);

            RuleFor(model => model.Role)
                .Must(roleName =>
                {
                    var exists = dbContext.Roles.FirstOrDefault(role => role.Name == roleName);
                    return exists != null;
                }).WithMessage(InvalidRole);
        }
    }
}
