export interface GlossaryTerm {
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

export const GLOSSARY_TERMS: GlossaryTerm[] = [
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
