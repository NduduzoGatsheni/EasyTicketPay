import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleProfilePage } from './vehicle-profile.page';

describe('VehicleProfilePage', () => {
  let component: VehicleProfilePage;
  let fixture: ComponentFixture<VehicleProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehicleProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
