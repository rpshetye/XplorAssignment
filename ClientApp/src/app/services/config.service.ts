import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService  {
  _apiURI: string = "";
  _baseURI: string = "";  
  environmentName: string = "local";
  constructor() {
      this._baseURI = window.location.href.split('/').slice(0, 3).join('/');

     //console.log(this.environmentName);
      if (this.environmentName == "local")
      {
        this._apiURI = 'https://localhost:7288/api/';
        //this._apiURI = this._baseURI + "/api";
      }
      else if (this.environmentName == "test")
      {
        this._apiURI = this._baseURI + "/api";
      }
      else if (this.environmentName == "prod")
      {
        this._apiURI = this._baseURI + "/api";
      }
   }
  getApiURI() {
    return this._apiURI;
  }

  getBaseApiURI() {
    return this._baseURI;
  }
}