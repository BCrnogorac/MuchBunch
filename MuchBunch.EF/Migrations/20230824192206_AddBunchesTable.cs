using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MuchBunch.EF.Migrations
{
    /// <inheritdoc />
    public partial class AddBunchesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Users_CompanyId",
                table: "Products");

            migrationBuilder.AlterColumn<int>(
                name: "CompanyId",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "Theme",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Theme", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bunches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ThemeId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    CompanyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bunches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bunches_Theme_ThemeId",
                        column: x => x.ThemeId,
                        principalTable: "Theme",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bunches_Users_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "BunchProduct",
                columns: table => new
                {
                    BunchesId = table.Column<int>(type: "int", nullable: false),
                    ProductsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BunchProduct", x => new { x.BunchesId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_BunchProduct_Bunches_BunchesId",
                        column: x => x.BunchesId,
                        principalTable: "Bunches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BunchProduct_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bunches_CompanyId",
                table: "Bunches",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Bunches_ThemeId",
                table: "Bunches",
                column: "ThemeId");

            migrationBuilder.CreateIndex(
                name: "IX_BunchProduct_ProductsId",
                table: "BunchProduct",
                column: "ProductsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Users_CompanyId",
                table: "Products",
                column: "CompanyId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Users_CompanyId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "BunchProduct");

            migrationBuilder.DropTable(
                name: "Bunches");

            migrationBuilder.DropTable(
                name: "Theme");

            migrationBuilder.AlterColumn<int>(
                name: "CompanyId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Users_CompanyId",
                table: "Products",
                column: "CompanyId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
