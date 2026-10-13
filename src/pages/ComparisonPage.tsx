import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../components/LanguageDropdown';

export default function ComparisonPage() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language?.startsWith('de') ? 'de' : i18n.language?.startsWith('en') ? 'en' : 'tr';
  const isTr = currentLang === 'tr';
  const isDe = currentLang === 'de';

  useEffect(() => {
    document.title = isTr
      ? '3D StoreLink vs Sketchfab & 2D | 2026 Teknik Karşılaştırma Matrisi'
      : isDe
      ? '3D StoreLink vs Sketchfab & 2D | 2026 Technischer Vergleich'
      : '3D StoreLink vs Sketchfab & Traditional 2D | 2026 Technical Benchmark';
    window.scrollTo(0, 0);
  }, [isTr, isDe]);

  const rows = [
    {
      feature: isTr ? 'Endüstriyel CAD Dosya Desteği (STP, STEP, STL)' : isDe ? 'Industrielles CAD-Dateiformat (STP, STEP, STL)' : 'Industrial CAD Support (STP, STEP, STL)',
      storelink: isTr ? 'Doğrudan yükleme ve otomatik Web GLB dönüşümü' : isDe ? 'Direkter Upload & automatische Konvertierung' : 'Native upload & automated Web GLB conversion',
      sketchfab: isTr ? 'Sınırlı CAD desteği, ek eklenti veya manuel dönüşüm gerektirir' : isDe ? 'Eingeschränkt, manuelle Konvertierung erforderlich' : 'Limited, requires manual pre-conversion',
      trad2d: isTr ? 'CAD gösterilemez; sadece render alınmış durağan görsel' : isDe ? 'Nicht möglich; nur gerenderte statische Fotos' : 'Not possible; static renders only',
      winner: true,
    },
    {
      feature: isTr ? 'E-Ticaret Tek Satır Iframe / Embed Entegrasyonu' : isDe ? 'E-Commerce Einzeiliger Iframe-Embed' : 'Single-Line E-Commerce Iframe Embed',
      storelink: isTr ? 'Shopify, WooCommerce, İkas ve özel web sitelerine < 30 sn' : isDe ? 'Shopify, WooCommerce & eigene Seiten < 30 Sek.' : 'Shopify, WooCommerce & custom CMS in < 30s',
      sketchfab: isTr ? 'Ağır iframe, harici pazar yeri markalaması ve gecikmeli yükleme' : isDe ? 'Schwerer Iframe mit externem Marketplace-Branding' : 'Heavy iframe with external marketplace branding',
      trad2d: isTr ? 'Çoklu fotoğraf galerisi yüklemesi (açı başına görsel)' : isDe ? 'Manuelle Fotogalerie pro Blickwinkel' : 'Manual multi-angle image gallery upload',
      winner: true,
    },
    {
      feature: isTr ? 'Uygulamasız Mobil AR (Apple Quick Look & SceneViewer)' : isDe ? 'App-freies mobiles AR (Apple Quick Look & SceneViewer)' : 'Zero-App Mobile AR (Quick Look & SceneViewer)',
      storelink: isTr ? 'Yerleşik 1:1 gerçek ölçekli AR; iOS ve Android tarayıcısında anında' : isDe ? 'Echtes 1:1 AR direkt im iOS/Android Browser' : 'Native 1:1 true-scale AR in iOS & Android browsers',
      sketchfab: isTr ? 'Mobil webde sınırlı AR, genellikle uygulama yönlendirmesi ister' : isDe ? 'Eingeschränktes Web-AR, oft App erforderlich' : 'Limited mobile web AR, often pushes app install',
      trad2d: isTr ? 'Desteklenmiyor' : isDe ? 'Nicht unterstützt' : 'Not supported',
      winner: true,
    },
    {
      feature: isTr ? 'Otomatik Geometrik Sıkıştırma (Draco / Meshopt)' : isDe ? 'Automatische Geometrie-Kompression (Draco / Meshopt)' : 'Automated Draco & Meshopt Compression',
      storelink: isTr ? '%85-95 dosya boyutu tasarrufu, mobilde akıcı 60 FPS' : isDe ? '85-95% Dateigrößenreduktion, flüssige 60 FPS' : '85–95% file size reduction, fluid 60 FPS on mobile',
      sketchfab: isTr ? 'Temel glTF optimizasyonu, büyük modellerde yüksek bellek tüketimi' : isDe ? 'Basis-glTF, hoher Speicherverbrauch bei großen Dateien' : 'Basic glTF, high memory on heavy models',
      trad2d: isTr ? 'WebP / JPG standart görsel sıkıştırması' : isDe ? 'WebP / JPG Standard-Bildkompression' : 'Standard WebP / JPG image compression',
      winner: true,
    },
    {
      feature: isTr ? 'Fikri Mülkiyet (CAD IP) & Mesh Güvenliği' : isDe ? 'CAD-IP- & Geometrieschutz' : 'CAD IP & Mesh Security',
      storelink: isTr ? 'Orijinal parametrik CAD gizli kalır; yalnızca görsel mesh yayınlanır' : isDe ? 'Original-CAD bleibt geschützt; nur visuelles Mesh' : 'Original parametric CAD hidden; visual mesh only',
      sketchfab: isTr ? 'Model indirmeye açıksa ham dosya kopyalanabilir' : isDe ? 'Modell kann oft kopiert oder heruntergeladen werden' : 'Models can often be scraped or downloaded',
      trad2d: isTr ? '2D görsel ekran görüntüsüyle kolayca kopyalanabilir' : isDe ? 'Einfach per Screenshot kopierbar' : 'Easily copied via screenshot',
      winner: true,
    },
    {
      feature: isTr ? 'Dönüşüm Oranı & Ürün İade Etkisi (Benchmark)' : isDe ? 'Conversion- & Retouren-Impact (Benchmark)' : 'Conversion Lift & Return Reduction',
      storelink: isTr ? '+%94 dönüşüm artışı, %40\'a varan ürün iade azalması' : isDe ? '+94% mehr Verkäufe, bis zu 40% weniger Retouren' : '+94% conversion lift, up to 40% fewer returns',
      sketchfab: isTr ? 'B2C topluluk odaklı; dönüşüm telemetrisi zayıf' : isDe ? 'Community-Fokus, schwache E-Commerce-Telemetrie' : 'Community focus; weak e-commerce metrics',
      trad2d: isTr ? 'Yüksek iade oranları (%20-30 boyut/oran belirsizliği)' : isDe ? 'Hohe Retouren (20-30%) wegen Größenunsicherheit' : 'High return rates (20-30%) due to scale mismatches',
      winner: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-zinc-700 selection:text-white">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="hover:opacity-90 transition">
              <img src="/brand-dark-theme.webp" alt="3D StoreLink" className="h-16 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="text-gray-400 hover:text-white transition">
              {isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}
            </Link>
            <Link to="/blog" className="text-gray-400 hover:text-white transition hidden sm:block">
              Blog
            </Link>
            <Link to="/karsilastirma" className="text-white font-bold border-b-2 border-zinc-300 pb-0.5">
              {isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison'}
            </Link>
            <Link to="/sozluk" className="text-gray-400 hover:text-white transition hidden md:block">
              {isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary'}
            </Link>
            <LanguageDropdown />
          </div>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-white transition">{isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}</Link>
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
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition">
                  <td className="py-5 px-6 font-medium text-white">{r.feature}</td>
                  <td className="py-5 px-6 border-x border-white/15 bg-white/[0.03] text-zinc-100 font-semibold">
                    {r.storelink}
                  </td>
                  <td className="py-5 px-6 text-gray-300">{r.sketchfab}</td>
                  <td className="py-5 px-6 text-gray-500">{r.trad2d}</td>
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
              to="/upload"
              className="bg-white text-black px-7 py-3.5 font-bold rounded-xl hover:bg-gray-200 transition"
            >
              {isTr ? 'Ücretsiz Model Yükle →' : isDe ? 'Modell hochladen →' : 'Upload Free Model →'}
            </Link>
            <Link
              to="/"
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
            <Link to="/" className="hover:text-white transition">{isTr ? 'Ana Sayfa' : 'Home'}</Link>
            <Link to="/blog" className="hover:text-white transition">Blog</Link>
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
