using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using MuchBunch.EF.Database;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Validations;

namespace MuchBunch.Service.Services
{
    public class ValidationService : BaseService
    {
        public ValidationService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration) { }

        public async Task<ValidationResult> ValidateRegister(RegisterBM model)
        {
            return await ValidateAsync(model, new RegisterBMValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateInsertProduct(InsertProductBM model)
        {
            return await ValidateAsync(model, new InsertProductBMValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateInsertProductType(InsertProductTypeBM model)
        {
            return await ValidateAsync(model, new InsertProductTypeBMValidator(dbContext));
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
