import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintainLocationPage } from './maintain-location.page';

describe('MaintainLocationPage', () => {
  let component: MaintainLocationPage;
  let fixture: ComponentFixture<MaintainLocationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaintainLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
