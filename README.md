# 3D StoreLink Web (Landing & Platform Showcase)

Official public website and landing page for **[3D StoreLink](https://3dstorelink.com)**.

Designed for high-performance deployment on **Cloudflare Pages**, featuring 3D model showcases, WebAR previews, multilingual platform guides (English / Turkish), and direct integration with the 3D StoreLink cloud API.

## 🚀 Key Highlights

- **Ultra-Fast & Lightweight:** Built with React 18, Vite 5, Tailwind CSS, and TypeScript.
- **Multilingual Support (i18n):** Instant Turkish (`tr`) and English (`en`) language switching.
- **Interactive 3D & WebAR Showcase:** Real-time 3D models embedded via `<model-viewer>` and 3D StoreLink WebGL viewer.
- **Cloudflare Pages Optimized:** Preconfigured with SPA client-side routing (`_redirects`) and security headers (`_headers`).
- **SEO & Social Metadata Ready:** Dynamic Open Graph, Twitter Cards, canonical links, `sitemap.xml`, and `robots.txt`.

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Environment Configuration

By default, the application connects to the production API at `https://api.3dstorelink.com/api`. You can customize this by creating a `.env.local` file:

```env
VITE_API_URL=https://api.3dstorelink.com/api
```

## ☁️ Cloudflare Pages Deployment

When setting up your Cloudflare Pages project:

1. **Framework preset:** `Vite`
2. **Build command:** `npm run build`
3. **Build output directory:** `dist`
4. **Root directory:** `/` (or leave empty)

---

© 2026 3D StoreLink. All rights reserved.
