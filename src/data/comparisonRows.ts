export interface ComparisonRow {
  feature: { tr: string; en: string; de: string };
  storelink: { tr: string; en: string; de: string };
  sketchfab: { tr: string; en: string; de: string };
  trad2d: { tr: string; en: string; de: string };
  winner: boolean;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: {
      tr: 'Endüstriyel CAD Dosya Desteği (STP, STEP, STL)',
      en: 'Industrial CAD Support (STP, STEP, STL)',
      de: 'Industrielles CAD-Dateiformat (STP, STEP, STL)',
    },
    storelink: {
      tr: 'Doğrudan yükleme ve otomatik Web GLB dönüşümü',
      en: 'Native upload & automated Web GLB conversion',
      de: 'Direkter Upload & automatische Konvertierung',
    },
    sketchfab: {
      tr: 'Sınırlı CAD desteği, ek eklenti veya manuel dönüşüm gerektirir',
      en: 'Limited, requires manual pre-conversion',
      de: 'Eingeschränkt, manuelle Konvertierung erforderlich',
    },
    trad2d: {
      tr: 'CAD gösterilemez; sadece render alınmış durağan görsel',
      en: 'Not possible; static renders only',
      de: 'Nicht möglich; nur gerenderte statische Fotos',
    },
    winner: true,
  },
  {
    feature: {
      tr: 'E-Ticaret Tek Satır Iframe / Embed Entegrasyonu',
      en: 'Single-Line E-Commerce Iframe Embed',
      de: 'E-Commerce Einzeiliger Iframe-Embed',
    },
    storelink: {
      tr: 'Shopify, WooCommerce, İkas ve özel web sitelerine < 30 sn',
      en: 'Shopify, WooCommerce & custom CMS in < 30s',
      de: 'Shopify, WooCommerce & eigene Seiten < 30 Sek.',
    },
    sketchfab: {
      tr: 'Ağır iframe, harici pazar yeri markalaması ve gecikmeli yükleme',
      en: 'Heavy iframe with external marketplace branding',
      de: 'Schwerer Iframe mit externem Marketplace-Branding',
    },
    trad2d: {
      tr: 'Çoklu fotoğraf galerisi yüklemesi (açı başına görsel)',
      en: 'Manual multi-angle image gallery upload',
      de: 'Manuelle Fotogalerie pro Blickwinkel',
    },
    winner: true,
  },
  {
    feature: {
      tr: 'Uygulamasız Mobil AR (Apple Quick Look & SceneViewer)',
      en: 'Zero-App Mobile AR (Quick Look & SceneViewer)',
      de: 'App-freies mobiles AR (Apple Quick Look & SceneViewer)',
    },
    storelink: {
      tr: 'Yerleşik 1:1 gerçek ölçekli AR; iOS ve Android tarayıcısında anında',
      en: 'Native 1:1 true-scale AR in iOS & Android browsers',
      de: 'Echtes 1:1 AR direkt im iOS/Android Browser',
    },
    sketchfab: {
      tr: 'Mobil webde sınırlı AR, genellikle uygulama yönlendirmesi ister',
      en: 'Limited mobile web AR, often pushes app install',
      de: 'Eingeschränktes Web-AR, oft App erforderlich',
    },
    trad2d: {
      tr: 'Desteklenmiyor',
      en: 'Not supported',
      de: 'Nicht unterstützt',
    },
    winner: true,
  },
  {
    feature: {
      tr: 'Otomatik Geometrik Sıkıştırma (Draco / Meshopt)',
      en: 'Automated Draco & Meshopt Compression',
      de: 'Automatische Geometrie-Kompression (Draco / Meshopt)',
    },
    storelink: {
      tr: '%85-95 dosya boyutu tasarrufu, mobilde akıcı 60 FPS',
      en: '85–95% file size reduction, fluid 60 FPS on mobile',
      de: '85-95% Dateigrößenreduktion, flüssige 60 FPS',
    },
    sketchfab: {
      tr: 'Temel glTF optimizasyonu, büyük modellerde yüksek bellek tüketimi',
      en: 'Basic glTF, high memory on heavy models',
      de: 'Basis-glTF, hoher Speicherverbrauch bei großen Dateien',
    },
    trad2d: {
      tr: 'WebP / JPG standart görsel sıkıştırması',
      en: 'Standard WebP / JPG image compression',
      de: 'WebP / JPG Standard-Bildkompression',
    },
    winner: true,
  },
  {
    feature: {
      tr: 'Fikri Mülkiyet (CAD IP) & Mesh Güvenliği',
      en: 'CAD IP & Mesh Security',
      de: 'CAD-IP- & Geometrieschutz',
    },
    storelink: {
      tr: 'Orijinal parametrik CAD gizli kalır; yalnızca görsel mesh yayınlanır',
      en: 'Original parametric CAD hidden; visual mesh only',
      de: 'Original-CAD bleibt geschützt; nur visuelles Mesh',
    },
    sketchfab: {
      tr: 'Model indirmeye açıksa ham dosya kopyalanabilir',
      en: 'Models can often be scraped or downloaded',
      de: 'Modell kann oft kopiert oder heruntergeladen werden',
    },
    trad2d: {
      tr: '2D görsel ekran görüntüsüyle kolayca kopyalanabilir',
      en: 'Easily copied via screenshot',
      de: 'Einfach per Screenshot kopierbar',
    },
    winner: true,
  },
  {
    feature: {
      tr: 'Dönüşüm Oranı & Ürün İade Etkisi (Benchmark)',
      en: 'Conversion Lift & Return Reduction',
      de: 'Conversion- & Retouren-Impact (Benchmark)',
    },
    storelink: {
      tr: '+%94 dönüşüm artışı, %40\'a varan ürün iade azalması',
      en: '+94% conversion lift, up to 40% fewer returns',
      de: '+94% mehr Verkäufe, bis zu 40% weniger Retouren',
    },
    sketchfab: {
      tr: 'B2C topluluk odaklı; dönüşüm telemetrisi zayıf',
      en: 'Community focus; weak e-commerce metrics',
      de: 'Community-Fokus, schwache E-Commerce-Telemetrie',
    },
    trad2d: {
      tr: 'Yüksek iade oranları (%20-30 boyut/oran belirsizliği)',
      en: 'High return rates (20-30%) due to scale mismatches',
      de: 'Hohe Retouren (20-30%) wegen Größenunsicherheit',
    },
    winner: true,
  },
];
