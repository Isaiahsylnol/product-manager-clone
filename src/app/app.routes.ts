import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'inquiry',
    loadComponent: () => import('./inquiry/inquiry.page').then( m => m.InquiryPage)
  },
  {
    path: 'locate',
    loadComponent: () => import('./locate/locate.page').then( m => m.LocatePage)
  },
  {
    path: 'fill',
    loadComponent: () => import('./fill/fill.page').then( m => m.FillPage)

  },
  {
    path: 'fill/create-list',
    loadComponent: () => import('./fill/create-list/create-list.page').then( m => m.CreateListPage)
  },
  {
    path: 'sign-it',
    loadComponent: () => import('./sign-it/sign-it.page').then( m => m.SignItPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'product-details',
    loadComponent: () => import('./product-details/product-details.page').then( m => m.ProductDetailsPage)
  },
  {
    path: 'fast-find',
    loadComponent: () => import('./fast-find/fast-find.page').then( m => m.FastFindPage)
  },
  {
    path: 'maintain-location',
    loadComponent: () => import('./maintain-location/maintain-location.page').then( m => m.MaintainLocationPage)
  },
  {
    path: 'maintain-location/view-all',
    loadComponent: () => import('./maintain-location/view-all/view-all.page').then( m => m.ViewAllPage)
  },
  {
    path: 'remove-product',
    loadComponent: () => import('./remove-product/remove-product.page').then( m => m.RemoveProductPage)
  },
  {
    path: 'view-all',
    loadComponent: () => import('./maintain-location/view-all/view-all.page').then( m => m.ViewAllPage)
  },
];
