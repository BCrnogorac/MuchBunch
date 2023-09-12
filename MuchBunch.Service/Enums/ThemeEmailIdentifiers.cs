namespace MuchBunch.Service.Enums
{
    public class ThemeEmailIdentifiers
    {
        public const string ThemeName = "theme name";
        public const string ProductsQuantity = "products quantity";
        public const string BgQuantity = "board game count";
        public const string AccessoriesQuantity = "accessories quantity";
        public const string BooksQuantity = "books quantity";
        public const string MiniaturesQuantity = "miniatures quantity";
        public const string Price = "price";

        public static string GetHTMLIdentifier(string property)
        {
            return $"{{{{ {property} }}}}";
        }

    }
}
