using Microsoft.EntityFrameworkCore.Migrations;

namespace BanHang.Data.Migrations
{
    public partial class alterdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AverageRate",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Rate",
                table: "Comment",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AverageRate",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "Rate",
                table: "Comment");
        }
    }
}
