import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgZone,
  computed,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../i18n/locale.service';
import { HOME_MEDIA } from '../../shared/media/site-media';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private static readonly MOBILE_HOME_CARDS_MAX_WIDTH = 768;
  private static readonly MOBILE_HOME_CARDS_BAND_START = 0.63;
  private static readonly MOBILE_HOME_CARDS_BAND_HEIGHT = 10;

  readonly i18n = inject(LocaleService);
  readonly content = computed(() => this.i18n.pageContent('home'));
  readonly media = HOME_MEDIA;
  readonly solutionIcons = ['images/c1_1.svg', 'images/c2.svg', 'images/c3.svg', 'images/c4.svg'];
  readonly solutionFragments = ['sourcing', 'logistica', 'flexibilidad', 'trazabilidad'];
  readonly marqueeImages = [
    'images/p1.webp',
    'images/p2.webp',
    'images/p3.webp',
    'images/p4.webp',
    'images/p5.webp',
    'images/p6.webp',
    'images/p7.webp',
  ];
  readonly homeCardImages = HOME_MEDIA.cards;
  readonly homeCardLayouts = [
    { index: 0, size: 'wide' },
    { index: 1, size: 'narrow' },
    { index: 2, size: 'narrow' },
    { index: 3, size: 'wide' },
  ] as const;

  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLElement>;
  @ViewChild('heroVideo') heroVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChildren('homeCard') homeCardRefs!: QueryList<ElementRef<HTMLElement>>;

  loaded = false;
  faqOpen: number | null = null;
  isMobileView =
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px)').matches
      : false;

  private scrollHandler?: () => void;
  private resizeHandler?: () => void;
  private currentHeroIndex = 0;
  private activeMobileHomeCardIndex: number | null = null;
  private homeCardsChangesSub?: Subscription;

  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {}

  private get heroVideos() {
    return this.isMobileView
      ? this.media.hero.mobileSources
      : this.media.hero.desktopSources;
  }

  onHeroCanPlay() {
    if (!this.loaded) {
      this.loaded = true;
    }
  }

  onHeroPlaying() {
    if (!this.loaded) {
      this.loaded = true;
    }
  }

  toggleFaq(index: number) {
    this.faqOpen = this.faqOpen === index ? null : index;
  }

  isHomeCardActive(index: number) {
    return this.activeMobileHomeCardIndex === index;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = () => {
        this.onScroll();
        this.updateHomeCardsActiveState();
      };
      this.resizeHandler = () => {
        this.syncHeroViewport();
        this.updateHomeCardsActiveState();
      };
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      window.addEventListener('resize', this.resizeHandler, { passive: true });
    });

    this.initHeroVideo();
    this.homeCardsChangesSub = this.homeCardRefs.changes.subscribe(() => {
      this.updateHomeCardsActiveState();
    });
    this.updateHomeCardsActiveState();
    if (typeof window !== 'undefined') {
      window.setTimeout(() => this.updateHomeCardsActiveState(), 120);
    }
  }

  ngOnDestroy() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    this.homeCardsChangesSub?.unsubscribe();
  }

  onHeroEnded() {
    this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroVideos.length;
    this.playCurrentHeroVideo();
  }

  private onScroll() {
    const section = this.aboutSection?.nativeElement;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const bgImg = section.querySelector('.about__bg-img') as HTMLElement;
    if (!bgImg) return;

    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollProgress = (viewportHeight - rect.top) / (sectionHeight + viewportHeight);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const parallaxOffset = clampedProgress * -200;

    bgImg.style.transform = `translateY(${parallaxOffset}px)`;
  }

  private initHeroVideo() {
    this.loaded = false;
    this.currentHeroIndex = 0;
    this.playCurrentHeroVideo();
  }

  private syncHeroViewport() {
    const nextIsMobile = window.matchMedia('(max-width: 767px)').matches;

    if (nextIsMobile === this.isMobileView) {
      return;
    }

    this.isMobileView = nextIsMobile;
    this.initHeroVideo();
  }

  private playCurrentHeroVideo() {
    const video = this.heroVideoRef?.nativeElement;
    if (!video) {
      return;
    }

    video.pause();
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = 'auto';
    video.src = this.heroVideos[this.currentHeroIndex];
    video.load();
    void video.play().catch(() => {});
  }

  private updateHomeCardsActiveState() {
    if (typeof window === 'undefined' || !this.homeCardRefs?.length) {
      return;
    }

    if (window.innerWidth > Home.MOBILE_HOME_CARDS_MAX_WIDTH) {
      if (this.activeMobileHomeCardIndex !== null) {
        this.ngZone.run(() => {
          this.activeMobileHomeCardIndex = null;
        });
      }
      return;
    }

    const viewportHeight = window.innerHeight;
    const bandTop = viewportHeight * Home.MOBILE_HOME_CARDS_BAND_START;
    const bandBottom = bandTop + Home.MOBILE_HOME_CARDS_BAND_HEIGHT;
    const bandCenter = (bandTop + bandBottom) / 2;
    let nextActiveIndex: number | null = null;
    let bestIntersectionHeight = 0;
    let bestCenterDistance = Number.POSITIVE_INFINITY;

    this.homeCardRefs.forEach((cardRef) => {
      const element = cardRef.nativeElement;
      const rect = element.getBoundingClientRect();
      const index = Number(element.dataset['cardIndex']);

      if (Number.isNaN(index)) {
        return;
      }

      if (rect.bottom <= 0 || rect.top >= viewportHeight) {
        return;
      }

      const intersectionTop = Math.max(rect.top, bandTop);
      const intersectionBottom = Math.min(rect.bottom, bandBottom);
      const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);

      if (intersectionHeight <= 0) {
        return;
      }

      const distanceToBandCenter = Math.abs(rect.top + rect.height / 2 - bandCenter);

      if (
        intersectionHeight > bestIntersectionHeight ||
        (intersectionHeight === bestIntersectionHeight &&
          distanceToBandCenter < bestCenterDistance)
      ) {
        bestIntersectionHeight = intersectionHeight;
        bestCenterDistance = distanceToBandCenter;
        nextActiveIndex = index;
      }
    });

    if (this.activeMobileHomeCardIndex !== nextActiveIndex) {
      this.ngZone.run(() => {
        this.activeMobileHomeCardIndex = nextActiveIndex;
        this.changeDetectorRef.detectChanges();
      });
    }
  }
}
