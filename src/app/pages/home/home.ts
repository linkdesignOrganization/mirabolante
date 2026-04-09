import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgZone,
  computed,
  inject,
} from '@angular/core';
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

  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLElement>;
  @ViewChild('heroVideo') heroVideoRef!: ElementRef<HTMLVideoElement>;

  loaded = false;
  faqOpen: number | null = null;
  isMobileView =
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px)').matches
      : false;

  private scrollHandler?: () => void;
  private resizeHandler?: () => void;
  private currentHeroIndex = 0;

  constructor(private ngZone: NgZone) {}

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

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = () => this.onScroll();
      this.resizeHandler = () => this.syncHeroViewport();
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      window.addEventListener('resize', this.resizeHandler, { passive: true });
    });

    this.initHeroVideo();
  }

  ngOnDestroy() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
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
}
