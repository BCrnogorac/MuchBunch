using AutoMapper;
using MuchBunch.EF.Database;
using MuchBunch.EF.Database.Models;
using MuchBunch.Service.Models.BM;
using MuchBunch.Service.Models.DTO;

namespace MuchBunch.Service.Services
{
    public class ThemeService : BaseService
    {
        public ThemeService(MBDBContext dbContext, IMapper mapperConfiguration) : base(dbContext, mapperConfiguration)
        {
        }

        public IEnumerable<ThemeDTO> GetThemes()
        {
            return mapper.Map<IEnumerable<ThemeDTO>>(dbContext.Themes);
        }

        public void InsertTheme(InsertThemeBM model)
        {
            var data = mapper.Map<Theme>(model);
            dbContext.Themes.Add(data);
            dbContext.SaveChanges();
        }

        public void EditTheme(EditThemeBM model)
        {
            var theme = dbContext.Themes.Find(model.Id);

            if (theme != null)
            {
                theme.Name = model.Name;

                dbContext.Themes.Update(theme);
                dbContext.SaveChanges();
            }
        }

        public void DeleteTheme(int id)
        {
            var theme = dbContext.Themes.Find(id);

            if (theme != null)
            {
                dbContext.Remove(theme);
                dbContext.SaveChanges();
            }
        }
    }
}
