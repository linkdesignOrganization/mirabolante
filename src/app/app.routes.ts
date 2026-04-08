import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { navTheme: 'light' },
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'about',
    data: { navTheme: 'dark' },
    loadComponent: () => import('./pages/about/about').then(m => m.About)
  },
  {
    path: 'services',
    data: { navTheme: 'light' },
    loadComponent: () => import('./pages/services/services').then(m => m.Services)
  },
  {
    path: 'contact',
    data: { navTheme: 'light' },
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  { path: '**', redirectTo: '' },
];
