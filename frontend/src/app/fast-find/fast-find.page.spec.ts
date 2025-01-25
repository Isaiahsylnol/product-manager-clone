import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FastFindPage } from './fast-find.page';

describe('FastFindPage', () => {
  let component: FastFindPage;
  let fixture: ComponentFixture<FastFindPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FastFindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
