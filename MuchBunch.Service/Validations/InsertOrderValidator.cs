using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertOrderValidator : AbstractValidator<OrderBM>
    {
        private const string InvalidUserId = "User with given id does not exist!";
        private const string InvalidBunchId = "Bunch with given id does not exist!";

        public InsertOrderValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.UserId)
                .MustAsync(async (userId, ct) =>
                {
                    var exists = await dbContext.Users.AnyAsync(u => u.Id == userId, ct);
                    return exists;
                }).WithMessage(InvalidUserId);

            RuleFor(x => x.BunchId)
                .MustAsync(async (bunchId, ct) =>
                {
                    var exists = await dbContext.Bunches.AnyAsync(b => b.Id == bunchId, ct);
                    return exists;
                }).WithMessage(InvalidBunchId);
        }
    }
}
