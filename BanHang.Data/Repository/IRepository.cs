using BanHang.Data.DbContext;
using BanHang.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace BanHang.Data.Repository
{
    public interface IRepository<TModel> where TModel : class, IEntity
    {
        int Create(TModel model);
        TModel Read(int id);
        TModel ReadNoTracking(int id);
        void Update(TModel model);
        void Delete(int id);
        DbSet<TModel> Entities { get; }
        IEnumerable<TModel> NoTrackingEntities { get; }
        void CreateUnSaved(TModel model);
        void UpdateUnSaved(TModel model);
        void DeleteUnSaved(int id);
    }

    public class Repository<TModel> : IRepository<TModel> where TModel : class, IEntity
    {
        private readonly BanHangContext dbContext;
        public Repository(BanHangContext context)
        {
            dbContext = context;

            Entities = context.Set<TModel>();
            NoTrackingEntities = context.Set<TModel>().AsNoTracking();
        }

        public virtual int Create(TModel model)
        {
            CreateUnSaved(model);
            dbContext.SaveChanges();
            return model.Id;
        }

        public virtual void CreateUnSaved(TModel model)
        {
            Entities.Add(model);
        }

        public virtual void Delete(int id)
        {
            DeleteUnSaved(id);
            dbContext.SaveChanges();
        }

        public void DeleteUnSaved(int id)
        {
            var modelToDelete = Entities.Find(id);
            if (modelToDelete == null) throw new Exception($"Xóa không thành công! Dữ liệu Id='{id}' không tồn tại");
            Entities.Remove(modelToDelete);
        }

        public virtual TModel Read(int id)
        {
            return Entities.Find(id);
        }

        public virtual TModel ReadNoTracking(int id)
        {
            return NoTrackingEntities.SingleOrDefault(o => o.Id == id);
        }

        public virtual void Update(TModel model)
        {
            UpdateUnSaved(model);
            dbContext.SaveChanges();
        }

        public virtual void UpdateUnSaved(TModel model)
        {
            Entities.Attach(model);
            dbContext.Entry(model).State = EntityState.Modified;
        }
        public virtual DbSet<TModel> Entities { get; }
        public IEnumerable<TModel> NoTrackingEntities { get; }
    }
}
