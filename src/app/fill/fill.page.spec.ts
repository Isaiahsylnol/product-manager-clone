import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FillPage } from './fill.page';

describe('FillPage', () => {
  let component: FillPage;
  let fixture: ComponentFixture<FillPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
