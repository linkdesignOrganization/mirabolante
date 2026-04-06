import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLElement>;

  loaded = false;
  private scrollHandler?: () => void;

  constructor(private ngZone: NgZone) {}

  onImageLoaded() {
    this.loaded = true;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.scrollHandler = () => this.onScroll();
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    });
  }

  ngOnDestroy() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
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
