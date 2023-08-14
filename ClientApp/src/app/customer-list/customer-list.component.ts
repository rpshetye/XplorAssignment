import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomerService } from '../services/customer.service';
import { IGetRowsParams} from 'ag-grid-community';
import { ButtonRendererComponent } from '../renderer/button-renderer.component';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
   columnDefs: any = [];
   gridData: any;

  frameworkComponents: any;
  rowDataClickedEdit = {};
  rowDataClickedDelete = {};
  faDelete = faTrashAlt;
  
  constructor(private customerService: CustomerService,private router: Router, private route: ActivatedRoute
    ,private confirmationDialogService: ConfirmationDialogService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    }
  }

  ngOnInit(): void {
    //CustomerId Firstname Lastname Email Phone_Number Country_code Gender Balance
    this.columnDefs = [      
      { headerName: 'Edit', field: 'id', width: 80, 
        cellRenderer:"buttonRenderer", 
        cellRendererParams: {
        onClick: this.onedit.bind(this),
        label: 'Edit',
        }    
      },
      { headerName: 'Delete', field: 'id', width: 80, 
        cellRenderer:"buttonRenderer", 
        cellRendererParams: {
        onClick: this.ondelete.bind(this),
        label: 'Delete',        
        }    
      },
      { headerName: 'CustomerId', field: 'id', width: 130},
      { headerName: 'Firstname', field: 'firstname' },
      { headerName: 'Lastname', field: 'lastname' },
      { headerName: 'Email', field: 'email', cellRenderer: this.createHyperLink.bind(this)},
      { headerName: 'Phone_Number', field: 'phone_Number' },
      { headerName: 'Country', field: 'country_code', width: 100},
      { headerName: 'Gender', field: 'gender' , width: 110,cellRenderer: this.getGenterCellRenderer()},
      { headerName: 'Balance', field: 'balance', width: 100,cellStyle: { 'text-align': 'right' },cellRenderer: this.getCurrencyCellRenderer()},
    ];
    this.getGridData(); 
  }

  createHyperLink(params:any): any {
    if (!params.data) { return; }
    const spanElement = document.createElement('span');
    spanElement.innerHTML = `<a href="#" > ${params.value} </a> `;    
    return spanElement;
  }
  
  getCurrencyCellRenderer() {    
    var usdFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  
    function currencyCellRenderer(params:any) {      
      return usdFormatter.format(params.value);   
    }  
    return currencyCellRenderer;
  }


  getGenterCellRenderer() {    
    function genterCellRenderer(params:any) {      
      return params.value == "f" ? "Female" : "Male";  
    }  
    return genterCellRenderer;
  }
     
  async getGridData() {  
    this.customerService.getAll()
        .subscribe(response => {
          this.gridData = response;
        });    
  }

  onedit(e:any){
    var id = e.rowData.id;    
    this.router.navigate(['/customer/edit'], {queryParams:{id: id}});
  }

  ondelete(e:any){
    var id = e.rowData.id;  
    var customerName = e.rowData.firstname + ' ' + e.rowData.lastname;      
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete customer \''+ customerName +'\'?')
    .then((confirmed) => 
              this.customerService.delete(id).subscribe(response => {
                alert("Record deleted successfully!");
                this.getGridData();
              })
          )
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
    );
  }
  onAddNew(){
    this.router.navigate(['/customer/create']);
  }  
}
