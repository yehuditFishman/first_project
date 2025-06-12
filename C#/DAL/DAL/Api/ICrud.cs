using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface ICrud<T>
    {
        void Create(T item);
        List<T> Read();
        void Delete(T item);
        void Update(T item);
    }
}
