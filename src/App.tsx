import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Landing from './pages/Landing';
import BlogHub from './pages/BlogHub';
import PublicUpload from './pages/PublicUpload';
import ComparisonPage from './pages/ComparisonPage';
import GlossaryPage from './pages/GlossaryPage';
import { updatePageSeoHead } from './utils/seo';

/**
 * Synchronizes i18next language and updates SEO tags (canonical, hreflang, lang attr)
 * on every client-side route change.
 */
function LocaleAndSeoSync() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    let targetLang: 'tr' | 'en' | 'de' = 'tr';
    if (pathname === '/en' || pathname.startsWith('/en/')) {
      targetLang = 'en';
    } else if (pathname === '/de' || pathname.startsWith('/de/')) {
      targetLang = 'de';
    }

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }

    updatePageSeoHead(pathname);
    window.scrollTo(0, 0);
  }, [pathname, i18n]);

  return null;
}

export default function App() {
  return (
    <>
      <LocaleAndSeoSync />
      <Routes>
        {/* ─── TURKISH (DEFAULT) ROUTES ─── */}
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<BlogHub />} />
        <Route path="/blog/:slug" element={<BlogHub />} />
        <Route path="/karsilastirma" element={<ComparisonPage />} />
        <Route path="/sozluk" element={<GlossaryPage />} />
        <Route path="/upload" element={<PublicUpload />} />

        {/* ─── ENGLISH (/en) ROUTES ─── */}
        <Route path="/en" element={<Landing />} />
        <Route path="/en/blog" element={<BlogHub />} />
        <Route path="/en/blog/:slug" element={<BlogHub />} />
        <Route path="/en/compare" element={<ComparisonPage />} />
        <Route path="/en/glossary" element={<GlossaryPage />} />
        <Route path="/en/upload" element={<PublicUpload />} />
        {/* EN Aliases */}
        <Route path="/en/karsilastirma" element={<Navigate to="/en/compare/" replace />} />
        <Route path="/en/sozluk" element={<Navigate to="/en/glossary/" replace />} />

        {/* ─── GERMAN (/de) ROUTES ─── */}
        <Route path="/de" element={<Landing />} />
        <Route path="/de/blog" element={<BlogHub />} />
        <Route path="/de/blog/:slug" element={<BlogHub />} />
        <Route path="/de/vergleich" element={<ComparisonPage />} />
        <Route path="/de/glossar" element={<GlossaryPage />} />
        <Route path="/de/upload" element={<PublicUpload />} />
        {/* DE Aliases */}
        <Route path="/de/karsilastirma" element={<Navigate to="/de/vergleich/" replace />} />
        <Route path="/de/compare" element={<Navigate to="/de/vergleich/" replace />} />
        <Route path="/de/sozluk" element={<Navigate to="/de/glossar/" replace />} />
        <Route path="/de/glossary" element={<Navigate to="/de/glossar/" replace />} />

        {/* ─── ROOT ALIASES & REDIRECTS ─── */}
        <Route path="/compare" element={<Navigate to="/en/compare/" replace />} />
        <Route path="/glossary" element={<Navigate to="/en/glossary/" replace />} />
        <Route path="/vergleich" element={<Navigate to="/de/vergleich/" replace />} />
        <Route path="/glossar" element={<Navigate to="/de/glossar/" replace />} />
        <Route path="/about" element={<Navigate to="/blog/" replace />} />
        <Route path="/platform" element={<Navigate to="/blog/" replace />} />
        <Route path="/en/about" element={<Navigate to="/en/blog/" replace />} />
        <Route path="/en/platform" element={<Navigate to="/en/blog/" replace />} />
        <Route path="/de/about" element={<Navigate to="/de/blog/" replace />} />
        <Route path="/de/platform" element={<Navigate to="/de/blog/" replace />} />

        {/* ─── CATCH-ALL ─── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
