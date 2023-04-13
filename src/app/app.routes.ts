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
];
