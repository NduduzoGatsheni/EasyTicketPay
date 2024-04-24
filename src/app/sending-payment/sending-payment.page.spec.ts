import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendingPaymentPage } from './sending-payment.page';

describe('SendingPaymentPage', () => {
  let component: SendingPaymentPage;
  let fixture: ComponentFixture<SendingPaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SendingPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
