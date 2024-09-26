import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverTransactionsPage } from './driver-transactions.page';

describe('DriverTransactionsPage', () => {
  let component: DriverTransactionsPage;
  let fixture: ComponentFixture<DriverTransactionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DriverTransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
