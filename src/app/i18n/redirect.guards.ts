import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocaleService } from './locale.service';
import { RouteKey } from './types';

export const rootLocaleRedirectGuard: CanActivateFn = (route) => {
  const i18n = inject(LocaleService);

  return i18n.createUrlTree('home', {
    locale: i18n.getPreferredLocale(),
    queryParams: route.queryParams,
    fragment: route.fragment ?? null,
  });
};

export const legacyLocaleRedirectGuard: CanActivateFn = (route) => {
  const i18n = inject(LocaleService);
  const pageKey = (route.data['pageKey'] as RouteKey | undefined) ?? 'home';

  return i18n.createUrlTree(pageKey, {
    locale: 'es',
    queryParams: route.queryParams,
    fragment: route.fragment ?? null,
  });
};
