import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeTrackerPage } from './fee-tracker.page';

describe('FeeTrackerPage', () => {
  let component: FeeTrackerPage;
  let fixture: ComponentFixture<FeeTrackerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FeeTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
