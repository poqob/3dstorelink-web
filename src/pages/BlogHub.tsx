import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/auth';
import LanguageDropdown from '../components/LanguageDropdown';
import { ARTICLES, AUTHORS } from '../data/blogArticles';

export default function BlogHub() {
  const { i18n } = useTranslation();
  const { token } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedCode, setCopiedCode] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const currentLang = i18n.language?.startsWith('de') ? 'de' : i18n.language?.startsWith('en') ? 'en' : 'tr';
  const isTr = currentLang === 'tr';
  const isDe = currentLang === 'de';

  const selectedSlug = searchParams.get('post');
  const activeArticle = ARTICLES.find((a) => a.slug === selectedSlug);

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title[currentLang]} | 3D StoreLink`;
    } else {
      document.title = isTr
        ? '3D StoreLink Rehber & Blog | Web 3D, CAD & AR Mimarisi'
        : isDe
        ? '3D StoreLink Leitfaden & Blog | Web-3D-, CAD- & AR-Architektur'
        : '3D StoreLink Guides & Blog | Web 3D, CAD & AR Engineering';
    }
    window.scrollTo(0, 0);
  }, [activeArticle, currentLang, isTr, isDe]);

  // Reading progress and scroll-spy observer for article reader mode
  useEffect(() => {
    if (!activeArticle) {
      setReadingProgress(0);
      setActiveSection('');
      return;
    }

    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = window.scrollY || window.pageYOffset;
        setReadingProgress(Math.min(100, Math.max(0, Math.round((scrolled / docHeight) * 100))));
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // IntersectionObserver for active section highlight
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-10% 0px -65% 0px',
          threshold: 0,
        }
      );

      // Delay attachment slightly so elements are present in DOM
      const timer = setTimeout(() => {
        activeArticle.sections.forEach((sec) => {
          const el = document.getElementById(sec.id);
          if (el && observer) {
            observer.observe(el);
          }
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', updateProgress);
        if (observer) {
          observer.disconnect();
        }
      };
    }

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, [activeArticle]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  const getActiveSectionHeading = () => {
    if (!activeArticle) return '';
    const current = activeArticle.sections.find((s) => s.id === activeSection);
    if (current) {
      return current.heading[currentLang];
    }
    return activeArticle.sections[0]?.heading[currentLang] || (isTr ? 'İçindekiler' : isDe ? 'Inhaltsverzeichnis' : 'Table of Contents');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Structured Data (JSON-LD) for SEO / GEO / Google AI Overview
  const jsonLd = activeArticle
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: isTr ? 'Ana Sayfa' : 'Home', item: 'https://3dstorelink.com/' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://3dstorelink.com/blog' },
              { '@type': 'ListItem', position: 3, name: activeArticle.title[currentLang], item: `https://3dstorelink.com/blog?post=${activeArticle.slug}` },
            ],
          },
          {
            '@type': 'BlogPosting',
            headline: activeArticle.title[currentLang],
            description: activeArticle.desc[currentLang],
            inLanguage: currentLang,
            datePublished: activeArticle.date.iso,
            mainEntityOfPage: `https://3dstorelink.com/blog?post=${activeArticle.slug}`,
            author: activeArticle.authors.map((auth) => ({
              '@type': 'Person',
              name: auth.name,
              jobTitle: auth.role,
              image: auth.avatar.startsWith('http') ? auth.avatar : `https://3dstorelink.com${auth.avatar}`,
              sameAs: [auth.linkedin, auth.github, auth.website].filter(Boolean),
            })),
            publisher: {
              '@type': 'Organization',
              name: '3D StoreLink',
              logo: { '@type': 'ImageObject', url: 'https://3dstorelink.com/brand.png' },
            },
          },
          ...(activeArticle.faq && activeArticle.faq.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  mainEntity: activeArticle.faq.map((f) => ({
                    '@type': 'Question',
                    name: f.q[currentLang],
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: f.a[currentLang],
                    },
                  })),
                },
              ]
            : []),
        ],
      }
    : {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: isTr ? 'Ana Sayfa' : 'Home', item: 'https://3dstorelink.com/' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://3dstorelink.com/blog' },
            ],
          },
          {
            '@type': 'CollectionPage',
            name: isTr ? '3D StoreLink Rehber & Blog' : '3D StoreLink Guides & Blog',
            description: isTr
              ? 'Web 3D, endüstriyel CAD dönüşümü, 1:1 artırılmış gerçeklik ve e-ticaret dönüşüm telemetrisi rehberleri.'
              : 'Engineering guides on Web 3D, CAD streaming, 1:1 mobile AR, and e-commerce conversion benchmarks.',
            hasPart: ARTICLES.map((art) => ({
              '@type': 'BlogPosting',
              headline: art.title[currentLang],
              url: `https://3dstorelink.com/blog?post=${art.slug}`,
            })),
          },
        ],
      };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-zinc-700 selection:text-white">
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Top Fixed Reading Progress Bar (when viewing article) */}
      {activeArticle && (
        <div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-zinc-400 via-slate-200 to-white z-[60] transition-all duration-150 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          style={{ width: `${readingProgress}%` }}
        />
      )}

      {/* ── Navigation Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 transition hover:opacity-90">
            <img src="/brand-dark-theme.webp" alt="3D StoreLink" className="h-14 sm:h-16 w-auto" />
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="text-gray-400 hover:text-white transition">
              {isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}
            </Link>
            <Link to="/blog" className="text-white font-bold border-b-2 border-zinc-300 pb-0.5">
              Blog
            </Link>
            <Link to="/karsilastirma" className="text-gray-400 hover:text-white transition hidden md:block">
              {isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison'}
            </Link>
            <Link to="/sozluk" className="text-gray-400 hover:text-white transition hidden md:block">
              {isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary'}
            </Link>
            <Link
              to="/upload"
              className="bg-white text-black px-4 py-2 text-sm font-bold rounded-lg hover:bg-gray-200 transition"
            >
              {token ? 'Dashboard' : isTr ? 'Model Yükle' : isDe ? 'Modell hochladen' : 'Upload Model'}
            </Link>
            <LanguageDropdown />
          </div>
        </div>
      </nav>

      {/* ── Mobile Quick Table of Contents Bar (when viewing article) ── */}
      {activeArticle && (
        <div className="lg:hidden sticky top-20 z-40 bg-[#09090b]/95 backdrop-blur-md border-b border-white/10 px-4 py-2.5 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-zinc-300 font-medium truncate max-w-[70%]">
              <span className="w-2 h-2 rounded-full bg-zinc-200 flex-shrink-0 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              <span className="truncate font-semibold text-white">
                {getActiveSectionHeading()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-zinc-200 font-semibold flex items-center gap-1.5 cursor-pointer transition border border-white/10"
            >
              <span>{isTr ? 'İçindekiler' : isDe ? 'Inhalt' : 'TOC'}</span>
              <span className="font-mono text-[10px] text-zinc-400">%{readingProgress}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-150 ${mobileTocOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          {mobileTocOpen && (
            <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-white/10 space-y-1 max-h-64 overflow-y-auto">
              {activeArticle.sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    scrollToSection(sec.id);
                    setMobileTocOpen(false);
                  }}
                  className={`w-full text-left block px-3 py-2 rounded-lg text-xs transition-colors ${
                    activeSection === sec.id
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {sec.heading[currentLang]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ARTICLE READER VIEW ── */}
      {activeArticle ? (
        <div className="pt-28 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 max-w-4xl lg:max-w-none">
            <Link to="/" className="hover:text-white transition">{isTr ? 'Ana Sayfa' : 'Home'}</Link>
            <span>/</span>
            <button onClick={() => setSearchParams({})} className="hover:text-white transition cursor-pointer">
              Blog
            </button>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-xs sm:max-w-md">{activeArticle.title[currentLang]}</span>
          </nav>

          {/* Two-Column Layout: Left Sticky TOC Sidebar + Right Article Content */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 items-start">
            {/* Sticky Table of Contents (Left Sidebar on Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 self-start space-y-5">
              {/* Table of Contents Card */}
              <div className="p-5 rounded-3xl bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/10 shadow-lg">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      {isTr ? 'İçindekiler' : isDe ? 'Inhaltsverzeichnis' : 'Table of Contents'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-300 font-mono">
                    %{readingProgress} {isTr ? 'Okundu' : isDe ? 'Gelesen' : 'Read'}
                  </span>
                </div>

                {/* Progress bar line */}
                <div className="w-full bg-white/10 h-1.5 rounded-full mb-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-zinc-400 via-slate-200 to-white h-full transition-all duration-150 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>

                {/* Section Navigation Links */}
                <nav className="space-y-1 relative" aria-label="Table of Contents">
                  {activeArticle.sections.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left group flex items-start gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer border-l-2 ${
                        activeSection === sec.id
                          ? 'border-white bg-white/10 text-white font-bold'
                          : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:border-zinc-500 font-medium'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-colors ${
                          activeSection === sec.id ? 'bg-white ring-4 ring-white/20' : 'bg-zinc-600 group-hover:bg-zinc-400'
                        }`}
                      />
                      <span className="leading-snug">{sec.heading[currentLang]}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Author Mini Card in Sidebar */}
              <div className="p-4 rounded-2xl bg-[#0c0c0e]/90 border border-white/10 flex items-center gap-3">
                <div className="flex -space-x-2 flex-shrink-0">
                  {activeArticle.authors.map((auth, idx) => (
                    <img
                      key={idx}
                      src={auth.avatar}
                      alt={auth.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-black bg-zinc-800"
                    />
                  ))}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-white text-xs block truncate">
                    {activeArticle.authors.map((a) => a.name).join(' & ')}
                  </span>
                  <span className="text-[11px] text-zinc-400 block truncate">
                    {activeArticle.authors.map((a) => a.role).join(' · ')}
                  </span>
                </div>
              </div>

              {/* Quick Model Testing CTA Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 text-center">
                <p className="text-xs text-zinc-300 font-medium mb-3">
                  {isTr
                    ? 'Kendi CAD veya 3D modelinizi saniyeler içinde test edin.'
                    : isDe
                    ? 'Testen Sie Ihr 3D-Modell in Sekundenschnelle.'
                    : 'Test your CAD or 3D model live in seconds.'}
                </p>
                <Link
                  to="/upload"
                  className="inline-block w-full py-2.5 px-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition text-center shadow-md"
                >
                  {isTr ? 'Modelini Yükle →' : isDe ? 'Modell hochladen →' : 'Upload Model →'}
                </Link>
              </div>
            </aside>

            {/* Right Column: Article Full Content */}
            <article className="lg:col-span-8 xl:col-span-9 min-w-0">
              {/* Meta header */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-4 font-medium">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/20 font-bold text-[11px]">
                  {activeArticle.category[currentLang]}
                </span>
                <span>•</span>
                <span>{activeArticle.readTime[currentLang]}</span>
                <span>•</span>
                <time dateTime={activeArticle.date.iso}>{activeArticle.date[currentLang]}</time>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6 text-white">
                {activeArticle.title[currentLang]}
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-8">
                {activeArticle.desc[currentLang]}
              </p>

              {/* Authors bar */}
              <div className="flex flex-wrap items-center gap-4 py-4 px-5 rounded-2xl bg-[#0c0c0e] border border-white/10 mb-10">
                <div className="flex -space-x-2 flex-shrink-0">
                  {activeArticle.authors.map((auth, idx) => (
                    <img
                      key={idx}
                      src={auth.avatar}
                      alt={auth.name}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-black bg-zinc-800"
                    />
                  ))}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">
                    {activeArticle.authors.map((a) => a.name).join(' & ')}
                  </span>
                  <span className="text-zinc-400 text-[11px]">
                    {activeArticle.authors.map((a) => a.role).join(' · ')}
                  </span>
                </div>
              </div>

              {/* Key takeaways callout */}
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 backdrop-blur-sm mb-12 shadow-sm">
                <div className="text-zinc-200 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="text-zinc-400">✦</span>
                  <span>{isTr ? 'ÖNEMLİ ÇIKARIMLAR (KEY TAKEAWAYS)' : isDe ? 'KERN-ERKENNTNISSE' : 'KEY TAKEAWAYS'}</span>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-300">
                  {activeArticle.keyTakeaways[currentLang].map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-zinc-400 mt-1">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sections */}
              <div className="space-y-12">
                {activeArticle.sections.map((sec, idx) => (
                  <section key={idx} id={sec.id} className="scroll-mt-28 space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {sec.heading[currentLang]}
                    </h2>
                    {sec.paragraphs[currentLang].map((p, pIdx) => (
                      <p key={pIdx} className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        {p}
                      </p>
                    ))}

                    {/* Table if present */}
                    {sec.table && (
                      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a0a0c] my-6">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-white/10 bg-white/[0.05]">
                              {sec.table.headers[currentLang].map((h, hIdx) => (
                                <th key={hIdx} className="py-3 px-4 font-bold text-zinc-200">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {sec.table.rows[currentLang].map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-white/[0.02]">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`py-3 px-4 ${
                                      cIdx === 0
                                        ? 'font-medium text-white'
                                        : cIdx === 2
                                        ? 'text-zinc-200 font-semibold'
                                        : 'text-zinc-400'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Code snippet if present */}
                    {sec.codeSnippet && (
                      <div className="bg-[#050507] rounded-xl border border-white/10 p-4 font-mono text-xs text-zinc-300 relative my-6">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[11px] text-zinc-500 font-sans">
                          <span>HTML Iframe Embed</span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(sec.codeSnippet!)}
                            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition cursor-pointer"
                          >
                            {copiedCode ? '✓ Kopyalandı' : 'Kopyala'}
                          </button>
                        </div>
                        <pre className="overflow-x-auto text-zinc-200 leading-relaxed font-mono">
                          {sec.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* FAQ section */}
              {activeArticle.faq && activeArticle.faq.length > 0 && (
                <div className="mt-14 pt-10 border-t border-white/10">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">
                    {isTr ? 'Makale İle İlgili Sıkça Sorulan Sorular' : isDe ? 'Häufig gestellte Fragen zum Artikel' : 'Frequently Asked Questions'}
                  </h3>
                  <div className="space-y-4">
                    {activeArticle.faq.map((f, i) => (
                      <div key={i} className="p-5 rounded-xl border border-white/10 bg-[#0c0c0e]/80 hover:border-white/20 transition">
                        <div className="font-semibold text-white text-sm mb-2">{f.q[currentLang]}</div>
                        <div className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{f.a[currentLang]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Back button & Next steps */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
                <button
                  onClick={() => setSearchParams({})}
                  className="text-xs uppercase tracking-wider font-bold text-zinc-400 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
                >
                  ← {isTr ? 'Tüm Rehberlere Dön' : isDe ? 'Zurück zur Übersicht' : 'Back to All Guides'}
                </button>
                <Link
                  to="/upload"
                  className="bg-white text-black px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-200 transition"
                >
                  {isTr ? 'Modelini Hemen Test Et →' : 'Test Your Model Now →'}
                </Link>
              </div>
            </article>
          </div>
        </div>
      ) : (
        /* ── BLOG HUB LISTING VIEW ── */
        <div>
          {/* Hero Header */}
          <section className="pt-36 pb-14 px-6 border-b border-white/5">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold mb-3">
                {isTr ? '3D STORELINK MÜHENDİSLİK & BİLGİ MERKEZİ' : isDe ? '3D STORELINK ENGINEERING & WISSEN' : '3D STORELINK ENGINEERING & KNOWLEDGE HUB'}
              </p>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
                {isTr ? '3D StoreLink Rehber & Blog' : isDe ? '3D StoreLink Leitfaden & Blog' : '3D StoreLink Guides & Blog'}
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                {isTr
                  ? 'Endüstriyel CAD dönüşümü (STEP/STP), WebGL & GLB optimizasyonu, 1:1 artırılmış gerçeklik (AR) ve e-ticaret dönüşüm telemetrisi üzerine derinlemesine mühendislik analizleri.'
                  : isDe
                  ? 'Tiefgehende technische Analysen zu CAD-Konvertierung (STEP/STP), WebGL-Draco-Optimierung, 1:1 mobiler AR und E-Commerce-Conversion.'
                  : 'Engineering deep dives into CAD streaming, automated WebGL optimization, zero-app 1:1 mobile AR, and empirical e-commerce conversion telemetry.'}
              </p>
            </div>
          </section>

          {/* Main Content */}
          <main className="max-w-5xl mx-auto px-6 py-12">
            {/* Authors Grid (E-E-A-T) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
              {/* Author 1: Mustafa BİÇER */}
              <div className="p-6 rounded-3xl bg-[#0c0c0e]/80 border border-white/10 flex items-start gap-4 hover:border-zinc-400/50 hover:bg-white/[0.03] transition-all">
                <img
                  src={AUTHORS.mustafa.avatar}
                  alt={AUTHORS.mustafa.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/15 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-white truncate">{AUTHORS.mustafa.name}</h2>
                  <span className="text-xs text-zinc-400 font-medium block mb-1.5 truncate">
                    {AUTHORS.mustafa.role}
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                    {AUTHORS.mustafa.bio}
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs text-zinc-400">
                    <a
                      href={AUTHORS.mustafa.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-200 transition"
                    >
                      LinkedIn
                    </a>
                    <span>•</span>
                    <a
                      href={AUTHORS.mustafa.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                    >
                      GitHub
                    </a>
                    <span>•</span>
                    <a
                      href={AUTHORS.mustafa.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-200 transition font-medium"
                    >
                      {AUTHORS.mustafa.websiteLabel}
                    </a>
                  </div>
                </div>
              </div>

              {/* Author 2: Akın TERZİ */}
              <div className="p-6 rounded-3xl bg-[#0c0c0e]/80 border border-white/10 flex items-start gap-4 hover:border-zinc-400/50 hover:bg-white/[0.03] transition-all">
                <img
                  src={AUTHORS.akin.avatar}
                  alt={AUTHORS.akin.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/15 flex-shrink-0 bg-white/5"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-white truncate">{AUTHORS.akin.name}</h2>
                  <span className="text-xs text-zinc-400 font-medium block mb-1.5 truncate">
                    {AUTHORS.akin.role}
                  </span>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3">
                    {AUTHORS.akin.bio}
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs text-zinc-400">
                    <a
                      href={AUTHORS.akin.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-200 transition"
                    >
                      LinkedIn
                    </a>
                    <span>•</span>
                    <a
                      href={AUTHORS.akin.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-200 transition font-medium"
                    >
                      {AUTHORS.akin.websiteLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isTr ? 'Öne Çıkan Rehberler & Benchmark Raporları' : isDe ? 'Ausgewählte Leitfäden & Benchmarks' : 'Featured Guides & Benchmark Reports'}
              </h2>
              <span className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                {ARTICLES.length} {isTr ? 'Yayın' : 'Publications'}
              </span>
            </div>

            {/* Articles List */}
            <div className="space-y-8">
              {ARTICLES.map((art) => {
                const isFlagship = art.featured;
                return (
                  <article
                    key={art.slug}
                    className={`rounded-3xl transition-all duration-200 overflow-hidden group ${
                      isFlagship
                        ? 'p-6 sm:p-10 bg-gradient-to-br from-[#161619] via-[#0d0d10] to-[#08080a] border border-zinc-400/30 hover:border-zinc-300/80 shadow-[0_0_30px_rgba(255,255,255,0.03)]'
                        : 'p-6 sm:p-8 bg-white/[0.02] border border-white/10 hover:border-zinc-400/40 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 mb-3 font-medium">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          isFlagship
                            ? 'bg-white/15 text-zinc-200 border border-white/25'
                            : 'bg-white/5 text-zinc-300 border border-white/10'
                        }`}
                      >
                        {art.category[currentLang]}
                      </span>
                      <span>•</span>
                      <span>{art.readTime[currentLang]}</span>
                      <span>•</span>
                      <time dateTime={art.date.iso}>{art.date[currentLang]}</time>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-zinc-200 transition-colors mb-3 leading-tight">
                      <button
                        onClick={() => setSearchParams({ post: art.slug })}
                        className="text-left cursor-pointer hover:underline underline-offset-4"
                      >
                        {art.title[currentLang]}
                      </button>
                    </h3>

                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                      {art.desc[currentLang]}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {art.authors.map((auth, aIdx) => (
                            <img
                              key={aIdx}
                              src={auth.avatar}
                              alt={auth.name}
                              className="w-9 h-9 rounded-xl object-cover ring-2 ring-black bg-zinc-800"
                            />
                          ))}
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-white block">
                            {art.authors.map((a) => a.name).join(' & ')}
                          </span>
                          <span className="text-zinc-400 text-[11px]">
                            {art.authors.map((a) => a.role).join(' · ')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSearchParams({ post: art.slug })}
                        className="inline-flex items-center gap-2 font-bold text-sm text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all cursor-pointer"
                      >
                        <span>{isFlagship ? (isTr ? 'Raporu İncele' : 'Read Full Report') : (isTr ? 'Rehberi Oku' : 'Read Guide')}</span>
                        <span>→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-xs">
          <div className="flex items-center gap-2">
            <img src="/icon.webp" alt="Logo" className="w-5 h-5 opacity-50" />
            <span>3D StoreLink · DagSolution</span>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link to="/" className="hover:text-white transition">{isTr ? 'Ana Sayfa' : 'Home'}</Link>
            <Link to="/blog" className="hover:text-white transition">Blog</Link>
            <Link to="/karsilastirma" className="hover:text-white transition">{isTr ? 'Karşılaştırma' : 'Comparison'}</Link>
            <Link to="/sozluk" className="hover:text-white transition">{isTr ? 'Sözlük' : 'Glossary'}</Link>
            <a href="mailto:info@3dstorelink.com" className="hover:text-white transition">info@3dstorelink.com</a>
            <a href="https://www.instagram.com/3dstorelink/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
            <a href="https://www.linkedin.com/company/3dstorelink/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
