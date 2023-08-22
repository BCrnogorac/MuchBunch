﻿using FluentValidation;
using Microsoft.EntityFrameworkCore;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;

namespace MuchBunch.Service.Validations
{
    public class EditProductTypeBMValidator : AbstractValidator<EditProductTypeBM>
    {

        private const string InvalidId = "ProductType id is invalid!";

        public EditProductTypeBMValidator(MBDBContext dbContext)
        {
            RuleFor(x => x.Name).MaximumLength(200).NotEmpty();

            RuleFor(x => x.Id)
                .MustAsync(async (id, ct) =>
                {
                    var exists = await dbContext.ProductTypes.AnyAsync(pt => pt.Id == id, ct);
                    return exists;
                }).WithMessage(InvalidId);
        }
    }
}