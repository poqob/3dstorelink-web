import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import BlogHub from './pages/BlogHub';
import PublicUpload from './pages/PublicUpload';
import ComparisonPage from './pages/ComparisonPage';
import GlossaryPage from './pages/GlossaryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/blog" element={<BlogHub />} />
      <Route path="/about" element={<Navigate to="/blog" replace />} />
      <Route path="/platform" element={<Navigate to="/blog" replace />} />
      <Route path="/upload" element={<PublicUpload />} />
      <Route path="/karsilastirma" element={<ComparisonPage />} />
      <Route path="/sozluk" element={<GlossaryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
