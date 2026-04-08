import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-process',
  imports: [],
  templateUrl: './process.html',
  styleUrl: './process.scss',
})
export class Process implements AfterViewInit, OnDestroy {
  private scrollHandler?: () => void;

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef<HTMLElement>
  ) {}

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
    const sections = this.elementRef.nativeElement.querySelectorAll(
      '.about'
    ) as NodeListOf<HTMLElement>;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const bgImg = section.querySelector('.about__bg-img') as HTMLElement;
      if (!bgImg) return;

      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollProgress =
        (viewportHeight - rect.top) / (sectionHeight + viewportHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      const parallaxOffset = clampedProgress * -200;

      bgImg.style.transform = `translateY(${parallaxOffset}px)`;
    });
  }
}
