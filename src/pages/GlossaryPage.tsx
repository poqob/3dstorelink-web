import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/LanguageDropdown';

import { GLOSSARY_TERMS } from '../data/glossaryTerms';

export default function GlossaryPage() {
  const { i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const currentLang = i18n.language?.startsWith('de') ? 'de' : i18n.language?.startsWith('en') ? 'en' : 'tr';
  const isTr = currentLang === 'tr';
  const isDe = currentLang === 'de';

  const homePath = isTr ? '/' : isDe ? '/de/' : '/en/';
  const blogPath = isTr ? '/blog/' : isDe ? '/de/blog/' : '/en/blog/';
  const comparePath = isTr ? '/karsilastirma/' : isDe ? '/de/vergleich/' : '/en/compare/';
  const glossaryPath = isTr ? '/sozluk/' : isDe ? '/de/glossar/' : '/en/glossary/';
  const uploadPath = isTr ? '/upload/' : isDe ? '/de/upload/' : '/en/upload/';

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

  useEffect(() => {
    document.title = title;
    window.scrollTo(0, 0);
  }, [title]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home', item: `https://3dstorelink.com${homePath}` },
          { '@type': 'ListItem', position: 2, name: isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary', item: `https://3dstorelink.com${glossaryPath}` },
        ],
      },
      {
        '@type': 'DefinedTermSet',
        name: title,
        description,
        url: `https://3dstorelink.com${glossaryPath}`,
        hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.definition[currentLang],
          inLanguage: currentLang,
        })),
      },
    ],
  };

  const terms = GLOSSARY_TERMS;

  const categories = [
    { id: 'all', label: isTr ? 'Tümü' : isDe ? 'Alle' : 'All' },
    { id: 'CAD', label: 'CAD & Mühendislik' },
    { id: 'Web3D', label: 'Web 3D & GLB' },
    { id: 'AR', label: 'Artırılmış Gerçeklik (AR)' },
    { id: 'Optimization', label: isTr ? 'Optimizasyon' : 'Optimization' },
    { id: 'Integration', label: isTr ? 'Entegrasyon' : 'Integration' },
  ];

  const filteredTerms = terms.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const termText = `${item.term} ${item.definition[currentLang]} ${item.details[currentLang]}`.toLowerCase();
    const matchesSearch = termText.includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-zinc-700 selection:text-white">
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to={homePath} className="hover:opacity-90 transition">
              <img src="/brand-dark-theme.webp" alt="3D StoreLink" className="h-16 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to={homePath} className="text-gray-400 hover:text-white transition">
              {isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}
            </Link>
            <Link to={blogPath} className="text-gray-400 hover:text-white transition hidden sm:block">
              Blog
            </Link>
            <Link to={comparePath} className="text-gray-400 hover:text-white transition hidden md:block">
              {isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison'}
            </Link>
            <Link to={glossaryPath} className="text-white font-bold border-b-2 border-zinc-300 pb-0.5">
              {isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary'}
            </Link>
            <LanguageDropdown />
          </div>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to={homePath} className="hover:text-white transition">{isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}</Link>
          <span>/</span>
          <span className="text-gray-300">{isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary'}</span>
        </nav>

        <p className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold mb-3">
          {isTr ? '3D & CAD MÜHENDİSLİK KILAVUZU' : isDe ? '3D & CAD ENGINEERING GLOSSAR' : '3D & CAD ENGINEERING GLOSSARY'}
        </p>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
          {isTr ? '3D, CAD ve AR Terimleri Sözlüğü' : isDe ? '3D-, CAD- & AR-Fachbegriffe Glossar' : '3D, CAD & Web AR Terminology Glossary'}
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
          {isTr
            ? 'Endüstriyel CAD dönüşümü, WebGL render, Apple Quick Look AR ve Draco optimizasyonu hakkında A\'dan Z\'ye teknik kavramlar ve doğrudan tanımlar.'
            : isDe
            ? 'A bis Z Definitionen zu industrieller CAD-Konvertierung, WebGL, Apple Quick Look AR und Draco-Mesh-Kompression.'
            : 'A-to-Z technical definitions and reference concepts covering CAD conversion, WebGL, mobile AR engines, and Draco geometry compression.'}
        </p>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-4 border-t border-white/5">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isTr ? 'Terim veya kavram ara (Örn: STEP, GLB, Draco, AR)...' : isDe ? 'Begriff suchen (z.B. STEP, GLB)...' : 'Search terms (e.g. STEP, GLB, Draco)...'}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeCategory === c.id
                    ? 'bg-white/15 text-white border border-white/30 font-bold shadow-sm'
                    : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Glossary Terms Grid ── */}
      <main className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((item, idx) => (
            <article
              key={idx}
              className="p-7 rounded-2xl border border-white/10 bg-[#0c0c0e]/80 hover:border-zinc-400/50 hover:bg-white/[0.03] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {item.term}
                  </h2>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-zinc-300">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {item.definition[currentLang]}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-xs text-gray-400 leading-normal flex items-start gap-2">
                <span className="text-zinc-400 shrink-0">✦</span>
                <span>{item.details[currentLang]}</span>
              </div>
            </article>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-16 text-gray-500 text-sm">
            {isTr ? 'Aradığınız kriterlere uygun terim bulunamadı.' : 'No matching terms found.'}
          </div>
        )}
      </main>

      {/* ── Call to action ── */}
      <section className="px-6 py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4">
            {isTr ? 'Modelinizi 3D ve AR Olarak Deneyimleyin' : isDe ? 'Erleben Sie Ihr Modell in 3D & AR' : 'Experience Your Model in 3D & AR'}
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            {isTr
              ? 'STEP, STL veya OBJ dosyanızı saniyeler içinde yükleyin, web optimizasyonunu test edin.'
              : 'Upload your STEP, STL, or OBJ file in seconds and test web optimization.'}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to={uploadPath}
              className="bg-white text-black px-7 py-3.5 font-bold rounded-xl hover:bg-gray-200 transition text-sm"
            >
              {isTr ? 'Ücretsiz Model Yükle →' : isDe ? 'Modell hochladen →' : 'Upload Model →'}
            </Link>
            <Link
              to={comparePath}
              className="border border-white/20 text-white px-7 py-3.5 font-bold rounded-xl hover:bg-white/5 transition text-sm"
            >
              {isTr ? 'Teknik Karşılaştırma' : isDe ? 'Technischer Vergleich' : 'Technical Comparison'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <div className="flex items-center gap-2">
            <img src="/icon.webp" alt="Logo" className="w-5 h-5 opacity-50" />
            <span>3D StoreLink</span>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link to={homePath} className="hover:text-white transition">{isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}</Link>
            <Link to={blogPath} className="hover:text-white transition">Blog</Link>
            <Link to={comparePath} className="hover:text-white transition">{isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison'}</Link>
            <Link to={glossaryPath} className="hover:text-white transition">{isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary'}</Link>
            <a href="mailto:info@3dstorelink.com" className="hover:text-white transition">info@3dstorelink.com</a>
            <a href="https://www.instagram.com/3dstorelink/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
            <a href="https://www.linkedin.com/company/3dstorelink/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
