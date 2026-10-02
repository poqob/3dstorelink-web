import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/auth';

export default function About() {
  const { t, i18n } = useTranslation();
  const { token } = useAuthStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const isTr = i18n.language === 'tr';

  useEffect(() => {
    document.title = isTr
      ? '3D StoreLink Platformu | CAD to Web 3D & AR Dağıtım Altyapısı'
      : '3D StoreLink Platform | CAD to Web 3D & AR Distribution Infrastructure';
    window.scrollTo(0, 0);
  }, [isTr]);

  const contactMailSubject = isTr ? 'Bilgi Almak İstiyorum' : 'Information Request';
  const contactMailBody = isTr
    ? 'Merhaba 3D StoreLink Ekibi,\n\nPlatformunuz ve çözümleriniz hakkında detaylı bilgi almak istiyorum.\n\nAd Soyad:\nFirma:\nTelefon:'
    : 'Hello 3D StoreLink Team,\n\nI would like to get detailed information about your platform and solutions.\n\nName:\nCompany:\nPhone:';
  const heroMailto = `mailto:info@3dstorelink.com?subject=${encodeURIComponent(contactMailSubject)}&body=${encodeURIComponent(contactMailBody)}`;

  const accountMailSubject = isTr ? 'Hesap Açma Talebi' : 'Account Opening Request';
  const accountMailBody = isTr
    ? 'Hesap Açmak istiyorum\n\nFirma Adı:\nYetkili Adı Soyadı:\nTelefon:\nE-posta:'
    : 'I would like to open an account\n\nCompany Name:\nContact Person:\nPhone:\nEmail:';
  const bottomMailto = `mailto:info@3dstorelink.com?subject=${encodeURIComponent(accountMailSubject)}&body=${encodeURIComponent(accountMailBody)}`;

  const embedCodeSample = `<iframe
  src="https://view.3dstorelink.com/model-slug?autoRotate=1&enableAR=1&bgColor=111111"
  width="100%"
  height="500"
  frameborder="0"
  allow="xr-spatial-tracking"
></iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCodeSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = isTr
    ? [
        {
          q: '3D StoreLink tam olarak nedir ve ne işe yarar?',
          a: '3D StoreLink; e-ticaret siteleri, endüstriyel üreticiler ve 3D tasarımcılar için geliştirilmiş bulut tabanlı bir 3D & AR model yayınlama altyapısıdır. Ağır CAD modellerinizi (STP, STEP, STL, OBJ) saniyeler içinde hafif, web dostu GLB formatına çevirir ve tek satır embed koduyla web sitenize entegre etmenizi sağlar.',
        },
        {
          q: 'E-ticarette 3D ve AR kullanmanın işletmelere somut faydası nedir?',
          a: 'Müşteriler ürünü satın almadan önce 360 derece inceleyebildiği ve kendi odalarında 1:1 ölçekli AR ile test edebildiği için ürün iade oranları %40\'a varan oranda düşer. Sayfada geçirilen süre ve satışa dönüşüm oranları ortalama 2.5 kat artış gösterir.',
        },
        {
          q: 'Müşterilerimin AR (Artırılmış Gerçeklik) deneyimi için uygulama indirmesi gerekir mi?',
          a: 'Kesinlikle hayır. 3D StoreLink tamamen WebXR, iOS QuickLook ve Android Scene Viewer standartları üzerinde çalışır. Kullanıcılar iPhone veya Android telefonlarının kamerasını açarak herhangi bir ek uygulama indirmeden ürünü anında gerçek ortamlarında deneyimler.',
        },
        {
          q: 'Hangi dosya formatlarını yükleyebilirim ve dönüşüm nasıl gerçekleşir?',
          a: 'Platformumuz endüstride yaygın kullanılan STP (.step / .stp), STL (.stl), OBJ (.obj) ve GLB/GLTF formatlarını tam destekler. Yüklenen CAD modelleri bulut ortamındaki optimizasyon motorumuz tarafından taranır; poligon sayısı ve dokular kalite kaybı yaşanmadan sıkıştırılarak Web GLB formatına dönüştürülür.',
        },
        {
          q: 'Orijinal CAD modellerimin güvenliği nasıl sağlanır?',
          a: '3D StoreLink, kurumsal veri gizliliğini önceliklendirir. Orijinal CAD dosyalarınız şifrelenmiş depolama alanında saklanır. Ziyaretçilerinize veya müşterilerinize sadece webde gösterim için optimize edilen görsel GLB mesh sunulur; siz izin vermedikçe orijinal CAD çizimleri dışarıya kapalıdır.',
        },
        {
          q: 'Shopify, WooCommerce, İkas veya özel yazılımlara nasıl entegre ederim?',
          a: 'Panelimizden veya Showcase sayfasından modelinizin embed kodunu kopyalayıp web sitenizdeki ürün açıklama alanına veya özel HTML bloklarına yapıştırmanız yeterlidir. Tüm süreç 30 saniyeden kısa sürer.',
        },
      ]
    : [
        {
          q: 'What exactly is 3D StoreLink and what does it do?',
          a: '3D StoreLink is a cloud-based 3D & AR model distribution infrastructure tailored for e-commerce, industrial manufacturers, and 3D designers. It automatically converts heavy CAD models (STP, STEP, STL, OBJ) into lightweight, web-optimized GLB files and lets you embed them onto any website with a single line of code.',
        },
        {
          q: 'How does 3D & AR improve e-commerce performance?',
          a: 'By allowing customers to inspect products in 360 degrees and preview them in true-to-scale AR in their own living space, return rates decrease by up to 40% while conversion rates and time-on-page increase by up to 2.5x.',
        },
        {
          q: 'Do customers need to download a separate mobile app for AR?',
          a: 'No app required. 3D StoreLink operates directly on WebXR, Apple iOS QuickLook, and Google Scene Viewer standards. Shoppers simply tap the AR icon in their mobile browser to place the model in their room immediately.',
        },
        {
          q: 'Which formats are supported and how does conversion work?',
          a: 'We support standard industrial CAD formats including STP (.step / .stp), STL (.stl), OBJ (.obj), and GLB/GLTF. When you upload a file, our cloud engine optimizes topology, geometry, and textures, creating an ultra-fast Web GLB version.',
        },
        {
          q: 'How is the security and IP of my CAD files protected?',
          a: 'Security and IP protection are fundamental. Original CAD engineering drawings are kept encrypted and secure. Web visitors only interact with the lightweight surface mesh (GLB); original CAD blueprints are never exposed unless explicitly permitted by you.',
        },
        {
          q: 'How do I embed models into Shopify, WooCommerce, or custom websites?',
          a: 'Just copy the provided iframe embed code and paste it into any HTML block, product description, or CMS page. It takes less than 30 seconds to go live.',
        },
      ];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: '3D StoreLink',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Web, iOS, Android',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '28',
          bestRating: '5',
          worstRating: '1',
        },
        description:
          'Cloud-based 3D model viewer, CAD to Web GLB converter, and Augmented Reality (AR) embedding platform.',
        url: 'https://3dstorelink.com/',
      },
      {
        '@type': 'Organization',
        name: '3D StoreLink',
        url: 'https://3dstorelink.com/',
        logo: 'https://3dstorelink.com/brand.png',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@3dstorelink.com',
          contactType: 'customer support',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 transition hover:opacity-90">
            <img src="/brand-dark-theme.webp" alt="3D StoreLink Logo" className="h-14 sm:h-16 w-auto" />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language switch */}
            <div className="flex gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => i18n.changeLanguage('tr')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition ${
                  isTr ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                TR
              </button>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition ${
                  !isTr ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              to="/about"
              className="text-white text-sm font-semibold border-b-2 border-white pb-0.5 hidden sm:block"
            >
              Platform
            </Link>
            <Link
              to="/#showcase"
              className="text-gray-400 hover:text-white text-sm font-medium transition hidden sm:block"
            >
              {t('nav.showcase')}
            </Link>
            <Link
              to="/#upload"
              className="text-gray-400 hover:text-white text-sm font-medium transition hidden sm:block"
            >
              {t('nav.upload')}
            </Link>
            <a
              href={token ? 'https://dash.3dstorelink.com/dashboard' : 'https://dash.3dstorelink.com/login'}
              className="bg-white text-black px-4 py-2 text-sm font-bold rounded-lg hover:bg-gray-200 transition shadow-sm"
            >
              {token ? t('nav.dashboard') : t('nav.login')}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
            {isTr ? (
              <>
                Web ve E-Ticaret İçin{' '}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  Yeni Nesil 3D & AR
                </span>{' '}
                Yayınlama Ekosistemi
              </>
            ) : (
              <>
                The Next-Generation{' '}
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                  3D & AR Publishing
                </span>{' '}
                Ecosystem for Web
              </>
            )}
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            {isTr
              ? '3D StoreLink; endüstriyel CAD çizimlerinizi (STP, STEP, STL, OBJ) saniyeler içinde yüksek performanslı Web GLB modellerine dönüştürür. Ürünlerinizi her web sitesine, e-ticaret altyapısına ve mobil ortama tek tıkla 3D & AR olarak entegre etmenizi sağlar.'
              : '3D StoreLink automatically transforms industrial CAD designs (STP, STEP, STL, OBJ) into ultra-optimized Web GLB models. Embed 3D and Augmented Reality (AR) product experiences onto any website with a single line of code.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={heroMailto}
              className="w-full sm:w-auto bg-white text-black font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-[0_0_25px_rgba(255,255,255,0.2)] text-sm"
            >
              {isTr ? 'Bize Ulaşın →' : 'Contact Us →'}
            </a>
            <Link
              to="/#showcase"
              className="w-full sm:w-auto border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/5 transition text-sm"
            >
              {isTr ? 'Showcase Modelleri Keşfet' : 'Explore Showcase Models'}
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-white/10 text-left">
            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">%80+</div>
              <div className="text-xs text-gray-400 mt-1">
                {isTr ? 'Dosya Boyutu Optimizasyonu' : 'File Size Reduction'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-green-400">&lt; 1 sn</div>
              <div className="text-xs text-gray-400 mt-1">
                {isTr ? 'Hızlı CDN Dağıtımı' : 'Global CDN Loading'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">1:1 AR</div>
              <div className="text-xs text-gray-400 mt-1">
                {isTr ? 'Uygulamasız Gerçek Boyut' : 'App-free Mobile AR'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">2.5x</div>
              <div className="text-xs text-gray-400 mt-1">
                {isTr ? 'E-Ticaret Dönüşüm Artışı' : 'Higher Conversions'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem & Solution ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {isTr ? 'Neden 3D StoreLink?' : 'Why 3D StoreLink?'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isTr
              ? 'Geleneksel 2D fotoğraflar müşteri kararlarını ve mühendislik detaylarını aktarmakta yetersiz kalır.'
              : 'Flat 2D product photos no longer meet modern buyer expectations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
            <div className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-3">
              {isTr ? '❌ Geleneksel Yöntemlerin Zorlukları' : '❌ Traditional Challenges'}
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 mt-0.5">•</span>
                <span>
                  {isTr
                    ? 'CAD (STP, STEP) dosyaları onlarca megabayttır ve tarayıcılarda doğrudan gösterilemez.'
                    : 'Heavy CAD files (STP, STEP) cannot render directly inside browsers.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 mt-0.5">•</span>
                <span>
                  {isTr
                    ? '2D fotoğraflar boyut ve ölçek hissi veremediği için e-ticarette yüksek iade oranlarına yol açar.'
                    : '2D product photos result in higher return rates due to scale and texture uncertainty.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 mt-0.5">•</span>
                <span>
                  {isTr
                    ? '3D viewer entegrasyonu için uzman yazılımcı ve karmaşık 3D kütüphaneler gerekir.'
                    : 'Integrating custom 3D web engines requires expensive 3D developer teams.'}
                </span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-blue-500/5 border border-blue-500/20">
            <div className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-3">
              {isTr ? '✅ 3D StoreLink Çözümü' : '✅ The 3D StoreLink Advantage'}
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>
                  {isTr
                    ? 'Dosyanızı yükleyin; bulut motorumuz otomatik olarak ultra hafif Web GLB üretir.'
                    : 'Upload any file; our cloud engine produces ultra-compressed Web GLB automatically.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>
                  {isTr
                    ? 'Müşteriler telefon kamerasını açarak ürünü anında gerçek odalarında 1:1 ölçekle dener.'
                    : 'Customers instantly project products into their room with zero-install mobile AR.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>
                  {isTr
                    ? 'Shopify, WooCommerce, Ticimax veya özel web sitenize tek satır iframe ile 30 saniyede ekleyin.'
                    : 'Embed anywhere in 30 seconds with a clean single-line iframe code snippet.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Supported Formats & Conversion ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {isTr ? 'Desteklenen 3D & CAD Formatları' : 'Supported 3D & CAD Formats'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isTr
              ? 'Tasarım ve mühendislik yazılımlarından çıkan modelleri web için kusursuz hale getiriyoruz.'
              : 'Seamlessly convert CAD and mesh models into unified Web 3D standards.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              format: '.STP / .STEP',
              badge: 'CAD Standard',
              desc: isTr
                ? 'SolidWorks, CATIA, Siemens NX, Fusion 360 gibi parametrik CAD yazılımlarının standart formatı.'
                : 'Universal parametric CAD format for SolidWorks, CATIA, Siemens NX, and Fusion 360.',
              color: 'border-blue-500/30',
            },
            {
              format: '.STL',
              badge: '3D Mesh',
              desc: isTr
                ? '3D baskı, tersine mühendislik ve yüzey tarama modelleri için yaygın poligon formatı.'
                : 'Industry standard for 3D printing, scanning, and rapid additive prototyping.',
              color: 'border-cyan-500/30',
            },
            {
              format: '.OBJ',
              badge: 'Visual 3D',
              desc: isTr
                ? 'Blender, 3ds Max, Maya gibi görsel modelleme programlarının klasik dokulu geometri formatı.'
                : 'Classic multi-part textured polygon format for Blender, Maya, and 3ds Max.',
              color: 'border-purple-500/30',
            },
            {
              format: '.GLB / .GLTF',
              badge: 'Web 3D & AR',
              desc: isTr
                ? 'Web ve AR için en yüksek performanslı, Khronos Group onaylı modern web standardı.'
                : 'The gold standard binary format for real-time web rendering and mobile AR.',
              color: 'border-emerald-500/30',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-white/2 border ${item.color} flex flex-col justify-between hover:bg-white/5 transition`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-black text-white font-mono">{item.format}</span>
                  <span className="text-[10px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-gray-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-blue-400 font-semibold flex items-center gap-1">
                <span>⚡ {isTr ? 'Otomatik GLB Dönüşümü' : 'Auto Web GLB Ready'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Single-Line Embed Feature ── */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-b border-white/5">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 sm:p-12 border border-white/15 relative overflow-hidden">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              {isTr ? 'Tek Satır Kodla Tüm Sitelerde Yayında' : 'One Line of Code. Instant Interactive 3D.'}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {isTr
                ? 'Kendi web sitenize, e-ticaret mağazanıza veya blog yazılarınıza 3D model eklemek için hiçbir harici kütüphaneye veya sunucu yapılandırmasına ihtiyacınız yoktur.'
                : 'No complex WebGL libraries, no server configs. Copy your custom embed code and place it anywhere on the web.'}
            </p>
          </div>

          <div className="bg-[#0b0b0f] rounded-xl border border-white/10 p-4 font-mono text-xs text-gray-300 relative mt-6">
            <button
              onClick={copyEmbedCode}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-sans transition flex items-center gap-1.5"
            >
              {copied ? '✓ Kopyalandı' : 'Kodu Kopyala'}
            </button>
            <pre className="overflow-x-auto pr-24 py-1 text-blue-300">{embedCodeSample}</pre>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-b border-white/5">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {isTr ? 'Sıkça Sorulan Sorular (SSS)' : 'Frequently Asked Questions (FAQ)'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isTr
              ? '3D StoreLink platformu, model dönüşümü ve entegrasyon hakkında merak edilenler.'
              : 'Everything you need to know about 3D StoreLink and 3D web distribution.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-white/2 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-white text-sm sm:text-base">{faq.q}</span>
                  <span className="text-gray-400 text-lg font-mono flex-shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
          {isTr ? '3D Modellerinizi Dünyaya Açın' : 'Bring Your 3D Models to the World'}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          {isTr
            ? 'İlk modelinizi yükleyin veya hesabınızı oluşturup 3D StoreLink ekosisteminin tüm avantajlarından yararlanın.'
            : 'Upload your first model or create an account to start publishing with 3D StoreLink today.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={bottomMailto}
            className="w-full sm:w-auto bg-white text-black font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-lg text-sm"
          >
            {isTr ? 'Hesap Açmak İstiyorum →' : 'Open an Account →'}
          </a>
          <Link
            to="/#upload"
            className="w-full sm:w-auto border border-white/20 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-white/5 transition text-sm"
          >
            {isTr ? 'Hemen Model Yükleyin' : 'Upload Model Now'}
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-xs">
          <div className="flex items-center gap-2">
            <img src="/icon.webp" alt="Logo" className="w-5 h-5 opacity-50" />
            <span>3D StoreLink · DagSolution</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition">
              {isTr ? 'Ana Sayfa' : 'Home'}
            </Link>
            <Link to="/#showcase" className="hover:text-white transition">
              Showcase
            </Link>
            <a href="mailto:info@3dstorelink.com" className="hover:text-white transition">
              info@3dstorelink.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
