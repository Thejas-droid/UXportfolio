import { useEffect } from "react";
import { profile, seoDescription } from "../content/profile";

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}
export function useSeoMeta({ title, description = seoDescription, path = "" }) {
  useEffect(() => {
    const fullTitle = !title || title === profile.name ? `${profile.name} — ${profile.role}` : `${title} | ${profile.name}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    if (profile.siteUrl) {
      const base = profile.siteUrl.replace(/\/$/, "");
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
      canonical.href = `${base}${path || "/"}`;
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) { ogUrl = document.createElement("meta"); ogUrl.setAttribute("property", "og:url"); document.head.appendChild(ogUrl); }
      ogUrl.content = canonical.href;
      const image = new URL(profile.socialImage, `${base}/`).href;
      setMeta('meta[property="og:image"]', "content", image);
      setMeta('meta[name="twitter:image"]', "content", image);
    }
  }, [title, description, path]);
}
