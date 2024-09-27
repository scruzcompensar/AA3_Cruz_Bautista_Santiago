using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using UCompensarAPI.DataAccess.Data;

namespace UCompensarAPI.DataAccess.DAO
{
    public interface IBaseDAO<T> where T : class
    {
        T GetById(int id);
        List<T> GetAll();
        T Add(T entity);
        T Modify(T entity);
        bool Delete(int id);
        IList<T> GetByFilter(Expression<Func<T, bool>> filtre);
    }
    public class BaseDAO<T> : IBaseDAO<T> where T : class
    {
        //Invocación de instancia de la conexión a la base de datos.
        private readonly TupatinetaContext _challengeContext;

        public BaseDAO(TupatinetaContext challengeContext)
        {
            _challengeContext = challengeContext;
        }

        #region Métodos genericos para las acciones sobre la BD
        public List<T> GetAll()
        {
            return _challengeContext.Set<T>().ToList();
        }
        public T GetById(int id)
        {
            var model = _challengeContext.Set<T>().Find(id);
            return model;
        }
        public IList<T> GetByFilter(Expression<Func<T, bool>> filtre)
        {
            var model = _challengeContext.Set<T>().Where(filtre).ToList();
            return model;
        }
        public T Add(T entity)
        {
            _challengeContext.Set<T>().Add(entity);
            _challengeContext.SaveChanges();
            return entity;
        }

        public T Modify(T entity)
        {
            _challengeContext.Set<T>().Update(entity);
            _challengeContext.SaveChanges();
            return entity;
        }

        public bool Delete(int id)
        {
            var entity = GetById(id);
            var accion = _challengeContext.Set<T>().Remove(entity);
            _challengeContext.SaveChanges();
            return accion.State == EntityState.Deleted;
        }
        #endregion
    }
}
