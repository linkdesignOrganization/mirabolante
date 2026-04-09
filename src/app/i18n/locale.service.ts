import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Params, Router, UrlTree } from '@angular/router';
import { filter, startWith } from 'rxjs';
import {
  buildLocalizedPath,
  DEFAULT_LOCALE,
  DICTIONARIES,
  LOCALE_STORAGE_KEY,
  ROUTE_KEYS,
  SUPPORTED_LOCALES,
} from './config';
import { LocaleDictionary, RouteKey, SupportedLocale } from './types';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  readonly locale = signal<SupportedLocale>(DEFAULT_LOCALE);
  readonly pageKey = signal<RouteKey>('home');

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
      )
      .subscribe(() => {
        this.syncFromRoute();
      });
  }

  setLocale(locale: SupportedLocale) {
    this.persistLocale(locale);
    this.locale.set(locale);
  }

  translate(key: string): string {
    return (
      this.resolveTranslation(this.locale(), key) ??
      this.resolveTranslation(DEFAULT_LOCALE, key) ??
      key
    );
  }

  t(key: string): string {
    return this.translate(key);
  }

  globalContent(locale = this.locale()): LocaleDictionary['global'] {
    return DICTIONARIES[locale].global ?? DICTIONARIES[DEFAULT_LOCALE].global;
  }

  pageContent<K extends RouteKey>(pageKey: K, locale = this.locale()): LocaleDictionary[K] {
    return DICTIONARIES[locale][pageKey] ?? DICTIONARIES[DEFAULT_LOCALE][pageKey];
  }

  buildLink(pageKey: RouteKey, options: { locale?: SupportedLocale } = {}): string {
    return buildLocalizedPath(options.locale ?? this.locale(), pageKey);
  }

  createUrlTree(
    pageKey: RouteKey,
    options: {
      locale?: SupportedLocale;
      queryParams?: Params;
      fragment?: string | null;
    } = {}
  ): UrlTree {
    const tree = this.router.parseUrl(this.buildLink(pageKey, options));
    tree.queryParams = options.queryParams ?? {};
    tree.fragment = options.fragment ?? null;
    return tree;
  }

  getPreferredLocale(): SupportedLocale {
    return this.readStoredLocale() ?? DEFAULT_LOCALE;
  }

  switchLocaleFromCurrentUrl(nextLocale: SupportedLocale) {
    const currentTree = this.router.parseUrl(this.router.url);
    const nextTree = this.createUrlTree(this.pageKey(), {
      locale: nextLocale,
      queryParams: currentTree.queryParams,
      fragment: currentTree.fragment,
    });

    this.persistLocale(nextLocale);

    if (this.router.serializeUrl(nextTree) === this.router.url) {
      this.locale.set(nextLocale);
      return;
    }

    void this.router.navigateByUrl(nextTree);
  }

  private syncFromRoute() {
    let currentRoute = this.activatedRoute;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    const routeLocale = this.asSupportedLocale(currentRoute.snapshot.data['locale']);
    const routePageKey = this.asRouteKey(currentRoute.snapshot.data['pageKey']);

    const activeLocale = routeLocale ?? this.getPreferredLocale();
    const activePageKey = routePageKey ?? 'home';

    this.locale.set(activeLocale);
    this.pageKey.set(activePageKey);

    if (routeLocale) {
      this.persistLocale(routeLocale);
    }

    this.document.documentElement.lang = activeLocale;
    this.title.setTitle(this.resolvePageTitle(activeLocale, activePageKey));
  }

  private resolvePageTitle(locale: SupportedLocale, pageKey: RouteKey): string {
    const translatedTitle = DICTIONARIES[locale][pageKey]?.metaTitle;
    const fallbackTitle = DICTIONARIES[DEFAULT_LOCALE][pageKey]?.metaTitle;

    return translatedTitle || fallbackTitle || DICTIONARIES[DEFAULT_LOCALE].home.metaTitle;
  }

  private resolveTranslation(locale: SupportedLocale, key: string): string | null {
    const value = key
      .split('.')
      .reduce<unknown>((current, segment) => {
        if (current && typeof current === 'object' && segment in current) {
          return (current as Record<string, unknown>)[segment];
        }

        return null;
      }, DICTIONARIES[locale] as LocaleDictionary);

    return typeof value === 'string' ? value : null;
  }

  private readStoredLocale(): SupportedLocale | null {
    try {
      const locale = localStorage.getItem(LOCALE_STORAGE_KEY);
      return this.asSupportedLocale(locale);
    } catch {
      return null;
    }
  }

  private persistLocale(locale: SupportedLocale) {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage errors in private browsing or restricted environments.
    }
  }

  private asSupportedLocale(value: unknown): SupportedLocale | null {
    return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as SupportedLocale)
      ? (value as SupportedLocale)
      : null;
  }

  private asRouteKey(value: unknown): RouteKey | null {
    return typeof value === 'string' && ROUTE_KEYS.includes(value as RouteKey)
      ? (value as RouteKey)
      : null;
  }
}
