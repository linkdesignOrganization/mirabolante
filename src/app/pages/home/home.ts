import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLElement>;
  @ViewChild('heroVideo') heroVideoRef!: ElementRef<HTMLVideoElement>;

  loaded = false;
  faqOpen: number | null = null;

  private scrollHandler?: () => void;
  private isMobile = false;
  private desktopVideos = ['videos/d1.mp4', 'videos/d2.mp4', 'videos/d3.mp4', 'videos/d4.mp4'];
  private mobileVideos = ['videos/m1.mp4', 'videos/m2.mp4', 'videos/m3.mp4', 'videos/m4.mp4'];
  private currentIndex = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  private get videos(): string[] {
    return this.isMobile ? this.mobileVideos : this.desktopVideos;
  }

  onFirstPlay() {
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
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    });

    this.isMobile = window.matchMedia('(max-width: 768px)').matches;

    const video = this.heroVideoRef.nativeElement;
    video.muted = true;
    video.playsInline = true;
    video.src = this.videos[0];
    video.play();
  }

  ngOnDestroy() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  onVideoEnded() {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    const video = this.heroVideoRef.nativeElement;
    video.src = this.videos[this.currentIndex];
    video.play();
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
}
