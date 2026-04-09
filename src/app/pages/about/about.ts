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
import { BufferedVideoSequenceController } from '../../shared/media/buffered-video-sequence';
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
  @ViewChild('aboutVideoPrimary') aboutVideoPrimaryRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('aboutVideoSecondary') aboutVideoSecondaryRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('ctaMedia') ctaMediaRef!: ElementRef<HTMLElement>;
  @ViewChild('ctaImage') ctaImageRef!: ElementRef<HTMLImageElement>;

  isMobileView = false;
  storyLoaded = false;
  storyActiveSlot: 0 | 1 = 0;

  private scrollHandler?: () => void;
  private resizeHandler?: () => void;
  private rafId = 0;
  private readonly storyController = new BufferedVideoSequenceController({
    ...ABOUT_MEDIA.story,
    onReadyChange: (ready) => {
      this.ngZone.run(() => {
        this.storyLoaded = ready;
      });
    },
    onActiveSlotChange: (slot) => {
      this.ngZone.run(() => {
        this.storyActiveSlot = slot;
      });
    },
    onViewportChange: (isMobile) => {
      this.ngZone.run(() => {
        this.isMobileView = isMobile;
      });
    },
  });

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
        this.storyController.syncViewport();
      };

      window.addEventListener('scroll', queueParallax, { passive: true });
      window.addEventListener('resize', this.resizeHandler, { passive: true });

      queueParallax();
    });

    this.storyController.mount([
      this.aboutVideoPrimaryRef.nativeElement,
      this.aboutVideoSecondaryRef.nativeElement,
    ]);
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

    this.storyController.destroy();
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

  get showStoryVideo() {
    return !this.isMobileView;
  }
}
