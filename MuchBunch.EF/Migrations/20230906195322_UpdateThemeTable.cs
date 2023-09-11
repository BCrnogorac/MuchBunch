using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MuchBunch.EF.Migrations
{
    /// <inheritdoc />
    public partial class UpdateThemeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Themes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Themes");
        }
    }
}
