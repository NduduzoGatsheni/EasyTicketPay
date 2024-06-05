import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignVehiclePage } from './sign-vehicle.page';

describe('SignVehiclePage', () => {
  let component: SignVehiclePage;
  let fixture: ComponentFixture<SignVehiclePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignVehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
