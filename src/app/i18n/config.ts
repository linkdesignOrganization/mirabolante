import { LocaleDictionary, RouteKey, SupportedLocale } from './types';
import {
  EN_ABOUT,
  EN_CONTACT,
  EN_HOME,
  EN_PROCESS,
  EN_SERVICES,
  ES_ABOUT,
  ES_CONTACT,
  ES_HOME,
  ES_PROCESS,
  ES_SERVICES,
} from './page-content';

export const DEFAULT_LOCALE: SupportedLocale = 'es';
export const LOCALE_STORAGE_KEY = 'mirabolante.locale';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['es', 'en'];
export const ROUTE_KEYS: RouteKey[] = [
  'home',
  'about',
  'services',
  'process',
  'contact',
];

export const ROUTE_SLUGS: Record<SupportedLocale, Record<RouteKey, string>> = {
  es: {
    home: '',
    about: 'nosotros',
    services: 'servicios',
    process: 'proceso',
    contact: 'contacto',
  },
  en: {
    home: '',
    about: 'about',
    services: 'services',
    process: 'process',
    contact: 'contact',
  },
};

export function buildLocalizedPath(locale: SupportedLocale, pageKey: RouteKey): string {
  const slug = ROUTE_SLUGS[locale][pageKey];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function buildLocalizedRoutePath(locale: SupportedLocale, pageKey: RouteKey): string {
  return buildLocalizedPath(locale, pageKey).slice(1);
}

export const DICTIONARIES: Record<SupportedLocale, LocaleDictionary> = {
  es: {
    global: {
      nav: {
        about: 'Nosotros',
        services: 'Servicios',
        products: 'Productos',
        process: 'Proceso',
        markets: 'Mercados',
        contact: 'Contacto',
        logoAlt: 'Mirabolante',
        menuOpenLabel: 'Abrir menu',
        menuCloseLabel: 'Cerrar menu',
        quickCall: 'Llamar a Mirabolante',
        quickWhatsapp: 'Escribir por WhatsApp',
        quickEmail: 'Enviar correo a Mirabolante',
      },
      footer: {
        brandTitle: 'Su socio en comercio internacional',
        brandDescription:
          'Trading house internacional especializada en materias primas e ingredientes para la industria alimentaria en Latinoamérica.',
        navigation: 'Navegación',
        navigationAria: 'Navegación del footer',
        home: 'Inicio',
        servicesAndProducts: 'Servicios y productos',
        about: 'Quiénes somos',
        contact: 'Contacto',
        products: 'Productos',
        productsAria: 'Productos del footer',
        humanConsumption: 'Consumo humano',
        animalConsumption: 'Consumo animal',
        city: 'Ciudad de Panamá, Panamá',
        copyright: 'Copyright © 2026 Mirabolante Trading & Global Food Sourcing.',
      },
      language: {
        switchLabel: 'Idioma',
        esShort: 'ES',
        enShort: 'EN',
      },
    },
    home: ES_HOME,
    about: ES_ABOUT,
    services: ES_SERVICES,
    process: ES_PROCESS,
    contact: ES_CONTACT,
  },
  en: {
    global: {
      nav: {
        about: 'About',
        services: 'Services',
        products: 'Products',
        process: 'Process',
        markets: 'Markets',
        contact: 'Contact',
        logoAlt: 'Mirabolante',
        menuOpenLabel: 'Open menu',
        menuCloseLabel: 'Close menu',
        quickCall: 'Call Mirabolante',
        quickWhatsapp: 'Chat on WhatsApp',
        quickEmail: 'Email Mirabolante',
      },
      footer: {
        brandTitle: 'Your partner in international trade',
        brandDescription:
          'International trading house specializing in raw materials and ingredients for the food industry across Latin America.',
        navigation: 'Navigation',
        navigationAria: 'Footer navigation',
        home: 'Home',
        servicesAndProducts: 'Services & Products',
        about: 'About us',
        contact: 'Contact',
        products: 'Products',
        productsAria: 'Footer products',
        humanConsumption: 'Human consumption',
        animalConsumption: 'Animal nutrition',
        city: 'Panama City, Panama',
        copyright: 'Copyright © 2026 Mirabolante Trading & Global Food Sourcing.',
      },
      language: {
        switchLabel: 'Language',
        esShort: 'ES',
        enShort: 'EN',
      },
    },
    home: EN_HOME,
    about: EN_ABOUT,
    services: EN_SERVICES,
    process: EN_PROCESS,
    contact: EN_CONTACT,
  },
};
