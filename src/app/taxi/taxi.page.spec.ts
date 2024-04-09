import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxiPage } from './taxi.page';

describe('TaxiPage', () => {
  let component: TaxiPage;
  let fixture: ComponentFixture<TaxiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TaxiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
