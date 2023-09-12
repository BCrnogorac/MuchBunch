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

        #region Insert

        public async Task<ValidationResult> ValidateRegister(RegisterBM model)
        {
            return await ValidateAsync(model, new RegisterBMValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateInsertProduct(InsertProductBM model)
        {
            return await ValidateAsync(model, new InsertProductBMValidator(dbContext));
        }

        public ValidationResult ValidateInsertProductType(InsertProductTypeBM model)
        {
            return Validate(model, new InsertProductTypeBMValidator());
        }

        public async Task<ValidationResult> ValidateInsertProductSubType(InsertProductSubTypeBM model)
        {
            return await ValidateAsync(model, new InsertProductSubTypeBMValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateInsertRole(RoleBM model)
        {
            return await ValidateAsync(model, new InsertRoleBMValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateInsertTheme(InsertThemeBM model)
        {
            return await ValidateAsync(model, new InsertThemeValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateInsertBunch(InsertBunchBM model)
        {
            return await ValidateAsync(model, new InsertBunchValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateInsertOrder(OrderBM model)
        {
            return await ValidateAsync(model, new InsertOrderValidator(dbContext));
        }

        #endregion

        #region Edit
        public async Task<ValidationResult> ValidateEditBunch(EditBunchBM model)
        {
            return await ValidateAsync(model, new EditBunchValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateEditTheme(EditThemeBM model)
        {
            return await ValidateAsync(model, new EditThemeValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateEditRole(EditRoleBM model)
        {
            return await ValidateAsync(model, new EditRoleBMValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateEditProductSubType(EditProductSubTypeBM model)
        {
            return await ValidateAsync(model, new EditProductSubTypeBMValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateEditProduct(EditProductBM model)
        {
            return await ValidateAsync(model, new EditProductBMValidator(dbContext));
        }

        public async Task<ValidationResult> ValidateEditProductType(EditProductTypeBM model)
        {
            return await ValidateAsync(model, new EditProductTypeBMValidator(dbContext));
        }
        #endregion


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
