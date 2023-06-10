import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestInsuranceComponent } from './request-insurance.component';

describe('RequestInsuranceComponent', () => {
  let component: RequestInsuranceComponent;
  let fixture: ComponentFixture<RequestInsuranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestInsuranceComponent]
    });
    fixture = TestBed.createComponent(RequestInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
