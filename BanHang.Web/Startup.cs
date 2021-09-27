using BanHang.Data.DbContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using BanHang.Data.Models;
using Microsoft.AspNetCore.Identity;
using BanHang.Services.Services;
using BanHang.Notification.Email;
using DARS.WebAPI.Utility;
using FluentValidation.AspNetCore;
using BanHang.Services.ViewModel;
using Microsoft.AspNetCore.Authorization;
using BanHang.Web.Attributes;
using System;
using BanHang.Security.Common;
using System.Linq;
using BanHang.Security.Extension;
using AspNet.Security.OAuth.Validation;

namespace BanHang.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<BanHangContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("BanHang"))
            );
            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Password.RequiredUniqueChars = 1;
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;

                //
            })
                .AddEntityFrameworkStores<BanHangContext>()
                .AddDefaultTokenProviders();

            services.AddCors();

            services.AddSingleton<IAuthorizationHandler, CustomAuthorizationHandle>();
            services.AddSingleton<IAuthorizationRequirement, CustomAuthoRequire>();
            services.AddSingleton<IConfiguration>(Configuration);
            // life circleservices.AddTransient<UserManager<AppUser>, UserManager<AppUser>>();
            services.AddTransient<SignInManager<User>, SignInManager<User>>();
            services.AddTransient<RoleManager<Role>, RoleManager<Role>>();
            services.AddTransient<IEmailProvider, EmailProvider>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<ICategoryService, CategoryService>();
            
            services.AddTransient<ISupplierService, SupplierService>();
            services.AddTransient<IPictureService, PictureService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<IOrderService, OrderService>();
            services.AddTransient<IOrderDetailService, OderDetailService>();
            services.AddTransient<ICartSevice, CartService>();
            services.AddTransient<IReportService, ReportService>();
            
            services.AddTransient<IEmailService, EmailService>();

            #region Create Authorization Role
            var userRoleTypes = Enum.GetValues(typeof(UserTypeEnum)).Cast<UserTypeEnum>().ToList();

            for (int i = 1; i <= userRoleTypes.Count(); i++)
            {
                foreach (var policyNames in userRoleTypes.Combinate(i))
                {
                    ///Administrator,Customer
                    var policyConcat = string.Join(",", policyNames);
                    var result = policyNames.GroupBy(c => c).Where(c => c.Count() > 1).Select(c => new { charName = c.Key, charCount = c.Count() });
                    if (result.Count() <= 0)
                    {
                        services.AddAuthorization(options =>
                        {
                            options.AddPolicy(policyConcat, policy => policy.Requirements.Add(new CustomAuthoRequire(policyConcat)));
                        });
                    }
                }
            }
            #endregion

            services.AddTransient<IAuthozirationUtility, AuthozirationUtility>();
            services.AddAuthentication(OAuthValidationDefaults.AuthenticationScheme).AddOAuthValidation();
            services.AddControllers()
                //.AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<RegisterRequestValidator>()); ;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(options =>
                options.WithOrigins(
                    "http://localhost:3000",
                    "http://localhost:3001",
                    "http://10.10.10.59:1999"
                )
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .SetIsOriginAllowed(origin => true)
                    .AllowCredentials());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
