import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jaikeysingh.vercel.app";
  const now = new Date();
  return [
    { url: base,               lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/works`,    lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/journey`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/skills`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,  lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];
}
