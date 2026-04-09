import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, startWith } from 'rxjs';
import { LocaleService } from '../../i18n/locale.service';
import { RouteKey, SupportedLocale } from '../../i18n/types';

type NavTheme = 'light' | 'dark';
type MobileMenuItem = {
  labelKey: string;
  pageKey: RouteKey;
  fragment?: string;
};

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  navTheme: NavTheme = 'light';
  readonly i18n = inject(LocaleService);
  readonly isMobileViewport = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly mobileMenuItems: MobileMenuItem[] = [
    { labelKey: 'global.nav.about', pageKey: 'about' },
    { labelKey: 'global.nav.services', pageKey: 'services' },
    { labelKey: 'global.nav.products', pageKey: 'services', fragment: 'productos-section' },
    { labelKey: 'global.nav.process', pageKey: 'process' },
    { labelKey: 'global.nav.markets', pageKey: 'process', fragment: 'mercados' },
    { labelKey: 'global.nav.contact', pageKey: 'contact' },
  ];
  readonly contactHref = 'tel:+50700000000';
  readonly whatsappHref = 'https://wa.me/50700000000';
  readonly emailHref = 'mailto:info@mirabolante.com';

  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly mobileMediaQuery =
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)') : null;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.updateTheme();
        this.closeMobileMenu();
      });

    this.bindMobileBreakpoint();
  }

  onLocaleSelect(locale: SupportedLocale) {
    this.closeMobileMenu();
    this.i18n.switchLocaleFromCurrentUrl(locale);
  }

  toggleLocale() {
    this.onLocaleSelect(this.i18n.locale() === 'es' ? 'en' : 'es');
  }

  get nextLocaleLabel() {
    return this.i18n.locale() === 'es'
      ? `${this.i18n.t('global.language.switchLabel')}: ${this.i18n.t('global.language.enShort')}`
      : `${this.i18n.t('global.language.switchLabel')}: ${this.i18n.t('global.language.esShort')}`;
  }

  get logoSrc() {
    return this.isMobileMenuOpen() || this.navTheme !== 'dark' ? 'logo.svg' : 'logocolor.svg';
  }

  toggleMobileMenu() {
    if (!this.isMobileViewport()) {
      return;
    }

    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  onMobileNavigation() {
    this.closeMobileMenu();
  }

  private updateTheme() {
    let currentRoute = this.activatedRoute;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    this.navTheme = currentRoute.snapshot.data['navTheme'] === 'dark' ? 'dark' : 'light';
  }

  private bindMobileBreakpoint() {
    if (!this.mobileMediaQuery) {
      return;
    }

    const mediaQuery = this.mobileMediaQuery as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };

    const syncViewport = (matches: boolean) => {
      this.isMobileViewport.set(matches);

      if (!matches) {
        this.closeMobileMenu();
      }
    };

    syncViewport(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      syncViewport(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      this.destroyRef.onDestroy(() => {
        mediaQuery.removeEventListener('change', handleChange);
      });
      return;
    }

    mediaQuery.addListener?.(handleChange);
    this.destroyRef.onDestroy(() => {
      mediaQuery.removeListener?.(handleChange);
    });
  }
}
