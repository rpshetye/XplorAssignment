import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import { CustomerAddeditComponent } from './customer-addedit/customer-addedit.component';

//services
import { AppService } from '../app/services/app.service';
import { ConfigService } from '../app/services/config.service';
import { CustomerService } from '../app/services/customer.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CustomerListComponent,
    ButtonRendererComponent,
    CustomerAddeditComponent,
    ConfirmationDialogComponent,        
  ],
  imports: [
    //AgGridModule.withComponents([ButtonRendererComponent]),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AgGridModule,
    //NgbModule,
    //FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CustomerListComponent, pathMatch: 'full' },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      { path: 'customer', component: CustomerListComponent },
      { path: 'customer/edit', component: CustomerAddeditComponent },
      { path: 'customer/create', component: CustomerAddeditComponent },
    ]),
    FontAwesomeModule,
    //NgbModule,
    //NgbModule,
    //NgbModule
  ],
  providers: [ConfigService, CustomerService, AppService,ConfirmationDialogService],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class AppModule { }
