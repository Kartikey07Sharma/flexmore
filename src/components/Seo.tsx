import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, any>;
}

/**
 * Lightweight client-side SEO/meta updater (no extra deps).
 * For full SSR SEO use react-helmet-async; this covers the common case.
 */
export function Seo({ title, description, image, type = "website", jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title.length > 60 ? title.slice(0, 57) + "…" : title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [, name] = selector.match(/\[(?:name|property)="([^"]+)"\]/) ?? [];
        if (name) el.setAttribute(selector.includes("property") ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (description) {
      setMeta('meta[name="description"]', "content", description.slice(0, 160));
      setMeta('meta[property="og:description"]', "content", description.slice(0, 160));
    }
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:type"]', "content", type);
    if (image) setMeta('meta[property="og:image"]', "content", image);

    // Canonical
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.href;

    // JSON-LD
    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld="true"]');
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "true");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, image, type, jsonLd]);

  return null;
}
