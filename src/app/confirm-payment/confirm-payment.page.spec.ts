import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPaymentPage } from './confirm-payment.page';

describe('ConfirmPaymentPage', () => {
  let component: ConfirmPaymentPage;
  let fixture: ComponentFixture<ConfirmPaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
