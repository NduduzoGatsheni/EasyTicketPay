import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayTrackerPage } from './today-tracker.page';

describe('TodayTrackerPage', () => {
  let component: TodayTrackerPage;
  let fixture: ComponentFixture<TodayTrackerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodayTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
