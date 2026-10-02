import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function PublicUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Lütfen bir model dosyası seçin (.glb, .gltf, .step, .obj vb.)');
      return;
    }
    if (!image) {
      setError('Lütfen modeliniz için bir kapak görseli yükleyin (preview image).');
      return;
    }
    
    if (file.size > 20 * 1024 * 1024) {
      setError('Model dosya boyutu 20MB sınırını aşıyor.');
      return;
    }

    if (image.size > 2 * 1024 * 1024) {
      setError('Görsel boyutu 2MB sınırını aşıyor.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('image', image);
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);

    try {
      const response = await api.post('/v1/models/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Yükleme sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <img src="/icon.webp" alt="3D Store" className="mx-auto h-12 w-12 object-contain" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Ücretsiz Model Yükle</h2>
          <p className="mt-2 text-sm text-gray-600">
            Kayıt olmadan hızlıca 3D modelinizi yükleyin ve paylaşın.
          </p>
        </div>

        {result ? (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-green-800 font-medium">Model Yüklendi ve İncelemeye Gönderildi!</h3>
              <p className="text-green-700 text-sm mt-1">
                Modeliniz başarıyla yüklendi. Ancak sistem yöneticisi onaylamadan aşağıdaki bağlantılar çalışmayacaktır. Lütfen onay sürecini bekleyin.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Görüntüleme Linki (Public Link)</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  readOnly
                  value={result.links.viewer}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md sm:text-sm border-gray-300 bg-gray-50 focus:ring-black focus:border-black"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(result.links.viewer)}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Kopyala
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Embed Iframe Kodu</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <textarea
                  readOnly
                  value={result.links.embed}
                  rows={3}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md sm:text-sm border-gray-300 bg-gray-50 focus:ring-black focus:border-black"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(result.links.embed)}
                  className="inline-flex items-center px-4 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Kopyala
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">Bu kodu kullanarak modeli kendi sitenize ekleyebilirsiniz.</p>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <a
                href={result.links.viewer}
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
              >
                Modeli Görüntüle
              </a>
              <button
                onClick={() => {
                  setResult(null);
                  setFile(null);
                  setName('');
                  setDescription('');
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gray-300"
              >
                Yeni Yükle
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Model Adı (İsteğe Bağlı)</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Harika Modelim"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama (İsteğe Bağlı)</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Bu model şunun için yapıldı..."
                />
              </div>

              <div>
            <label className="block text-sm font-medium text-gray-700">Model Dosyası (Max 20MB)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Dosya Seç</span>
                    <input id="file-upload" type="file" className="sr-only" accept=".glb,.gltf,.step,.stp,.obj,.fbx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <p className="text-xs text-gray-500">GLB, GLTF, STEP, OBJ, FBX</p>
                {file && <p className="text-sm text-green-600 font-medium mt-2">Seçilen dosya: {file.name}</p>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Kapak Görseli (Zorunlu, Max 2MB)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white">
              <div className="space-y-1 text-center">
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Görsel Seç</span>
                    <input id="image-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                {image && <p className="text-sm text-green-600 font-medium mt-2">Seçilen görsel: {image.name}</p>}
              </div>
            </div>
          </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !file}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Yükleniyor ve İşleniyor...' : 'Modeli Yükle'}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <Link to="/" className="text-sm text-gray-600 hover:text-black">
                Ana Sayfaya Dön
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
