import { DestroyRef, inject, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, startWith } from 'rxjs';
import { LocaleService } from '../../i18n/locale.service';
import { SupportedLocale } from '../../i18n/types';

type NavTheme = 'light' | 'dark';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  navTheme: NavTheme = 'light';
  readonly i18n = inject(LocaleService);

  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.updateTheme();
      });
  }

  onLocaleSelect(locale: SupportedLocale) {
    this.i18n.switchLocaleFromCurrentUrl(locale);
  }

  private updateTheme() {
    let currentRoute = this.activatedRoute;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    this.navTheme = currentRoute.snapshot.data['navTheme'] === 'dark' ? 'dark' : 'light';
  }
}
