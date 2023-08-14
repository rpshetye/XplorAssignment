using Newtonsoft.Json;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using XplorAssignment.Models;
using XplorAssignment.Services.Interfaces;

namespace XplorAssignment.Services.Repositories
{
    public class RepositoryAPI<T> : IRepository<T>
    {
        string apiUrl = "";
        string? token = null;

        public RepositoryAPI(string controllerName)
        {
            this.apiUrl = "https://getinvoices.azurewebsites.net/api/" + controllerName;
            //this.apiUrl = configuration["apiBaseUrl"].ToString() + "/" + controllerName;
            //this.token = configuration["apiToken"].ToString();
        }

        //Delete record
        public async Task<bool> Delete(string id)
        {
            this.apiUrl += "/" + id;
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.DeleteAsync(apiUrl);          
            if (response.IsSuccessStatusCode 
                    && response.StatusCode == System.Net.HttpStatusCode.NoContent) // 204 - for deleted
                     
            {
                return true;

            }
            return false;
            
        }

        //Get record by Id
        public async Task<T> Get(string id)
        {
            this.apiUrl += "/" + id;            
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(apiUrl);           
            var responseString = response.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<T>(responseString);
        }

        public async Task<List<T>> Get()
        {
            this.apiUrl += "s";
            var result = await APICallForList("GET");
            return result;
        }

        //Insert record
        public async Task<bool> Post(T entity)
        {
            var result = await APICall("POST", entity);
            return result;
        }

        //Update record
        public async Task<bool> Put(string id, T entity)
        {
            this.apiUrl += "/" + id;
            var result = await APICall("POST", entity);
            return result;
        }

        private async Task<bool> APICall(string type, T data)
        {
            try
            {
                HttpClient client = new HttpClient();

                HttpResponseMessage response = await (type == "POST" ? client.PostAsJsonAsync(apiUrl, data)
                                                    : type == "PUT" ? client.PutAsJsonAsync(apiUrl, data)
                                                      : null);

                if (response.IsSuccessStatusCode && (
                    response.StatusCode == System.Net.HttpStatusCode.Accepted //202                    
                    || response.StatusCode == System.Net.HttpStatusCode.Created // 201
                    ))
                {
                    return true;
                }
                else 
                {
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async Task<List<T>> APICallForList(string type)
        {
            try
            {
                HttpClient client = new HttpClient();

                HttpResponseMessage response = await client.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode && (
                    response.StatusCode == System.Net.HttpStatusCode.OK //200
                    ))
                {
                    var responseString = response.Content.ReadAsStringAsync().Result;
                    return (List<T>)JsonConvert.DeserializeObject<List<T>>(responseString);
                }
                return new List<T>();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
