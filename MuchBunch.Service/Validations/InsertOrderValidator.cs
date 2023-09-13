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
        private const string InsufficientProducts = "Bunch does not have every product available!";
        private const string ExistingOrder = "This order already exists!";

        public InsertOrderValidator(MBDBContext dbContext)
        {
            RuleFor(x => x)
                .MustAsync(async (order, ct) =>
                {
                    var exists = await dbContext.Order.AnyAsync(o => o.UserId == order.UserId && o.BunchId == order.BunchId, ct);
                    return !exists;
                }).WithMessage(ExistingOrder);

            RuleFor(x => x.BunchId)
                .MustAsync(async (bunchId, ct) =>
                {
                    var bunch = await dbContext.Bunches
                    .Include(b => b.Products)
                    .FirstOrDefaultAsync(b => b.Id == bunchId, ct);
                    var hasAllProducts = !bunch.Products.Any(product => product.Quantity <= 0);

                    return hasAllProducts;
                }).WithMessage(InsufficientProducts);

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
