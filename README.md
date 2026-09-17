# Sneha Sunil — UI/UX Designer

Sneha's portfolio of web and mobile design work, with an animated Journey timeline, skills marquee, downloadable resume, and contact form. Built with React, Vite, GSAP, Framer Motion, and Lenis.

## Development

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Before committing:

```sh
npm run lint
npm run build
```

`npm run preview` serves the production build locally.

## Content

| Content | File |
| --- | --- |
| Bio, services, social links, resume, and tagline | `src/content/profile.js` |
| Project descriptions, images, and links | `src/content/projects.js` |
| Work experience and education | `src/content/timeline.js` |
| Skills | `src/content/skills.js` |
| Main page and layout | `src/pages/Home.jsx`, `src/pages/HomePage.css` |
| Portrait, decorative assets, and social preview | `public/images/` |
| Project screenshots | `public/projects/` |
| Downloadable resume | `public/resume/Sneha-Sunil-Resume.pdf` |

The contact form opens the visitor's email application with a draft addressed to Sneha. It includes the name, reply email, and message; the visitor sends it from their email application. No backend or email API key is required.

## Netlify deployment

Connect this repository to Netlify. `netlify.toml` sets Node.js 22, the `npm run build` command, the `dist` publish folder, and client-side route handling.

The build uses Netlify's `URL` environment variable for canonical links, social-image URLs, and the sitemap. Choose the site name in Netlify; the code does not assume a domain is available. For a custom domain or a non-Netlify build, set `VITE_SITE_URL` to the confirmed full URL, then rebuild. A local build without a URL omits the canonical link and sitemap rather than publishing a guessed address.

The installed-app name and icons are configured in `public/site.webmanifest`. Vite generates the service worker; do not add a second registration script. Generated files, temporary screenshots, caches, and local environment files are ignored by Git.

## Fonts and dependencies

The site uses the Archivo font. Its required license is included in `public/fonts/OFL.txt`. Third-party libraries retain their own licenses; the portfolio's personal content and branding identify Sneha Sunil.
