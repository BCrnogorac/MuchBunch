using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MuchBunch.EF.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOnDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_TypeId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSubTypes_ProductTypes_ParentId",
                table: "ProductSubTypes");

            migrationBuilder.AlterColumn<int>(
                name: "TypeId",
                table: "Products",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_TypeId",
                table: "Products",
                column: "TypeId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSubTypes_ProductTypes_ParentId",
                table: "ProductSubTypes",
                column: "ParentId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_TypeId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSubTypes_ProductTypes_ParentId",
                table: "ProductSubTypes");

            migrationBuilder.AlterColumn<int>(
                name: "TypeId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_TypeId",
                table: "Products",
                column: "TypeId",
                principalTable: "ProductTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSubTypes_ProductTypes_ParentId",
                table: "ProductSubTypes",
                column: "ParentId",
                principalTable: "ProductTypes",
                principalColumn: "Id");
        }
    }
}
