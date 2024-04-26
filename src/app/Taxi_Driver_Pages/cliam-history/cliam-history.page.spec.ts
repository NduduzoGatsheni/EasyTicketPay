import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CliamHistoryPage } from './cliam-history.page';

describe('CliamHistoryPage', () => {
  let component: CliamHistoryPage;
  let fixture: ComponentFixture<CliamHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CliamHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
