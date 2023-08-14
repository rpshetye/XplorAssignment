namespace XplorAssignment.Services.Interfaces
{
    public interface IRepository<T>
    {
        Task<T> Get(string id);

        Task<bool> Post(T entity);

        Task<bool> Put(string id, T entity);

        Task<bool> Delete(string id);

        Task<List<T>> Get();
    }
}
