import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessfullyPage } from './successfully.page';

describe('SuccessfullyPage', () => {
  let component: SuccessfullyPage;
  let fixture: ComponentFixture<SuccessfullyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessfullyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
