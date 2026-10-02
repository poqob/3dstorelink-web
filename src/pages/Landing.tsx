import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { useAuthStore } from '../store/auth';
import Typewriter from '../components/Typewriter';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const SUPPORTED_FORMATS = ['.glb', '.gltf', '.step', '.stp', '.obj'];
const MAX_MODEL_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;  // 2MB
const MAX_NAME_LEN = 25;

const API_BASE = import.meta.env.VITE_API_URL || 'https://api.3dstorelink.com/api';

const getThumbnailUrl = (thumb?: string) => {
  if (!thumb) return '';
  if (thumb.startsWith('http://') || thumb.startsWith('https://')) return thumb;
  return `${API_BASE}${thumb.startsWith('/') ? '' : '/'}${thumb}`;
};

/* ─── 3D Modal ─────────────────────────────────────────────────────────────── */
function ModelModal({ slug, name, onClose }: { slug: string; name: string; onClose: () => void }) {
  const { t } = useTranslation();
  const embedUrl = `https://view.3dstorelink.com/${slug}?autoRotate=1&bgColor=111111&showControls=1&enableAR=1`;
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h3 className="text-white font-bold text-lg">{name}</h3>
            <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              {t('showcase.ar_ready')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            aria-label="Kapat"
          >✕</button>
        </div>
        <div className="aspect-video w-full bg-[#0a0a0a]">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="xr-spatial-tracking"
            title={name}
            style={{ border: 'none' }}
          />
        </div>
        <div className="px-6 py-4 flex items-center justify-between bg-[#0d0d0d]">
          <p className="text-gray-500 text-xs">{t('showcase.ar_hint')}</p>
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
          >
            {t('showcase.fullscreen')}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Showcase Gallery ──────────────────────────────────────────────────────── */
function ShowcaseGallery() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<{ slug: string; name: string } | null>(null);
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: ['community-models', page, limit],
    queryFn: () => api.get('/v1/models/community/all', { params: { page, limit } }).then(r => r.data),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const el = document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-2xl bg-white/5 animate-pulse aspect-square" />
        ))}
      </div>
    );
  }

  const models = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || Math.ceil(total / limit) || 1;

  if (models.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-white/20 rounded-2xl">
        <div className="text-5xl mb-4">📦</div>
        <p className="text-gray-500">{t('showcase.empty')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {models.map((model: any) => (
          <button
            key={model.id}
            onClick={() => setSelected({ slug: model.slug, name: model.name })}
            className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1 text-left cursor-pointer"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
              {model.thumbnail ? (
                <img
                  src={getThumbnailUrl(model.thumbnail)}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <span className="text-5xl">📦</span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><path d="M5 0L9.33 2.5v5L5 10 .67 7.5v-5z"/></svg>
                  {t('showcase.view')}
                </span>
              </div>
            </div>
            <div className="p-3 bg-black/40 backdrop-blur-sm">
              <h3 className="font-semibold text-white text-sm truncate">{model.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5 truncate">@{model.author}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Pagination Controls - Alt Ortada */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-center mt-12 gap-3">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {/* Önceki Butonu (Sol Ok) */}
            <button
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl text-sm font-medium border border-white/15 bg-white/5 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
              aria-label={t('showcase.prev')}
              title={t('showcase.prev')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">{t('showcase.prev')}</span>
            </button>

            {/* Sayfa Numaraları */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .map((p, idx, arr) => {
                const showEllipsis = idx > 0 && p - arr[idx - 1] > 1;
                return (
                  <div key={p} className="flex items-center gap-1.5 sm:gap-2">
                    {showEllipsis && <span className="px-1 text-gray-600 text-sm select-none">...</span>}
                    <button
                      onClick={() => handlePageChange(p)}
                      className={`min-w-[38px] h-9 sm:min-w-[42px] sm:h-10 rounded-xl text-sm transition flex items-center justify-center cursor-pointer ${
                        page === p
                          ? 'bg-white text-black font-extrabold shadow-lg shadow-white/15'
                          : 'border border-white/15 bg-white/5 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/10 font-semibold'
                      }`}
                    >
                      {p}
                    </button>
                  </div>
                );
              })}

            {/* Sonraki Butonu (Sağ Ok) */}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl text-sm font-medium border border-white/15 bg-white/5 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
              aria-label={t('showcase.next')}
              title={t('showcase.next')}
            >
              <span className="hidden sm:inline">{t('showcase.next')}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {total > 0 && (
            <p className="text-xs text-gray-500 font-medium">
              {t('showcase.page_info', { page, totalPages, total })}
            </p>
          )}
        </div>
      )}

      {selected && (
        <ModelModal slug={selected.slug} name={selected.name} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

/* ─── Guest Upload Form ─────────────────────────────────────────────────────── */
function GuestUploadForm() {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (f: File | null) => {
    if (!f) return;
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) {
      setError(`${t('upload.err_format')} ${ext}.`);
      return;
    }
    if (f.size > MAX_MODEL_SIZE) {
      setError(t('upload.err_file_size'));
      return;
    }
    setFile(f);
    setError('');
  };

  const validateAndSetImage = (f: File | null) => {
    if (!f) return;
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(ext || '')) {
      setError(t('upload.err_img_format'));
      return;
    }
    if (f.size > MAX_IMAGE_SIZE) {
      setError(t('upload.err_img_size'));
      return;
    }
    setImage(f);
    setError('');
  };

  const handleNext = () => {
    if (!fullName.trim()) { setError(t('upload.err_required_name')); return; }
    if (!company.trim()) { setError(t('upload.err_required_company')); return; }
    if (!phone.trim()) { setError(t('upload.err_required_phone')); return; }
    if (!email.trim()) { setError(t('upload.err_required_email')); return; }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      handleNext();
      return;
    }

    if (!name.trim()) { setError(t('upload.err_required_model_name')); return; }
    if (!file) { setError(t('upload.err_required_file')); return; }
    if (!image) { setError(t('upload.err_required_image')); return; }

    setLoading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('image', image);
    fd.append('name', name.trim().substring(0, MAX_NAME_LEN));
    fd.append('email', email.trim());
    fd.append('fullName', fullName.trim());
    fd.append('company', company.trim());
    fd.append('phone', phone.trim());

    try {
      await api.post('/v1/models/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || t('upload.err_generic'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
        <h3 className="text-white text-xl font-bold mb-2">{t('upload.success_title')}</h3>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          {t('upload.success_desc')}{' '}
          <a href="mailto:info@3dstorelink.com" className="text-white underline underline-offset-2">info@3dstorelink.com</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">
                {t('upload.full_name_lbl')}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder={t('upload.full_name_ph')}
                required
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">
                {t('upload.company_lbl')}
              </label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder={t('upload.company_ph')}
                required
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">
                {t('upload.phone_lbl')}
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder={t('upload.phone_ph')}
                required
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">
                {t('upload.email_lbl')}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('upload.email_ph')}
                required
                className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleNext}
              className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-xl transition shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm uppercase tracking-wider"
            >
              {t('upload.btn_next')}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">
              {t('upload.name_lbl')} <span className="text-gray-600 font-normal normal-case">{t('upload.name_hint')}</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value.substring(0, MAX_NAME_LEN))}
              placeholder={t('upload.name_ph')}
              maxLength={MAX_NAME_LEN}
              required
              className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition"
            />
            <p className="text-right text-xs text-gray-600 mt-1">{name.length}/{MAX_NAME_LEN}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">
                {t('upload.file_lbl')} <span className="text-gray-600 font-normal normal-case">{t('upload.file_hint')}</span>
              </label>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-xl px-4 py-5 text-center transition cursor-pointer ${
                  file ? 'border-white/40 bg-white/5' : 'border-white/15 hover:border-white/30'
                }`}
              >
                {file ? (
                  <div>
                    <p className="text-white text-sm font-semibold truncate">{file.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl mb-2">📂</p>
                    <p className="text-gray-400 text-sm">{t('upload.file_sel')}</p>
                    <p className="text-gray-600 text-xs mt-1">{SUPPORTED_FORMATS.join(' · ')}</p>
                  </div>
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".glb,.gltf,.step,.stp,.obj"
                className="hidden"
                onChange={e => validateAndSetFile(e.target.files?.[0] || null)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-widest">
                {t('upload.img_lbl')} <span className="text-gray-600 font-normal normal-case">{t('upload.img_hint')}</span>
              </label>
              <button
                type="button"
                onClick={() => imgRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-xl px-4 py-5 text-center transition cursor-pointer overflow-hidden relative ${
                  image ? 'border-white/40 bg-white/5' : 'border-white/15 hover:border-white/30'
                }`}
              >
                {image ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={URL.createObjectURL(image)}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      alt="preview"
                    />
                    <div className="text-left min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{image.name}</p>
                      <p className="text-gray-500 text-xs">{(image.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl mb-2">🖼️</p>
                    <p className="text-gray-400 text-sm">{t('upload.img_sel')}</p>
                    <p className="text-gray-600 text-xs mt-1">JPG · JPEG · PNG</p>
                  </div>
                )}
              </button>
              <input
                ref={imgRef}
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                className="hidden"
                onChange={e => validateAndSetImage(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-400 hover:text-white transition text-sm uppercase tracking-wider font-semibold"
            >
              {t('upload.btn_back')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-xl transition shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm uppercase tracking-wider flex items-center justify-center min-w-[140px] ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                t('upload.submit')
              )}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm flex items-start gap-2">
          <span className="mt-0.5 flex-shrink-0">⚠️</span>
          <div>
            {error}
            {' '}{t('upload.err_contact')}{' '}
            <a href="mailto:info@3dstorelink.com" className="underline underline-offset-2 text-red-300">info@3dstorelink.com</a>
          </div>
        </div>
      )}
    </form>
  );
}
/* ─── Language Switcher ────────────────────────────────────────────────────── */
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  return (
    <div className="flex gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
      <button 
        onClick={() => i18n.changeLanguage('tr')}
        className={`px-2 py-1 text-xs font-bold rounded-md transition ${i18n.language === 'tr' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
      >
        TR
      </button>
      <button 
        onClick={() => i18n.changeLanguage('en')}
        className={`px-2 py-1 text-xs font-bold rounded-md transition ${i18n.language === 'en' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
      >
        EN
      </button>
    </div>
  );
}

/* ─── Landing Page ──────────────────────────────────────────────────────────── */
export default function Landing() {
  const { t } = useTranslation();
  const { token } = useAuthStore();
  const showcaseRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const [activeEmbed, setActiveEmbed] = useState(-1);

  const { data: heroData, isLoading: _isLoadingHero } = useQuery({
    queryKey: ['hero-models'],
    queryFn: () => api.get('/v1/models/community/all').then(r => r.data?.data || []),
  });
  
  const heroEmbeds = heroData?.length > 0 ? heroData : [
    { slug: 'default-key', label: 'Model' }
  ];

  useEffect(() => {
    if (heroData && heroData.length > 0 && activeEmbed === -1) {
      setActiveEmbed(Math.floor(Math.random() * heroData.length));
    }
  }, [heroData, activeEmbed]);

  const currentEmbed = heroEmbeds[activeEmbed === -1 ? 0 : activeEmbed] || heroEmbeds[0];

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link to="/" className="hover:opacity-90 transition">
              <img src="/brand-dark-theme.webp" alt="3D Store" className="h-16 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <Link
              to="/about"
              className="text-gray-400 hover:text-white text-sm font-medium transition hidden sm:block"
            >
              {t('nav.platform')}
            </Link>
            <button
              onClick={() => scrollTo(showcaseRef)}
              className="text-gray-400 hover:text-white text-sm font-medium transition hidden sm:block"
            >
              {t('nav.showcase')}
            </button>
            <button
              onClick={() => scrollTo(uploadRef)}
              className="text-gray-400 hover:text-white text-sm font-medium transition hidden sm:block"
            >
              {t('nav.upload')}
            </button>
            <a
              href={token ? 'https://dash.3dstorelink.com/dashboard' : 'https://dash.3dstorelink.com/login'}
              className="bg-white text-black px-4 py-2 text-sm font-bold rounded-lg hover:bg-gray-200 transition"
            >
              {token ? t('nav.dashboard') : t('nav.login')}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden pt-16 lg:pt-20">
        {/* Left content */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-0 relative z-10 w-full lg:w-1/2">
          <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            <Typewriter text1={t('hero.title1')} text2={t('hero.title2')} />
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
              {t('hero.desc')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3">
              <button
                onClick={() => scrollTo(showcaseRef)}
                className="w-full sm:w-auto bg-white text-black px-7 py-3.5 font-bold rounded-xl hover:bg-gray-100 transition"
              >
                {t('hero.btn_showcase')}
              </button>
              <button
                onClick={() => scrollTo(uploadRef)}
                className="w-full sm:w-auto border border-white/20 text-white px-7 py-3.5 font-bold rounded-xl hover:bg-white/5 transition"
              >
                {t('hero.btn_upload')}
              </button>
            </div>
          </div>
        </div>

        {/* Right: 3D Embed */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col p-4 sm:p-8 lg:p-12 mt-8 lg:mt-0 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
          <div className="w-full flex-1 rounded-3xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl relative mb-6">
            {_isLoadingHero || !currentEmbed || currentEmbed.slug === 'default-key' ? (
              <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <iframe
                src={`https://view.3dstorelink.com/${currentEmbed.slug}?autoRotate=1&autoplay=1&enableAR=1&bgColor=111111&cameraOrbit=0deg%2075deg%20auto&showControls=1&enableDownload=0`}
                className="w-full h-full absolute inset-0 border-none"
                allow="xr-spatial-tracking"
                title={currentEmbed.name || currentEmbed.label || '3D Model'}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🌐', title: t('features.f1_title'), desc: t('features.f1_desc') },
              { icon: '📱', title: t('features.f2_title'), desc: t('features.f2_desc') },
              { icon: '⚡', title: t('features.f3_title'), desc: t('features.f3_desc') },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/2 hover:bg-white/5 transition group">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showcase ── */}
      <section ref={showcaseRef} id="showcase" className="py-24 px-6 border-t border-white/5 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">{t('showcase.tag')}</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                {t('showcase.title1')}
                <span className="text-gray-600"> {t('showcase.title2')}</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm">{t('showcase.desc')}</p>
            </div>
            <button
              onClick={() => scrollTo(uploadRef)}
              className="self-start sm:self-auto text-sm text-gray-400 border border-white/15 hover:border-white/40 px-4 py-2 rounded-xl transition"
            >
              {t('showcase.btn_add')}
            </button>
          </div>
          <ShowcaseGallery />
        </div>
      </section>

      {/* ── Guest Upload ── */}
      <section ref={uploadRef} id="upload" className="py-24 px-6 border-t border-white/5 scroll-mt-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">{t('upload.tag')}</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
              {t('upload.title1')}
              <span className="text-gray-600"> {t('upload.title2')}</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              {t('upload.desc')}<br/>
              {t('upload.contact_hint')}{' '}
              <a href="mailto:info@3dstorelink.com" className="text-white underline underline-offset-2">info@3dstorelink.com</a>
            </p>
          </div>

          {/* Format info */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {SUPPORTED_FORMATS.map(f => (
              <span key={f} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded-full">{f}</span>
            ))}
            <span className="text-xs bg-white/5 border border-white/10 text-gray-500 px-3 py-1 rounded-full">{t('upload.format_model')}</span>
            <span className="text-xs bg-white/5 border border-white/10 text-gray-500 px-3 py-1 rounded-full">{t('upload.format_img')}</span>
          </div>

          <div className="bg-white/3 border border-white/10 rounded-2xl p-6 sm:p-8">
            <GuestUploadForm />
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
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition font-medium">
              {t('nav.platform')}
            </Link>
            <a href="mailto:info@3dstorelink.com" className="hover:text-white transition">info@3dstorelink.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
