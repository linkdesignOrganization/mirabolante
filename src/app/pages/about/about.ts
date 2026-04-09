import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../i18n/locale.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  readonly i18n = inject(LocaleService);
  readonly content = computed(() => this.i18n.pageContent('about'));
  readonly featureIcons = ['images/c1_1.svg', 'images/c3.svg', 'images/c2.svg'];

  @ViewChild('heroMedia') heroMediaRef!: ElementRef<HTMLElement>;
  @ViewChild('heroImage') heroImageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('aboutVideo') aboutVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('ctaMedia') ctaMediaRef!: ElementRef<HTMLElement>;
  @ViewChild('ctaImage') ctaImageRef!: ElementRef<HTMLImageElement>;

  aboutVideoPoster = 'images/hero-poster-d.jpg';

  private scrollHandler?: () => void;
  private resizeHandler?: () => void;
  private rafId = 0;
  private isMobile = false;
  private aboutCurrentIndex = 0;
  private readonly desktopVideos = ['videos/d1.mp4', 'videos/d2.mp4', 'videos/d3.mp4', 'videos/d4.mp4'];
  private readonly mobileVideos = ['videos/m1.mp4', 'videos/m2.mp4', 'videos/m3.mp4', 'videos/m4.mp4'];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const queueParallax = () => {
        if (this.rafId) return;

        this.rafId = requestAnimationFrame(() => {
          this.rafId = 0;
          this.updateParallax();
        });
      };

      this.scrollHandler = queueParallax;
      this.resizeHandler = () => {
        queueParallax();
        this.syncAboutVideo();
      };

      window.addEventListener('scroll', queueParallax, { passive: true });
      window.addEventListener('resize', this.resizeHandler, { passive: true });

      this.syncAboutVideo(true);
      queueParallax();
    });
  }

  ngOnDestroy() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  onAboutVideoEnded() {
    this.aboutCurrentIndex = (this.aboutCurrentIndex + 1) % this.aboutVideos.length;
    this.playAboutVideo();
  }

  private get aboutVideos(): string[] {
    return this.isMobile ? this.mobileVideos : this.desktopVideos;
  }

  private syncAboutVideo(force = false) {
    const nextIsMobile = window.matchMedia('(max-width: 768px)').matches;

    if (!force && nextIsMobile === this.isMobile) return;

    this.isMobile = nextIsMobile;
    this.aboutVideoPoster = this.isMobile
      ? 'images/hero-poster-m.jpg'
      : 'images/hero-poster-d.jpg';
    this.aboutCurrentIndex = 0;
    this.playAboutVideo();
  }

  private playAboutVideo() {
    const video = this.aboutVideoRef?.nativeElement;
    if (!video) return;

    const nextSource = this.aboutVideos[this.aboutCurrentIndex];

    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = 'auto';
    video.src = nextSource;
    video.load();

    void video.play().catch(() => {});
  }

  private updateParallax() {
    this.applyParallax(this.heroMediaRef, this.heroImageRef, -160);
    this.applyParallax(this.ctaMediaRef, this.ctaImageRef, -132);
  }

  private applyParallax(
    mediaRef: ElementRef<HTMLElement> | undefined,
    imageRef: ElementRef<HTMLImageElement> | undefined,
    distance: number
  ) {
    const media = mediaRef?.nativeElement;
    const image = imageRef?.nativeElement;

    if (!media || !image) return;

    const rect = media.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const parallaxOffset = clampedProgress * distance;

    image.style.transform = `translateY(${parallaxOffset}px)`;
  }
}
