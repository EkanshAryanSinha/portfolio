# Ekansh Aryan Sinha — Premium Portfolio

A world-class interactive portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and GSAP. Designed for dual-track positioning: **Software Development Engineer** and **Quantitative Analyst**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion + GSAP |
| 3D / WebGL | React Three Fiber + Three.js |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles, CSS variables, utility classes
│   ├── layout.tsx           # Root layout with SEO metadata & fonts
│   └── page.tsx             # Main page — assembles all sections
├── components/
│   ├── Navigation.tsx       # Fixed navbar with scroll spy & mobile menu
│   ├── Hero.tsx             # Full-screen hero with typing animation & CTAs
│   ├── ParticleBackground.tsx  # React Three Fiber particle field + grid
│   ├── CareerTracks.tsx     # Dual-track SDE vs Quant split-screen
│   ├── About.tsx            # Personal bio + animated stat cards
│   ├── ExperienceTimeline.tsx  # Animated vertical timeline (MerQube, Nykaa)
│   ├── SkillsGalaxy.tsx     # Filterable skills with hover tooltips
│   ├── Projects.tsx         # Filterable project grid with 3D tilt effect
│   ├── QuantPlayground.tsx  # Live SVG animated quant visuals
│   ├── SystemsSection.tsx   # Terminal animation + FastAPI code snippet
│   ├── Achievements.tsx     # Animated counter achievement cards
│   ├── ResumeDownload.tsx   # Dual resume download section
│   └── Contact.tsx          # Contact form + social links
├── public/
│   └── resumes/
│       ├── Ekansh_Aryan_Sinha_SDE_Resume.pdf          ← Add your SDE resume here
│       └── Ekansh_Aryan_Sinha_Quantitative_Analyst_Resume.pdf  ← Add your Quant resume here
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Adding Your Resumes

Place your PDF resumes in the `public/resumes/` folder:

```
public/resumes/Ekansh_Aryan_Sinha_SDE_Resume.pdf
public/resumes/Ekansh_Aryan_Sinha_Quantitative_Analyst_Resume.pdf
```

The download buttons in the Resume section will automatically link to these files.

---

## Customization

### Colors
Edit `tailwind.config.ts` to adjust the color palette:
- `cyan.electric` (#00d4ff) — SDE accent
- `indigo.electric` (#6366f1) — Quant accent
- `navy.*` — Background shades

### Sections
All sections are standalone components in `/components/`. You can reorder them in `app/page.tsx`.

### Contact Form
The contact form in `Contact.tsx` currently simulates a send (1.2s delay). To wire it up, replace the `handleSubmit` function with a real API call to:
- [Formspree](https://formspree.io) — `fetch('https://formspree.io/f/YOUR_ID', ...)`
- [EmailJS](https://emailjs.com)
- Your own Next.js API route (`/api/contact`)

---

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

Or push to GitHub and import at [vercel.com](https://vercel.com).

### Netlify

```bash
npm run build
# Deploy the `.next` folder
```

---

## Performance Notes

- The `ParticleBackground` (Three.js) uses `dynamic(() => import(...), { ssr: false })` to avoid SSR issues and reduce bundle size.
- Particle count is set to 3,000 with `dpr={[1, 1.5]}` for smooth 60fps on most devices.
- All scroll animations use `useInView` with `once: true` to fire only once.
- Lenis is initialized client-side only with a graceful fallback.

---

## SEO

Metadata is configured in `app/layout.tsx`:
- Title: `Ekansh Aryan Sinha | Software Engineer & Quantitative Analyst`
- Open Graph + Twitter Card support
- Semantic HTML throughout

---

Built with care for SDE Fresher, Quant Analyst Fresher, and Quant Developer roles.
