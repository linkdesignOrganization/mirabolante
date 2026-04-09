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
import { BufferedVideoSequenceController } from '../../shared/media/buffered-video-sequence';
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
  @ViewChild('heroVideoPrimary') heroVideoPrimaryRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('heroVideoSecondary') heroVideoSecondaryRef!: ElementRef<HTMLVideoElement>;

  loaded = false;
  activeHeroSlot: 0 | 1 = 0;
  faqOpen: number | null = null;
  isMobileView =
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px)').matches
      : false;

  private scrollHandler?: () => void;
  private resizeHandler?: () => void;
  private readonly heroController = new BufferedVideoSequenceController({
    ...HOME_MEDIA.hero,
    onReadyChange: (ready) => {
      this.ngZone.run(() => {
        this.loaded = ready;
      });
    },
    onActiveSlotChange: (slot) => {
      this.ngZone.run(() => {
        this.activeHeroSlot = slot;
      });
    },
    onViewportChange: (isMobile) => {
      this.ngZone.run(() => {
        this.isMobileView = isMobile;
      });
    },
  });

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  toggleFaq(index: number) {
    this.faqOpen = this.faqOpen === index ? null : index;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = () => this.onScroll();
      this.resizeHandler = () => this.heroController.syncViewport();
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      window.addEventListener('resize', this.resizeHandler, { passive: true });
    });

    this.heroController.mount([
      this.heroVideoPrimaryRef.nativeElement,
      this.heroVideoSecondaryRef.nativeElement,
    ]);
  }

  ngOnDestroy() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    this.heroController.destroy();
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

  get showHighlightVideo() {
    return !this.isMobileView;
  }
}
