export type MobileMediaMode = 'video' | 'poster';

export interface ResponsiveImageAsset {
  desktopSrc: string;
  mobileSrc: string;
}

export interface VideoSequenceAsset {
  desktopSources: string[];
  mobileSources: string[];
  desktopPoster?: string;
  mobilePoster?: string;
  mobileMode: MobileMediaMode;
}

export interface ResponsiveVideoAsset {
  desktopSrc: string;
  mobileSrc?: string;
  desktopPoster: string;
  mobilePoster: string;
  mobileMode: MobileMediaMode;
}

export const HOME_MEDIA = {
  hero: {
    desktopSources: [
      'videos/hero/d1-desktop.mp4',
      'videos/hero/d2-desktop.mp4',
      'videos/hero/d3-desktop.mp4',
      'videos/hero/d4-desktop.mp4',
    ],
    mobileSources: [
      'videos/hero/d1-mobile.mp4',
      'videos/hero/d2-mobile.mp4',
      'videos/hero/d3-mobile.mp4',
      'videos/hero/d4-mobile.mp4',
    ],
    desktopPoster: 'images/posters/hero-desktop.webp',
    mobilePoster: 'images/posters/hero-mobile.webp',
    mobileMode: 'video',
  } satisfies VideoSequenceAsset,
  highlight: {
    desktopSrc: 'videos/blocks/home-highlight-desktop.mp4',
    desktopPoster: 'images/posters/home-highlight-desktop.webp',
    mobilePoster: 'images/posters/home-highlight-mobile.webp',
    mobileMode: 'poster',
  } satisfies ResponsiveVideoAsset,
  aboutImage: {
    desktopSrc: 'images/optimized/aboutimg-desktop.webp',
    mobileSrc: 'images/optimized/rieles-mobile.webp',
  } satisfies ResponsiveImageAsset,
  cards: [
    {
      desktopSrc: 'images/optimized/cm1-desktop.webp',
      mobileSrc: 'images/optimized/cm1-mobile.webp',
    },
    {
      desktopSrc: 'images/optimized/cm2-desktop.webp',
      mobileSrc: 'images/optimized/cm2-mobile.webp',
    },
    {
      desktopSrc: 'images/optimized/cm3-desktop.webp',
      mobileSrc: 'images/optimized/cm3-mobile.webp',
    },
    {
      desktopSrc: 'images/optimized/cm4-desktop.webp',
      mobileSrc: 'images/optimized/cm4-mobile.webp',
    },
  ] satisfies ResponsiveImageAsset[],
} as const;

export const ABOUT_MEDIA = {
  heroImage: {
    desktopSrc: 'images/optimized/npc-desktop.webp',
    mobileSrc: 'images/optimized/npc-mobile.webp',
  } satisfies ResponsiveImageAsset,
  story: {
    desktopSources: HOME_MEDIA.hero.desktopSources,
    mobileSources: HOME_MEDIA.hero.mobileSources,
    mobileMode: 'video',
  } satisfies VideoSequenceAsset,
  ctaImage: {
    desktopSrc: 'images/optimized/cm1-desktop.webp',
    mobileSrc: 'images/optimized/cm1-mobile.webp',
  } satisfies ResponsiveImageAsset,
} as const;

export const SERVICES_MEDIA = {
  coverage: {
    desktopSrc: 'videos/blocks/services-coverage-desktop.mp4',
    desktopPoster: 'images/posters/services-coverage-desktop.webp',
    mobilePoster: 'images/posters/services-coverage-mobile.webp',
    mobileMode: 'poster',
  } satisfies ResponsiveVideoAsset,
  ctaImage: {
    desktopSrc: 'images/optimized/cta-desktop.webp',
    mobileSrc: 'images/optimized/cta-mobile.webp',
  } satisfies ResponsiveImageAsset,
} as const;

export const PROCESS_MEDIA = {
  heroImage: {
    desktopSrc: 'images/optimized/cta-desktop.webp',
    mobileSrc: 'images/optimized/cta-mobile.webp',
  } satisfies ResponsiveImageAsset,
  sourcingImage: {
    desktopSrc: 'images/optimized/process1-desktop.webp',
    mobileSrc: 'images/optimized/procesrieles1-mobile.webp',
  } satisfies ResponsiveImageAsset,
  flexibilityImage: {
    desktopSrc: 'images/optimized/cm3-desktop.webp',
    mobileSrc: 'images/optimized/procesrieles2-mobile.webp',
  } satisfies ResponsiveImageAsset,
} as const;
