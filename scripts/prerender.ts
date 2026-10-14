import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ARTICLES, AUTHORS, Article } from '../src/data/blogArticles.ts';
import { COMPARISON_ROWS } from '../src/data/comparisonRows.ts';
import { GLOSSARY_TERMS } from '../src/data/glossaryTerms.ts';
import {
  DOMAIN,
  Lang,
  STATIC_ROUTES,
  getAlternateUrls,
  getArticleSlug,
  findArticleBySlug,
} from '../src/utils/seo.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

// Verify dist/index.html exists
const templatePath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('Error: dist/index.html not found. Please run `vite build` first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

/**
 * Escapes HTML characters.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Injects head tags and body markup into template.
 */
function buildHtmlPage(options: {
  pathname: string;
  lang: Lang;
  title: string;
  description: string;
  bodyContent: string;
  jsonLd: object;
}): string {
  const { pathname, lang, title, description, bodyContent, jsonLd } = options;
  const alternates = getAlternateUrls(pathname);

  let html = baseTemplate;

  // 1. Update <html lang="...">
  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang}"`);

  // 2. Update <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  // 3. Update <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // 4. Update OpenGraph tags
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${alternates.canonical}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );

  const localeMap: Record<Lang, string> = { tr: 'tr_TR', en: 'en_US', de: 'de_DE' };
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="${localeMap[lang]}" />`
  );

  // 5. Update Canonical & Hreflang alternates
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${alternates.canonical}" />`
  );

  // Remove existing hreflang links
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/?>\s*/gi, '');

  // Insert new hreflang links right after canonical
  const hreflangTags = `
    <link rel="alternate" hreflang="tr" href="${alternates.tr}" />
    <link rel="alternate" hreflang="en" href="${alternates.en}" />
    <link rel="alternate" hreflang="de" href="${alternates.de}" />
    <link rel="alternate" hreflang="x-default" href="${alternates.xDefault}" />`;

  html = html.replace(
    /(<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>)/i,
    `$1${hreflangTags}`
  );

  // 6. Replace JSON-LD schema
  const jsonLdScript = `\n    <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`;
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, jsonLdScript);

  // 7. Inject body markup into <div id="root">
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">\n${bodyContent}\n</div>`
  );

  return html;
}

/**
 * Generates Landing page HTML.
 */
function renderLandingBody(lang: Lang): { body: string; title: string; description: string; jsonLd: object } {
  const isTr = lang === 'tr';
  const isDe = lang === 'de';

  const homePath = isTr ? '/' : isDe ? '/de' : '/en';
  const blogPath = isTr ? '/blog' : isDe ? '/de/blog' : '/en/blog';
  const comparePath = isTr ? '/karsilastirma' : isDe ? '/de/vergleich' : '/en/compare';
  const glossaryPath = isTr ? '/sozluk' : isDe ? '/de/glossar' : '/en/glossary';

  const title = isTr
    ? '3D StoreLink | Web 3D & AR Model Dağıtım ve CAD Dönüştürme Platformu'
    : isDe
    ? '3D StoreLink | Web-3D- & AR-Modellverteilung und CAD-Konvertierung'
    : '3D StoreLink | Web 3D & AR Model Distribution and CAD Conversion Platform';

  const description = isTr
    ? '3D StoreLink: CAD ve 3D modellerinizi optimize Web GLB formatına dönüştürün. E-ticaret sitelerinize tek tıkla 3D & AR entegrasyonu sağlayın.'
    : isDe
    ? '3D StoreLink: Konvertieren Sie CAD-Modelle in optimierte Web-GLB-Formate. Einzeilige 3D- & AR-Einbettung für jeden Online-Shop.'
    : '3D StoreLink: Transform CAD and 3D models into optimized Web GLB assets. Single-line 3D & native mobile AR embed for e-commerce.';

  const body = `
  <header class="pt-24 pb-16 px-6 max-w-7xl mx-auto text-center">
    <p class="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold mb-3">
      ${isTr ? 'AR DESTEĞİ · WEB 3D · ADMİN ONAYLI' : isDe ? 'AR-UNTERSTÜTZUNG · WEB-3D · GEPRÜFTE MODELLE' : 'AR SUPPORT · WEB 3D · ADMIN APPROVED'}
    </p>
    <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6">
      ${isTr ? '3D Modellerinizi Dünyaya Açın' : isDe ? 'Bringen Sie Ihre 3D-Modelle in die Welt' : 'Bring Your 3D Models To The World'}
    </h1>
    <p class="text-lg text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
      ${description}
    </p>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <a href="${isTr ? '/upload' : isDe ? '/de/upload' : '/en/upload'}" class="px-7 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition">
        ${isTr ? 'Model Yükle' : isDe ? 'Modell hochladen' : 'Upload Model'}
      </a>
      <a href="${comparePath}" class="px-7 py-3.5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition">
        ${isTr ? 'Teknik Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison'}
      </a>
      <a href="${blogPath}" class="px-7 py-3.5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition">
        Blog & Rehber
      </a>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-6 py-12">
    <!-- Key Technical Capabilities -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      <div class="p-8 rounded-3xl bg-[#0c0c0e]/80 border border-white/10">
        <span class="text-xs font-mono text-emerald-400 font-bold block mb-2">&lt; 30 sn</span>
        <h2 class="text-xl font-bold text-white mb-3">${isTr ? 'Sıfır Bağımlılıkla Doğrudan WebGL' : isDe ? 'Zero-Dependency Sofort-WebGL' : 'Zero-Dependency Instant WebGL'}</h2>
        <p class="text-sm text-zinc-400 leading-relaxed mb-4">
          ${isTr ? 'Shopify, WooCommerce veya özel web sitelerine tek satır iframe koduyla entegre edin. Harici SDK veya mobil uygulama gerekmez.' : isDe ? 'In Shopify, WooCommerce oder eigene Shops mit einer einzigen Codezeile einbetten. Keine Plugins oder Apps nötig.' : 'Embed seamlessly into Shopify, WooCommerce, or custom web portals with a single line of iframe. Zero external SDKs required.'}
        </p>
        <ul class="text-xs text-zinc-300 space-y-1.5" role="list">
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> ${isTr ? 'Entegrasyon Hızı: < 30 Saniye' : isDe ? 'Integrationszeit: < 30 Sek.' : 'Embed Speed: < 30 Seconds'}</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> ${isTr ? 'Harici Bağımlılık: Sıfır Eklenti' : isDe ? 'Abhängigkeiten: 0 Plugins' : 'Dependencies: Zero Plugins'}</li>
        </ul>
      </div>

      <div class="p-8 rounded-3xl bg-[#0c0c0e]/80 border border-white/10">
        <span class="text-xs font-mono text-emerald-400 font-bold block mb-2">1:1 AR</span>
        <h2 class="text-xl font-bold text-white mb-3">${isTr ? 'Uygulamasız Yerleşik Mobil AR' : isDe ? 'App-freies natives mobiles AR' : 'Zero-App Native Mobile AR'}</h2>
        <p class="text-sm text-zinc-400 leading-relaxed mb-4">
          ${isTr ? 'Apple Quick Look (USDZ) ve Google SceneViewer (GLB) ile tüketiciler ürünleri odalarında 1:1 ölçekte incelesin.' : isDe ? 'Apple Quick Look (USDZ) und Google SceneViewer (GLB) ermöglichen maßstabsgetreue 1:1 Produktansicht direkt im Raum.' : 'Native Apple Quick Look and Google SceneViewer support allow customers to view products in true 1:1 scale in their room.'}
        </p>
        <ul class="text-xs text-zinc-300 space-y-1.5" role="list">
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> ${isTr ? 'Dönüşüm Artışı: +%94 Satış Etkisi' : isDe ? 'Conversion-Steigerung: +94%' : 'Conversion Lift: +94% Sales'}</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> ${isTr ? 'İade Azalması: -%40 Boyut Netliği' : isDe ? 'Retourensenkung: Bis zu -40%' : 'Return Reduction: Up to -40%'}</li>
        </ul>
      </div>

      <div class="p-8 rounded-3xl bg-[#0c0c0e]/80 border border-white/10">
        <span class="text-xs font-mono text-emerald-400 font-bold block mb-2">%85-95 Sıkıştırma</span>
        <h2 class="text-xl font-bold text-white mb-3">${isTr ? 'Draco & Meshopt Geometrik Sıkıştırma' : isDe ? 'Automatische Kompression & 60 FPS' : 'Automated Mesh Compression & 60 FPS'}</h2>
        <p class="text-sm text-zinc-400 leading-relaxed mb-4">
          ${isTr ? 'Endüstriyel CAD dosyaları (STEP, STP, STL) ve ağır modeller Draco algoritmalarıyla %85-95 sıkıştırılır; mobilde 60 FPS çalışır.' : isDe ? 'Industrielle CAD-Dateien (STEP, STP, STL) werden per Draco um 85–95% komprimiert bei flüssigen 60 FPS.' : 'Industrial CAD files (STEP, STP, STL) are automatically optimized using Draco & Meshopt, delivering steady 60 FPS.'}
        </p>
        <ul class="text-xs text-zinc-300 space-y-1.5" role="list">
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> ${isTr ? 'Format Desteği: STEP, STP, STL, OBJ, GLB' : isDe ? 'CAD-Formate: STEP, STP, STL, OBJ, GLB' : 'CAD Formats: STEP, STP, STL, OBJ, GLB'}</li>
          <li class="flex items-center gap-2"><span class="text-emerald-400">✓</span> ${isTr ? 'Performans: 60 FPS Akıcı Render' : isDe ? 'Leistung: Flüssige 60 FPS' : 'Performance: Fluid 60 FPS'}</li>
        </ul>
      </div>
    </section>

    <!-- FAQ Section (AEO) -->
    <section class="mb-20 max-w-4xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">
        ${isTr ? 'Sıkça Sorulan Sorular' : isDe ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
      </h2>
      <div class="space-y-4">
        <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
          <h3 class="text-base font-bold text-white mb-2">${isTr ? '3D StoreLink hangi 3D ve CAD dosya formatlarını destekler?' : isDe ? 'Welche 3D- und CAD-Dateiformate werden unterstützt?' : 'Which 3D and CAD file formats are supported?'}</h3>
          <p class="text-sm text-zinc-400 leading-relaxed">${isTr ? '3D StoreLink; STEP (.step, .stp), STL, OBJ ve standart glTF/GLB (.glb, .gltf) formatlarını tam destekler ve optimize Web GLB formatına dönüştürür.' : isDe ? '3D StoreLink unterstützt STEP (.step, .stp), STL, OBJ und GLB/glTF und konvertiert sie automatisch in optimierte Web-GLB-Dateien.' : '3D StoreLink supports STEP (.step, .stp), STL, OBJ, and glTF/GLB, automatically optimizing them into lightweight Web GLB.'}</p>
        </div>
        <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
          <h3 class="text-base font-bold text-white mb-2">${isTr ? 'Kullanıcıların AR deneyimi için uygulama indirmesi gerekir mi?' : isDe ? 'Müssen Kunden eine App für AR herunterladen?' : 'Do customers need to download an app for Augmented Reality?'}</h3>
          <p class="text-sm text-zinc-400 leading-relaxed">${isTr ? 'Hayır. iOS Safari\'de Apple Quick Look (USDZ) ve Android Chrome\'da Google SceneViewer ile hiçbir uygulama indirmeden 1:1 ölçekte AR çalışır.' : isDe ? 'Nein. Auf iOS läuft Apple Quick Look und auf Android Google SceneViewer direkt im mobilen Browser ohne App-Download.' : 'No app required. 3D StoreLink utilizes native Apple Quick Look (iOS) and Google SceneViewer (Android) directly from mobile browsers.'}</p>
        </div>
        <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
          <h3 class="text-base font-bold text-white mb-2">${isTr ? 'Modeli e-ticaret siteme nasıl entegre ederim?' : isDe ? 'Wie binde ich Modelle in meinen Shop ein?' : 'How do I embed 3D models into Shopify or WooCommerce?'}</h3>
          <p class="text-sm text-zinc-400 leading-relaxed">${isTr ? 'Model onaylandıktan sonra oluşturulan tek satırlık iframe kodunu ürün sayfanızın HTML bloğuna yapıştırmanız yeterlidir. Süreç 30 saniyeden kısa sürer.' : isDe ? 'Kopieren Sie den einzeiligen Iframe-Code und fügen Sie ihn in Ihr Shop-Template ein. Die Integration dauert unter 30 Sekunden.' : 'Simply paste the single-line iframe embed snippet into your product description or custom HTML block. Takes under 30 seconds.'}</p>
        </div>
      </div>
    </section>
  </main>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${DOMAIN}/#website`,
        url: DOMAIN,
        name: '3D StoreLink',
        description,
        inLanguage: lang,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${DOMAIN}/#software`,
        name: '3D StoreLink',
        url: `${DOMAIN}${homePath}`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: isTr
          ? [
              'Otomatik CAD (STP/STEP/STL/OBJ) to Web GLB Dönüştürme',
              'Eklentisiz Web 3D Model Görüntüleyici',
              'iOS Quick Look (USDZ) ve Android SceneViewer ile Doğal AR Desteği',
              'E-Ticaret İçin Tek Satır Iframe Embed',
              'Draco ve Geometrik Mesh Sıkıştırma Pipeline',
            ]
          : isDe
          ? [
              'Automatische CAD (STP/STEP/STL/OBJ) zu Web-GLB-Konvertierung',
              'Plugin-freier Web-3D-Viewer',
              'iOS Quick Look (USDZ) & Android SceneViewer Web-AR',
              'Einzeiliger Iframe-Embed für E-Commerce',
              'Draco-Mesh-Komprimierung',
            ]
          : [
              'Automated CAD (STP/STEP/STL/OBJ) to Web GLB Conversion',
              'Zero-Plugin Web 3D Model Viewer',
              'Native iOS Quick Look (USDZ) & Android SceneViewer AR',
              'Single-Line Iframe Embed for E-Commerce',
              'Draco Geometric Mesh Compression Pipeline',
            ],
      },
      {
        '@type': 'Organization',
        '@id': `${DOMAIN}/#organization`,
        name: '3D StoreLink',
        url: `${DOMAIN}${homePath}`,
        logo: `${DOMAIN}/brand.png`,
        sameAs: [
          'https://www.linkedin.com/company/3dstorelink/',
          'https://www.instagram.com/3dstorelink/',
          'https://www.dagsolution.com',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@3dstorelink.com',
          contactType: 'customer service',
          availableLanguage: ['Turkish', 'English', 'German'],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isTr
              ? '3D StoreLink hangi 3D ve CAD dosya formatlarını destekler?'
              : isDe
              ? 'Welche 3D- und CAD-Dateiformate werden unterstützt?'
              : 'Which 3D and CAD file formats are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isTr
                ? '3D StoreLink; STEP (.step, .stp), STL, OBJ ve standart glTF/GLB (.glb, .gltf) formatlarını tam destekler ve optimize Web GLB formatına dönüştürür.'
                : isDe
                ? '3D StoreLink unterstützt STEP (.step, .stp), STL, OBJ und GLB/glTF und konvertiert sie automatisch in optimierte Web-GLB-Dateien.'
                : '3D StoreLink supports STEP (.step, .stp), STL, OBJ, and glTF/GLB, automatically optimizing them into lightweight Web GLB.',
            },
          },
          {
            '@type': 'Question',
            name: isTr
              ? 'Kullanıcıların AR deneyimi için uygulama indirmesi gerekir mi?'
              : isDe
              ? 'Müssen Kunden eine App für AR herunterladen?'
              : 'Do customers need to download an app for Augmented Reality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isTr
                ? 'Hayır. iOS Safari\'de Apple Quick Look (USDZ) ve Android Chrome\'da Google SceneViewer ile hiçbir uygulama indirmeden 1:1 ölçekte AR çalışır.'
                : isDe
                ? 'Nein. Auf iOS läuft Apple Quick Look und auf Android Google SceneViewer direkt im mobilen Browser ohne App-Download.'
                : 'No app required. 3D StoreLink utilizes native Apple Quick Look (iOS) and Google SceneViewer (Android) directly from mobile browsers.',
            },
          },
          {
            '@type': 'Question',
            name: isTr
              ? 'Modeli e-ticaret siteme nasıl entegre ederim?'
              : isDe
              ? 'Wie binde ich Modelle in meinen Shop ein?'
              : 'How do I embed 3D models into Shopify or WooCommerce?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isTr
                ? 'Model onaylandıktan sonra oluşturulan tek satırlık iframe kodunu ürün sayfanızın HTML bloğuna yapıştırmanız yeterlidir. Süreç 30 saniyeden kısa sürer.'
                : isDe
                ? 'Kopieren Sie den einzeiligen Iframe-Code und fügen Sie ihn in Ihr Shop-Template ein. Die Integration dauert unter 30 Sekunden.'
                : 'Simply paste the single-line iframe embed snippet into your product description or custom HTML block. Takes under 30 seconds.',
            },
          },
        ],
      },
    ],
  };

  return { body, title, description, jsonLd };
}

/**
 * Generates Blog Hub page HTML.
 */
function renderBlogHubBody(lang: Lang): { body: string; title: string; description: string; jsonLd: object } {
  const isTr = lang === 'tr';
  const isDe = lang === 'de';

  const homePath = isTr ? '/' : isDe ? '/de' : '/en';
  const blogPath = isTr ? '/blog' : isDe ? '/de/blog' : '/en/blog';

  const title = isTr
    ? '3D StoreLink Rehber & Blog | Web 3D, CAD & AR Mimarisi'
    : isDe
    ? '3D StoreLink Leitfaden & Blog | Web-3D-, CAD- & AR-Architektur'
    : '3D StoreLink Guides & Blog | Web 3D, CAD & AR Engineering';

  const description = isTr
    ? 'Endüstriyel CAD dönüşümü (STEP/STP), WebGL & GLB optimizasyonu, 1:1 artırılmış gerçeklik (AR) ve e-ticaret dönüşüm telemetrisi üzerine derinlemesine mühendislik analizleri.'
    : isDe
    ? 'Tiefgehende technische Analysen zu CAD-Konvertierung (STEP/STP), WebGL-Draco-Optimierung, 1:1 mobiler AR und E-Commerce-Conversion.'
    : 'Engineering deep dives into CAD streaming, automated WebGL optimization, zero-app 1:1 mobile AR, and empirical e-commerce conversion telemetry.';

  const articlesHtml = ARTICLES.map((art) => {
    const slug = getArticleSlug(art, lang);
    const artUrl = isTr ? `/blog/${slug}` : isDe ? `/de/blog/${slug}` : `/en/blog/${slug}`;
    const takeaways = art.keyTakeaways[lang]?.slice(0, 3) || [];

    return `
    <article class="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-zinc-400/40 mb-8 transition">
      <div class="flex items-center gap-2 text-xs text-zinc-400 mb-3 font-medium">
        <span class="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-200 font-bold">${escapeHtml(art.category[lang])}</span>
        <span>•</span>
        <span>${escapeHtml(art.readTime[lang])}</span>
        <span>•</span>
        <time datetime="${art.date.iso}">${escapeHtml(art.date[lang])}</time>
      </div>

      <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-3">
        <a href="${artUrl}" class="hover:underline underline-offset-4">${escapeHtml(art.title[lang])}</a>
      </h2>

      <p class="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">
        ${escapeHtml(art.desc[lang])}
      </p>

      <ul class="space-y-2 mb-6 text-xs sm:text-sm text-zinc-300 font-medium" role="list">
        ${takeaways
          .map(
            (t) => `
        <li class="flex items-start gap-2.5">
          <svg class="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          <span class="leading-snug">${escapeHtml(t)}</span>
        </li>`
          )
          .join('')}
      </ul>

      <div class="flex items-center justify-between pt-6 border-t border-white/5">
        <div class="text-xs text-zinc-400">
          <span class="font-bold text-white block">${art.authors.map((a) => a.name).join(' & ')}</span>
          <span class="text-[11px] text-zinc-500">${art.authors.map((a) => a.role).join(' · ')}</span>
        </div>
        <a href="${artUrl}" class="font-bold text-sm text-zinc-300 hover:text-white transition flex items-center gap-1.5">
          <span>${isTr ? 'Rehberi Oku' : isDe ? 'Leitfaden Lesen' : 'Read Guide'}</span>
          <span>→</span>
        </a>
      </div>
    </article>`;
  }).join('\n');

  const body = `
  <header class="pt-32 pb-14 px-6 border-b border-white/5 max-w-5xl mx-auto text-center">
    <p class="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold mb-3">
      ${isTr ? '3D STORELINK MÜHENDİSLİK & BİLGİ MERKEZİ' : isDe ? '3D STORELINK ENGINEERING & WISSEN' : '3D STORELINK ENGINEERING & KNOWLEDGE HUB'}
    </p>
    <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
      ${isTr ? '3D StoreLink Rehber & Blog' : isDe ? '3D StoreLink Leitfaden & Blog' : '3D StoreLink Guides & Blog'}
    </h1>
    <p class="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
      ${description}
    </p>
  </header>

  <main class="max-w-5xl mx-auto px-6 py-12">
    <!-- Authors (E-E-A-T) -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
      <div class="p-6 rounded-3xl bg-[#0c0c0e]/80 border border-white/10 flex items-start gap-4">
        <img src="${AUTHORS.mustafa.avatar}" alt="${AUTHORS.mustafa.name}" class="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/15" />
        <div>
          <h2 class="text-base font-bold text-white">${AUTHORS.mustafa.name}</h2>
          <span class="text-xs text-zinc-400 font-medium block mb-1.5">${AUTHORS.mustafa.role}</span>
          <p class="text-xs text-zinc-400 leading-relaxed">${AUTHORS.mustafa.bio}</p>
        </div>
      </div>
      <div class="p-6 rounded-3xl bg-[#0c0c0e]/80 border border-white/10 flex items-start gap-4">
        <img src="${AUTHORS.akin.avatar}" alt="${AUTHORS.akin.name}" class="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/15" />
        <div>
          <h2 class="text-base font-bold text-white">${AUTHORS.akin.name}</h2>
          <span class="text-xs text-zinc-400 font-medium block mb-1.5">${AUTHORS.akin.role}</span>
          <p class="text-xs text-zinc-400 leading-relaxed">${AUTHORS.akin.bio}</p>
        </div>
      </div>
    </section>

    <!-- Articles List -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-white">${isTr ? 'Yayınlanan Mühendislik Rehberleri' : isDe ? 'Veröffentlichte Leitfäden' : 'Published Engineering Guides'}</h2>
        <span class="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">${ARTICLES.length} ${isTr ? 'Yayın' : 'Guides'}</span>
      </div>
      ${articlesHtml}
    </section>
  </main>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home', item: `${DOMAIN}${homePath}` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${DOMAIN}${blogPath}` },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: title,
        description,
        hasPart: ARTICLES.map((art) => ({
          '@type': 'BlogPosting',
          headline: art.title[lang],
          url: `${DOMAIN}${isTr ? `/blog/${getArticleSlug(art, lang)}` : isDe ? `/de/blog/${getArticleSlug(art, lang)}` : `/en/blog/${getArticleSlug(art, lang)}`}`,
        })),
      },
    ],
  };

  return { body, title, description, jsonLd };
}

/**
 * Generates Article page HTML.
 */
function renderArticleBody(article: Article, lang: Lang): { body: string; title: string; description: string; jsonLd: object } {
  const isTr = lang === 'tr';
  const isDe = lang === 'de';

  const homePath = isTr ? '/' : isDe ? '/de' : '/en';
  const blogPath = isTr ? '/blog' : isDe ? '/de/blog' : '/en/blog';
  const slug = getArticleSlug(article, lang);
  const articlePath = isTr ? `/blog/${slug}` : isDe ? `/de/blog/${slug}` : `/en/blog/${slug}`;
  const articleUrl = `${DOMAIN}${articlePath}`;

  const title = `${article.title[lang]} | 3D StoreLink`;
  const description = article.desc[lang];

  const takeaways = article.keyTakeaways[lang] || [];

  const sectionsHtml = article.sections
    .map((sec) => {
      const heading = escapeHtml(sec.heading[lang]);
      const paragraphs = sec.paragraphs[lang]?.map((p) => `<p class="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">${escapeHtml(p)}</p>`).join('\n') || '';

      let tableHtml = '';
      if (sec.table) {
        const headers = sec.table.headers[lang] || [];
        const rows = sec.table.rows[lang] || [];
        tableHtml = `
        <div class="overflow-x-auto rounded-2xl border border-white/10 my-8">
          <table class="w-full text-left border-collapse text-sm">
            <thead class="bg-white/5 border-b border-white/10">
              <tr>${headers.map((h) => `<th class="py-3 px-4 font-semibold text-white">${escapeHtml(h)}</th>`).join('')}</tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${rows.map((row) => `<tr>${row.map((cell) => `<td class="py-3 px-4 text-zinc-300">${escapeHtml(cell)}</td>`).join('')}</tr>`).join('\n')}
            </tbody>
          </table>
        </div>`;
      }

      let codeHtml = '';
      if (sec.codeSnippet) {
        codeHtml = `<pre class="bg-black/80 border border-white/10 rounded-2xl p-5 my-6 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-200"><code>${escapeHtml(sec.codeSnippet)}</code></pre>`;
      }

      return `
      <section id="${sec.id}" class="mb-14 scroll-mt-28">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight">${heading}</h2>
        ${paragraphs}
        ${tableHtml}
        ${codeHtml}
      </section>`;
    })
    .join('\n');

  const faqHtml =
    article.faq && article.faq.length > 0
      ? `
    <section class="mt-16 pt-10 border-t border-white/10">
      <h2 class="text-2xl font-bold text-white mb-6">${isTr ? 'Sıkça Sorulan Sorular' : isDe ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}</h2>
      <div class="space-y-4">
        ${article.faq
          .map(
            (f) => `
        <div class="p-5 rounded-2xl bg-[#0c0c0e]/80 border border-white/10">
          <h3 class="font-bold text-white text-base mb-2">${escapeHtml(f.q[lang])}</h3>
          <p class="text-zinc-400 text-sm leading-relaxed">${escapeHtml(f.a[lang])}</p>
        </div>`
          )
          .join('\n')}
      </div>
    </section>`
      : '';

  const body = `
  <article class="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
    <nav class="flex items-center gap-2 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
      <a href="${homePath}" class="hover:text-white transition">${isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}</a>
      <span>/</span>
      <a href="${blogPath}" class="hover:text-white transition">Blog</a>
      <span>/</span>
      <span class="text-zinc-300 truncate max-w-md">${escapeHtml(article.title[lang])}</span>
    </nav>

    <header class="mb-12">
      <div class="flex items-center gap-2 text-xs text-zinc-400 mb-4 font-medium">
        <span class="px-3 py-1 rounded-full bg-white/10 text-white font-bold">${escapeHtml(article.category[lang])}</span>
        <span>•</span>
        <span>${escapeHtml(article.readTime[lang])}</span>
        <span>•</span>
        <time datetime="${article.date.iso}">${escapeHtml(article.date[lang])}</time>
      </div>

      <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
        ${escapeHtml(article.title[lang])}
      </h1>

      <p class="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-8">
        ${escapeHtml(article.desc[lang])}
      </p>

      <!-- Key Takeaways Box (GEO Priority) -->
      ${
        takeaways.length > 0
          ? `
      <div class="p-6 rounded-3xl bg-[#0c0c0e]/95 border border-white/15 my-8">
        <h3 class="text-xs uppercase tracking-wider font-mono font-bold text-zinc-300 mb-4 flex items-center gap-2">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          ${isTr ? 'Önemli Çıkarımlar & Teknik Bulgular' : isDe ? 'Wichtigste Erkenntnisse' : 'Key Takeaways & Empirical Telemetry'}
        </h3>
        <ul class="space-y-3 text-xs sm:text-sm text-zinc-300" role="list">
          ${takeaways
            .map(
              (t) => `
          <li class="flex items-start gap-2.5">
            <span class="text-emerald-400 font-bold">✓</span>
            <span class="leading-relaxed">${escapeHtml(t)}</span>
          </li>`
            )
            .join('')}
        </ul>
      </div>`
          : ''
      }
    </header>

    <!-- Article Sections -->
    <main>
      ${sectionsHtml}
      ${faqHtml}
    </main>

    <footer class="mt-14 pt-8 border-t border-white/10 flex items-center justify-between">
      <a href="${blogPath}" class="text-sm font-bold text-zinc-400 hover:text-white transition">
        ← ${isTr ? 'Tüm Rehberlere Dön' : isDe ? 'Zurück zur Übersicht' : 'Back to All Guides'}
      </a>
      <a href="${isTr ? '/upload' : isDe ? '/de/upload' : '/en/upload'}" class="px-5 py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-200 transition">
        ${isTr ? 'Model Test Et →' : isDe ? 'Modell testen →' : 'Test Model →'}
      </a>
    </footer>
  </article>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home', item: `${DOMAIN}${homePath}` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${DOMAIN}${blogPath}` },
          { '@type': 'ListItem', position: 3, name: article.title[lang], item: articleUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: article.title[lang],
        description: article.desc[lang],
        inLanguage: lang,
        datePublished: article.date.iso,
        mainEntityOfPage: articleUrl,
        author: article.authors.map((auth) => ({
          '@type': 'Person',
          name: auth.name,
          jobTitle: auth.role,
        })),
        publisher: {
          '@type': 'Organization',
          name: '3D StoreLink',
          logo: { '@type': 'ImageObject', url: `${DOMAIN}/brand.png` },
        },
      },
      ...(article.faq && article.faq.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: article.faq.map((f) => ({
                '@type': 'Question',
                name: f.q[lang],
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a[lang],
                },
              })),
            },
          ]
        : []),
    ],
  };

  return { body, title, description, jsonLd };
}

/**
 * Generates Comparison Page HTML.
 */
function renderComparisonBody(lang: Lang): { body: string; title: string; description: string; jsonLd: object } {
  const isTr = lang === 'tr';
  const isDe = lang === 'de';

  const title = isTr
    ? '3D StoreLink vs Sketchfab & 2D | 2026 Teknik Karşılaştırma Matrisi'
    : isDe
    ? '3D StoreLink vs Sketchfab & 2D | 2026 Technischer Vergleich'
    : '3D StoreLink vs Sketchfab & Traditional 2D | 2026 Technical Benchmark';

  const description = isTr
    ? 'E-ticaret ve endüstriyel ürün üreticileri için Web 3D & AR çözümlerini kıyaslıyoruz. Neden modern markalar 3D StoreLink tercih ediyor?'
    : isDe
    ? 'Vergleich moderner Web-3D- und AR-Lösungen für E-Commerce und Industrieunternehmen.'
    : 'Evaluating Web 3D & AR solutions for e-commerce and industrial manufacturing. Why modern storefronts choose 3D StoreLink.';

  const rowsHtml = COMPARISON_ROWS.map(
    (r) => `
    <tr class="hover:bg-white/[0.02] transition">
      <td class="py-5 px-6 font-medium text-white">${escapeHtml(r.feature[lang])}</td>
      <td class="py-5 px-6 border-x border-white/15 bg-white/[0.03] text-zinc-100 font-semibold">${escapeHtml(r.storelink[lang])}</td>
      <td class="py-5 px-6 text-zinc-300">${escapeHtml(r.sketchfab[lang])}</td>
      <td class="py-5 px-6 text-zinc-500">${escapeHtml(r.trad2d[lang])}</td>
    </tr>`
  ).join('\n');

  const body = `
  <header class="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
    <p class="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold mb-3">
      ${isTr ? 'TEKNİK BENCHMARK & KARŞILAŞTIRMA' : isDe ? 'TECHNISCHER BENCHMARK & VERGLEICH' : 'TECHNICAL BENCHMARK & COMPARISON'}
    </p>
    <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
      3D StoreLink vs Sketchfab & ${isTr ? 'Geleneksel 2D Fotoğraflar' : isDe ? 'Klassische 2D-Fotos' : 'Traditional 2D Photos'}
    </h1>
    <p class="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
      ${description}
    </p>
  </header>

  <main class="px-6 pb-20 max-w-7xl mx-auto">
    <div class="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl">
      <table class="w-full text-left border-collapse text-sm">
        <thead>
          <tr class="border-b border-white/10 bg-white/[0.04]">
            <th class="py-5 px-6 font-semibold text-zinc-300 w-1/4">${isTr ? 'Kriter / Özellik' : isDe ? 'Kriterium / Feature' : 'Capability / Feature'}</th>
            <th class="py-5 px-6 font-bold text-white bg-white/10 border-x border-white/20 w-1/3">3D StoreLink (3D & AR)</th>
            <th class="py-5 px-6 font-semibold text-zinc-300 w-1/4">Sketchfab</th>
            <th class="py-5 px-6 font-semibold text-zinc-400 w-1/4">${isTr ? 'Geleneksel 2D Fotoğraf' : isDe ? 'Klassisches 2D' : 'Traditional 2D'}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  </main>
  `;

  const homePath = isTr ? '/' : isDe ? '/de' : '/en';
  const comparePath = isTr ? '/karsilastirma' : isDe ? '/de/vergleich' : '/en/compare';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home', item: `${DOMAIN}${homePath}` },
          { '@type': 'ListItem', position: 2, name: isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison', item: `${DOMAIN}${comparePath}` },
        ],
      },
      {
        '@type': 'WebPage',
        name: title,
        description,
        url: `${DOMAIN}${comparePath}`,
        mainEntity: {
          '@type': 'Table',
          about: '3D StoreLink vs Sketchfab vs Traditional 2D E-commerce Comparison',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isTr
              ? '3D StoreLink ile Sketchfab arasındaki temel fark nedir?'
              : isDe
              ? 'Was ist der Hauptunterschied zwischen 3D StoreLink und Sketchfab?'
              : 'What is the main difference between 3D StoreLink and Sketchfab?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isTr
                ? 'Sketchfab genel bir 3D topluluk ve pazar yeridir. 3D StoreLink ise e-ticaret ve endüstriyel üreticiler için doğrudan CAD (STEP/STP) dönüşümü, hafif tek satır iframe embed ve yerleşik mobil AR odaklı ticari bir platformdur.'
                : isDe
                ? 'Sketchfab ist ein allgemeiner Marktplatz. 3D StoreLink ist auf direkte CAD-Konvertierung (STEP/STP), schlanke Iframe-Einbettung und native Web-AR für E-Commerce spezialisiert.'
                : 'While Sketchfab is a generalized 3D community and asset marketplace, 3D StoreLink specializes in automated industrial CAD conversion (STEP/STP), lightweight single-line iframe embeds, and native mobile AR tailored for commercial e-commerce.',
            },
          },
          {
            '@type': 'Question',
            name: isTr
              ? '3D ve AR görselleri e-ticaret satışlarını ve iadeleri nasıl etkiler?'
              : isDe
              ? 'Wie beeinflussen 3D und AR Verkaufszahlen und Retouren?'
              : 'How do 3D and AR visuals impact e-commerce sales and return rates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isTr
                ? 'Gerçek ölçekli 3D ve 1:1 AR inceleme, sepete ekleme ve dönüşüm oranlarını ortalama %94 artırırken, boyut ve doku belirsizliğini ortadan kaldırarak iade oranlarını %40 oranında düşürür.'
                : isDe
                ? 'Maßstabsgetreue 1:1 AR-Ansichten steigern die Kauf-Conversion um bis zu 94% und senken teure Produktrücksendungen um bis zu 40%.'
                : 'True 1:1 scale mobile AR preview increases add-to-cart conversions by up to 94% while eliminating spatial and aesthetic uncertainty, cutting product returns by up to 40%.',
            },
          },
        ],
      },
    ],
  };

  return { body, title, description, jsonLd };
}

/**
 * Generates Glossary Page HTML.
 */
function renderGlossaryBody(lang: Lang): { body: string; title: string; description: string; jsonLd: object } {
  const isTr = lang === 'tr';
  const isDe = lang === 'de';

  const homePath = isTr ? '/' : isDe ? '/de' : '/en';
  const glossaryPath = isTr ? '/sozluk' : isDe ? '/de/glossar' : '/en/glossary';

  const title = isTr
    ? '3D & CAD Mühendislik Terimleri Sözlüğü | 3D StoreLink Kılavuzu'
    : isDe
    ? '3D & CAD Engineering Glossar | 3D StoreLink Leitfaden'
    : '3D & CAD Engineering Glossary | 3D StoreLink Guide';

  const description = isTr
    ? 'Endüstriyel CAD dönüşümü, WebGL render, Apple Quick Look AR ve Draco optimizasyonu hakkında A\'dan Z\'ye teknik kavramlar ve doğrudan tanımlar.'
    : isDe
    ? 'A bis Z Definitionen zu industrieller CAD-Konvertierung, WebGL, Apple Quick Look AR und Draco-Mesh-Kompression.'
    : 'A-to-Z technical definitions and reference concepts covering CAD conversion, WebGL, mobile AR engines, and Draco geometry compression.';

  const termsHtml = GLOSSARY_TERMS.map(
    (t) => `
    <div class="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
      <div class="flex items-center gap-3 mb-2">
        <h2 class="text-xl font-bold text-white">${escapeHtml(t.term)}</h2>
        <span class="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">${t.category}</span>
      </div>
      <p class="text-zinc-300 text-sm leading-relaxed mb-3">${escapeHtml(t.definition[lang])}</p>
      <p class="text-zinc-500 text-xs leading-relaxed border-t border-white/5 pt-2">${escapeHtml(t.details[lang])}</p>
    </div>`
  ).join('\n');

  const body = `
  <header class="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center">
    <p class="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold mb-3">
      ${isTr ? '3D & CAD MÜHENDİSLİK KILAVUZU' : isDe ? '3D & CAD ENGINEERING GLOSSAR' : '3D & CAD ENGINEERING GLOSSARY'}
    </p>
    <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
      ${isTr ? '3D, CAD ve AR Terimleri Sözlüğü' : isDe ? '3D-, CAD- & AR-Fachbegriffe Glossar' : '3D, CAD & Web AR Terminology Glossary'}
    </h1>
    <p class="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
      ${description}
    </p>
  </header>

  <main class="max-w-5xl mx-auto px-6 pb-20">
    <section>
      ${termsHtml}
    </section>
  </main>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home', item: `${DOMAIN}${homePath}` },
          { '@type': 'ListItem', position: 2, name: isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary', item: `${DOMAIN}${glossaryPath}` },
        ],
      },
      {
        '@type': 'DefinedTermSet',
        name: title,
        description,
        url: `${DOMAIN}${glossaryPath}`,
        hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.definition[lang],
          inLanguage: lang,
        })),
      },
    ],
  };

  return { body, title, description, jsonLd };
}

/**
 * Main Prerender Execution.
 */
function prerenderAll() {
  console.log('🚀 Starting Pre-rendering Pipeline for 3D StoreLink...');
  let pagesCount = 0;

  function writeRoute(routePath: string, lang: Lang, renderFn: () => { body: string; title: string; description: string; jsonLd: object }) {
    const { body, title, description, jsonLd } = renderFn();
    const fullHtml = buildHtmlPage({
      pathname: routePath,
      lang,
      title,
      description,
      bodyContent: body,
      jsonLd,
    });

    // Determine target file path
    // e.g. "/" -> "dist/index.html"
    // e.g. "/en" -> "dist/en/index.html"
    // e.g. "/blog/slug" -> "dist/blog/slug/index.html"
    let targetFile = '';
    if (routePath === '/') {
      targetFile = path.join(DIST_DIR, 'index.html');
    } else {
      const clean = routePath.startsWith('/') ? routePath.slice(1) : routePath;
      targetFile = path.join(DIST_DIR, clean, 'index.html');
    }

    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, fullHtml, 'utf-8');
    pagesCount++;
    console.log(` ✓ [${lang.toUpperCase()}] ${routePath} -> ${path.relative(DIST_DIR, targetFile)}`);
  }

  const langs: Lang[] = ['tr', 'en', 'de'];

  // 1. Landing Pages
  writeRoute('/', 'tr', () => renderLandingBody('tr'));
  writeRoute('/en', 'en', () => renderLandingBody('en'));
  writeRoute('/de', 'de', () => renderLandingBody('de'));

  // 2. Blog Hub Pages
  writeRoute('/blog', 'tr', () => renderBlogHubBody('tr'));
  writeRoute('/en/blog', 'en', () => renderBlogHubBody('en'));
  writeRoute('/de/blog', 'de', () => renderBlogHubBody('de'));

  // 3. Articles (4 articles x 3 languages = 12 pages)
  for (const article of ARTICLES) {
    for (const lang of langs) {
      const slug = getArticleSlug(article, lang);
      const routePath = lang === 'tr' ? `/blog/${slug}` : `/${lang}/blog/${slug}`;
      writeRoute(routePath, lang, () => renderArticleBody(article, lang));
    }
  }

  // 4. Comparison Pages
  writeRoute('/karsilastirma', 'tr', () => renderComparisonBody('tr'));
  writeRoute('/en/compare', 'en', () => renderComparisonBody('en'));
  writeRoute('/de/vergleich', 'de', () => renderComparisonBody('de'));

  // 5. Glossary Pages
  writeRoute('/sozluk', 'tr', () => renderGlossaryBody('tr'));
  writeRoute('/en/glossary', 'en', () => renderGlossaryBody('en'));
  writeRoute('/de/glossar', 'de', () => renderGlossaryBody('de'));

  // 6. Ensure 404.html is copied from root index.html
  fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));

  // 7. Generate Multilingual Sitemap.xml
  generateSitemap();

  console.log(`\n🎉 Pre-rendering complete! Successfully generated ${pagesCount} rich, localized static HTML pages.`);
}

/**
 * Generates Multilingual Sitemap.xml with xhtml:link alternates.
 */
function generateSitemap() {
  const PUBLIC_DIR = path.resolve(__dirname, '../public');
  const today = new Date().toISOString().split('T')[0];

  const sitemapRoutes: Array<{ path: string; changefreq: string; priority: number }> = [
    // Landing
    { path: '/', changefreq: 'daily', priority: 1.0 },
    { path: '/en', changefreq: 'daily', priority: 1.0 },
    { path: '/de', changefreq: 'daily', priority: 1.0 },

    // Blog Hub
    { path: '/blog', changefreq: 'weekly', priority: 0.95 },
    { path: '/en/blog', changefreq: 'weekly', priority: 0.95 },
    { path: '/de/blog', changefreq: 'weekly', priority: 0.95 },

    // Comparison
    { path: '/karsilastirma', changefreq: 'weekly', priority: 0.85 },
    { path: '/en/compare', changefreq: 'weekly', priority: 0.85 },
    { path: '/de/vergleich', changefreq: 'weekly', priority: 0.85 },

    // Glossary
    { path: '/sozluk', changefreq: 'weekly', priority: 0.85 },
    { path: '/en/glossary', changefreq: 'weekly', priority: 0.85 },
    { path: '/de/glossar', changefreq: 'weekly', priority: 0.85 },

    // Upload
    { path: '/upload', changefreq: 'monthly', priority: 0.8 },
    { path: '/en/upload', changefreq: 'monthly', priority: 0.8 },
    { path: '/de/upload', changefreq: 'monthly', priority: 0.8 },
  ];

  const langs: Lang[] = ['tr', 'en', 'de'];
  for (const article of ARTICLES) {
    for (const lang of langs) {
      const slug = getArticleSlug(article, lang);
      const artPath = lang === 'tr' ? `/blog/${slug}` : `/${lang}/blog/${slug}`;
      sitemapRoutes.push({ path: artPath, changefreq: 'weekly', priority: 0.9 });
    }
  }

  const urlElements = sitemapRoutes
    .map((r) => {
      const alternates = getAlternateUrls(r.path);
      return `  <url>
    <loc>${alternates.canonical}</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="${alternates.tr}" />
    <xhtml:link rel="alternate" hreflang="en" href="${alternates.en}" />
    <xhtml:link rel="alternate" hreflang="de" href="${alternates.de}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.xDefault}" />
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(2)}</priority>
  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlElements}
</urlset>
`;

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(` ✓ Generated multilingual sitemap.xml with ${sitemapRoutes.length} canonical URLs and hreflang matrix.`);
}

prerenderAll();
