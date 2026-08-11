import { ui, defaultLang, type Lang, type UiKey } from './ui';

/** Derive the active language from a request URL (first path segment). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg && seg in ui) return seg as Lang;
  return defaultLang;
}

/** Returns a translator `t(key)` bound to a language, falling back to default. */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Home path for a language: "/" for the default locale, "/es/" otherwise. */
export function homePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

/** The "other" language (this site has exactly two). */
export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}
