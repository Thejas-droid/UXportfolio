# Thejas S — Software Developer

Personal portfolio built with React and Vite. Name and role are confirmed; all other personal content is explicitly a placeholder.

## Run locally

```sh
npm install
npm run dev
npm run lint
npm run build
```

## Personalize

| Content | Edit here |
| --- | --- |
| Name, role, bio, location, email, social URLs, resume, services, testimonials, experiments | `src/content/profile.js` |
| Project titles, descriptions, screenshots, technologies, source and demo links | `src/content/projects.js` |
| Work and education dates | `src/content/timeline.js` |
| Skills and certifications | `src/content/skills.js` |
| Reading, learning, building | `src/content/currently.js` |
| Optional personal page | `src/pages/Love.jsx` |
| Privacy and terms drafts | `src/pages/Privacy.jsx`, `src/pages/Terms.jsx` |

## Replace images

All personal images are local SVG placeholders with visible labels:

- `public/placeholders/profile.svg`: portrait used by both sides of the animated card (600 × 720).
- `public/placeholders/project-1.svg` through `project-4.svg`: project previews (1200 × 800).
- `public/placeholders/personal.svg`: optional personal page (1200 × 800).
- `public/placeholders/social.svg`: social sharing preview (1200 × 630).
- `public/favicon.svg`: new TS monogram.

To use JPG, PNG, or WebP, add the file to `public/` and change the corresponding image path in `profile.js` or `projects.js`. Public URLs omit `public` (for example `/images/thejas.jpg`). Keep decorative stars, bolt, textures, and fonts in `public/template/` and `public/fonts/`; they are shared design assets, not personal photographs.

## Contact and resume

Unknown links are blank and visibly unavailable. Set `profile.email` to enable email drafts, or copy `.env.example` to `.env.local` and add your own `VITE_WEB3FORMS_KEY` for delivery. With neither configured, the form is disabled and never reports a sent message. Add your PDF to `public/Thejas-S-Resume.pdf` and set `profile.resumeUrl` to `/Thejas-S-Resume.pdf` to enable downloads.

## Before publishing

Replace placeholders, add your actual domain to `profile.siteUrl`, update static metadata and the Person schema in `index.html`, and add absolute URLs to `public/sitemap.xml` and its location to `public/robots.txt`. Replace the social SVG with a PNG/JPG for broad social crawler support; update `profile.socialImage` and both social image tags in `index.html`. The served PWA manifest is `public/site.webmanifest`; keep its source copy in `src/assets/site.webmanifest` in sync if edited. No domain, email, employer, qualification, or GitHub account has been guessed.

The original software's MIT attribution remains in `LICENSE`. Copied design research under `.analysis/` is development history, is not part of the site, and is excluded from the build. Old personal resumes and project screenshots have been removed from public assets.
