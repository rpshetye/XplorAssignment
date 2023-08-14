import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService} from './config.service';
@Injectable()
export class CustomerService{
    //baseApiUrl: string = 'https://getinvoices.azurewebsites.net/api/';
    baseApiUrl: string = '';
    getCustomerall: string = 'customer';
    getCustomer: string = 'customer';
    postCustomer: string = 'customer';
    putCustomer: string = 'customer';
    deleteCustomer: string = 'customer';
    //data:any;
    constructor(private http: HttpClient, private configService: ConfigService) {
        this.baseApiUrl = this.configService.getApiURI();    
    }
  
    get(id: string) {
      try {
        return this.http.get(this.baseApiUrl + this.getCustomer + '/'+ id);
      }
      catch (Ex) {
        throw Ex;
      }
    }
  
    getAll() {
      try {
         var apiUrl = this.baseApiUrl + this.getCustomerall;
        var data = this.http.get(apiUrl);
        console.log(data);
        return data;
      }
      catch (Ex) {
        throw Ex;
      }
    }
  
  
    async post(data: any) {
      try {
        return await this.http.post(this.baseApiUrl + this.postCustomer,data);
      }
      catch (Ex) {
        throw Ex;
      }
    }
  
    put(id: string, data: any) {
      try {
        return this.http.put(this.baseApiUrl + this.putCustomer+ '/'+ id,data);
      }
      catch (Ex) {
        throw Ex;
      }
    }
  
    delete(id: string) {
      try {
        return this.http.delete(this.baseApiUrl + this.deleteCustomer+ '/'+ id);
      }
      catch (Ex) {
        throw Ex;
      }
    }
  }