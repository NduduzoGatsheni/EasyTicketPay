import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainPage } from './train.page';

describe('TrainPage', () => {
  let component: TrainPage;
  let fixture: ComponentFixture<TrainPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
