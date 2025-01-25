import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignItPage } from './sign-it.page';

describe('SignItPage', () => {
  let component: SignItPage;
  let fixture: ComponentFixture<SignItPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignItPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
