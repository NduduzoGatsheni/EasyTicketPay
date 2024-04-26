import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VechileProfilePage } from './vechile-profile.page';

describe('VechileProfilePage', () => {
  let component: VechileProfilePage;
  let fixture: ComponentFixture<VechileProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VechileProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
