using Microsoft.Extensions.Configuration;
using XplorAssignment.Models;
using XplorAssignment.Services.Interfaces;
using XplorAssignment.Services.Repositories;

namespace XplorAssignment.Services
{
    public class CustomerService : IRepository<Customer>
    {

        IRepository<Customer> _repository;
        public CustomerService()//IRepository<Customer> repository
        {
            //_repository = repository;
            
            _repository = new RepositoryAPI<Customer>("customer");
        }

        public async Task<bool> Delete(string id)
        {
            return await _repository.Delete(id);
        }

        public async Task<Customer> Get(string id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Customer>> Get()
        {
            return await _repository.Get();
        }

        public async Task<bool> Post(Customer entity)
        {
            return await _repository.Post(entity);
        }

        public async Task<bool> Put(string id, Customer entity)
        {
            return await _repository.Put(id, entity);
        }
    }
}
