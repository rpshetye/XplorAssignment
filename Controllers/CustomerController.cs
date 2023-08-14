using Microsoft.AspNetCore.Mvc;
using XplorAssignment.Models;
using XplorAssignment.Services;
using XplorAssignment.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace XplorAssignmentAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IRepository<Customer> service;
        public CustomerController()//IRepository<Customer> _service 
        {
            service = new CustomerService();
        }

        // GET: api/<CustomersController>
        [HttpGet]
        public async Task<List<Customer>> Get()
        {
            var result = await service.Get();
            return (List<Customer>)(result);
        }

        // GET api/<CustomersController>/5
        [HttpGet("{id}")]
        public async Task<Customer> Get(string id)
        {
            return await service.Get(id);
        }

        // POST api/<CustomersController>
        [HttpPost]
        public async Task<bool> Post([FromBody] Customer value)
        {
            return await service.Post(value);
        }

        // PUT api/<CustomersController>/5
        [HttpPut("{id}")]
        public async Task<bool> Put(string id, [FromBody] Customer value)
        {
            return await service.Put(id, value);
        }

        // DELETE api/<CustomersController>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(string id)
        {
            return await service.Delete(id);
        }
    }
}
