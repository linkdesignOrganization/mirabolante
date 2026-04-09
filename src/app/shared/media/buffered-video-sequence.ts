import type { MobileMediaMode } from './site-media';

type SlotIndex = 0 | 1;

export interface BufferedVideoSequenceOptions {
  desktopSources: string[];
  mobileSources: string[];
  mobileMode?: MobileMediaMode;
  breakpointQuery?: string;
  onReadyChange?: (ready: boolean) => void;
  onActiveSlotChange?: (slot: SlotIndex) => void;
  onViewportChange?: (isMobile: boolean) => void;
}

export class BufferedVideoSequenceController {
  private readonly breakpointQuery: string;
  private readonly mobileMode: MobileMediaMode;
  private readonly slots: HTMLVideoElement[] = [];
  private readonly slotReady = [false, false];
  private readonly slotSourceIndices = [0, 1];
  private readonly listeners: Array<() => void> = [];

  private activeSlot: SlotIndex = 0;
  private currentIndex = 0;
  private waitingForSlot: SlotIndex | null = null;
  private waitingForIndex: number | null = null;
  private isMobile = false;

  constructor(private readonly options: BufferedVideoSequenceOptions) {
    this.breakpointQuery = options.breakpointQuery ?? '(max-width: 767px)';
    this.mobileMode = options.mobileMode ?? 'video';
  }

  mount(videos: [HTMLVideoElement, HTMLVideoElement]) {
    this.slots.splice(0, this.slots.length, ...videos);

    this.slots.forEach((video, index) => {
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.autoplay = false;

      const canPlayHandler = () => this.handleCanPlay(index as SlotIndex);
      const endedHandler = () => this.handleEnded(index as SlotIndex);

      video.addEventListener('canplay', canPlayHandler);
      video.addEventListener('ended', endedHandler);

      this.listeners.push(() => {
        video.removeEventListener('canplay', canPlayHandler);
        video.removeEventListener('ended', endedHandler);
      });
    });

    this.syncViewport(true);
  }

  syncViewport(force = false) {
    const nextIsMobile = window.matchMedia(this.breakpointQuery).matches;

    if (!force && nextIsMobile === this.isMobile) {
      return;
    }

    this.isMobile = nextIsMobile;
    this.options.onViewportChange?.(this.isMobile);

    if (this.isMobile && this.mobileMode === 'poster') {
      this.clearSlots();
      this.options.onReadyChange?.(false);
      this.options.onActiveSlotChange?.(0);
      return;
    }

    this.resetSequence();
  }

  destroy() {
    this.clearSlots();
    this.listeners.forEach((dispose) => dispose());
    this.listeners.length = 0;
    this.slots.length = 0;
  }

  private get sources() {
    return this.isMobile ? this.options.mobileSources : this.options.desktopSources;
  }

  private resetSequence() {
    this.clearSlots();
    this.slotReady[0] = false;
    this.slotReady[1] = false;
    this.activeSlot = 0;
    this.currentIndex = 0;
    this.waitingForSlot = null;
    this.waitingForIndex = null;

    this.options.onReadyChange?.(false);
    this.options.onActiveSlotChange?.(0);

    this.loadSlot(0, 0);
    this.loadSlot(1, (0 + 1) % this.sources.length);
  }

  private clearSlots() {
    this.slots.forEach((video) => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
  }

  private loadSlot(slot: SlotIndex, sourceIndex: number) {
    const video = this.slots[slot];
    if (!video) {
      return;
    }

    this.slotReady[slot] = false;
    this.slotSourceIndices[slot] = sourceIndex;

    video.pause();
    video.src = this.sources[sourceIndex];
    video.load();
  }

  private handleCanPlay(slot: SlotIndex) {
    this.slotReady[slot] = true;

    if (slot === this.activeSlot && this.slotSourceIndices[slot] === this.currentIndex) {
      this.options.onReadyChange?.(true);
      this.playSlot(slot);
      return;
    }

    if (
      this.waitingForSlot === slot &&
      this.waitingForIndex !== null &&
      this.slotSourceIndices[slot] === this.waitingForIndex
    ) {
      this.activateWaitingSlot();
    }
  }

  private playSlot(slot: SlotIndex) {
    const video = this.slots[slot];
    if (!video) {
      return;
    }

    video.currentTime = 0;

    void video.play().then(() => {
      this.options.onReadyChange?.(true);
    }).catch(() => {});
  }

  private handleEnded(slot: SlotIndex) {
    if (slot !== this.activeSlot) {
      return;
    }

    const nextIndex = (this.currentIndex + 1) % this.sources.length;
    const nextSlot = slot === 0 ? 1 : 0;

    if (this.slotSourceIndices[nextSlot] !== nextIndex) {
      this.loadSlot(nextSlot, nextIndex);
    }

    if (this.slotReady[nextSlot] && this.slotSourceIndices[nextSlot] === nextIndex) {
      this.activateSlot(nextSlot, nextIndex);
      return;
    }

    this.waitingForSlot = nextSlot;
    this.waitingForIndex = nextIndex;
  }

  private activateWaitingSlot() {
    if (this.waitingForSlot === null || this.waitingForIndex === null) {
      return;
    }

    this.activateSlot(this.waitingForSlot, this.waitingForIndex);
    this.waitingForSlot = null;
    this.waitingForIndex = null;
  }

  private activateSlot(slot: SlotIndex, sourceIndex: number) {
    const previousSlot = this.activeSlot;

    this.activeSlot = slot;
    this.currentIndex = sourceIndex;
    this.options.onReadyChange?.(true);
    this.options.onActiveSlotChange?.(slot);
    this.playSlot(slot);

    const preloadIndex = (this.currentIndex + 1) % this.sources.length;
    this.loadSlot(previousSlot, preloadIndex);
  }
}
