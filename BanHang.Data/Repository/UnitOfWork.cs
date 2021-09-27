using BanHang.Data.DbContext;
using BanHang.Data.Models;
using BanHang.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Repository
{
    public class UnitOfWork : IDisposable
    {
        private readonly BanHangContext dbContext;
        //private IRepository<AppConfig> appConfigRepository;
        private IRepository<User> userRepository;
        private IRepository<Role> roleRepository;
        private IRepository<Product> productRepository;
        private IRepository<Supplier> supplierRepository;
        private IRepository<Category> categoryRepository;
        private IRepository<Picture> pictureRepoitory;
        private IRepository<OrderDetail> orderDetailRepository;
        private IRepository<Order> orderRepository;
        private IRepository<Comment> commentRepository;
        private IRepository<Cart> cartRespository;

        public BanHangContext DbContext => dbContext;
        public IRepository<User> UserRepository => userRepository ?? (userRepository = new Repository<User>(DbContext));
        public IRepository<Role> RoleRepository => roleRepository ?? (roleRepository = new Repository<Role>(DbContext));
        public IRepository<Product> ProductRepository => productRepository ?? (productRepository = new Repository<Product>(DbContext));
        public IRepository<Supplier> SupplierRepository => supplierRepository ?? (supplierRepository = new Repository<Supplier>(DbContext));
        public IRepository<Category> CategoryRepository => categoryRepository ?? (categoryRepository = new Repository<Category>(DbContext));
        public IRepository<Picture> PictureRepository => pictureRepoitory ?? (pictureRepoitory = new Repository<Picture>(DbContext));
        public IRepository<OrderDetail> OrderDetailRepository => orderDetailRepository ?? (orderDetailRepository = new Repository<OrderDetail>(DbContext));
        public IRepository<Order> OrderRepository => orderRepository ?? (orderRepository = new Repository<Order>(DbContext));
        public IRepository<Comment> CommentRepository => commentRepository ?? (commentRepository = new Repository<Comment>(DbContext));
        public IRepository<Cart> CartRepository => cartRespository ?? (cartRespository = new Repository<Cart>(DbContext));

        public UnitOfWork()
        {
            dbContext = (new BanHangContextFactory()).CreateDbContext(null);
        }
        public void SaveChanges()
        {
            DbContext.SaveChanges();
        }

        public static UnitOfWork GetDefaultInstance()
        {
            return new UnitOfWork();
        }

        #region Dispose
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                    DbContext.Dispose();
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}