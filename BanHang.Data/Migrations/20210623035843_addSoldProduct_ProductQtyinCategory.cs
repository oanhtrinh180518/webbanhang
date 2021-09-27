using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BanHang.Data.Migrations
{
    public partial class addSoldProduct_ProductQtyinCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 6, 23, 10, 58, 42, 768, DateTimeKind.Local).AddTicks(9221),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 22, 15, 37, 38, 271, DateTimeKind.Local).AddTicks(8233));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 6, 23, 10, 58, 42, 768, DateTimeKind.Local).AddTicks(8777),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 22, 15, 37, 38, 271, DateTimeKind.Local).AddTicks(7604));

            migrationBuilder.AddColumn<int>(
                name: "Sold",
                table: "Product",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Order",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 6, 23, 10, 58, 42, 751, DateTimeKind.Local).AddTicks(5008),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 22, 15, 37, 38, 250, DateTimeKind.Local).AddTicks(541));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateTime",
                table: "Comment",
                type: "datetime2",
                nullable: true,
                defaultValue: new DateTime(2021, 6, 23, 10, 58, 42, 761, DateTimeKind.Local).AddTicks(6648),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldDefaultValue: new DateTime(2021, 5, 22, 15, 37, 38, 261, DateTimeKind.Local).AddTicks(1268));

            migrationBuilder.AddColumn<int>(
                name: "ProductQty",
                table: "Category",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sold",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ProductQty",
                table: "Category");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 22, 15, 37, 38, 271, DateTimeKind.Local).AddTicks(8233),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 6, 23, 10, 58, 42, 768, DateTimeKind.Local).AddTicks(9221));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 22, 15, 37, 38, 271, DateTimeKind.Local).AddTicks(7604),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 6, 23, 10, 58, 42, 768, DateTimeKind.Local).AddTicks(8777));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Order",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 22, 15, 37, 38, 250, DateTimeKind.Local).AddTicks(541),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 6, 23, 10, 58, 42, 751, DateTimeKind.Local).AddTicks(5008));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateTime",
                table: "Comment",
                type: "datetime2",
                nullable: true,
                defaultValue: new DateTime(2021, 5, 22, 15, 37, 38, 261, DateTimeKind.Local).AddTicks(1268),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldDefaultValue: new DateTime(2021, 6, 23, 10, 58, 42, 761, DateTimeKind.Local).AddTicks(6648));
        }
    }
}
