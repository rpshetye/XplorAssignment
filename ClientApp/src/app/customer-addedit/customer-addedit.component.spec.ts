import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddeditComponent } from './customer-addedit.component';

describe('CustomerAddeditComponent', () => {
  let component: CustomerAddeditComponent;
  let fixture: ComponentFixture<CustomerAddeditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddeditComponent]
    });
    fixture = TestBed.createComponent(CustomerAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
