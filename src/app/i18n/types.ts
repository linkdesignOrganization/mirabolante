export type SupportedLocale = 'es' | 'en';

export type RouteKey = 'home' | 'about' | 'services' | 'process' | 'contact';

export interface CtaCopy {
  text: string;
}

export interface FeatureCard {
  title: string;
  text: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MetricItem {
  value: string;
  labelLines: string[];
}

export interface OverviewCard {
  number: string;
  title: string;
  description: string;
}

export interface ProductCard {
  number: string;
  title: string;
  description: string;
  imageAlt?: string;
}

export interface ProductLine {
  stickyLabel: string;
  title: string;
  text: string;
  cards: ProductCard[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  quote: string;
  image: string;
  alt: string;
}

export interface HomeDictionary {
  metaTitle: string;
  hero: {
    headingBig: string;
    headingSideLines: string[];
    cta: CtaCopy;
  };
  solutions: {
    label: string;
    heading: string;
    description: string;
    cta: CtaCopy;
    items: Array<{
      title: string;
      description: string;
      alt: string;
    }>;
  };
  highlight: {
    stat: string;
    cardTitle: string;
    cardText: string;
    heading: string;
    cta: CtaCopy;
    marqueeAlts: string[];
  };
  about: {
    label: string;
    heading: string;
    text: string;
    cta: CtaCopy;
    imageAlt: string;
  };
  cards: {
    items: Array<{
      label: string;
      heading: string;
      text: string;
      imageAlt: string;
    }>;
  };
  faq: {
    title: string;
    cta: CtaCopy;
    items: FaqItem[];
  };
}

export interface ServicesDictionary {
  metaTitle: string;
  hero: {
    text: string;
    badges: string[];
    isoAlt: string;
  };
  overview: {
    label: string;
    heading: string;
    bigtext: string;
    cta: CtaCopy;
    cards: OverviewCard[];
  };
  coverage: {
    label: string;
    heading: string;
    text: string;
    items: Array<{
      title: string;
      description: string;
      alt: string;
    }>;
    card: {
      number: string;
      title: string;
      description: string;
    };
  };
  products: {
    label: string;
    heading: string;
    subtext: string;
    lines: ProductLine[];
  };
  cta: {
    imageAlt: string;
    title: string;
    text: string;
    emailLabel: string;
    phoneLabel: string;
    officeLabel: string;
    cta: CtaCopy;
  };
}

export interface ProcessDictionary {
  metaTitle: string;
  hero: {
    label: string;
    title: string;
    text: string;
    imageAlt: string;
    steps: ProcessStep[];
    card: {
      number: string;
      title: string;
      description: string;
    };
  };
  sourcing: {
    title: string;
    text: string;
    iconAlt: string;
    imageAlt: string;
  };
  logistics: {
    title: string;
    text: string;
    iconAlt: string;
    cards: OverviewCard[];
  };
  flexibility: {
    title: string;
    text: string;
    iconAlt: string;
    imageAlt: string;
  };
  traceability: {
    title: string;
    text: string;
    iconAlt: string;
    cards: OverviewCard[];
  };
  markets: {
    label: string;
    title: string;
    text: string;
    imageAlt: string;
    metrics: MetricItem[];
    cta: CtaCopy;
  };
}

export interface AboutDictionary {
  metaTitle: string;
  hero: {
    label: string;
    title: string;
    imageAlt: string;
    card: {
      number: string;
      title: string;
      text: string;
    };
  };
  intro: {
    label: string;
    title: string;
    features: FeatureCard[];
  };
  story: {
    label: string;
    title: string;
    text: string;
    metrics: MetricItem[];
    cta: CtaCopy;
  };
  team: {
    label: string;
    title: string;
    members: TeamMember[];
  };
  cta: {
    title: string;
    imageAlt: string;
    cta: CtaCopy;
  };
}

export interface FormFieldCopy {
  label: string;
  placeholder: string;
}

export interface ContactDictionary {
  metaTitle: string;
  label: string;
  title: string;
  text: string;
  details: {
    phoneLabel: string;
    phoneValue: string;
    emailLabel: string;
    emailValue: string;
    addressLabel: string;
    addressValue: string;
  };
  form: {
    fullName: FormFieldCopy;
    company: FormFieldCopy;
    phone: FormFieldCopy;
    email: FormFieldCopy;
    message: FormFieldCopy;
    submitIdle: string;
    submitBusy: string;
    successTitle: string;
    successText: string;
    errorText: string;
    subject: string;
  };
}

export interface LocaleDictionary {
  global: {
    nav: {
      about: string;
      services: string;
      products: string;
      process: string;
      markets: string;
      contact: string;
      logoAlt: string;
    };
    footer: {
      brandTitle: string;
      brandDescription: string;
      navigation: string;
      navigationAria: string;
      home: string;
      servicesAndProducts: string;
      about: string;
      contact: string;
      products: string;
      productsAria: string;
      humanConsumption: string;
      animalConsumption: string;
      city: string;
      copyright: string;
    };
    language: {
      switchLabel: string;
      esShort: string;
      enShort: string;
    };
  };
  home: HomeDictionary;
  about: AboutDictionary;
  services: ServicesDictionary;
  process: ProcessDictionary;
  contact: ContactDictionary;
}
