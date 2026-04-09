import { Component, HostListener, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../i18n/locale.service';
import { SERVICES_MEDIA } from '../../shared/media/site-media';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  readonly i18n = inject(LocaleService);
  readonly content = computed(() => this.i18n.pageContent('services'));
  readonly media = SERVICES_MEDIA;
  readonly coverageIcons = ['images/c2.svg', 'images/c4.svg'];
  readonly productLineIds = ['consumo-humano', 'consumo-animal'];
  readonly humanProductImages = [
    'images/products/1.webp',
    'images/products/2.webp',
    'images/products/3.webp',
    'images/products/4.webp',
    'images/products/5.webp',
    'images/products/6.webp',
    'images/products/7.webp',
  ];
  isMobileView =
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px)').matches
      : false;

  @HostListener('window:resize')
  onResize() {
    this.isMobileView =
      typeof window !== 'undefined'
        ? window.matchMedia('(max-width: 767px)').matches
        : false;
  }

  get showCoverageVideo() {
    return !this.isMobileView;
  }
}
