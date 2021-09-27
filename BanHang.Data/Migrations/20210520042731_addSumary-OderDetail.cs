using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BanHang.Data.Migrations
{
    public partial class addSumaryOderDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "Product",
                newName: "AvailableQuantity");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 20, 11, 27, 31, 352, DateTimeKind.Local).AddTicks(4978),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 20, 8, 45, 25, 809, DateTimeKind.Local).AddTicks(7057));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 20, 11, 27, 31, 352, DateTimeKind.Local).AddTicks(3889),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 20, 8, 45, 25, 809, DateTimeKind.Local).AddTicks(6640));

            migrationBuilder.AddColumn<int>(
                name: "Sumary",
                table: "OrderDetail",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Order",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 20, 11, 27, 31, 328, DateTimeKind.Local).AddTicks(5467),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 20, 8, 45, 25, 794, DateTimeKind.Local).AddTicks(9184));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateTime",
                table: "Comment",
                type: "datetime2",
                nullable: true,
                defaultValue: new DateTime(2021, 5, 20, 11, 27, 31, 337, DateTimeKind.Local).AddTicks(6880),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldDefaultValue: new DateTime(2021, 5, 20, 8, 45, 25, 803, DateTimeKind.Local).AddTicks(4094));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sumary",
                table: "OrderDetail");

            migrationBuilder.RenameColumn(
                name: "AvailableQuantity",
                table: "Product",
                newName: "Quantity");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 20, 8, 45, 25, 809, DateTimeKind.Local).AddTicks(7057),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 20, 11, 27, 31, 352, DateTimeKind.Local).AddTicks(4978));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Product",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 20, 8, 45, 25, 809, DateTimeKind.Local).AddTicks(6640),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 20, 11, 27, 31, 352, DateTimeKind.Local).AddTicks(3889));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Order",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 5, 20, 8, 45, 25, 794, DateTimeKind.Local).AddTicks(9184),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 5, 20, 11, 27, 31, 328, DateTimeKind.Local).AddTicks(5467));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateTime",
                table: "Comment",
                type: "datetime2",
                nullable: true,
                defaultValue: new DateTime(2021, 5, 20, 8, 45, 25, 803, DateTimeKind.Local).AddTicks(4094),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldDefaultValue: new DateTime(2021, 5, 20, 11, 27, 31, 337, DateTimeKind.Local).AddTicks(6880));
        }
    }
}
