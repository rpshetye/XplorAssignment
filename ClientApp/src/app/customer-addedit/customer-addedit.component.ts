import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AppService } from '../services/app.service';
import { CustomerService } from '../services/customer.service';
import { CustomerModel } from '../services/model/customer.model';
import {countries} from 'country-data-list';
@Component({
  selector: 'app-customer-addedit',
  templateUrl: './customer-addedit.component.html',
  styleUrls: ['./customer-addedit.component.css']
})

export class CustomerAddeditComponent implements OnInit  {  
  addEditFormName:string ="Create Customer";
  data: CustomerModel = new CustomerModel();
  routeParams: any;  
  customerId: string = "";
  countries:any = [];
  savebtnName:string = "Save";
  constructor (public appCode: AppService,private customerService: CustomerService,private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.bindCountries();   
    this.routeParams = this.route.queryParams.subscribe(params =>
      {
        this.customerId = params.id;
         //console.log(this.customerId);      
         if(this.customerId != null && this.customerId != undefined){
              this.savebtnName = "Update";
              this.addEditFormName = "Edit Customer";
              this.getById();
         }else{
          this.savebtnName = "Save";
          this.addEditFormName = "Create Customer"
         }
      });    
  }

  getById(){
    this.customerService.get(this.customerId)
    .subscribe(response => {
      console.log(response);
      this.data = JSON.parse(JSON.stringify(response));
      //this.data.id = response;
    });
  }

  bindCountries(){
    this.countries = countries.all;    
  }
  onCountryCodeChange(event:any){
      this.countries = countries.all
      var findData = this.countries.find((f:any)=> f.alpha3 == event.target.value);
      if(findData != null && findData != undefined){
          this.data.country_code = findData.alpha2;
          this.data.country_code_alpha = findData.alpha3;
          this.data.country_name = findData.name;
          this.data.currency = findData.currencies[0];
      }
  }
  onCountryNameChange(event:any){
    this.countries = countries.all
    var findData = this.countries.find((f:any)=> f.name == event.target.value);
    if(findData != null && findData != undefined){
        this.data.country_code = findData.alpha2;
        this.data.country_code_alpha = findData.alpha3;
        this.data.country_name = findData.name;
        this.data.currency = findData.currencies[0];
    }
  }

  async onSubmitForm(){
    var statusMessage = "Some error occurred.";
    var response:any;
    if(this.customerId == null || this.customerId == undefined){
      response = await this.customerService.post(this.data);            
    }
    else{
      response = await this.customerService.put(this.customerId, this.data);
    }
    if(response){
      statusMessage =  "Record Saved Successfully!";      
    }
    alert(statusMessage);
  }
  onClearForm(){
    this.data = new CustomerModel();
  }

  onCancel(){
    this.router.navigate(['/customer']);
  }

}
