using Microsoft.EntityFrameworkCore.Migrations;

namespace BanHang.Data.Migrations
{
    public partial class alterDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountRate",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountRate",
                table: "Product");
        }
    }
}
