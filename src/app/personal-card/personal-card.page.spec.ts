import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalCardPage } from './personal-card.page';

describe('PersonalCardPage', () => {
  let component: PersonalCardPage;
  let fixture: ComponentFixture<PersonalCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonalCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
