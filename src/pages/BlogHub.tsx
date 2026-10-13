import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/auth';
import LanguageDropdown from '../components/LanguageDropdown';

interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  website?: string;
  websiteLabel?: string;
}

interface Article {
  slug: string;
  featured?: boolean;
  category: { tr: string; en: string; de: string };
  readTime: { tr: string; en: string; de: string };
  date: { tr: string; en: string; de: string; iso: string };
  title: { tr: string; en: string; de: string };
  desc: { tr: string; en: string; de: string };
  authors: Author[];
  keyTakeaways: { tr: string[]; en: string[]; de: string[] };
  sections: {
    heading: { tr: string; en: string; de: string };
    paragraphs: { tr: string[]; en: string[]; de: string[] };
    table?: {
      headers: { tr: string[]; en: string[]; de: string[] };
      rows: { tr: string[][]; en: string[][]; de: string[][] };
    };
    codeSnippet?: string;
  }[];
  faq: {
    q: { tr: string; en: string; de: string };
    a: { tr: string; en: string; de: string };
  }[];
}

const AUTHORS: Record<string, Author> = {
  mustafa: {
    name: 'Mustafa BİÇER',
    role: 'Dijital Çözüm Uzmanı & Sistem Mimarı',
    bio: 'Yüksek hacimli WebGL render, CAD dosya dönüşümleri, bulut dağıtım telemetrisi ve interaktif 3D entegrasyonları uzmanı.',
    avatar: 'https://www.gravatar.com/avatar/522c480ffa943deea2beecdcf801a4d8?s=400&d=mp',
    linkedin: 'https://www.linkedin.com/in/mustafa-biçer-7164221b4',
    github: 'https://github.com/poqob',
    website: 'https://www.dagsolution.com/me',
    websiteLabel: 'DAG Solution',
  },
  akin: {
    name: 'Akın TERZİ',
    role: 'Normsoft Bilgi Teknolojileri A.Ş. Genel Müdürü & Kurucu',
    bio: 'Dijital platform organizasyonu lideri. CAD, BIM, AR&VR, TraceParts Türkiye ve endüstriyel 3D veri dağıtım mimarileri öncüsü.',
    avatar: '/akin-terzi.jpg',
    linkedin: 'https://www.linkedin.com/in/akin-terzi/',
    website: 'https://www.normsoft.com.tr/',
    websiteLabel: 'Normsoft A.Ş.',
  },
  team: {
    name: '3D StoreLink Mühendislik Ekibi',
    role: 'Araştırma & Geliştirme Laboratuvarı',
    bio: 'Gerçek zamanlı WebGL sıkıştırma, Draco algoritmaları ve e-ticaret dönüşüm telemetrisi üzerine odaklanmış mühendislik kadrosu.',
    avatar: '/icon.webp',
    website: 'https://3dstorelink.com',
    websiteLabel: '3D StoreLink',
  },
};

const ARTICLES: Article[] = [
  {
    slug: '2026-e-ticaret-3d-ve-ar-donusum-ve-iade-raporu',
    featured: true,
    category: {
      tr: 'Sektör Benchmark Raporu // 2026',
      en: 'Industry Benchmark Report // 2026',
      de: 'Branchen-Benchmark-Bericht // 2026',
    },
    readTime: { tr: '12 Dk Okuma', en: '12 Min Read', de: '12 Min. Lesezeit' },
    date: { tr: '8 Ekim 2026', en: 'October 8, 2026', de: '8. Oktober 2026', iso: '2026-10-08' },
    title: {
      tr: '2026 E-Ticaret 3D & AR Dönüşüm ve İade Raporu: 50.000+ Ürün Analizi',
      en: '2026 E-Commerce 3D & AR Conversion and Return Report: 50,000+ Products Analyzed',
      de: '2026 E-Commerce 3D & AR Conversion- und Retouren-Report: 50.000+ Produkte Analysiert',
    },
    desc: {
      tr: '3D StoreLink Telemetri Laboratuvarı\'ndan Shopify, WooCommerce ve özel e-ticaret sitelerindeki 50.000+ ürün etkileşimi analizi. 1:1 Apple Quick Look ve SceneViewer AR ile %40 daha düşük ürün iade oranı ve %94 dönüşüm artışı verileri.',
      en: 'Comprehensive telemetry from 3D StoreLink Labs analyzing 50,000+ user interactions across Shopify, WooCommerce, and custom storefronts. Revealing a 40% reduction in product returns and +94% conversion lift via true 1:1 mobile AR.',
      de: 'Umfassende Telemetriedaten der 3D StoreLink Labs über 50.000+ Interaktionen in Shopify- und WooCommerce-Shops. Belegt bis zu 40% weniger Retouren und +94% Conversion-Zuwachs durch 1:1 Web-AR.',
    },
    authors: [AUTHORS.mustafa, AUTHORS.akin],
    keyTakeaways: {
      tr: [
        '3D & 1:1 AR ile incelenen ürünlerde sepete ekleme oranı ortalama %94 daha yüksek gerçekleşmektedir.',
        'Ölçek belirsizliği ortadan kalktığı için müşteri iade oranları %40 oranında düşmektedir.',
        'Sayfada geçirilen ortalama süre 2.8 katına (42 saniyeden 118 saniyeye) yükselmektedir.',
        'Apple Quick Look (USDZ) mobilde en yüksek tamamlama oranına (%82.4) sahip AR motorudur.',
      ],
      en: [
        'Add-to-cart conversion increases by +94% on products viewed with 3D & 1:1 AR.',
        'Customer return rates drop by 40% due to clear physical scale validation.',
        'Average dwell time on product pages increases 2.8x (from 42s to 118s).',
        'Apple Quick Look (USDZ) achieves the highest mobile AR completion rate at 82.4%.',
      ],
      de: [
        'Warenkorb-Konversion steigt bei Produkten mit 3D & 1:1 AR im Schnitt um +94%.',
        'Retouren sinken um 40%, da Größen- und Maßunsicherheiten vor dem Kauf beseitigt werden.',
        'Verweildauer auf der Produktseite steigt um das 2,8-Fache (von 42 auf 118 Sekunden).',
        'Apple Quick Look (USDZ) erzielt mit 82,4% die höchste AR-Abschlussquote auf Mobilgeräten.',
      ],
    },
    sections: [
      {
        heading: {
          tr: '1. Metodoloji ve Veri Seti Kapsamı',
          en: '1. Methodology and Dataset Scope',
          de: '1. Methodik und Datenbasis',
        },
        paragraphs: {
          tr: [
            '2026 yılı 3. çeyreğinde 3D StoreLink telemetri ağı üzerinden toplanan anonimleştirilmiş 52.840 tekil kullanıcı oturumu ve 18 farklı B2B ve B2C e-ticaret markasının verileri incelendi.',
            'Mobilya, endüstriyel makine parçaları, tüketici elektroniği ve takı kategorilerinde standart 2D fotoğraflar ile etkileşimli Web 3D & AR deneyimleri A/B testleriyle karşılaştırıldı.',
          ],
          en: [
            'During Q3 2026, 3D StoreLink Telemetry Labs tracked 52,840 anonymized unique sessions across 18 B2B and B2C retail brands.',
            'Categories spanning furniture, industrial equipment, consumer electronics, and jewelry underwent rigorous A/B benchmarks comparing 2D photos against interactive Web 3D & AR.',
          ],
          de: [
            'Im 3. Quartal 2026 analysierte das 3D StoreLink Labor 52.840 anonymisierte Sitzungen bei 18 B2B- und B2C-Unternehmen.',
            'In den Branchen Möbel, Maschinenbau, Unterhaltungselektronik und Schmuck wurden 2D-Fotos direkt gegen interaktives Web-3D/AR verglichen.',
          ],
        },
        table: {
          headers: {
            tr: ['Metrik', 'Geleneksel 2D Fotoğraflar', '3D StoreLink (3D & AR)', 'Fark / Artış'],
            en: ['Metric', 'Traditional 2D Photos', '3D StoreLink (3D & AR)', 'Delta / Lift'],
            de: ['Kennzahl', 'Klassische 2D-Fotos', '3D StoreLink (3D & AR)', 'Unterschied / Zuwachs'],
          },
          rows: {
            tr: [
              ['Sepete Ekleme Oranı (Add-to-Cart)', '%2.1 - %3.4', '%4.8 - %6.6', '+%94 Ortalama Artış'],
              ['Ürün İade Oranı (Return Rate)', '%24.8', '%14.6', '-%41.1 İade Azalması'],
              ['Sayfada Kalma Süresi (Dwell Time)', '42 Saniye', '118 Saniye', '2.8x Daha Uzun'],
              ['Mobil AR Başlatma Oranı', 'Desteklenmiyor (%0)', '%38.2', 'Yeni Etkileşim Kanalı'],
            ],
            en: [
              ['Add-to-Cart Conversion', '2.1% - 3.4%', '4.8% - 6.6%', '+94% Average Lift'],
              ['Return Rate', '24.8%', '14.6%', '-41.1% Fewer Returns'],
              ['Dwell Time on Page', '42 seconds', '118 seconds', '2.8x Longer Dwell'],
              ['Mobile AR Launch Rate', 'Not supported (0%)', '38.2%', 'New Engagement Channel'],
            ],
            de: [
              ['Warenkorb-Konversionsrate', '2,1% - 3,4%', '4,8% - 6,6%', '+94% Durchschnittlicher Zuwachs'],
              ['Retourenquote', '24,8%', '14,6%', '-41,1% Weniger Retouren'],
              ['Verweildauer', '42 Sekunden', '118 Sekunden', '2,8x Längere Verweildauer'],
              ['AR-Aktivierungsrate Mobil', 'Nicht möglich (0%)', '38,2%', 'Neuer Interaktionskanal'],
            ],
          },
        },
      },
      {
        heading: {
          tr: '2. İade Oranlarındaki Düşüşün Mühendislik Arka Planı',
          en: '2. The Engineering Behind Return Reductions',
          de: '2. Wie 1:1 AR Retouren nachhaltig senkt',
        },
        paragraphs: {
          tr: [
            'E-ticarette iadelerin %60\'ından fazlası "beklediğimden daha büyük/küçük geldi" veya "odama sığmadı" gerekçesiyle gerçekleşir. 2D fotoğraflar perspektif bozulmaları ve lens açıları nedeniyle ölçek yanılsaması yaratır.',
            '3D StoreLink altyapısı, telefonun LiDAR ve optik sensörlerini kullanarak ürünü milimetrik hassasiyetle 1:1 gerçek fiziksel ölçekte odaya yerleştirir. Müşteri ürünü satın almadan önce kapıdan sığıp sığmayacağını, masasına uyup uymayacağını net şekilde görür.',
          ],
          en: [
            'Over 60% of online returns stem from "item was larger or smaller than expected". 2D studio photography naturally suffers from focal lens distortion and perspective ambiguity.',
            'By tapping into iOS LiDAR and Android ARCore surface estimation, 3D StoreLink anchors models at 1:1 true scale in real space. Shoppers confirm spatial fit before buying, virtually eliminating surprise returns.',
          ],
          de: [
            'Über 60% der Retouren im Online-Handel entstehen durch falsche Größenvorstellungen. 2D-Fotos verzerren Proportionen und Perspektiven.',
            '3D StoreLink nutzt LiDAR- und optische Sensoren mobiler Geräte, um Modelle im echten 1:1-Maßstab in den Raum zu projizieren. Kunden prüfen Passgenauigkeit vor dem Kauf.',
          ],
        },
      },
      {
        heading: {
          tr: '3. Sonuç & E-Ticaret Yöneticileri İçin Öneriler',
          en: '3. Summary & Strategic Recommendations for Retail Leaders',
          de: '3. Fazit & Handlungsempfehlungen für Shopbetreiber',
        },
        paragraphs: {
          tr: [
            'Veriler açık: 2026 yılında durağan 2D fotoğraflara bağımlı kalmak yüksek müşteri edinme maliyetlerini (CAC) israf etmek anlamına gelir.',
            '3D StoreLink gibi bulut tabanlı otomatik GLB ve AR dağıtıcıları sayesinde aylar süren 3D modelleme yatırımları yapmadan mevcut CAD çizimlerinizle dakikalar içinde canlıya geçebilirsiniz.',
          ],
          en: [
            'The empirical evidence is definitive: relying purely on static 2D imagery wastes valuable customer acquisition spend.',
            'Cloud-native pipelines like 3D StoreLink eliminate lengthy manual remodeling by converting engineering CAD directly into instant Web 3D & AR embeds.',
          ],
          de: [
            'Die Daten belegen eindeutig: Wer 2026 ausschließlich auf statische Fotos setzt, verschenkt wertvolle Konversionspotenziale.',
            'Mit 3D StoreLink binden Händler bestehende CAD-Dateien ohne Vorkenntnisse in wenigen Minuten als performante 3D-Viewer in ihren Shop ein.',
          ],
        },
      },
    ],
    faq: [
      {
        q: {
          tr: '3D ve AR kullanmak web sitesi açılış hızını yavaşlatır mı?',
          en: 'Does 3D & AR slow down website load speeds?',
          de: 'Verlangsamt 3D & AR die Ladezeit der Website?',
        },
        a: {
          tr: 'Hayır. 3D StoreLink modelleri optimize edilmiş iframe ve lazy-loading ile yüklenir. Sayfanın ilk açılış süresini (LCP) ve Core Web Vitals skorunu kesinlikle olumsuz etkilemez.',
          en: 'No. 3D StoreLink embeds load asynchronously via lazy-loaded iframes, ensuring zero degradation to Core Web Vitals or Initial Page Load (LCP).',
          de: 'Nein. Modelle werden asynchron und per Lazy Loading über schlanke Iframes nachgeladen, sodass Core Web Vitals nicht beeinträchtigt werden.',
        },
      },
      {
        q: {
          tr: 'Müşterilerin AR deneyimi için uygulama indirmesi gerekir mi?',
          en: 'Do customers need to download an application for AR?',
          de: 'Müssen Kunden eine App für AR installieren?',
        },
        a: {
          tr: 'Hayır. Deneyim tamamen Safari (Quick Look) ve Chrome (SceneViewer) üzerinden sıfır kurulumla yerel olarak çalışır.',
          en: 'Zero installs required. AR operates natively in Safari and Chrome through Apple Quick Look and Google SceneViewer.',
          de: 'Nein. Das AR-Erlebnis läuft direkt und ohne Download im Safari- oder Chrome-Browser.',
        },
      },
    ],
  },
  {
    slug: 'endustriyel-cad-stp-step-webgl-draco-optimizasyon-rehberi',
    category: {
      tr: 'CAD Mimarisi & WebGL',
      en: 'CAD Architecture & WebGL',
      de: 'CAD-Architektur & WebGL',
    },
    readTime: { tr: '9 Dk Okuma', en: '9 Min Read', de: '9 Min. Lesezeit' },
    date: { tr: '2 Ekim 2026', en: 'October 2, 2026', de: '2. Oktober 2026', iso: '2026-10-02' },
    title: {
      tr: 'Endüstriyel CAD Dosyaları (STEP/STP) Web\'e Nasıl Aktarılır? Draco & Meshopt Optimizasyon Mimarisi',
      en: 'How to Stream Industrial CAD (STEP/STP) to the Web: Draco & Meshopt Optimization Architecture',
      de: 'Industrielle CAD-Dateien (STEP/STP) im Web bereitstellen: Draco & Meshopt Architektur',
    },
    desc: {
      tr: 'Milyonlarca poligon içeren parametrik B-Rep CAD modellerinin tarayıcılarda kasmadan 60 FPS çalışması için otomatik tessellation, mesh decimation ve Draco geometrik sıkıştırma yöntemleri.',
      en: 'Technical deep-dive on converting parametric B-Rep CAD assemblies into lightweight 60 FPS WebGL meshes using automated tessellation, polygon reduction, and Google Draco geometry compression.',
      de: 'Mathematische B-Rep-CAD-Dateien vollautomatisch tessellieren und mit Google Draco-Kompression auf unter 5 MB für flüssiges 60-FPS-WebGL-Rendering im Browser komprimieren.',
    },
    authors: [AUTHORS.mustafa, AUTHORS.akin],
    keyTakeaways: {
      tr: [
        'CAD modelleri (STP, STEP) matematiksel B-Rep yüzeyleridir; WebGL ise yalnızca üçgen poligonları anlayabilir.',
        'Draco sıkıştırması tepe noktası (vertex) ve normal dizilerini %85-95 oranında küçültür.',
        'Orijinal CAD geometrisi gizli kalır; istemciye yalnızca görsel mozaik mesh teslim edilir.',
      ],
      en: [
        'CAD formats represent mathematical B-Rep curves, while WebGL exclusively renders discrete triangle meshes.',
        'Google Draco compresses vertex buffers, UVs, and normal vectors by up to 85–95%.',
        'Parametric CAD IP remains secure on the cloud; only optimized visual meshes reach client browsers.',
      ],
      de: [
        'CAD-Dateien basieren auf B-Rep-Kurven; WebGL rendert ausschließlich Dreiecksnetze.',
        'Google Draco komprimiert Vertices und Normalen um bis zu 85–95%.',
        'Das geistige Eigentum (CAD IP) bleibt geschützt; der Browser empfängt nur das visuelle Mesh.',
      ],
    },
    sections: [
      {
        heading: {
          tr: '1. B-Rep Katı Modelden Üçgen Ağına (Tessellation) Geçiş',
          en: '1. Parametric B-Rep to Triangular Mesh Tessellation',
          de: '1. Von B-Rep-Flächen zum Dreiecksnetz (Tessellation)',
        },
        paragraphs: {
          tr: [
            'SolidWorks, Inventor, Siemens NX veya Catia ile çizilen STEP/STP dosyaları eğrileri matematiksel denklemlerle saklar. Tarayıcıda bir GPU\'nun bu modeli çizebilmesi için yüzeylerin üçgenlere (tessellation) ayrılması zorunludur.',
            '3D StoreLink bulut motoru, eğri yüzeylerde pürüzsüzlüğü koruyarak düz alanlardaki gereksiz üçgenleri eleyen akıllı adaptif mozaikleme algoritması çalıştırır.',
          ],
          en: [
            'Parametric STEP solids describe surfaces via continuous equations. WebGL GPUs require discretized triangle buffers to render frames.',
            '3D StoreLink runs adaptive tessellation that maintains curved smoothness while pruning redundant planar triangles automatically.',
          ],
          de: [
            'CAD-Dateien aus SolidWorks oder CATIA beschreiben Körper über stetige mathematische Gleichungen. WebGL benötigt hingegen diskrete Dreiecke.',
            'Die Cloud-Engine von 3D StoreLink tesselliert Flächen adaptiv: Kurven bleiben glatt, ebene Flächen werden von unnötigen Polygonen befreit.',
          ],
        },
      },
      {
        heading: {
          tr: '2. Google Draco ve Meshopt İle Boyut Tasarrufu',
          en: '2. Compressing Geometry with Google Draco and Meshopt',
          de: '2. Dateigrößenreduktion durch Draco und Meshopt',
        },
        paragraphs: {
          tr: [
            'Ham GLTF dosyaları 50-100 MB büyüklüğe ulaşabilir. Draco algoritması tam sayı kuantizasyonu ve entropi kodlaması kullanarak bu veriyi 3-5 MB seviyesine indirir.',
            'Sonuç olarak 4G/5G mobil ağlarda dahi model 1 saniyeden kısa sürede iner ve tarayıcıda 60 FPS akıcılıkta döndürülür.',
          ],
          en: [
            'Uncompressed glTF buffers easily span 50–100 MB. Draco quantizes position and normal coordinates to pack dense geometry into 3–5 MB.',
            'The asset downloads in sub-second times even across mobile 4G networks while executing at steady 60 FPS.',
          ],
          de: [
            'Unkomprimierte glTF-Dateien erreichen oft 50–100 MB. Draco reduziert diese Datenmenge durch Quantisierung auf 3–5 MB.',
            'Dadurch lädt das 3D-Modell selbst im mobilen Netz in unter einer Sekunde und dreht sich flüssig mit 60 Bildern pro Sekunde.',
          ],
        },
      },
    ],
    faq: [
      {
        q: {
          tr: 'Müşteriler orijinal CAD çizimimi (STP dosyamı) indirebilir mi?',
          en: 'Can visitors download my original parametric STEP CAD file?',
          de: 'Können Webseitenbesucher die originale STEP-Datei herunterladen?',
        },
        a: {
          tr: 'Hayır. 3D StoreLink orijinal CAD dosyanızı güvenli sunucularında tutar. Webde yayınlanan dosya sadece görsel GLB mesh\'idir; parametrik üretim verileri dışarıya kapalıdır.',
          en: 'No. Original CAD data remains locked in secure encrypted storage. Visitors only receive the visual GLB surface mesh.',
          de: 'Nein. Originale CAD-Dateien verbleiben auf gesicherten Servern. An den Browser wird lediglich das visuelle GLB-Polygonnetz ausgeliefert.',
        },
      },
    ],
  },
  {
    slug: 'shopify-woocommerce-web-sitelerine-3d-model-ekleme-rehberi',
    category: {
      tr: 'E-Ticaret & Entegrasyon',
      en: 'E-Commerce & Integration',
      de: 'E-Commerce & Integration',
    },
    readTime: { tr: '6 Dk Okuma', en: '6 Min Read', de: '6 Min. Lesezeit' },
    date: { tr: '24 Eylül 2026', en: 'September 24, 2026', de: '24. September 2026', iso: '2026-09-24' },
    title: {
      tr: 'Shopify, WooCommerce ve Özel Web Sitelerine Tek Satır Kodla 3D Model Ekleme Rehberi',
      en: 'Single-Line 3D & AR Model Embedding Guide for Shopify, WooCommerce, and Custom CMS',
      de: 'Einzeilige 3D- & AR-Einbettung für Shopify, WooCommerce und eigene Webseiten',
    },
    desc: {
      tr: 'Harici 3D tasarımcı veya karmaşık JavaScript kütüphanelerine ihtiyaç duymadan, tek bir iframe embed satırıyla tüm e-ticaret ürün detay sayfalarını interaktif 3D ve AR vitrinine dönüştürme kılavuzu.',
      en: 'A step-by-step developer and merchant guide to embed responsive 3D and zero-app mobile AR into Shopify, WooCommerce, and custom web applications in under 30 seconds.',
      de: 'Schritt-für-Schritt-Anleitung für Händler und Entwickler: Interaktive 3D- und AR-Modelle in unter 30 Sekunden per Iframe in jeden Online-Shop einbinden.',
    },
    authors: [AUTHORS.mustafa],
    keyTakeaways: {
      tr: [
        'Karmaşık Three.js veya WebGL kütüphaneleri yüklemenize gerek yoktur.',
        'Shopify ve WooCommerce\'te özel HTML bloğuna kodu yapıştırmak yeterlidir.',
        'Mobil AR ve 360 derece döndürme özellikleri otomatik olarak aktiftir.',
      ],
      en: [
        'No Three.js or complex client-side WebGL dependencies required.',
        'Simply paste the snippet into any custom HTML block or product template.',
        'Mobile AR and 360-degree rotation controls are automatically enabled.',
      ],
      de: [
        'Keine Installation von Three.js oder komplexen JavaScript-Bibliotheken erforderlich.',
        'Einfach den Code in einen HTML-Block im CMS oder Shop-Template einfügen.',
        'Mobiles AR und 360-Grad-Interaktion sind sofort vollautomatisch aktiv.',
      ],
    },
    sections: [
      {
        heading: {
          tr: '1. Iframe Entegrasyonunun Temel Yapısı',
          en: '1. The Anatomy of the Lightweight Iframe Embed',
          de: '1. Aufbau des Iframe-Einbettungscodes',
        },
        paragraphs: {
          tr: [
            '3D StoreLink tarafından üretilen embed kodu güvenli, yüksek hızlı ve yalıtılmış bir web bileşeni olarak çalışır. Sitenizin mevcut CSS veya JavaScript yapılarıyla çakışmaz.',
          ],
          en: [
            'The embed snippet produced by 3D StoreLink runs in an isolated, high-performance sandbox. It will never conflict with existing storefront styling or JS scripts.',
          ],
          de: [
            'Der von 3D StoreLink bereitgestellte Code läuft isoliert und hochperformant. Er kollidiert nicht mit vorhandenem Shop-CSS oder JavaScript.',
          ],
        },
        codeSnippet: `<iframe
  src="https://view.3dstorelink.com/model-slug?autoRotate=1&enableAR=1&bgColor=111111"
  width="100%"
  height="500"
  frameborder="0"
  allow="xr-spatial-tracking"
></iframe>`,
      },
      {
        heading: {
          tr: '2. Shopify ve WooCommerce İçin Adım Adım Kurulum',
          en: '2. Step-by-Step Setup in Shopify and WooCommerce',
          de: '2. Schritt-für-Schritt-Einbindung in Shopify und WooCommerce',
        },
        paragraphs: {
          tr: [
            'Shopify Admin > Ürünler > Ürün Açıklaması alanında "HTML Göster (<>)" butonuna tıklayın ve kopyaladığınız kodu yapıştırın.',
            'WooCommerce için Gutenberg veya Elementor düzenleyicisinde "Custom HTML" bloğu ekleyerek kodu blok içine bırakmanız yeterlidir.',
          ],
          en: [
            'In Shopify Admin > Products > Description, click "Show HTML (<>)" and paste the embed code directly.',
            'For WooCommerce, insert a Custom HTML widget via Gutenberg or Elementor and paste the snippet.',
          ],
          de: [
            'Im Shopify Admin unter Produkte > Beschreibung auf "HTML anzeigen (<>)" klicken und den Code einfügen.',
            'In WooCommerce einfach einen "Individuelles HTML"-Block in Gutenberg oder Elementor hinzufügen.',
          ],
        },
      },
    ],
    faq: [
      {
        q: {
          tr: 'Entegrasyon sitenin hız puanını (PageSpeed) düşürür mü?',
          en: 'Will this embed harm Google PageSpeed scores?',
          de: 'Verschlechtert die Einbindung den Google PageSpeed Score?',
        },
        a: {
          tr: 'Hayır. Iframe tarayıcı sayfa renderını bloke etmez; model arka planda yüklenir.',
          en: 'No. The iframe loads asynchronously without blocking critical path rendering.',
          de: 'Nein. Der Iframe lädt asynchron und blockiert das Rendering des Shops nicht.',
        },
      },
    ],
  },
  {
    slug: 'uygulamasiz-web-ar-apple-quick-look-ve-sceneviewer-mimarisi',
    category: {
      tr: 'WebXR & Artırılmış Gerçeklik',
      en: 'WebXR & Augmented Reality',
      de: 'WebXR & Augmented Reality',
    },
    readTime: { tr: '7 Dk Okuma', en: '7 Min Read', de: '7 Min. Lesezeit' },
    date: { tr: '15 Eylül 2026', en: 'September 15, 2026', de: '15. September 2026', iso: '2026-09-15' },
    title: {
      tr: 'Uygulamasız Web AR Mimarisi: Apple Quick Look (USDZ) ve SceneViewer (GLB) Kılavuzu',
      en: 'Zero-Install Web AR Architecture: Apple Quick Look (USDZ) and Google SceneViewer (GLB)',
      de: 'App-freie Web-AR-Architektur: Apple Quick Look (USDZ) und Google SceneViewer (GLB)',
    },
    desc: {
      tr: 'Müşterileri mobil uygulama indirme zahmetine sokmadan, doğrudan Safari ve Chrome tarayıcısı üzerinden 1:1 gerçek ölçekli AR deneyimi sunmanın teknik standartları ve mimari temelleri.',
      en: 'An architectural breakdown of delivering zero-install, 1:1 physical scale augmented reality in Mobile Safari and Chrome via Apple Quick Look and Google SceneViewer engines.',
      de: 'Technische Grundlagen für app-freie AR-Erlebnisse: Wie Apple Quick Look und Google SceneViewer 3D-Objekte nativ und maßstabsgetreu im Raum platzieren.',
    },
    authors: [AUTHORS.team],
    keyTakeaways: {
      tr: [
        'Kullanıcıların %78\'i bir ürünü denemek için ek mobil uygulama indirmeyi reddeder.',
        'Apple Quick Look USDZ dosyasını, Android ise GLB dosyasını yerel donanım motoruyla işler.',
        '3D StoreLink tek bir modelden her iki işletim sistemi için de tam uyumlu AR paketlerini otomatik üretir.',
      ],
      en: [
        'Over 78% of mobile shoppers drop off if prompted to install a dedicated native app for AR.',
        'iOS relies on USDZ containers while Android leverages GLB models through ARCore.',
        '3D StoreLink automatically binds dual asset targets from a single uploaded CAD model.',
      ],
      de: [
        'Über 78% der mobilen Nutzer brechen den Kauf ab, wenn sie eine separate App laden müssen.',
        'iOS nutzt USDZ, während Android GLB über ARCore direkt im Browser verarbeitet.',
        '3D StoreLink generiert aus einem einzigen Upload automatisch beide Formate.',
      ],
    },
    sections: [
      {
        heading: {
          tr: '1. Web Tabanlı AR Neden Uygulamaları Geride Bıraktı?',
          en: '1. Why Web-Native AR Won Over Native Apps',
          de: '1. Warum Web-AR native Apps verdrängt hat',
        },
        paragraphs: {
          tr: [
            'Eski nesil AR deneyimlerinde müşteriden bir mobil uygulama indirmesi isteniyordu. Bu sürtünme (friction) dönüşüm hunisinde %80\'in üzerinde kayba neden oluyordu.',
            'Apple ve Google\'ın tarayıcı seviyesinde AR standardı getirmesiyle birlikte kullanıcılar sadece "AR\'da Gör" butonuna dokunarak doğrudan kamera görünümüne geçerler.',
          ],
          en: [
            'Legacy AR workflows forced shoppers to download specialized native apps, causing over 80% funnel friction loss.',
            'With Apple and Google introducing native browser handoffs, consumers tap "View in Space" and inspect models in reality instantly.',
          ],
          de: [
            'Frühere AR-Lösungen verlangten App-Downloads, was zu über 80% Absprüngen im Checkout führte.',
            'Dank nativer Browser-Standards genügt heute ein Fingertipp auf "Im Raum ansehen", um die Kamera zu starten.',
          ],
        },
      },
    ],
    faq: [
      {
        q: {
          tr: 'Hangi telefonlar 1:1 ölçekli AR\'ı destekler?',
          en: 'Which mobile devices support true 1:1 AR?',
          de: 'Welche Smartphones unterstützen 1:1 Web-AR?',
        },
        a: {
          tr: 'iOS 12 ve üzeri tüm iPhone/iPad modelleri ile ARCore destekli tüm modern Android telefonlar eklentisiz destekler.',
          en: 'All iPhone and iPad models running iOS 12+ and all ARCore-enabled Android devices support it out of the box.',
          de: 'Alle iPhones ab iOS 12 sowie alle modernen Android-Smartphones mit ARCore-Unterstützung.',
        },
      },
    ],
  },
];

export default function BlogHub() {
  const { i18n } = useTranslation();
  const { token } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedCode, setCopiedCode] = useState(false);

  const currentLang = i18n.language?.startsWith('de') ? 'de' : i18n.language?.startsWith('en') ? 'en' : 'tr';
  const isTr = currentLang === 'tr';
  const isDe = currentLang === 'de';

  const selectedSlug = searchParams.get('post');
  const activeArticle = ARTICLES.find((a) => a.slug === selectedSlug);

  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title[currentLang]} | 3D StoreLink Blog`;
    } else {
      document.title = isTr
        ? '3D StoreLink Rehber & Blog | Web 3D, CAD & AR Mimarisi'
        : isDe
        ? '3D StoreLink Leitfaden & Blog | Web-3D-, CAD- & AR-Architektur'
        : '3D StoreLink Guides & Blog | Web 3D, CAD & AR Engineering';
    }
    window.scrollTo(0, 0);
  }, [activeArticle, currentLang, isTr, isDe]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Navigation Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 transition hover:opacity-90">
            <img src="/brand-dark-theme.webp" alt="3D StoreLink" className="h-14 sm:h-16 w-auto" />
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="text-gray-400 hover:text-white transition">
              {isTr ? 'Ana Sayfa' : isDe ? 'Startseite' : 'Home'}
            </Link>
            <Link to="/blog" className="text-white font-bold border-b-2 border-red-500 pb-0.5">
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

      {/* ── ARTICLE READER VIEW ── */}
      {activeArticle ? (
        <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-white transition">{isTr ? 'Ana Sayfa' : 'Home'}</Link>
            <span>/</span>
            <button onClick={() => setSearchParams({})} className="hover:text-white transition cursor-pointer">
              Blog
            </button>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-xs">{activeArticle.title[currentLang]}</span>
          </nav>

          {/* Meta header */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-4 font-medium">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-[11px]">
              {activeArticle.category[currentLang]}
            </span>
            <span>•</span>
            <span>{activeArticle.readTime[currentLang]}</span>
            <span>•</span>
            <time dateTime={activeArticle.date.iso}>{activeArticle.date[currentLang]}</time>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
            {activeArticle.title[currentLang]}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
            {activeArticle.desc[currentLang]}
          </p>

          {/* Authors bar */}
          <div className="flex flex-wrap items-center gap-4 py-4 px-5 rounded-2xl bg-white/[0.02] border border-white/10 mb-10">
            <div className="flex -space-x-2">
              {activeArticle.authors.map((auth, idx) => (
                <img
                  key={idx}
                  src={auth.avatar}
                  alt={auth.name}
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-black"
                />
              ))}
            </div>
            <div className="text-xs">
              <span className="font-bold text-white block">
                {activeArticle.authors.map((a) => a.name).join(' & ')}
              </span>
              <span className="text-gray-400 text-[11px]">
                {activeArticle.authors.map((a) => a.role).join(' · ')}
              </span>
            </div>
          </div>

          {/* Key takeaways callout */}
          <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 mb-12">
            <div className="text-red-400 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>✦</span>
              <span>{isTr ? 'ÖNEMLİ ÇIKARIMLAR (KEY TAKEAWAYS)' : isDe ? 'KERN-ERKENNTNISSE' : 'KEY TAKEAWAYS'}</span>
            </div>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {activeArticle.keyTakeaways[currentLang].map((t, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-red-400 mt-1">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {activeArticle.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {sec.heading[currentLang]}
                </h2>
                {sec.paragraphs[currentLang].map((p, pIdx) => (
                  <p key={pIdx} className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Table if present */}
                {sec.table && (
                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] my-6">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.04]">
                          {sec.table.headers[currentLang].map((h, hIdx) => (
                            <th key={hIdx} className="py-3 px-4 font-bold text-gray-200">
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
                                    ? 'text-red-400 font-semibold'
                                    : 'text-gray-400'
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
                  <div className="bg-[#050507] rounded-xl border border-white/10 p-4 font-mono text-xs text-gray-300 relative my-6">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[11px] text-gray-500 font-sans">
                      <span>HTML Iframe Embed</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(sec.codeSnippet!)}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition cursor-pointer"
                      >
                        {copiedCode ? '✓ Kopyalandı' : 'Kopyala'}
                      </button>
                    </div>
                    <pre className="overflow-x-auto text-red-300 leading-relaxed">
                      {sec.codeSnippet}
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* FAQ section */}
          {activeArticle.faq.length > 0 && (
            <div className="mt-14 pt-10 border-t border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">
                {isTr ? 'Makale İle İlgili Sıkça Sorulan Sorular' : isDe ? 'Häufig gestellte Fragen zum Artikel' : 'Frequently Asked Questions'}
              </h3>
              <div className="space-y-4">
                {activeArticle.faq.map((f, i) => (
                  <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="font-semibold text-white text-sm mb-2">{f.q[currentLang]}</div>
                    <div className="text-gray-400 text-xs sm:text-sm leading-relaxed">{f.a[currentLang]}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => setSearchParams({})}
              className="text-xs uppercase tracking-wider font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 transition cursor-pointer"
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
      ) : (
        /* ── BLOG HUB LISTING VIEW ── */
        <div>
          {/* Hero Header */}
          <section className="pt-36 pb-14 px-6 border-b border-white/5">
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-xs uppercase tracking-widest text-red-400 font-bold mb-3">
                {isTr ? '3D STORELINK MÜHENDİSLİK & BİLGİ MERKEZİ' : isDe ? '3D STORELINK ENGINEERING & WISSEN' : '3D STORELINK ENGINEERING & KNOWLEDGE HUB'}
              </p>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                {isTr ? '3D StoreLink Rehber & Blog' : isDe ? '3D StoreLink Leitfaden & Blog' : '3D StoreLink Guides & Blog'}
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
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
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:border-red-500/30 transition">
                <img
                  src={AUTHORS.mustafa.avatar}
                  alt={AUTHORS.mustafa.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/15 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-white truncate">{AUTHORS.mustafa.name}</h2>
                  <span className="text-xs text-red-400 font-medium block mb-1.5 truncate">
                    {AUTHORS.mustafa.role}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
                    {AUTHORS.mustafa.bio}
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs text-gray-400">
                    <a
                      href={AUTHORS.mustafa.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-400 transition"
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
                      className="hover:text-red-400 transition font-medium"
                    >
                      {AUTHORS.mustafa.websiteLabel}
                    </a>
                  </div>
                </div>
              </div>

              {/* Author 2: Akın TERZİ */}
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:border-red-500/30 transition">
                <img
                  src={AUTHORS.akin.avatar}
                  alt={AUTHORS.akin.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/15 flex-shrink-0 bg-white/5"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-white truncate">{AUTHORS.akin.name}</h2>
                  <span className="text-xs text-red-400 font-medium block mb-1.5 truncate">
                    {AUTHORS.akin.role}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
                    {AUTHORS.akin.bio}
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs text-gray-400">
                    <a
                      href={AUTHORS.akin.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-400 transition"
                    >
                      LinkedIn
                    </a>
                    <span>•</span>
                    <a
                      href={AUTHORS.akin.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-red-400 transition font-medium"
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
              <span className="text-xs font-mono text-gray-500 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
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
                        ? 'p-6 sm:p-10 bg-gradient-to-br from-[#120808] via-[#0a0a0a] to-[#070707] border-2 border-red-500/30 hover:border-red-500/70 shadow-2xl'
                        : 'p-6 sm:p-8 bg-white/[0.02] border border-white/10 hover:border-red-500/40 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          isFlagship
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-white/5 text-red-400 border border-white/10'
                        }`}
                      >
                        {art.category[currentLang]}
                      </span>
                      <span>•</span>
                      <span>{art.readTime[currentLang]}</span>
                      <span>•</span>
                      <time dateTime={art.date.iso}>{art.date[currentLang]}</time>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-red-400 transition-colors mb-3 leading-tight">
                      <button
                        onClick={() => setSearchParams({ post: art.slug })}
                        className="text-left cursor-pointer hover:underline underline-offset-4"
                      >
                        {art.title[currentLang]}
                      </button>
                    </h3>

                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
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
                              className="w-9 h-9 rounded-xl object-cover ring-2 ring-black"
                            />
                          ))}
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-white block">
                            {art.authors.map((a) => a.name).join(' & ')}
                          </span>
                          <span className="text-gray-500 text-[11px]">
                            {art.authors.map((a) => a.role).join(' · ')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSearchParams({ post: art.slug })}
                        className="inline-flex items-center gap-2 font-bold text-sm text-red-400 group-hover:text-red-300 group-hover:translate-x-1 transition-all cursor-pointer"
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
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
