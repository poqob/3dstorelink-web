import { ARTICLES, Article } from '../data/blogArticles';

export type Lang = 'tr' | 'en' | 'de';

export const DOMAIN = 'https://3dstorelink.com';

export interface RouteMapping {
  tr: string;
  en: string;
  de: string;
}

export const STATIC_ROUTES: Record<string, RouteMapping> = {
  home: {
    tr: '/',
    en: '/en',
    de: '/de',
  },
  compare: {
    tr: '/karsilastirma',
    en: '/en/compare',
    de: '/de/vergleich',
  },
  glossary: {
    tr: '/sozluk',
    en: '/en/glossary',
    de: '/de/glossar',
  },
  blog: {
    tr: '/blog',
    en: '/en/blog',
    de: '/de/blog',
  },
  upload: {
    tr: '/upload',
    en: '/en/upload',
    de: '/de/upload',
  },
};

/**
 * Finds an article by any of its slugs (legacy slug or language-specific slug).
 */
export function findArticleBySlug(slug: string | null | undefined): Article | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return ARTICLES.find((a) => {
    if (a.slug.toLowerCase() === normalized) return true;
    if (a.slugs?.tr.toLowerCase() === normalized) return true;
    if (a.slugs?.en.toLowerCase() === normalized) return true;
    if (a.slugs?.de.toLowerCase() === normalized) return true;
    return false;
  });
}

/**
 * Resolves the language-appropriate slug for an article.
 */
export function getArticleSlug(article: Article, lang: Lang): string {
  return article.slugs?.[lang] || article.slug;
}

/**
 * Resolves canonical & alternate hreflangs for any given pathname.
 */
export function getAlternateUrls(pathname: string): {
  canonical: string;
  tr: string;
  en: string;
  de: string;
  xDefault: string;
  currentLang: Lang;
} {
  // Strip trailing slashes for consistency (except single /)
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  let currentLang: Lang = 'tr';
  if (cleanPath === '/en' || cleanPath.startsWith('/en/')) {
    currentLang = 'en';
  } else if (cleanPath === '/de' || cleanPath.startsWith('/de/')) {
    currentLang = 'de';
  }

  // Check static routes
  for (const mapping of Object.values(STATIC_ROUTES)) {
    if (cleanPath === mapping.tr || cleanPath === mapping.en || cleanPath === mapping.de) {
      return {
        canonical: `${DOMAIN}${mapping[currentLang]}`,
        tr: `${DOMAIN}${mapping.tr}`,
        en: `${DOMAIN}${mapping.en}`,
        de: `${DOMAIN}${mapping.de}`,
        xDefault: `${DOMAIN}${mapping.en}`,
        currentLang,
      };
    }
  }

  // Check blog article routes
  // e.g. /blog/:slug or /en/blog/:slug or /de/blog/:slug
  let slug = '';
  if (cleanPath.startsWith('/en/blog/')) {
    slug = cleanPath.replace('/en/blog/', '');
  } else if (cleanPath.startsWith('/de/blog/')) {
    slug = cleanPath.replace('/de/blog/', '');
  } else if (cleanPath.startsWith('/blog/')) {
    slug = cleanPath.replace('/blog/', '');
  }

  if (slug) {
    const article = findArticleBySlug(slug);
    if (article) {
      const trPath = `/blog/${getArticleSlug(article, 'tr')}`;
      const enPath = `/en/blog/${getArticleSlug(article, 'en')}`;
      const dePath = `/de/blog/${getArticleSlug(article, 'de')}`;

      const activePath = currentLang === 'en' ? enPath : currentLang === 'de' ? dePath : trPath;

      return {
        canonical: `${DOMAIN}${activePath}`,
        tr: `${DOMAIN}${trPath}`,
        en: `${DOMAIN}${enPath}`,
        de: `${DOMAIN}${dePath}`,
        xDefault: `${DOMAIN}${enPath}`,
        currentLang,
      };
    }
  }

  // Default fallback to home
  return {
    canonical: `${DOMAIN}${cleanPath}`,
    tr: `${DOMAIN}/`,
    en: `${DOMAIN}/en`,
    de: `${DOMAIN}/de`,
    xDefault: `${DOMAIN}/en`,
    currentLang,
  };
}

/**
 * Updates DOM head elements with correct canonical, alternate hreflangs, and html lang.
 */
export function updatePageSeoHead(pathname: string, title?: string, description?: string) {
  if (typeof document === 'undefined') return;

  const alternates = getAlternateUrls(pathname);

  // Update HTML lang attribute
  document.documentElement.lang = alternates.currentLang;

  // Title & description
  if (title) document.title = title;

  if (description) {
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', description);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }

  // Canonical tag
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', alternates.canonical);

  // Update or create hreflang links
  const hreflangs: { lang: string; href: string }[] = [
    { lang: 'tr', href: alternates.tr },
    { lang: 'en', href: alternates.en },
    { lang: 'de', href: alternates.de },
    { lang: 'x-default', href: alternates.xDefault },
  ];

  hreflangs.forEach(({ lang, href }) => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  });

  // OpenGraph URL and Locale
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', alternates.canonical);

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    const localeMap: Record<Lang, string> = {
      tr: 'tr_TR',
      en: 'en_US',
      de: 'de_DE',
    };
    ogLocale.setAttribute('content', localeMap[alternates.currentLang]);
  }
}
