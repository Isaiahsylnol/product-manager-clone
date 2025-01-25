import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveProductPage } from './remove-product.page';

describe('RemoveProductPage', () => {
  let component: RemoveProductPage;
  let fixture: ComponentFixture<RemoveProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RemoveProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
