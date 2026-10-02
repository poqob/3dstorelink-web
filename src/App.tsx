import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import PublicUpload from './pages/PublicUpload';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/platform" element={<About />} />
      <Route path="/upload" element={<PublicUpload />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
