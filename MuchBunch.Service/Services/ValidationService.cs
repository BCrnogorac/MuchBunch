using FluentValidation;
using FluentValidation.Results;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MuchBunch.Service.Services
{
    public class ValidationService : BaseService
    {
        public ValidationService(MBDBContext dbContext) : base(dbContext) { }

        public async Task<ValidationResult> ValidateRegister(RegisterBM model)
        {
            return await ValidateAsync(model, new RegisterBMValidator(dbContext));
        }

        public async static Task<ValidationResult> ValidateAsync<T, U>(T model, U validator) 
            where T : class
            where U : AbstractValidator<T>
        {
            return await validator.ValidateAsync(model);
        }

        public static ValidationResult Validate<T, U>(T model, U validator)
            where T : class
            where U : AbstractValidator<T>
        {
            return validator.Validate(model);
        }
    }
}
