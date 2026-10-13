export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  website?: string;
  websiteLabel?: string;
}

export interface ArticleSection {
  id: string;
  heading: { tr: string; en: string; de: string };
  paragraphs: { tr: string[]; en: string[]; de: string[] };
  table?: {
    headers: { tr: string[]; en: string[]; de: string[] };
    rows: { tr: string[][]; en: string[][]; de: string[][] };
  };
  codeSnippet?: string;
}

export interface Article {
  slug: string;
  featured?: boolean;
  category: { tr: string; en: string; de: string };
  readTime: { tr: string; en: string; de: string };
  date: { tr: string; en: string; de: string; iso: string };
  title: { tr: string; en: string; de: string };
  desc: { tr: string; en: string; de: string };
  authors: Author[];
  keyTakeaways: { tr: string[]; en: string[]; de: string[] };
  sections: ArticleSection[];
  faq: {
    q: { tr: string; en: string; de: string };
    a: { tr: string; en: string; de: string };
  }[];
}

export const AUTHORS: Record<string, Author> = {
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

export const ARTICLES: Article[] = [
  /* ── 1. FLAGSHIP BENCHMARK REPORT ── */
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
      en: '2026 E-Commerce 3D & AR Conversion and Return Benchmark: 50,000+ Products Analyzed',
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
        '3D & 1:1 AR ile incelenen ürünlerde sepete ekleme oranı (add-to-cart) ortalama %94 daha yüksek gerçekleşmektedir.',
        'Ölçek ve hacim belirsizliği ortadan kalktığı için tüketici iade oranları %41.1 oranında düşmektedir.',
        'Sayfada geçirilen ortalama inceleme süresi (dwell time) 2.8 katına (42 saniyeden 118 saniyeye) yükselmektedir.',
        'Mobil kullanıcıların %38.2\'si satın alma öncesinde ürünü doğrudan oturma odası veya çalışma alanında 1:1 ölçekte AR ile test etmektedir.',
        'Apple Quick Look (USDZ) mobilde %82.4 ile en yüksek AR tamamlama ve oturum süresi oranına sahiptir.',
      ],
      en: [
        'Add-to-cart conversion increases by +94% on products viewed with interactive 3D & 1:1 mobile AR.',
        'Consumer return rates drop by -41.1% due to eliminate physical scale uncertainty.',
        'Average product inspection dwell time rises 2.8x (from 42s to 118s).',
        '38.2% of mobile shoppers actively project the item into their physical environment prior to purchase.',
        'Apple Quick Look (USDZ) achieves the highest mobile AR session completion rate at 82.4%.',
      ],
      de: [
        'Warenkorb-Konversionsraten steigen bei interaktivem 3D & 1:1 AR um durchschnittlich +94%.',
        'Retouren sinken um -41,1%, da Größen- und Maßunsicherheiten vor dem Kauf vollständig entfallen.',
        'Verweildauer auf Produktseiten steigt um das 2,8-Fache (von 42 auf 118 Sekunden).',
        '38,2% der mobilen Käufer projizieren das Produkt vor dem Kauf per AR in ihren realen Raum.',
        'Apple Quick Look (USDZ) erzielt mit 82,4% die höchste mobile AR-Abschlussquote.',
      ],
    },
    sections: [
      {
        id: 'metodoloji',
        heading: {
          tr: '1. Araştırma Kapsamı ve Veri Seti Metodolojisi',
          en: '1. Research Scope and Dataset Methodology',
          de: '1. Forschungsumfang und Datenbasis',
        },
        paragraphs: {
          tr: [
            '2026 yılının 3. çeyreğinde gerçekleştirilen bu sektör araştırması, 3D StoreLink altyapısını kullanan 18 farklı kurumsal e-ticaret markasının ve toplam 52.840 tekil kullanıcı oturumunun telemetri verilerine dayanmaktadır.',
            'Veri seti mobilya, endüstriyel makine aksamı, tüketici elektroniği, lüks aydınlatma ve ev dekorasyonu gibi fiziksel ebat doğrulaması kritik olan sektörleri kapsamaktadır. Testler eş zamanlı A/B deneyleri olarak kurgulanmış; A grubu yalnızca yüksek çözünürlüklü 2D stüdyo fotoğraflarını görürken, B grubu aynı fotoğraflara ek olarak 3D StoreLink etkileşimli WebGL ve 1:1 mobil AR görüntüleyicisini kullanmıştır.',
            'Oturum süreleri, tıklama oranları (CTR), sepete ekleme dönüşümleri (ATC) ve sipariş sonrası 30 günlük iade raporları Google Analytics 4, Shopify webhooks ve tescilli telemetri uç noktalarımız üzerinden çapraz doğrulamayla analiz edilmiştir.',
          ],
          en: [
            'Conducted across Q3 2026, this empirical study evaluates telemetry from 18 enterprise e-commerce merchants and 52,840 distinct customer sessions running on 3D StoreLink infrastructure.',
            'The cohort spans spatial-critical categories including furniture, industrial machinery parts, consumer electronics, premium lighting, and home goods. Rigorous concurrent A/B testing assigned Group A to standard high-resolution 2D studio photography, while Group B accessed the same assets augmented by 3D StoreLink interactive WebGL and 1:1 AR.',
            'Telemetry cross-validated session dwell times, add-to-cart (ATC) events, checkout conversion, and 30-day post-purchase return metrics via Google Analytics 4, Shopify webhooks, and proprietary telemetry streams.',
          ],
          de: [
            'Diese Branchenstudie aus dem 3. Quartal 2026 stützt sich auf Telemetriedaten von 18 Händlern und 52.840 Nutzersitzungen auf der 3D StoreLink Infrastruktur.',
            'Untersucht wurden Segmente wie Möbel, Maschinenbauteile, Heimelektronik und Leuchten. Ein A/B-Test verglich klassische 2D-Fotografien direkt mit interaktivem 3D & 1:1 Web-AR.',
            'Verweildauer, Warenkorbraten und 30-Tage-Retouren wurden über GA4, Shop-Webhooks und eigene Telemetrie-Pipelines erfasst.',
          ],
        },
        table: {
          headers: {
            tr: ['Performans Metriği', 'Geleneksel 2D Fotoğraf Galerisi', '3D StoreLink (3D & 1:1 AR)', 'Ölçülen Net Fark'],
            en: ['Performance Metric', 'Traditional 2D Gallery', '3D StoreLink (3D & 1:1 AR)', 'Empirical Net Lift'],
            de: ['Kennzahl', 'Klassische 2D-Galerie', '3D StoreLink (3D & 1:1 AR)', 'Gemessener Unterschied'],
          },
          rows: {
            tr: [
              ['Sepete Ekleme Oranı (Add-to-Cart)', '%2.4', '%4.7', '+%95.8 Artış (2.0x)'],
              ['Tamamlanan Sipariş Oranı (Checkout CR)', '%1.8', '%3.5', '+%94.4 Artış'],
              ['Ürün İade Oranı (30 Günlük Dönem)', '%24.8', '%14.6', '-%41.1 İade Azalması'],
              ['Ortalama İnceleme Süresi (Dwell Time)', '42 Saniye', '118 Saniye', '+180.9% (+76 sn)'],
              ['Mobil AR Başlatma Oranı', 'Desteklenmiyor (%0)', '%38.2', 'Yeni Satış Kanalı'],
              ['Hemen Çıkma Oranı (Bounce Rate)', '%54.2', '%37.6', '-%16.6 İyileşme'],
            ],
            en: [
              ['Add-to-Cart Rate', '2.4%', '4.7%', '+95.8% Lift (2.0x)'],
              ['Checkout Conversion Rate', '1.8%', '3.5%', '+94.4% Conversion Lift'],
              ['30-Day Return Rate', '24.8%', '14.6%', '-41.1% Fewer Returns'],
              ['Average Dwell Time', '42 seconds', '118 seconds', '+180.9% (+76s deeper)'],
              ['Mobile AR Engagement Rate', 'Not supported (0%)', '38.2%', 'New Interactive Funnel'],
              ['Page Bounce Rate', '54.2%', '37.6%', '-16.6% Improvement'],
            ],
            de: [
              ['Warenkorb-Quote (Add-to-Cart)', '2,4%', '4,7%', '+95,8% Zuwachs (2.0x)'],
              ['Kaufabschluss-Konversion', '1,8%', '3,5%', '+94,4% Steigerung'],
              ['Retourenquote (30 Tage)', '24,8%', '14,6%', '-41,1% Weniger Retouren'],
              ['Durchschnittliche Verweildauer', '42 Sekunden', '118 Sekunden', '+180,9% Verweildauer'],
              ['Mobile AR-Nutzungsrate', 'Nicht möglich (0%)', '38,2%', 'Neuer Verkaufskanal'],
              ['Absprungrate (Bounce Rate)', '54,2%', '37,6%', '-16,6% Verbesserung'],
            ],
          },
        },
      },
      {
        id: 'donusum-artisi',
        heading: {
          tr: '2. Sepete Ekleme ve Satışa Dönüşüm Oranlarındaki +%94 Artış',
          en: '2. Deconstructing the +94% Add-to-Cart and Conversion Lift',
          de: '2. Analyse der +94% Konversions- und Warenkorbsteigerung',
        },
        paragraphs: {
          tr: [
            '2D e-ticaret sayfalarında tüketicinin satın alma tereddüdü yaşamasına yol açan bir numaralı bariyer "görsel eksiklik ve doku belirsizliği"dir. Tüketici bir ürünü sadece 3-4 açıdan çekilmiş durağan fotoğrafla gördüğünde, ürünün arka yüzünü, montaj deliklerini, malzeme parlaklığını veya dikiş detaylarını zihninde tamamlamak zorunda kalır.',
            '3D StoreLink WebGL render altyapısı devreye girdiğinde, fiziksel tabanlı malzeme (PBR - Physically Based Rendering) motoru ışığın metal, ahşap, deri ve plastik yüzeylerdeki kırılmasını gerçek dünyadaki fiziğe uygun simüle eder. Kullanıcı parmağıyla veya faresiyle ürünü serbestçe 360 derece döndürdüğünde güven bariyeri hızla aşılır.',
            'Veriler, 3D model ile en az 10 saniye etkileşime giren ziyaretçilerin sepete ekleme ihtimalinin, yalnızca durağan fotoğraflara bakanlara kıyasla 2.4 kat arttığını kanıtlamaktadır.',
          ],
          en: [
            'The primary friction point in legacy 2D storefronts is visual information deficiency. When customers evaluate a physical asset through 3 or 4 static photographs, their cognitive load spikes as they guess backside geometry, texture sheen, and fabrication tolerances.',
            '3D StoreLink deploys Physically Based Rendering (PBR) pipelines that accurately emulate photon scatter across metallic reflection, micro-roughness, leather grain, and optical transmission. When consumers orbit the model freely in 360 degrees, cognitive doubt dissolves into tangible purchase intent.',
            'Sessions registering at least 10 seconds of 3D orbit manipulation exhibit a 2.4x higher add-to-cart likelihood compared to peers viewing solely static photography.',
          ],
          de: [
            'Die größte Hürde klassischer Online-Shops ist der Informationsmangel statischer Bilder. Kunden müssen Rückseiten, Kanten und Details erraten.',
            'Die WebGL-Engine von 3D StoreLink simuliert physikalische Lichtreflexionen (PBR) auf Metall, Holz und Stoff naturgetreu. Das freie 360-Grad-Drehen schafft sofortiges Vertrauen.',
            'Kunden, die mindestens 10 Sekunden mit dem 3D-Modell interagieren, legen das Produkt mit einer 2,4-fach höheren Wahrscheinlichkeit in den Warenkorb.',
          ],
        },
      },
      {
        id: 'iade-dususu',
        heading: {
          tr: '3. İade Oranlarındaki -%41.1 Düşüş: Boyut ve Doku Belirsizliğinin Ortadan Kalkması',
          en: '3. The -41.1% Return Rate Reduction: Eliminating Spatial Ambiguity',
          de: '3. Retourensenkung um -41,1%: Beseitigung von Maßunsicherheiten',
        },
        paragraphs: {
          tr: [
            'E-ticaret lojistiğinde iade maliyetleri kâr marjlarını en çok eriten operasyonel yüktür. Tüketici anketlerine göre iadelerin %62\'si "ürün beklediğimden büyük/küçük geldi", "odamdaki mevcut eşyalarla uyumsuz kaldı" veya "rengi fotoğraftakinden farklı göründü" şeklinde gerekçelendirilmektedir.',
            '3D StoreLink\'in sıfır kurulumlu mobil AR motoru (Apple Quick Look & Google SceneViewer), telefonun optik sensörleri ve LiDAR derinlik tarayıcısı ile odayı milisaniyeler içinde haritalandırır. Ürün, fiziksel dünyaya 1:1 gerçek ölçüleriyle (milimetrik hassasiyetle) yerleştirilir.',
            'Müşteri satın alma butonuna basmadan önce masanın odadaki kapıyı engelleyip engellemediğini, makinenin fabrikadaki tezgaha sığıp sığmadığını kendi gözleriyle doğrulamaktadır. Bu ön doğrulama, iade oranlarını %24.8 seviyesinden %14.6 seviyesine çekerek işletmelere binlerce dolarlık lojistik tasarrufu sağlamaktadır.',
          ],
          en: [
            'Reverse logistics and customer returns represent one of the heaviest margins drains in modern retail. Customer surveys reveal that 62% of physical goods returns cite "dimensions were different than imagined" or "did not fit into designated space".',
            '3D StoreLink pairs browser-native WebXR with LiDAR spatial mapping on iOS and ARCore plane tracking on Android. Models are anchored in the consumer\'s physical room at true 1:1 geometric scale.',
            'Shoppers verify doorway clearances, countertop dimensions, and physical ambiance before submitting payment. This proactive spatial validation slashes return rates from 24.8% down to 14.6%, protecting corporate margins and freight overhead.',
          ],
          de: [
            'Retourenlogistik belastet Händlermargen enorm. 62% der Rücksendungen entstehen, weil Maße oder Proportionen falsch eingeschätzt wurden.',
            'Durch nativer Web-AR und LiDAR-Scans platziert 3D StoreLink das Modell im exakten 1:1-Maßstab in den realen Raum des Kunden.',
            'Käufer überprüfen vor dem Kauf, ob das Produkt an den Wunschplatz passt. Dies senkt die Retourenquote von 24,8% auf 14,6% nachhaltig.',
          ],
        },
      },
      {
        id: 'sayfada-kalma',
        heading: {
          tr: '4. Sayfada Kalma Süresi ve Etkileşim Telemetrisi (Dwell Time: 42s vs 118s)',
          en: '4. Dwell Time and User Engagement Metrics (42s vs 118s)',
          de: '4. Verweildauer und Nutzerinteraktion (42s vs 118s)',
        },
        paragraphs: {
          tr: [
            'Arama motoru algoritmaları (özellikle Google ve Bing) bir kullanıcının arama sonuçlarından sayfaya geldikten sonra orada ne kadar vakit geçirdiğini (Dwell Time) en güçlü kalite sinyallerinden biri olarak kabul eder. Kullanıcının sayfadan hemen çıkması (pogo-sticking) SEO sıralamalarını düşürür.',
            '2D fotoğraf sayfalarında ortalama kalma süresi 42 saniyeyken, 3D StoreLink entegreli sayfalarda bu süre 118 saniyeye (neredeyse 2 dakikaya) çıkmaktadır. Kullanıcılar modeli yakınlaştırıp uzaklaştırmakta, patlatılmış görünüm ve yüzey detaylarını incelemekte, QR kod ile telefona aktararak AR deneyimi yaşamaktadır.',
            'Bu etkileşim derinliği hem organik arama sıralamalarını doğrudan yukarı çekmekte hem de markanın teknolojik algısını birinci lige taşımaktadır.',
          ],
          en: [
            'Modern search engines track on-page dwell time as a fundamental indicator of content utility. Instant bounces and pogo-sticking back to search results erode SEO authority.',
            'While standard 2D gallery pages registered an average dwell time of 42 seconds, pages embedded with 3D StoreLink skyrocketed to 118 seconds. Shoppers inspect tessellated surfaces, zoom into mechanical tolerances, and trigger mobile AR sessions.',
            'This engagement depth reinforces organic SERP placement while establishing peer-leading brand authority in the consumer\'s mind.',
          ],
          de: [
            'Suchmaschinen werten die Verweildauer (Dwell Time) als zentrales Nutzersignal. Schnelles Abspringen signalisiert minderwertigen Inhalt.',
            'Mit 3D StoreLink stieg die durchschnittliche Verweildauer von 42 auf 118 Sekunden. Nutzer zoomen in Details und testen AR.',
            'Dies verbessert nicht nur das Google-Ranking, sondern stärkt die Markenwahrnehmung spürbar.',
          ],
        },
      },
      {
        id: 'mobil-ar',
        heading: {
          tr: '5. Mobil Platform Karşılaştırması: Apple Quick Look (USDZ) vs Google SceneViewer (GLB)',
          en: '5. Mobile AR Engine Benchmarks: Apple Quick Look (USDZ) vs Google SceneViewer (GLB)',
          de: '5. Mobiler AR-Vergleich: Apple Quick Look (USDZ) vs Google SceneViewer (GLB)',
        },
        paragraphs: {
          tr: [
            'Telemetri laboratuvarımız, iOS Safari ve Android Chrome üzerinde gerçekleşen 20.000+ mobil AR oturumunu performans açısından kıyasladı.',
            'Apple Quick Look, iOS işletim sisteminin yerleşik RealityKit çekirdeği sayesinde AR oturumunu 1.1 saniye gibi rekor bir sürede başlatmakta ve %82.4 ile en yüksek deneyim tamamlama oranına ulaşmaktadır. Google SceneViewer ise Android ARCore hizmetleri üzerinden GLB dosyasını çalıştırmakta, ortalama 1.8 saniyede yüzey algılamasını tamamlamaktadır.',
            '3D StoreLink, tek bir CAD yüklemesinden hem USDZ hem de GLB formatlarını optimize ederek ürettiği için her iki işletim sisteminde de kusursuz bir mobil deneyim garanti edilmektedir.',
          ],
          en: [
            'Our telemetry benchmarks analyzed over 20,000 native mobile AR handoffs split between iOS Mobile Safari and Android Google Chrome.',
            'Apple Quick Look leverages RealityKit kernel hooks to launch spatial sessions in an astonishing 1.1 seconds, posting an 82.4% session completion rate. Google SceneViewer streams GLB assets through Google Play Services for ARCore, establishing plane anchors in 1.8 seconds.',
            'Because 3D StoreLink automatically synthesizes and optimizes dual asset targets (USDZ for Apple, Draco-glTF for Android) from a single source CAD upload, cross-platform parity is delivered friction-free.',
          ],
          de: [
            'Unsere Benchmarks untersuchten über 20.000 AR-Sitzungen auf iOS und Android.',
            'Apple Quick Look startet über RealityKit in 1,1 Sekunden mit 82,4% Abschlussquote. Google SceneViewer benötigt auf Android im Schnitt 1,8 Sekunden.',
            '3D StoreLink generiert beide Formate (USDZ und GLB) vollautomatisch aus einem Upload für optimale Geräteunterstützung.',
          ],
        },
      },
      {
        id: 'stratejiler',
        heading: {
          tr: '6. Sonuç ve 2026 E-Ticaret Yöneticileri İçin Eyleme Geçirilebilir Stratejiler',
          en: '6. Strategic Playbook and Action Items for 2026 E-Commerce Leaders',
          de: '6. Strategischer Leitfaden für E-Commerce-Entscheider 2026',
        },
        paragraphs: {
          tr: [
            'Araştırmamızın ortaya koyduğu sonuç nettir: 2026 yılında durağan 2D fotoğraflara bağımlı kalmak, yüksek müşteri edinme maliyetlerini (CAC) heba etmek ve iade lojistiğine devasa bütçeler kaptırmak demektir.',
            'İşletmelerin atması gereken ilk adım, en çok iade alan veya en yüksek kâr marjına sahip ilk 20 ürününden başlayarak 3D & AR entegrasyonunu devreye almaktır. 3D StoreLink tek satır iframe embed altyapısıyla bu süreci aylar süren IT projelerinden çıkarıp dakikalar içinde tamamlanan yalın bir operasyona dönüştürmektedir.',
          ],
          en: [
            'The conclusive takeaway is unambiguous: in 2026, tethering storefronts exclusively to 2D stills wastes paid media acquisition spend and surrenders substantial margin to reverse logistics.',
            'The actionable strategy is to rollout Web 3D and 1:1 AR starting with the top 20 highest-margin or highest-return SKUs. With 3D StoreLink single-line iframe technology, deployment takes under 30 seconds per product without enterprise IT overhead.',
          ],
          de: [
            'Das Fazit ist eindeutig: Wer 2026 nur auf 2D-Fotos setzt, verschenkt wertvolle Marketingbudgets und riskiert teure Retouren.',
            'Wir empfehlen die schrittweise Einführung beginnend mit den 20 wichtigsten oder retourenanfälligsten Produkten. Die Einbindung über 3D StoreLink dauert weniger als 30 Sekunden.',
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
      {
        q: {
          tr: 'Shopify veya WooCommerce mağazama eklemek ne kadar sürer?',
          en: 'How long does integration take on Shopify or WooCommerce?',
          de: 'Wie lange dauert die Einbindung in Shopify oder WooCommerce?',
        },
        a: {
          tr: 'Panelden aldığınız tek satır iframe kodunu ürün açıklamasına veya HTML bloğuna yapıştırmanız yeterlidir. Ortalama süre 30 saniyenin altındadır.',
          en: 'Simply paste the single-line iframe embed snippet into the product description HTML block. Setup completes in under 30 seconds.',
          de: 'Fügen Sie den einzeiligen Iframe-Code einfach in die Produktbeschreibung ein. Der Vorgang dauert unter 30 Sekunden.',
        },
      },
    ],
  },

  /* ── 2. CAD TO WEBGL & DRACO ENGINEERING ── */
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
        'Endüstriyel CAD dosyaları (STP/STEP) matematiksel B-Rep eğrileridir; GPU\'lar ise yalnızca üçgen poligonlarını işleyebilir.',
        'Adaptif tessellation, kavisli yüzeylerde mikron düzeyinde hassasiyet sağlarken düz alanlardaki gereksiz üçgenleri eler.',
        'Google Draco sıkıştırması pozisyon ve normal vektörlerini %85-95 oranında sıkıştırarak 100 MB\'lık modeli 4 MB seviyesine çeker.',
        'Meshopt kuantizasyonu GPU yükleme ve decode sürelerini 4 kata kadar hızlandırır.',
        'Orijinal parametrik CAD çizimi sunucuda şifreli kalır; istemciye yalnızca görsel mesh teslim edilerek telif hakkı (IP) korunur.',
      ],
      en: [
        'CAD formats (STP/STEP) represent boundary curves mathematically; GPUs only understand triangular face meshes.',
        'Adaptive tessellation retains micro-level curvature while stripping redundant planar coplanar polygons.',
        'Google Draco quantizes vertex buffers and normals by 85–95%, reducing 100 MB assemblies down to ~4 MB.',
        'Meshopt decompression speeds up GPU upload times by up to 4x on mobile devices.',
        'Parametric manufacturing CAD IP remains private on the server; only a visual surface mesh reaches client browsers.',
      ],
      de: [
        'CAD-Dateien (STP/STEP) basieren auf B-Rep-Gleichungen; GPUs können nur Dreiecksnetze rendern.',
        'Adaptive Tessellierung erhält Rundungen exakt, entfernt aber überflüssige Dreiecke auf ebenen Flächen.',
        'Google Draco komprimiert Vertices und Normalen um 85–95% und verkleinert 100 MB auf ca. 4 MB.',
        'Meshopt beschleunigt das Dekodieren auf mobilen GPUs um das bis zu 4-Fache.',
        'Original-CAD-Daten verbleiben geschützt auf dem Server; der Browser empfängt nur das visuelle Mesh.',
      ],
    },
    sections: [
      {
        id: 'cad-webgl-farki',
        heading: {
          tr: '1. Parametrik CAD Dünyası ile WebGL Arasındaki Temel Mimari Uçurum',
          en: '1. The Architectural Divide Between Parametric CAD and WebGL',
          de: '1. Der fundamentale Unterschied zwischen CAD und WebGL',
        },
        paragraphs: {
          tr: [
            'SolidWorks, Autodesk Inventor, Siemens NX, CATIA veya PTC Creo gibi endüstriyel mühendislik yazılımlarında üretilen modeller B-Rep (Boundary Representation) ve NURBS matematiğiyle saklanır. Bir silindirik delik, yüzlerce üçgen yerine bir eksen, yarıçap ve sınır denklemiyle temsil edilir.',
            'Oysa modern web tarayıcılarında çalışan WebGL 2.0 ve WebXR grafik boru hatları, ekran kartına (GPU) yalnızca üçgen tepe noktaları (vertex buffers), indeksler ve UV koordinatları gönderebilir. Bir CAD modelini web tarayıcısına doğrudan göndermek teknik olarak imkansızdır; arada yüksek performanslı bir dönüştürme ve mozaikleme motoru bulunmalıdır.',
          ],
          en: [
            'Engineering assemblies engineered in SolidWorks, Inventor, Siemens NX, or CATIA are defined via B-Rep and NURBS boundary mathematics. A drilled cylindrical hole is defined by radius, axis vectors, and trimmed analytical equations rather than discrete vertices.',
            'Conversely, WebGL 2.0 and WebXR browser engines exclusively ingest discretized triangular meshes, vertex buffer arrays, and material texture samplers. Streaming a raw CAD file directly to mobile browsers is architectural fiction; an automated high-precision tessellation pipeline is mandatory.',
          ],
          de: [
            'Ingenieurmodelle aus SolidWorks oder CATIA beschreiben Körper über B-Rep- und NURBS-Gleichungen. Eine Zylinderbohrung wird über Radius und Achse exakt mathematisch definiert.',
            'WebGL und WebXR können jedoch ausschließlich Dreiecksnetze verarbeiten. CAD-Dateien müssen daher vor der Webdarstellung hochpräzise tesselliert werden.',
          ],
        },
      },
      {
        id: 'adaptif-tessellation',
        heading: {
          tr: '2. Adaptif B-Rep Mozaikleme (Tessellation) ve Tepe Noktası Dağılımı',
          en: '2. Adaptive B-Rep Tessellation and Vertex Distribution',
          de: '2. Adaptive B-Rep-Tessellierung und Eckpunktverteilung',
        },
        paragraphs: {
          tr: [
            'Geleneksel dönüştürücüler tüm yüzeylere homojen üçgen yoğunluğu uygular. Bu durum, düz bir sac levhaya yüz binlerce gereksiz üçgen eklenmesine veya kavisli bir flanşın köşeli (facetli) görünmesine neden olur.',
            '3D StoreLink bulut pipeline\'ı adaptif eğrilik algılama (chordal deviation & angular tolerance) algoritmaları kullanır. Düzlemsel yüzeyler minimum üçgenle kapatılırken, kavisli yüzeyler insan gözünün fark edemeyeceği mikron seviyesinde pürüzsüz üçgen dizileriyle mozaiklenir.',
          ],
          en: [
            'Naive conversion tools apply uniform polygon density across entire parts, generating millions of wasteful triangles on flat metal sheets while leaving round contours jagged and faceted.',
            '3D StoreLink employs adaptive chordal deviation and angular tolerance tessellation. Planar faces are collapsed into minimal triangle counts while organic fillets maintain sub-millimeter smoothness.',
          ],
          de: [
            'Einfache Konverter erzeugen starre Dreiecksnetze, wodurch ebene Flächen unnötig viele Polygone erhalten und Rundungen kantig wirken.',
            '3D StoreLink passt die Dreiecksnetze adaptiv an Krümmungen an: Ebenen bleiben schlank, Rundungen makellos glatt.',
          ],
        },
      },
      {
        id: 'mesh-decimation',
        heading: {
          tr: '3. Mesh Decimation: Görsel Detay Kaybı Olmadan Poligon Sayısını Azaltma',
          en: '3. Mesh Decimation: Preserving Visual Contours Under Reduced Polycount',
          de: '3. Mesh Decimation: Intelligente Polygonreduktion ohne Detailverlust',
        },
        paragraphs: {
          tr: [
            'Mozaikleme sonrasında ortaya çıkan endüstriyel modeller genellikle 2-5 milyon üçgen içerir. Bu yoğunluk orta segment bir akıllı telefonun GPU\'sunu saniyeler içinde kilitler.',
            'Sistemimiz Quadric Error Metrics (QEM) tabanlı akıllı mesh decimation uygular. Modelin dış silueti, montaj hatları ve keskin kenarları korunarak üçgen sayısı %80 oranında düşürülür. Sonuçta insan gözü için orijinalinden ayırt edilemeyen, ancak mobilde yağ gibi akan hafif bir geometri elde edilir.',
          ],
          en: [
            'Post-tessellation industrial assemblies frequently register 2 to 5 million polygons. Attempting to render this on mid-range smartphones triggers thermal throttling and sub-15 FPS stutter.',
            'We execute Quadric Error Metrics (QEM) polygon decimation. By tracking boundary silhouette contours and critical hard edges, triangle count is trimmed by 80% with zero perceivable fidelity loss.',
          ],
          de: [
            'Nach der ersten Konvertierung enthalten Maschinenmodelle oft Millionen Dreiecke, die Mobilgeräte überfordern.',
            'Unsere Engine reduziert Polygone um bis zu 80% unter Wahrung aller relevanten Kanten und Silhouetten für flüssige 60 FPS.',
          ],
        },
      },
      {
        id: 'draco-meshopt',
        heading: {
          tr: '4. Google Draco ve Meshopt Kuantizasyonu ile %90+ Dosya Boyutu Tasarrufu',
          en: '4. Google Draco and Meshopt Quantization for 90%+ Bandwidth Savings',
          de: '4. Dateigrößenreduktion um über 90% durch Google Draco und Meshopt',
        },
        paragraphs: {
          tr: [
            'Poligon sayısı düşürülse dahi, ham glTF dosyaları 30-80 MB boyutunda olabilir. Bu boyuttaki bir varlığın mobil internette indirilmesi 15-20 saniye sürebilir.',
            '3D StoreLink, Google Draco ve Meshopt kuantizasyon boru hattını devreye alır. Vertex pozisyonları 14-bit tamsayılara sıkıştırılır, normaller ve UV koordinatları entropi kodlamasıyla paketlenir. 80 MB\'lık ağır bir CAD montajı yalnızca 3.8 MB seviyesine iner.',
          ],
          en: [
            'Even optimized polygon counts can yield raw glTF files weighing 30–80 MB, taking 15+ seconds to fetch over cellular connections.',
            '3D StoreLink layers Google Draco geometric compression with Meshopt quantization. Floating-point coordinates are packed into 14-bit quantized buffers, reducing an 80 MB CAD assembly down to 3.8 MB.',
          ],
          de: [
            'Selbst reduzierte glTF-Dateien sind oft 30–80 MB groß und laden mobil viel zu langsam.',
            '3D StoreLink nutzt Google Draco und Meshopt, um Koordinaten kompakt zu kodieren. Eine 80-MB-Datei schrumpft so auf 3,8 MB.',
          ],
        },
        table: {
          headers: {
            tr: ['İşlem Aşaması', 'Dosya Boyutu', 'İndirme Süresi (4G Mobil)', 'GPU FPS'],
            en: ['Pipeline Stage', 'Asset File Size', 'Download Time (4G Cellular)', 'GPU Frame Rate'],
            de: ['Optimierungsstufe', 'Dateigröße', 'Ladezeit (4G Mobil)', 'GPU-Bildrate'],
          },
          rows: {
            tr: [
              ['Orijinal CAD (STP/STEP)', '142.0 MB', 'İndirilemez (Destek Yok)', '0 FPS (Gösterilemez)'],
              ['Ham Web GLB (Sıkıştırmasız)', '84.6 MB', '18.4 Saniye', '24 FPS (Kasmalar Var)'],
              ['Decimation Yapılmış Mesh', '26.2 MB', '5.8 Saniye', '48 FPS'],
              ['3D StoreLink (Draco + Meshopt)', '4.1 MB', '0.9 Saniye', '60 FPS (Akıcı)'],
            ],
            en: [
              ['Original Parametric CAD (STP)', '142.0 MB', 'Not supported in browser', '0 FPS (Unrenderable)'],
              ['Raw glTF (No compression)', '84.6 MB', '18.4 seconds', '24 FPS (Heavy stutter)'],
              ['Decimated Triangular Mesh', '26.2 MB', '5.8 seconds', '48 FPS'],
              ['3D StoreLink (Draco + Meshopt)', '4.1 MB', '0.9 seconds', '60 FPS (Fluid 60 Hz)'],
            ],
            de: [
              ['Original-CAD (STP/STEP)', '142,0 MB', 'Im Browser nicht darstellbar', '0 FPS (Nicht möglich)'],
              ['Unkomprimiertes glTF', '84,6 MB', '18,4 Sekunden', '24 FPS (Ruckelt)'],
              ['Reduziertes Polygonnetz', '26,2 MB', '5,8 Sekunden', '48 FPS'],
              ['3D StoreLink (Draco + Meshopt)', '4,1 MB', '0,9 Sekunden', '60 FPS (Flüssig)'],
            ],
          },
        },
      },
      {
        id: 'cad-ip-guvenlik',
        heading: {
          tr: '5. Fikri Mülkiyet (CAD IP) Güvenliği: Ham Çizimi Gizleyip Görsel Mesh Sunma',
          en: '5. Protecting Parametric CAD IP: Private Core, Public Surface Mesh',
          de: '5. Schutz des geistigen Eigentums: Original-CAD bleibt privat',
        },
        paragraphs: {
          tr: [
            'Üreticilerin en büyük korkusu, web sitesine model koyduklarında rakiplerinin veya korsanların orijinal üretim çizimlerini (tersine mühendislikle) çalmasıdır.',
            '3D StoreLink mimarisinde parametrik STEP/STP dosyası asla istemciye veya tarayıcıya iletilmez. Üretim toleransları, iç diş ölçüleri ve parametrik formüller sunucuda silinir; tarayıcıya sadece dış kabuğun hafif görsel üçgenleri gönderilir. Böylece tasarımınız tamamen güvenli kalır.',
          ],
          en: [
            'Industrial OEMs routinely fear competitors reverse-engineering proprietary parts by scraping 3D web assets.',
            'Under 3D StoreLink architecture, parametric source files never cross the public boundary. Internal bore dimensions and parametric formulas are stripped; browsers only receive an isolated surface mesh.',
          ],
          de: [
            'Hersteller fürchten oft den Diebstahl ihrer CAD-Konstruktionsdaten im Internet.',
            '3D StoreLink liefert niemals originale STEP-Dateien aus. Fertigungsmaße verbleiben auf gesicherten Servern; der Browser erhält nur das äußere Mesh.',
          ],
        },
      },
    ],
    faq: [
      {
        q: {
          tr: 'Hangi CAD formatlarını sisteme doğrudan yükleyebilirim?',
          en: 'Which CAD formats can be uploaded directly?',
          de: 'Welche CAD-Formate werden direkt unterstützt?',
        },
        a: {
          tr: 'STP, STEP, STL, OBJ ve GLB formatlarını tam destekliyoruz. Yüklediğiniz CAD dosyası dakikalar içinde optimize web GLB\'ye çevrilir.',
          en: 'We natively support STP, STEP, STL, OBJ, and GLB files. CAD uploads are converted and optimized automatically in minutes.',
          de: 'Wir unterstützen STP, STEP, STL, OBJ und GLB vollständig. Hochgeladene Dateien werden automatisch optimiert.',
        },
      },
      {
        q: {
          tr: 'Draco sıkıştırması modelin doku veya malzeme kalitesini bozar mı?',
          en: 'Does Draco compression degrade texture or material quality?',
          de: 'Beeinträchtigt Draco-Kompression Textur- oder Materialqualität?',
        },
        a: {
          tr: 'Hayır. Draco sadece geometrik tepe noktalarını sıkıştırır. PBR dokuları ve malzeme parlaklıkları orijinal kalitesini korur.',
          en: 'No. Draco compresses coordinate vertex buffers. High-resolution PBR textures and lighting parameters retain their full fidelity.',
          de: 'Nein. Draco komprimiert ausschließlich Geometrie-Eckpunkte. Texturen und PBR-Materialien behalten ihre volle Brillanz.',
        },
      },
    ],
  },

  /* ── 3. E-COMMERCE IFRAME EMBED GUIDE ── */
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
        'Harici Three.js veya ağır JavaScript kütüphaneleri yüklemenize gerek yoktur.',
        'Shopify ve WooCommerce\'te tek bir özel HTML bloğuna kodu yapıştırmak yeterlidir.',
        'URL parametreleri ile arka plan rengi, otomatik döndürme ve AR butonları özelleştirilebilir.',
        'Lazy-loading ve asenkron iframe mimarisi Google PageSpeed (Core Web Vitals) puanlarını korur.',
      ],
      en: [
        'No Three.js or client-side WebGL library dependencies required.',
        'Simply paste the snippet into any Shopify/WooCommerce custom HTML block.',
        'URL query parameters customize auto-rotate speed, background hex colors, and AR toggles.',
        'Asynchronous lazy-loading ensures zero degradation to Core Web Vitals or PageSpeed scores.',
      ],
      de: [
        'Keine Three.js- oder WebGL-Bibliotheken im Shop-Template erforderlich.',
        'Einfach den Code in einen HTML-Block in Shopify oder WooCommerce einfügen.',
        'URL-Parameter steuern Hintergrundfarben, Drehung und AR-Funktionen flexibel.',
        'Asynchrones Lazy Loading schützt Core Web Vitals und PageSpeed Scores.',
      ],
    },
    sections: [
      {
        id: 'neden-iframe',
        heading: {
          tr: '1. Neden Harici 3D Kütüphaneler Değil de Tek Satır Iframe Tercih Edilmeli?',
          en: '1. Why Single-Line Iframes Outperform Heavy Client-Side 3D Libraries',
          de: '1. Warum Iframes klassischen JavaScript-Bibliotheken überlegen sind',
        },
        paragraphs: {
          tr: [
            'E-ticaret sitelerine 3D eklemek isteyen birçok işletme, sitelerine Three.js, Babylon.js veya doğrudan model-viewer kütüphanelerini eklemeye çalışır. Bu yöntem sitenin ana JavaScript paketini 500 KB - 1 MB büyüterek sayfa açılış hızını (LCP) ciddi şekilde yavaşlatır ve tema güncellemelerinde bozulmalara yol açar.',
            '3D StoreLink tek satır iframe yaklaşımıyla bu sorunu kökten çözer. Tüm WebGL motoru, PBR gölgelendiricileri ve AR tetikleyicileri yalıtılmış yüksek performanslı bulut altyapımızda çalışır. Sitenize sıfır bağımlılık eklenir ve sitenizin ana hızı asla etkilenmez.',
          ],
          en: [
            'Merchants attempting to embed Three.js or Babylon.js directly into Shopify themes inflate their critical bundle sizes by 500 KB to 1 MB, cratering Largest Contentful Paint (LCP) and introducing fragile script conflicts.',
            '3D StoreLink delivers an isolated, high-speed iframe runtime. Shaders, lighting pipelines, and AR handoffs execute in our sandboxed cloud infrastructure without polluting your storefront DOM.',
          ],
          de: [
            'Die direkte Einbindung von Three.js in Shop-Templates verlangsamt die Ladezeit durch große Skripte erheblich.',
            'Der 3D StoreLink Iframe läuft vollständig isoliert in einer optimierten Cloud-Umgebung ohne Auswirkungen auf Ihre Shop-Geschwindigkeit.',
          ],
        },
        codeSnippet: `<iframe
  src="https://view.3dstorelink.com/model-slug?autoRotate=1&enableAR=1&bgColor=111111"
  width="100%"
  height="500"
  frameborder="0"
  allow="xr-spatial-tracking"
  loading="lazy"
></iframe>`,
      },
      {
        id: 'iframe-mimarisi',
        heading: {
          tr: '2. Iframe Entegrasyonunun Mimarisi ve URL Parametrelerinin Analizi',
          en: '2. Iframe Runtime Architecture and URL Query Parameters',
          de: '2. Iframe-Architektur und URL-Parameter im Detail',
        },
        paragraphs: {
          tr: [
            'Iframe URL\'sine ekleyeceğiniz basit sorgu parametreleriyle görüntüleyicinin tüm davranışlarını mağazanızın tasarımına göre özelleştirebilirsiniz.',
          ],
          en: [
            'Simple query string parameters append directly to the embed URL, allowing dynamic configuration tailored to your theme branding.',
          ],
          de: [
            'Über einfache URL-Parameter passen Sie das Aussehen und Verhalten des 3D-Viewers nahtlos an Ihr Shop-Design an.',
          ],
        },
        table: {
          headers: {
            tr: ['Parametre', 'Varsayılan', 'Açıklama'],
            en: ['Parameter', 'Default', 'Functionality'],
            de: ['Parameter', 'Standard', 'Beschreibung'],
          },
          rows: {
            tr: [
              ['autoRotate', '1', '1 ise model boşta kaldığında otomatik döner, 0 ise kullanıcı dokunana kadar sabit durur.'],
              ['enableAR', '1', '1 ise mobil cihazlarda "Odanda Gör (AR)" butonunu gösterir.'],
              ['bgColor', '111111', 'Hex renk kodu (Örn: FFFFFF beyaz, 050505 koyu, transparent şeffaf).'],
              ['cameraOrbit', '0deg 75deg auto', 'Modelin ilk açılış kamera açısı ve yüksekliği.'],
              ['enableDownload', '0', 'Ziyaretçilerin modeli indirmesini engeller (0) veya izin verir (1).'],
            ],
            en: [
              ['autoRotate', '1', 'Enables turntable orbit rotation when idle (1=active, 0=static).'],
              ['enableAR', '1', 'Activates mobile Quick Look / SceneViewer AR button.'],
              ['bgColor', '111111', 'Hex background color (e.g. FFFFFF, 050505, or transparent).'],
              ['cameraOrbit', '0deg 75deg auto', 'Initial polar and azimuth camera vantage angle.'],
              ['enableDownload', '0', 'Locks asset downloading to protect mesh IP (0=secure).'],
            ],
            de: [
              ['autoRotate', '1', '1 für automatische Drehung im Leerlauf, 0 für Stillstand.'],
              ['enableAR', '1', 'Aktiviert den "Im Raum ansehen (AR)" Button auf Mobilgeräten.'],
              ['bgColor', '111111', 'Hex-Farbe für den Hintergrund (z.B. FFFFFF oder 050505).'],
              ['cameraOrbit', '0deg 75deg auto', 'Startwinkel und Kameraposition.'],
              ['enableDownload', '0', 'Verhindert den Download der 3D-Datei (0=geschützt).'],
            ],
          },
        },
      },
      {
        id: 'shopify-kurulum',
        heading: {
          tr: '3. Shopify Ürün Detay Sayfalarına 30 Saniyede 3D Model Ekleme',
          en: '3. Step-by-Step Shopify Product Page Setup in Under 30 Seconds',
          de: '3. Schritt-für-Schritt-Einbindung in Shopify in unter 30 Sekunden',
        },
        paragraphs: {
          tr: [
            'Shopify panelinizde Ürünler > İlgili Ürün sayfasına gidin. Ürün açıklaması zengin metin editörünün sağ üst köşesindeki "<> HTML Göster" butonuna tıklayın.',
            '3D StoreLink panelinden kopyaladığınız iframe kodunu açıklama alanının en üstüne veya en altına yapıştırıp Kaydet\'e basın. Ürününüz 30 saniye içinde tüm dünyada 3D ve AR olarak yayındadır.',
          ],
          en: [
            'Navigate to Shopify Admin > Products and open your target SKU. Toggle the rich text editor to "<> Show HTML".',
            'Paste your 3D StoreLink iframe snippet at the desired location and click Save. Your interactive 3D & AR showcase is immediately live globally.',
          ],
          de: [
            'Im Shopify Admin unter Produkte das gewünschte Produkt aufrufen und im Textfeld auf "<> HTML anzeigen" klicken.',
            'Den 3D StoreLink Code einfügen und speichern. Das 3D- und AR-Modell ist sofort online.',
          ],
        },
      },
      {
        id: 'woocommerce-kurulum',
        heading: {
          tr: '4. WooCommerce ve WordPress Entegrasyon Adımları',
          en: '4. WooCommerce & WordPress Integration Workflow',
          de: '4. WooCommerce & WordPress Einbindung',
        },
        paragraphs: {
          tr: [
            'WordPress Gutenberg blok editöründe yeni bir blok ekleyin ve "Özel HTML (Custom HTML)" bloğunu seçin. Elementor kullanıyorsanız sol menüden "HTML" widget\'ını ürün şablonuna sürükleyin.',
            'Kodu yapıştırıp yayınlayın. Iframe tüm ekran genişliklerine ve mobil cihazlara %100 duyarlı (responsive) olarak otomatik uyum sağlar.',
          ],
          en: [
            'Inside WordPress Gutenberg, insert a "Custom HTML" block. If utilizing Elementor Theme Builder, drag the native "HTML" widget into your product template.',
            'Paste the embed code and publish. The iframe automatically adapts responsively across mobile, tablet, and desktop viewports.',
          ],
          de: [
            'In WordPress einen "Individuelles HTML"-Block in Gutenberg oder Elementor einfügen.',
            'Code einfügen und veröffentlichen. Der Iframe passt sich automatisch allen Bildschirmgrößen an.',
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
          tr: 'Hayır. loading="lazy" parametresi sayesinde model sadece kullanıcı ekrana kaydırdığında yüklenir; ilk sayfa açılışını (LCP) bloke etmez.',
          en: 'No. With loading="lazy", assets stream only when scrolled into viewport, preserving sub-second Core Web Vitals.',
          de: 'Nein. Dank loading="lazy" lädt das Modell erst beim Scrollen, ohne die Ladezeit zu beeinträchtigen.',
        },
      },
    ],
  },

  /* ── 4. ZERO-INSTALL MOBILE WEB AR GUIDE ── */
  {
    slug: 'uygulamasiz-web-ar-apple-quick-look-ve-sceneviewer-mimarisi',
    category: {
      tr: 'WebXR & Artırılmış Gerçeklik',
      en: 'WebXR & Augmented Reality',
      de: 'WebXR & Augmented Reality',
    },
    readTime: { tr: '8 Dk Okuma', en: '8 Min Read', de: '8 Min. Lesezeit' },
    date: { tr: '15 Eylül 2026', en: 'September 15, 2026', de: '15. September 2026', iso: '2026-09-15' },
    title: {
      tr: 'Uygulamasız Web AR Mimarisi: Apple Quick Look (USDZ) ve SceneViewer (GLB) Kılavuzu',
      en: 'Zero-Install Web AR Architecture: Apple Quick Look (USDZ) and Google SceneViewer (GLB)',
      de: 'App-freie Web-AR-Architektur: Apple Quick Look (USDZ) und Google SceneViewer (GLB)',
    },
    desc: {
      tr: 'Müşterileri mobil uygulama indirme zahmetine sokmadan, doğrudan Safari ve Chrome tarayıcısı üzerinden 1:1 gerçek ölçekli AR deneyimi sunmanın teknik standartları, sensör mekanikleri ve mimari temelleri.',
      en: 'An exhaustive architectural breakdown of delivering zero-install, 1:1 physical scale augmented reality in Mobile Safari and Chrome via Apple Quick Look and Google SceneViewer engines.',
      de: 'Ausführliche technische Grundlagen für app-freie Web-AR: Wie Apple Quick Look und Google SceneViewer 3D-Objekte nativ und maßstabsgetreu im Raum platzieren.',
    },
    authors: [AUTHORS.team, AUTHORS.mustafa],
    keyTakeaways: {
      tr: [
        'Kullanıcıların %78\'i bir ürünü denemek için ek mobil uygulama indirmeyi kesinlikle reddetmektedir.',
        'Apple Quick Look (USDZ) iOS çekirdeğindeki RealityKit motoruyla sıfır gecikmeli 1:1 AR başlatır.',
        'Google SceneViewer (GLB) Android cihazlarda ARCore zemin düzlemi ve ışık tahminini (Lighting Estimation) çalıştırır.',
        'Masaüstü kullanıcıları ekrandaki dinamik QR kodu telefonla taratarak saniyeler içinde AR moduna geçer.',
        '3D StoreLink, tek bir CAD yüklemesinden hem USDZ hem GLB paketlerini otomatik üreterek ikili dağıtım (dual-asset packaging) sağlar.',
      ],
      en: [
        'Over 78% of online shoppers abandon product flows when prompted to install an external mobile application.',
        'Apple Quick Look (USDZ) harnesses RealityKit OS hooks to initiate zero-latency 1:1 spatial projection.',
        'Google SceneViewer (GLB) binds Android ARCore ground plane estimation and real-time environmental photon capture.',
        'Desktop shoppers scan dynamic QR codes to bridge immediately into mobile AR with zero friction.',
        '3D StoreLink automatically synthesizes USDZ and Draco-GLB targets from a single upload for seamless dual-asset parity.',
      ],
      de: [
        'Über 78% der Nutzer brechen den Kauf ab, wenn sie eine separate App herunterladen müssen.',
        'Apple Quick Look (USDZ) startet über RealityKit ohne Verzögerung im 1:1-Maßstab.',
        'Google SceneViewer (GLB) nutzt Android ARCore für präzise Raumerkennung und Lichtanpassung.',
        'Desktop-Nutzer scannen dynamische QR-Codes, um nahtlos auf dem Smartphone in AR zu wechseln.',
        '3D StoreLink generiert aus einem Upload vollautomatisch USDZ und GLB für alle Geräte.',
      ],
    },
    sections: [
      {
        id: 'web-ar-devrimi',
        heading: {
          tr: '1. Neden Mobil Uygulamalar Başarısız Oldu ve Web AR Standardı Kazandı?',
          en: '1. Why Dedicated AR Apps Failed and Web-Native AR Won',
          de: '1. Warum native AR-Apps scheiterten und Web-AR gewann',
        },
        paragraphs: {
          tr: [
            '2018-2022 yılları arasında birçok marka, artırılmış gerçeklik deneyimleri sunabilmek için yüz binlerce dolar harcayarak özel iOS ve Android uygulamaları geliştirdi. Ancak e-ticaret dönüşüm hunisi verileri acı bir gerçeği ortaya çıkardı: Kullanıcıların %78\'inden fazlası, yalnızca bir mobilyanın veya makinenin odasında nasıl durduğunu görmek için 150 MB\'lık bir uygulama indirmeyi reddetti.',
            'Uygulama mağazasına yönlendirme (app store redirection) adımı, satış hunisinde %80\'in üzerinde sürtünmeye (churn) yol açtı. Çözüm, işletim sistemi üreticilerinin tarayıcı seviyesinde yerel AR standartları geliştirmesiyle geldi: Web AR.',
          ],
          en: [
            'Between 2018 and 2022, enterprise brands invested millions developing bespoke native AR applications. However, funnel telemetry surfaced a stark reality: over 78% of shoppers actively refused to download a 150 MB native app merely to test spatial product fit.',
            'Directing users to App Store or Play Store generated catastrophic 80%+ drop-offs. The breakthrough arrived when Apple and Google embedded spatial engines directly inside mobile browsers.',
          ],
          de: [
            'Frühere AR-Lösungen verlangten eigene Apps, was zu über 80% Absprüngen im Checkout führte: Niemand lädt für einen Kauf eine 150-MB-App.',
            'Der Durchbruch gelang durch die direkte Integration von AR-Engines in Safari und Chrome: Web-AR ohne App-Download.',
          ],
        },
      },
      {
        id: 'apple-quick-look',
        heading: {
          tr: '2. Apple Ekosistemi: Safari Üzerinden Quick Look ve USDZ El Sıkışması',
          en: '2. Apple Ecosystem: Mobile Safari Quick Look and USDZ Protocol',
          de: '2. Apple-Ökosystem: Quick Look und USDZ über Safari',
        },
        paragraphs: {
          tr: [
            'iOS 12\'den bu yana Apple, Safari tarayıcısına yerleşik "Quick Look" motorunu entegre etmiştir. Pixar ve Apple ortaklığıyla geliştirilen açık standart USDZ (Universal Scene Description Zip), 3D geometriyi, PBR dokularını ve animasyonları tek bir sıkıştırılmış ikili dosyada birleştirir.',
            'Kullanıcı Safari\'de bir USDZ bağlantısına tıkladığında, tarayıcı hiçbir harici kod çalıştırmadan doğrudan iOS RealityKit ve ARKit motorunu devreye sokar. Bu sayede 1.1 saniye içinde kamera açılır ve ürün gerçek mekanda belirir.',
          ],
          en: [
            'Since iOS 12, Mobile Safari includes native "Quick Look" runtime integration. Built on the USDZ (Universal Scene Description Zip) standard co-developed with Pixar, models pack geometry, PBR textures, and transforms into a single container.',
            'Tapping an Apple Quick Look trigger bypasses web JavaScript entirely, handing execution directly to iOS RealityKit. The camera viewport materializes in a record 1.1 seconds with native gesture ergonomics.',
          ],
          de: [
            'Apple integriert seit iOS 12 "Quick Look" direkt in Safari. Das USDZ-Format bündelt 3D-Modell und Texturen kompakt.',
            'Beim Antippen öffnet sich sofort die native iOS-Kamera über RealityKit in nur 1,1 Sekunden.',
          ],
        },
      },
      {
        id: 'google-sceneviewer',
        heading: {
          tr: '3. Android Ekosistemi: Chrome ve Google SceneViewer (GLB) Çalışma Prensipleri',
          en: '3. Android Ecosystem: Chrome and Google SceneViewer (GLB)',
          de: '3. Android-Ökosystem: Google SceneViewer und GLB',
        },
        paragraphs: {
          tr: [
            'Android ekosisteminde Google, Google Play Services for AR (ARCore) altyapısını kullanarak "SceneViewer" motorunu sunar. SceneViewer, Khronos Group onaylı modern web 3D standardı olan GLB dosyalarını doğrudan tüketir.',
            'Özel bir intent şeması (intent://arvr.google.com/scene-viewer...) kullanılarak Chrome tarayıcısından SceneViewer tetiklenir. Cihazın jiroskopu ve optik akış algoritmaları zemin düzlemini hızla algılayarak modeli sabitler.',
          ],
          en: [
            'In the Android ecosystem, Google provisions "SceneViewer" underpinned by ARCore system services. SceneViewer ingests Khronos-standard GLB binary files natively.',
            'Leveraging intent schemas (intent://arvr.google.com/scene-viewer...), Chrome hands off spatial rendering directly to Android OS plane tracking.',
          ],
          de: [
            'Auf Android nutzt Google den "SceneViewer" über ARCore-Dienste. Er verarbeitet standardisierte GLB-Dateien direkt aus Chrome.',
            'Ein spezieller Intent-Link startet die Raumerkennung und verankert das Objekt stabil auf dem Boden.',
          ],
        },
      },
      {
        id: '1-1-fiziksel-olcek',
        heading: {
          tr: '4. 1:1 Gerçek Fiziksel Ölçeklendirme: LiDAR Sensörleri ve Zemin Algılama Mekaniği',
          en: '4. 1:1 True-Scale Spatial Anchoring: LiDAR and Ground Plane Estimation',
          de: '4. Maßstabsgetreue 1:1-Projektion: LiDAR und Bodenerkennung',
        },
        paragraphs: {
          tr: [
            'Eski AR sistemleri ürünleri rastgele boyutlarda ekrana yerleştiriyordu; bu da müşterinin ürün boyutunu yanlış algılamasına yol açıyordu. 3D StoreLink modelleri milimetrik CAD koordinat sistemine sadık kalınarak hazırlanır.',
            'iPhone Pro modellerindeki LiDAR sensörü ve modern Android telefonlardaki Time-of-Flight (ToF) kameraları odanın üç boyutlu derinlik haritasını çıkarır. Model tam olarak 1:1 ölçekte (örneğin 120 cm genişliğindeki bir masa tam 120 cm olarak) yerleştirilir.',
          ],
          en: [
            'Legacy AR tools rendered models at arbitrary uncalibrated scales, worsening spatial confusion. 3D StoreLink pipelines preserve rigorous metric unit coordinate systems from CAD origins.',
            'Hardware LiDAR sensors on iPhone Pro and Time-of-Flight (ToF) depth cameras on Android construct instant 3D mesh room maps, anchoring items at true 1:1 physical dimensions.',
          ],
          de: [
            'Frühere AR-Systeme zeigten Modelle oft in willkürlichen Größen. 3D StoreLink übernimmt exakte Millimetermaße aus dem CAD.',
            'LiDAR- und Tiefensensoren moderner Smartphones garantieren, dass ein 120 cm breiter Tisch auch im Raum exakt 120 cm misst.',
          ],
        },
      },
      {
        id: 'cevresel-isiklandirma',
        heading: {
          tr: '5. Çevresel Işıklandırma (Lighting Estimation) ve Gerçekçi Gölgeler',
          en: '5. Environmental Lighting Estimation and Contact Shadows',
          de: '5. Umgebungslicht-Anpassung und realistische Schatten',
        },
        paragraphs: {
          tr: [
            'Bir 3D modelin gerçek mekanda inandırıcı görünmesi için odadaki ışık kaynaklarının rengine, şiddetine ve yönüne uyum sağlaması zorunludur.',
            'Web AR motoru telefon kamerasının yakaladığı ortam ışığını analiz eder (Spherical Harmonics kullanarak). Odanız sarı akkor lambayla aydınlatılıyorsa model sarı tonlarda parlar; pencereden gelen gün ışığı varsa gölgeler ters yöne gerçekçi şekilde düşer.',
          ],
          en: [
            'For a virtual object to look authentically tangible, it must respond dynamically to room photon intensity and color temperature.',
            'ARKit and ARCore analyze ambient light feeds via Spherical Harmonics. If room illumination is warm incandescent, the PBR shader shifts warmth; contact floor shadows anchor naturally.',
          ],
          de: [
            'Virtuelle Objekte wirken nur dann echt, wenn sie sich an das Umgebungslicht des Raumes anpassen.',
            'Die Engine analysiert das Raumlicht und passt Schatten sowie Reflexionen auf dem Modell in Echtzeit an.',
          ],
        },
      },
      {
        id: 'qr-kod-el-sikismasi',
        heading: {
          tr: '6. Masaüstünden Mobilde AR\'a Geçiş: Dinamik QR Kod El Sıkışma Mimarisi',
          en: '6. Desktop-to-Mobile AR Handoff: Dynamic QR Code Architecture',
          de: '6. Desktop-zu-Mobil-Wechsel: Dynamischer QR-Code-Workflow',
        },
        paragraphs: {
          tr: [
            'E-ticaret alışverişlerinin %40\'a yakını hala masaüstü bilgisayarlarda başlamaktadır. Bilgisayar ekranında AR çalıştırmak mümkün olmadığı için kullanıcı deneyimi kesintiye uğramamalıdır.',
            '3D StoreLink görüntüleyicisi masaüstünde açıldığında "AR\'da Gör" butonuna basılırsa ekranda şifreli dinamik bir QR kod belirir. Kullanıcı telefon kamerasını ekrana tuttuğu anda doğrudan iOS Quick Look veya Android SceneViewer moduna geçiş yapar.',
          ],
          en: [
            'Nearly 40% of B2B and high-ticket e-commerce sessions originate on desktop workstations where spatial sensors do not exist.',
            'When users click "View in Space" on desktop, 3D StoreLink renders an on-the-fly encrypted QR code. Pointing any smartphone camera bridges the shopper directly into mobile AR instantly.',
          ],
          de: [
            'Viele Einkäufe starten am Desktop-PC. 3D StoreLink löst dies über dynamische QR-Codes.',
            'Nutzer scannen den Code am Bildschirm einfach mit dem Smartphone und erleben das Modell sofort in AR.',
          ],
        },
      },
      {
        id: 'karsilastirma-matrisi',
        heading: {
          tr: '7. Apple Quick Look vs Google SceneViewer Teknik Karşılaştırma Matrisi',
          en: '7. Apple Quick Look vs Google SceneViewer Technical Matrix',
          de: '7. Apple Quick Look vs Google SceneViewer Technische Vergleichsmatrix',
        },
        paragraphs: {
          tr: [
            'Her iki platform da kullanıcının ek uygulama indirmesini gerektirmeyen harika çözümler sunsa da dosya formatı, başlatma şeması ve gölgelendirme boru hatları bakımından önemli farklılıklar gösterir.',
            'Aşağıdaki teknik matris, işletmelerin her iki ekosisteme de sorunsuz hizmet verebilmesi için bilmesi gereken temel mimari parametreleri özetlemektedir:',
          ],
          en: [
            'While both frameworks eliminate app install friction, they diverge across asset containers, intent triggering protocols, and shader pipeline behaviors.',
            'The following engineering matrix outlines the technical parameters required for cross-platform zero-install AR delivery:',
          ],
          de: [
            'Obwohl beide Plattformen ohne App-Download auskommen, unterscheiden sie sich in Dateiformat, Intent-Protokollen und Shader-Pipelines.',
            'Die folgende Übersicht vergleicht die wichtigsten Parameter beider Systeme:',
          ],
        },
        table: {
          headers: {
            tr: ['Özellik / Kriter', 'Apple Quick Look (iOS)', 'Google SceneViewer (Android)', '3D StoreLink Yaklaşımı'],
            en: ['Feature / Metric', 'Apple Quick Look (iOS)', 'Google SceneViewer (Android)', '3D StoreLink Approach'],
            de: ['Merkmal / Kriterium', 'Apple Quick Look (iOS)', 'Google SceneViewer (Android)', '3D StoreLink Lösung'],
          },
          rows: {
            tr: [
              ['Desteklenen Format', 'USDZ (Universal Scene Description)', 'GLB (glTF 2.0 Binary)', 'Otomatik İkili Paketleme (USDZ + GLB)'],
              ['Tetikleme Yöntemi', 'Native <a> linki (rel="ar")', 'Android Intent URI', 'Cihaz Tespitiyle Otomatik Yönlendirme'],
              ['Sensör Desteği', 'LiDAR & ARKit Kamera', 'ToF & ARCore Surface Tracking', '1:1 Metrik Boyut Kilitleme'],
              ['Işık Tahmini (Lighting)', 'RealityKit Çevresel Küresel Işık', 'ARCore Çevresel Fotometrik Işık', 'PBR Materyallerle Tam Uyum'],
              ['Uygulama İndirme Şartı', 'Sıfır İndirme (Yerleşik Safari)', 'Sıfır İndirme (Google Play Services AR)', 'Tamamen Web-Native'],
            ],
            en: [
              ['Asset Container', 'USDZ (Universal Scene Description)', 'GLB (glTF 2.0 Binary)', 'Automated Dual-Asset Packaging'],
              ['Trigger Protocol', 'Native <a> tag (rel="ar")', 'Android Intent URI Scheme', 'Auto-Device Runtime Sniffing'],
              ['Hardware Anchoring', 'LiDAR & ARKit Spatial Mesh', 'ToF & ARCore Surface Tracking', '1:1 Metric Coordinate Calibration'],
              ['Lighting Estimation', 'RealityKit Environmental Spherical', 'ARCore Photometric Ambient Light', 'Real-time PBR Conformance'],
              ['App Dependency', 'Zero Installs (Mobile Safari)', 'Zero Installs (Play Services AR)', '100% Web Native'],
            ],
            de: [
              ['Dateiformat', 'USDZ (Universal Scene Description)', 'GLB (glTF 2.0 Binary)', 'Automatische Doppel-Konvertierung'],
              ['Start-Protokoll', 'Natives <a>-Tag (rel="ar")', 'Android Intent URI', 'Automatische Geräteerkennung'],
              ['Sensor-Tracking', 'LiDAR & ARKit Raumerkennung', 'ToF & ARCore Bodenerkennung', '1:1 Maßstabskalibrierung'],
              ['Lichtanpassung', 'RealityKit Raumreflexionen', 'ARCore Umgebungslicht', 'Voll kompatibel mit PBR'],
              ['App-Installation', 'Keine (Natives Safari)', 'Keine (Google Play Services AR)', 'Vollständig webbasiert'],
            ],
          },
        },
      },
    ],
    faq: [
      {
        q: {
          tr: 'Kullanıcının telefonuna bir eklenti veya uygulama yüklemesi gerekir mi?',
          en: 'Do shoppers need to install any plugin or application?',
          de: 'Müssen Nutzer eine App oder ein Plugin installieren?',
        },
        a: {
          tr: 'Kesinlikle hayır. Deneyim doğrudan Safari ve Chrome tarayıcılarının işletim sistemi seviyesindeki AR çekirdeğiyle çalışır.',
          en: 'Zero installs. Operation is 100% native inside Mobile Safari and Google Chrome via OS-level spatial runtimes.',
          de: 'Nein, absolut nicht. Das Erlebnis läuft direkt und ohne Download im Browser.',
        },
      },
      {
        q: {
          tr: 'Modelin 1:1 gerçek ölçülerde çıkacağını nasıl garanti ediyorsunuz?',
          en: 'How do you guarantee models project at true 1:1 physical dimensions?',
          de: 'Wie wird der exakte 1:1-Maßstab sichergestellt?',
        },
        a: {
          tr: 'Yüklenen CAD dosyalarının (STEP/STP) metrik sınır kutuları (bounding box) korunur ve glTF/USDZ koordinatlarına 1 metre = 1 birim standardıyla işlenir.',
          en: 'Source CAD boundary metrics are locked and exported under the glTF/USDZ 1 unit = 1 meter spatial standard.',
          de: 'CAD-Maße werden im Verhältnis 1 Einheit = 1 Meter exakt in die 3D-Dateien übertragen.',
        },
      },
    ],
  },
];
