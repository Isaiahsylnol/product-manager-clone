import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'inquiry',
    canActivate: [AuthGuard],
    loadComponent: () => import('./inquiry/inquiry.page').then( m => m.InquiryPage)
  },
  {
    path: 'locate',
    canActivate: [AuthGuard],
    loadComponent: () => import('./locate/locate.page').then( m => m.LocatePage)
  },
  {
    path: 'fill',
    canActivate: [AuthGuard],
    loadComponent: () => import('./fill/fill.page').then( m => m.FillPage)
  },
  {
    path: 'fill/create-list',
    canActivate: [AuthGuard],
    loadComponent: () => import('./fill/create-list/create-list.page').then( m => m.CreateListPage)
  },
  {
    path: 'sign-it',
    canActivate: [AuthGuard],
    loadComponent: () => import('./sign-it/sign-it.page').then( m => m.SignItPage)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'product-details',
    canActivate: [AuthGuard],
    loadComponent: () => import('./product-details/product-details.page').then( m => m.ProductDetailsPage)
  },
  {
    path: 'fast-find',
    canActivate: [AuthGuard],
    loadComponent: () => import('./fast-find/fast-find.page').then( m => m.FastFindPage)
  },
  {
    path: 'maintain-location',
    canActivate: [AuthGuard],
    loadComponent: () => import('./maintain-location/maintain-location.page').then( m => m.MaintainLocationPage)
  },
  {
    path: 'maintain-location/view-all',
    canActivate: [AuthGuard],
    loadComponent: () => import('./maintain-location/view-all/view-all.page').then( m => m.ViewAllPage)
  },
  {
    path: 'remove-product',
    canActivate: [AuthGuard],
    loadComponent: () => import('./remove-product/remove-product.page').then( m => m.RemoveProductPage)
  },
  {
    path: 'view-all',
    canActivate: [AuthGuard],
    loadComponent: () => import('./maintain-location/view-all/view-all.page').then( m => m.ViewAllPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
];