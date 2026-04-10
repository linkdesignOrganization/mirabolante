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
import { ABOUT_MEDIA } from '../../shared/media/site-media';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  readonly i18n = inject(LocaleService);
  readonly content = computed(() => this.i18n.pageContent('about'));
  readonly media = ABOUT_MEDIA;
  readonly featureIcons = ['images/c1_1.svg', 'images/c3.svg', 'images/c2.svg'];

  @ViewChild('heroMedia') heroMediaRef!: ElementRef<HTMLElement>;
  @ViewChild('heroImage') heroImageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('storyVideoA') storyVideoARef!: ElementRef<HTMLVideoElement>;
  @ViewChild('storyVideoB') storyVideoBRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('ctaMedia') ctaMediaRef!: ElementRef<HTMLElement>;
  @ViewChild('ctaImage') ctaImageRef!: ElementRef<HTMLImageElement>;

  storyLoaded = false;
  activeStoryBuffer: 'A' | 'B' = 'A';
  private currentStoryIndex = 0;
  private isMobileView =
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px)').matches
      : false;

  private scrollHandler?: () => void;
  private resizeHandler?: () => void;
  private rafId = 0;

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
        this.syncStoryViewport();
      };

      window.addEventListener('scroll', queueParallax, { passive: true });
      window.addEventListener('resize', this.resizeHandler, { passive: true });

      queueParallax();
    });

    this.initStoryVideo();
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

  private get storyVideos() {
    return this.isMobileView
      ? this.media.story.mobileSources
      : this.media.story.desktopSources;
  }

  private get activeStoryEl(): HTMLVideoElement | undefined {
    return this.activeStoryBuffer === 'A'
      ? this.storyVideoARef?.nativeElement
      : this.storyVideoBRef?.nativeElement;
  }

  private get standbyStoryEl(): HTMLVideoElement | undefined {
    return this.activeStoryBuffer === 'A'
      ? this.storyVideoBRef?.nativeElement
      : this.storyVideoARef?.nativeElement;
  }

  onStoryCanPlay() {
    if (!this.storyLoaded) {
      this.storyLoaded = true;
    }
    this.preloadNextStoryVideo();
  }

  onStoryEnded() {
    this.currentStoryIndex = (this.currentStoryIndex + 1) % this.storyVideos.length;
    this.activeStoryBuffer = this.activeStoryBuffer === 'A' ? 'B' : 'A';
    const nowActive = this.activeStoryEl;
    if (nowActive) {
      void nowActive.play().catch(() => {});
    }
  }

  private initStoryVideo() {
    this.storyLoaded = false;
    this.currentStoryIndex = 0;
    this.activeStoryBuffer = 'A';

    const standby = this.standbyStoryEl;
    if (standby) {
      standby.pause();
      standby.removeAttribute('src');
      standby.load();
    }

    this.playCurrentStoryVideo();
  }

  private syncStoryViewport() {
    const nextIsMobile = window.matchMedia('(max-width: 767px)').matches;
    if (nextIsMobile === this.isMobileView) return;
    this.isMobileView = nextIsMobile;
    this.initStoryVideo();
  }

  private playCurrentStoryVideo() {
    const video = this.activeStoryEl;
    if (!video) return;

    video.pause();
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = this.storyVideos[this.currentStoryIndex];
    video.load();
    void video.play().catch(() => {});
  }

  private preloadNextStoryVideo() {
    const standby = this.standbyStoryEl;
    if (!standby) return;

    const nextIndex = (this.currentStoryIndex + 1) % this.storyVideos.length;
    if (standby.getAttribute('src') === this.storyVideos[nextIndex]) return;

    standby.pause();
    standby.defaultMuted = true;
    standby.muted = true;
    standby.playsInline = true;
    standby.preload = 'auto';
    standby.src = this.storyVideos[nextIndex];
    standby.load();
  }
}
