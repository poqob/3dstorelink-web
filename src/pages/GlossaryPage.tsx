import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/auth';
import LanguageDropdown from '../components/LanguageDropdown';

interface GlossaryTerm {
  term: string;
  category: string;
  definition: {
    tr: string;
    en: string;
    de: string;
  };
  details: {
    tr: string;
    en: string;
    de: string;
  };
}

export default function GlossaryPage() {
  const { i18n } = useTranslation();
  const { token } = useAuthStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const currentLang = i18n.language?.startsWith('de') ? 'de' : i18n.language?.startsWith('en') ? 'en' : 'tr';
  const isTr = currentLang === 'tr';
  const isDe = currentLang === 'de';

  useEffect(() => {
    document.title = isTr
      ? '3D & CAD Mühendislik Terimleri Sözlüğü | 3D StoreLink Kılavuzu'
      : isDe
      ? '3D & CAD Engineering Glossar | 3D StoreLink Leitfaden'
      : '3D & CAD Engineering Glossary | 3D StoreLink Guide';
    window.scrollTo(0, 0);
  }, [isTr, isDe]);

  const terms: GlossaryTerm[] = [
    {
      term: 'STEP / STP (ISO 10303)',
      category: 'CAD',
      definition: {
        tr: 'STEP (.step / .stp), endüstriyel CAD yazılımları (SolidWorks, AutoCAD, CATIA) arasında 3D katı model verilerini geometrik ve topolojik doğruluk kaybı olmadan aktaran uluslararası ISO 10303 standardıdır.',
        en: 'STEP (.step / .stp) is the ISO 10303 international standard for exchanging 3D solid model engineering data across CAD platforms without geometric or topological precision loss.',
        de: 'STEP (.step / .stp) ist der ISO 10303-Standard zum verlustfreien Austausch dreidimensionaler CAD-Volumenmodelle zwischen verschiedenen Konstruktionsprogrammen.',
      },
      details: {
        tr: '3D StoreLink, STEP dosyalarını bulut pipeline\'ında otomatik olarak ayrıştırarak web uyumlu hafif GLB formatına dönüştürür.',
        en: '3D StoreLink parses STEP files server-side and automatically converts them into lightweight, web-optimized GLB models.',
        de: '3D StoreLink parst STEP-Dateien serverseitig und konvertiert sie in schlanke, weboptimierte GLB-Modelle.',
      },
    },
    {
      term: 'GLB (Binary glTF)',
      category: 'Web3D',
      definition: {
        tr: 'GLB, 3D modellerin geometrisini, dokularını (textures), malzemelerini ve animasyonlarını tek bir ikili (binary) dosyada paketleyen, web için optimize edilmiş modern Khronos Group standardıdır.',
        en: 'GLB is the binary container format of glTF 2.0 that packs 3D meshes, textures, materials, and animations into a single compact file optimized for sub-second web delivery.',
        de: 'GLB ist das binäre Container-Format von glTF 2.0, das 3D-Geometrien, Texturen, Materialien und Animationen in einer kompakten Einzeldatei für das Web bündelt.',
      },
      details: {
        tr: 'Web üzerinde "3D\'nin JPEG\'i" olarak kabul edilir; tüm modern web tarayıcılarında eklentisiz çalışır.',
        en: 'Known as the "JPEG of 3D", GLB delivers immediate browser rendering without external plugins.',
        de: 'Gilt als das „JPEG des 3D“ und ermöglicht sofortiges Rendern im Browser ohne zusätzliche Plugins.',
      },
    },
    {
      term: 'Apple Quick Look (USDZ)',
      category: 'AR',
      definition: {
        tr: 'Apple Quick Look, iOS ve iPadOS cihazlarda Safari tarayıcısı üzerinden herhangi bir mobil uygulama indirmeye gerek kalmadan 3D modelleri fiziksel mekanda 1:1 gerçek ölçekte görüntüleyen yerel AR teknolojisidir.',
        en: 'Apple Quick Look is a native iOS/iPadOS AR engine in Mobile Safari that projects 3D models at true 1:1 physical scale without third-party app installations.',
        de: 'Apple Quick Look ist Apples native AR-Technologie für iOS und iPadOS, mit der 3D-Modelle ohne App-Download direkt im Raum platziert werden können.',
      },
      details: {
        tr: 'USDZ formatı ile çalışır. 3D StoreLink, modellerinizi Apple Quick Look ile tam uyumlu olarak otomatik olarak hazırlar.',
        en: 'Powers AR using USDZ. 3D StoreLink automatically binds assets for seamless iOS Quick Look handoff.',
        de: 'Basiert auf USDZ. 3D StoreLink bereitet 3D-Modelle vollautomatisch für Apple Quick Look vor.',
      },
    },
    {
      term: 'Google SceneViewer',
      category: 'AR',
      definition: {
        tr: 'Google SceneViewer, Android cihazlarda Google Chrome üzerinden ek bir uygulama yüklemeksizin ARCore altyapısıyla 3D modelleri kamera aracılığıyla gerçek ortama yansıtan artırılmış gerçeklik motorudur.',
        en: 'Google SceneViewer is an Android-native AR engine that renders interactive 3D assets in physical environments directly from Chrome via ARCore services.',
        de: 'Google SceneViewer ist die native AR-Lösung für Android, mit der 3D-Modelle über Chrome und ARCore maßstabsgetreu in die reale Umgebung projiziert werden.',
      },
      details: {
        tr: 'GLB dosyalarını doğrudan çalıştırır; aydınlatma tahmini ve zemin algılamasıyla fotogerçekçi gölgelendirme sağlar.',
        en: 'Directly consumes GLB models with realistic environmental lighting estimation and floor placement shadows.',
        de: 'Unterstützt GLB direkt und bietet realistische Schatten sowie Lichtanpassung an den Raum.',
      },
    },
    {
      term: 'Draco Geometrik Sıkıştırma',
      category: 'Optimization',
      definition: {
        tr: 'Draco, Google tarafından geliştirilen; 3D meshleri, tepe noktalarını (vertices), normalleri ve UV koordinatlarını %85-95 oranında sıkıştıran açık kaynaklı bir geometrik sıkıştırma kütüphanesidir.',
        en: 'Draco is an open-source geometric compression library developed by Google that compresses 3D meshes, vertex buffers, and normals by up to 85–95%.',
        de: 'Draco ist eine quelloffene Google-Bibliothek, die 3D-Polygonnetze, Vertices und Normalen um bis zu 85–95% komprimiert.',
      },
      details: {
        tr: '100 MB\'lık ağır bir CAD modeli Draco sıkıştırmasıyla 5 MB seviyesine inerek mobilde saniyeler içinde yüklenir.',
        en: 'Reduces large 100 MB CAD models down to ~5 MB, enabling lightning-fast mobile loading.',
        de: 'Reduziert schwere 100-MB-CAD-Dateien auf ca. 5 MB für blitzschnelles Laden auf Mobilgeräten.',
      },
    },
    {
      term: 'PBR (Physically Based Rendering)',
      category: 'Web3D',
      definition: {
        tr: 'PBR, 3D yüzeylerde ışığın fiziksel dünyadaki davranışını (metaliklik, pürüzlülük, yansıma ve kırılma) matematiksel olarak simüle eden fotogerçekçi malzeme modelleme standardıdır.',
        en: 'PBR (Physically Based Rendering) is a computer graphics rendering approach that models real-world light physics (roughness, metallic reflection, ambient occlusion) for lifelike realism.',
        de: 'PBR simuliert physikalisch exakte Lichtreflexionen, Rauheiten und Metallic-Eigenschaften für fotorealistische Oberflächendarstellung.',
      },
      details: {
        tr: '3D StoreLink, PBR iş akışını kullanarak e-ticaretteki ürünlerin kumaş, ahşap, cam veya metal dokularını kusursuz gösterir.',
        en: '3D StoreLink leverages PBR shaders to reproduce authentic metal, glass, fabric, and wood textures.',
        de: '3D StoreLink nutzt PBR, um Texturen wie Holz, Metall oder Glas lebensecht im Web-Viewer darzustellen.',
      },
    },
    {
      term: 'Mesh Decimation (Poligon Azaltma)',
      category: 'Optimization',
      definition: {
        tr: 'Mesh Decimation, bir 3D modelin siluetini ve kritik geometrik detaylarını bozmadan toplam poligon ve üçgen sayısını akıllı algoritmalarla düşürme işlemidir.',
        en: 'Mesh Decimation is an optimization algorithm that reduces polygon face counts while preserving the visual silhouette and surface contours of a 3D model.',
        de: 'Mesh Decimation bezeichnet die intelligente Reduzierung von Polygonen unter Beibehaltung der geometrischen Form und Kontur.',
      },
      details: {
        tr: 'Milyonlarca poligon içeren endüstriyel modelleri web tarayıcısında 60 FPS akıcılıkta çalışacak hafifliğe getirir.',
        en: 'Transforms millions of dense CAD polygons into lean meshes ready for 60 FPS browser rendering.',
        de: 'Ermöglicht flüssiges 60-FPS-Rendern im Browser auch bei ursprünglich komplexen CAD-Konstruktionen.',
      },
    },
    {
      term: 'WebXR & WebGL 2.0',
      category: 'Web3D',
      definition: {
        tr: 'WebGL ve WebXR, web tarayıcılarının doğrudan bilgisayar ve telefonun grafik kartını (GPU) kullanarak eklentisiz 3D grafikler ve sanal/artırılmış gerçeklik deneyimleri sunmasını sağlayan W3C standartlarıdır.',
        en: 'WebGL 2.0 and WebXR are open W3C web standards providing direct GPU hardware acceleration for rendering 3D graphics and AR/VR directly within web browsers.',
        de: 'WebGL 2.0 und WebXR sind offene Web-Standards für hardwarebeschleunigte 3D- und AR-Grafiken direkt im Browser ohne Zusatzsoftware.',
      },
      details: {
        tr: '3D StoreLink, WebGL ve WebXR API\'leri sayesinde tüm masaüstü ve mobil platformlarda sıfır eklentiyle çalışır.',
        en: 'Powers 3D StoreLink cross-browser delivery with zero external software requirements.',
        de: 'Bildet das technologische Fundament von 3D StoreLink für maximale Kompatibilität auf allen Endgeräten.',
      },
    },
    {
      term: 'B-Rep (Boundary Representation)',
      category: 'CAD',
      definition: {
        tr: 'B-Rep, CAD ve katı modelleme yazılımlarında 3D nesneleri yüzey sınırları, kenar eğrileri ve tepe noktalarından oluşan matematiksel denklemlerle temsil eden mühendislik modelidir.',
        en: 'B-Rep (Boundary Representation) is a method for representing 3D solid engineering shapes by the limits of their bounding surfaces, curves, and vertices.',
        de: 'B-Rep ist ein mathematisches Modell zur exakten geometrischen Beschreibung von 3D-Körpern über Begrenzungsflächen und Kanten.',
      },
      details: {
        tr: '3D StoreLink dönüşüm pipeline\'ı, B-Rep parametrelerini koruyarak bunları optimize üçgen mesh\'lere dönüştürür.',
        en: 'Our pipeline tessellates smooth parametric B-Rep solids into ultra-clean triangular WebGL meshes.',
        de: '3D StoreLink tesselliert B-Rep-Flächen vollautomatisch in saubere Dreiecksnetze für den WebGL-Viewer.',
      },
    },
    {
      term: 'Iframe Embed (Tek Satır Entegrasyon)',
      category: 'Integration',
      definition: {
        tr: 'Iframe Embed, 3D StoreLink üzerinde barındırılan etkileşimli bir 3D ve AR modelinin, herhangi bir web sitesine veya e-ticaret platformuna tek bir HTML koduyla gömülmesini sağlayan entegrasyon yöntemidir.',
        en: 'Iframe Embed is a lightweight integration method allowing interactive 3D and AR models hosted on 3D StoreLink to be embedded into any website via a single line of HTML.',
        de: 'Iframe Embed ist eine einzeilige HTML-Integrationsmethode, mit der 3D-Modelle ohne Programmieraufwand in beliebige Shops eingebunden werden.',
      },
      details: {
        tr: 'Shopify, WooCommerce, İkas veya özel yazılımlara 30 saniyede eklenir; sitenin ana hızını etkilemez.',
        en: 'Embeds in Shopify, WooCommerce, or custom CMS in under 30 seconds without hurting page load speed.',
        de: 'Lässt sich in unter 30 Sekunden in Shopify, WooCommerce oder eigene CMS-Seiten einbinden.',
      },
    },
  ];

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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500 selection:text-white">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
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
            <Link to="/karsilastirma" className="text-gray-400 hover:text-white transition hidden md:block">
              {isTr ? 'Karşılaştırma' : isDe ? 'Vergleich' : 'Comparison'}
            </Link>
            <Link
              to="/upload"
              className="bg-white text-black px-4 py-2 text-sm font-bold rounded-lg hover:bg-gray-200 transition"
            >
              {token ? (isTr ? 'Dashboard' : 'Dashboard') : (isTr ? 'Model Yükle' : isDe ? 'Modell hochladen' : 'Upload Model')}
            </Link>
            <LanguageDropdown />
          </div>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-white transition">{isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}</Link>
          <span>/</span>
          <span className="text-gray-300">{isTr ? 'Sözlük' : isDe ? 'Glossar' : 'Glossary'}</span>
        </nav>

        <p className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-3">
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
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
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
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
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
              className="p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-red-500/30 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="text-xl font-bold text-white group-hover:text-red-400">
                    {item.term}
                  </h2>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-red-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {item.definition[currentLang]}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-xs text-gray-500 leading-normal flex items-start gap-2">
                <span className="text-red-400 shrink-0">✦</span>
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
              to="/upload"
              className="bg-white text-black px-7 py-3.5 font-bold rounded-xl hover:bg-gray-200 transition text-sm"
            >
              {isTr ? 'Ücretsiz Model Yükle →' : 'Upload Model →'}
            </Link>
            <Link
              to="/karsilastirma"
              className="border border-white/20 text-white px-7 py-3.5 font-bold rounded-xl hover:bg-white/5 transition text-sm"
            >
              {isTr ? 'Teknik Karşılaştırma' : 'Technical Comparison'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <div className="flex items-center gap-2">
            <img src="/icon.webp" alt="Logo" className="w-5 h-5 opacity-50" />
            <span>3D StoreLink · DagSolution</span>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link to="/" className="hover:text-white transition">{isTr ? 'Ana Sayfa' : 'Home'}</Link>
            <Link to="/blog" className="hover:text-white transition">Blog</Link>
            <Link to="/karsilastirma" className="hover:text-white transition">{isTr ? 'Karşılaştırma' : 'Comparison'}</Link>
            <a href="mailto:info@3dstorelink.com" className="hover:text-white transition">info@3dstorelink.com</a>
            <a href="https://www.instagram.com/3dstorelink/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
            <a href="https://www.linkedin.com/company/3dstorelink/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
