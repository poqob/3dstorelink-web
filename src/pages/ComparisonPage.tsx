import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/LanguageDropdown';
import { COMPARISON_ROWS } from '../data/comparisonRows';

export default function ComparisonPage() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language?.startsWith('de') ? 'de' : i18n.language?.startsWith('en') ? 'en' : 'tr';
  const isTr = currentLang === 'tr';
  const isDe = currentLang === 'de';

  const homePath = isTr ? '/' : isDe ? '/de' : '/en';
  const blogPath = isTr ? '/blog' : isDe ? '/de/blog' : '/en/blog';
  const comparePath = isTr ? '/karsilastirma' : isDe ? '/de/vergleich' : '/en/compare';
  const glossaryPath = isTr ? '/sozluk' : isDe ? '/de/glossar' : '/en/glossary';
  const uploadPath = isTr ? '/upload' : isDe ? '/de/upload' : '/en/upload';

  const title = isTr
    ? '3D StoreLink vs Sketchfab & 2D | 2026 Teknik Karşılaştırma Matrisi'
    : isDe
    ? '3D StoreLink vs Sketchfab & 2D | 2026 Technischer Vergleich'
    : '3D StoreLink vs Sketchfab & Traditional 2D | 2026 Technical Benchmark';

  const description = isTr
    ? 'E-ticaret ve endüstriyel ürün üreticileri için Web 3D & AR çözümlerini kıyaslıyoruz. Neden modern markalar ağır harici pazar yerleri veya durağan fotoğraflar yerine 3D StoreLink altyapısını tercih ediyor?'
    : isDe
    ? 'Vergleich moderner Web-3D- und AR-Lösungen für E-Commerce und Industrieunternehmen. Warum führende Marken auf 3D StoreLink statt statische Fotos oder schwere Marktplatz-Viewer setzen.'
    : 'Evaluating Web 3D & AR solutions for e-commerce and industrial manufacturing. Why modern storefronts choose 3D StoreLink over heavy third-party marketplaces or static photography.';

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
          { '@type': 'ListItem', position: 2, name: isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison', item: `https://3dstorelink.com${comparePath}` },
        ],
      },
      {
        '@type': 'WebPage',
        name: title,
        description,
        url: `https://3dstorelink.com${comparePath}`,
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
            <Link to={comparePath} className="text-white font-bold border-b-2 border-zinc-300 pb-0.5">
              {isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison'}
            </Link>
            <Link to={glossaryPath} className="text-gray-400 hover:text-white transition hidden md:block">
              {isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary'}
            </Link>
            <LanguageDropdown />
          </div>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to={homePath} className="hover:text-white transition">{isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}</Link>
          <span>/</span>
          <span className="text-gray-300">{isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison'}</span>
        </nav>

        <p className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-bold mb-3">
          {isTr ? 'TEKNİK BENCHMARK & KARŞILAŞTIRMA' : isDe ? 'TECHNISCHER BENCHMARK & VERGLEICH' : 'TECHNICAL BENCHMARK & COMPARISON'}
        </p>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
          3D StoreLink vs Sketchfab & {isTr ? 'Geleneksel 2D Fotoğraflar' : isDe ? 'Klassische 2D-Fotos' : 'Traditional 2D Photos'}
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-3xl leading-relaxed">
          {isTr
            ? 'E-ticaret ve endüstriyel ürün üreticileri için Web 3D & AR çözümlerini kıyaslıyoruz. Neden modern markalar ağır harici pazar yerleri veya durağan fotoğraflar yerine 3D StoreLink altyapısını tercih ediyor?'
            : isDe
            ? 'Vergleich moderner Web-3D- und AR-Lösungen für E-Commerce und Industrieunternehmen. Warum führende Marken auf 3D StoreLink statt statische Fotos oder schwere Marktplatz-Viewer setzen.'
            : 'Evaluating Web 3D & AR solutions for e-commerce and industrial manufacturing. Why modern storefronts choose 3D StoreLink over heavy third-party marketplaces or static photography.'}
        </p>
      </header>

      {/* ── Table Section ── */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="py-5 px-6 font-semibold text-gray-300 w-1/4">
                  {isTr ? 'Kriter / Özellik' : isDe ? 'Kriterium / Feature' : 'Capability / Feature'}
                </th>
                <th className="py-5 px-6 font-bold text-white bg-gradient-to-b from-white/[0.12] to-white/[0.04] border-x border-white/20 w-1/3 shadow-inner">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-200 animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                    <span>3D StoreLink (3D & AR)</span>
                  </div>
                </th>
                <th className="py-5 px-6 font-semibold text-gray-300 w-1/4">Sketchfab</th>
                <th className="py-5 px-6 font-semibold text-gray-400 w-1/4">
                  {isTr ? 'Geleneksel 2D Fotoğraf' : isDe ? 'Klassisches 2D' : 'Traditional 2D'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARISON_ROWS.map((r, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition">
                  <td className="py-5 px-6 font-medium text-white">{r.feature[currentLang]}</td>
                  <td className="py-5 px-6 border-x border-white/15 bg-white/[0.03] text-zinc-100 font-semibold">
                    {r.storelink[currentLang]}
                  </td>
                  <td className="py-5 px-6 text-gray-300">{r.sketchfab[currentLang]}</td>
                  <td className="py-5 px-6 text-gray-500">{r.trad2d[currentLang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Deep Dive Cards ── */}
      <section className="px-6 py-16 border-t border-white/5 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black mb-12 text-center">
          {isTr ? 'Neden 3D StoreLink E-Ticaret İçin Daha Uygun?' : isDe ? 'Warum 3D StoreLink für E-Commerce?' : 'Why 3D StoreLink Wins in E-Commerce'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0c0e]/80 hover:border-zinc-400/40 hover:bg-white/[0.03] transition-all">
            <h3 className="text-xl font-bold mb-3 text-white">
              {isTr ? 'Doğrudan CAD Desteği' : isDe ? 'Direkte CAD-Konvertierung' : 'Native CAD Pipeline'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isTr
                ? 'Endüstriyel ürünlerinizi 3D tasarımcıya göndermeden STP veya STEP formatında doğrudan yükleyin. Sistemimiz modeli web için otomatik mozaikler ve hafifletir.'
                : isDe
                ? 'Laden Sie STP- oder STEP-Dateien direkt hoch, ohne externe 3D-Künstler beauftragen zu müssen. Unser System optimiert die Geometrie vollautomatisch.'
                : 'Upload industrial STP and STEP files directly without hiring 3D artists. Our pipeline tessellates and simplifies meshes automatically.'}
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0c0e]/80 hover:border-zinc-400/40 hover:bg-white/[0.03] transition-all">
            <h3 className="text-xl font-bold mb-3 text-white">
              {isTr ? 'Uygulamasız 1:1 AR' : isDe ? 'App-freies 1:1 AR' : 'Zero-App 1:1 AR'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isTr
                ? 'Müşterileriniz hiçbir uygulama yüklemeden Safari ve Chrome üzerinden ürünü gerçek oturma odasında veya fabrikasında 1:1 ölçekte deneyimler.'
                : isDe
                ? 'Kunden platzieren Produkte maßstabsgetreu 1:1 in ihrem realen Raum direkt über Safari & Chrome – ganz ohne App-Download.'
                : 'Customers place products at 1:1 true scale in their real space directly through Safari & Chrome with zero app downloads.'}
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0c0e]/80 hover:border-zinc-400/40 hover:bg-white/[0.03] transition-all">
            <h3 className="text-xl font-bold mb-3 text-white">
              {isTr ? 'Ölçülebilir Satış Artışı' : isDe ? 'Messbare ROI-Steigerung' : 'Measurable ROI & Lift'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isTr
                ? 'Google ve Shopify verilerine göre 3D & AR ile incelenen ürünler %94 daha yüksek dönüşüm elde eder ve iadeleri %40 oranında azaltır.'
                : isDe
                ? 'Laut Studien steigert die 3D/AR-Darstellung die Conversion um 94% und senkt teure Retouren um bis zu 40%.'
                : 'Empirical data shows 3D & AR viewers increase add-to-cart conversion by 94% while reducing costly returns by up to 40%.'}
            </p>
          </div>
        </div>
      </section>

      {/* ── Call to action ── */}
      <section className="px-6 py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            {isTr ? 'Modelinizi 3D ve AR Olarak Yayınlayın' : isDe ? 'Veröffentlichen Sie Ihr 3D-Modell' : 'Publish Your 3D & AR Model Today'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-8">
            {isTr
              ? 'Ücretsiz model yükleyin, otomatik Web GLB optimizasyonunu deneyimleyin ve mağazanıza hemen entegre edin.'
              : isDe
              ? 'Laden Sie kostenlos ein Modell hoch und binden Sie es in weniger als 30 Sekunden in Ihren Shop ein.'
              : 'Upload your 3D model for free, test automated Web GLB optimization, and embed it in under 30 seconds.'}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to={uploadPath}
              className="bg-white text-black px-7 py-3.5 font-bold rounded-xl hover:bg-gray-200 transition"
            >
              {isTr ? 'Ücretsiz Model Yükle →' : isDe ? 'Modell hochladen →' : 'Upload Free Model →'}
            </Link>
            <Link
              to={homePath}
              className="border border-white/20 text-white px-7 py-3.5 font-bold rounded-xl hover:bg-white/5 transition"
            >
              {isTr ? 'Showcase Vitrini' : isDe ? 'Showcase ansehen' : 'Explore Showcase'}
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
