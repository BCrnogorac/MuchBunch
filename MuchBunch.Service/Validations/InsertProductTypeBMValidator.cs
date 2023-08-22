using FluentValidation;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class InsertProductTypeBMValidator : AbstractValidator<InsertProductTypeBM>
    {
        public InsertProductTypeBMValidator()
        {
            RuleFor(x => x.Name).MaximumLength(200).NotEmpty();
        }
    }
}