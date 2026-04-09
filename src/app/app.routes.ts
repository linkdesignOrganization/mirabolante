import { Route, Routes } from '@angular/router';
import { buildLocalizedRoutePath } from './i18n/config';
import { EmptyRoute } from './i18n/empty-route';
import { legacyLocaleRedirectGuard, rootLocaleRedirectGuard } from './i18n/redirect.guards';
import { RouteKey, SupportedLocale } from './i18n/types';

type NavTheme = 'light' | 'dark';

type PageDefinition = {
  navTheme: NavTheme;
  loadComponent: NonNullable<Route['loadComponent']>;
};

const pageDefinitions: Record<RouteKey, PageDefinition> = {
  about: {
    navTheme: 'dark',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  services: {
    navTheme: 'light',
    loadComponent: () => import('./pages/services/services').then((m) => m.Services),
  },
  process: {
    navTheme: 'dark',
    loadComponent: () => import('./pages/process/process').then((m) => m.Process),
  },
  contact: {
    navTheme: 'dark',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  home: {
    navTheme: 'light',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
};

function buildLocalizedRoutes(locale: SupportedLocale): Routes {
  const orderedPageKeys: RouteKey[] = ['about', 'services', 'process', 'contact', 'home'];

  return orderedPageKeys.map((pageKey) => {
    const definition = pageDefinitions[pageKey];

    return {
      path: buildLocalizedRoutePath(locale, pageKey),
      data: {
        locale,
        pageKey,
        navTheme: definition.navTheme,
      },
      loadComponent: definition.loadComponent,
    };
  });
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [rootLocaleRedirectGuard],
    component: EmptyRoute,
  },
  ...buildLocalizedRoutes('es'),
  ...buildLocalizedRoutes('en'),
  {
    path: 'about',
    pathMatch: 'full',
    data: { pageKey: 'about' },
    canActivate: [legacyLocaleRedirectGuard],
    component: EmptyRoute,
  },
  {
    path: 'services',
    pathMatch: 'full',
    data: { pageKey: 'services' },
    canActivate: [legacyLocaleRedirectGuard],
    component: EmptyRoute,
  },
  {
    path: 'process',
    pathMatch: 'full',
    data: { pageKey: 'process' },
    canActivate: [legacyLocaleRedirectGuard],
    component: EmptyRoute,
  },
  {
    path: 'contact',
    pathMatch: 'full',
    data: { pageKey: 'contact' },
    canActivate: [legacyLocaleRedirectGuard],
    component: EmptyRoute,
  },
  { path: '**', redirectTo: '' },
];
