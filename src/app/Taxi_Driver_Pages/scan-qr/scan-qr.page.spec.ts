import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanQRPage } from './scan-qr.page';

describe('ScanQRPage', () => {
  let component: ScanQRPage;
  let fixture: ComponentFixture<ScanQRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScanQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
