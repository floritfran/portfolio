const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://floritfran.github.io/portfolio";

export const siteUrl = rawSiteUrl.endsWith("/")
  ? rawSiteUrl
  : `${rawSiteUrl}/`;

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteConfig = {
  name: "Francisco Florit",
  title: "Francisco Florit — Full Stack Developer",
  description:
    "Portfolio de Francisco Florit, Full Stack Developer con más de 5 años de experiencia en Java, Spring Boot, React y React Native. Experiencia, proyectos y CV en español e inglés.",
  email: "franciscoflorit99@gmail.com",
  github: "https://github.com/floritfran",
  linkedin: "https://www.linkedin.com/in/francisco-florit-6311a7209/",
  photo: "/images/profile.jpg",
  ogImage: "/og-image.png",
  siteUrl,
  basePath,
} as const;

export function asset(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

export function absoluteAsset(path: string) {
  return new URL(asset(path), new URL(siteUrl).origin).toString();
}
