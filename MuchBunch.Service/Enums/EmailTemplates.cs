namespace MuchBunch.Service.Enums
{
    public class EmailTemplate
    {
        public const string UpcomingTheme = "UpcomingTheme";
        public const string LiveTheme = "LiveTheme";

        public const string UpcomingThemeTitle = "There's a new MucBunch Theme in Town!";
        public const string LiveThemeTitle = "Grab your new MuchBunch!";

        public static string GetRelativePath(string templateName)
        {
            return $"..\\MuchBunch.Service\\EmailTemplates\\{templateName}.html";
        }
    }
}
