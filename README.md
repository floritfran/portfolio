# Portfolio — Francisco Florit

Portfolio personal bilingüe (ES/EN) de Francisco Florit, Full Stack Developer.

- Sitio: https://floritfran.github.io/portfolio/
- Stack: Next.js 15, React 19, TypeScript y Tailwind CSS
- Deploy: export estático en GitHub Pages

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

El proyecto usa `.npmrc` con `legacy-peer-deps=true` por la combinación de versiones de Next.js, React y TypeScript.

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con Turbopack |
| `npm run build` | Build y export estático en `out/` |
| `npm run preview` | Sirve el contenido de `out/` |
| `npm run build:pages` | Valida el CV, genera los PDFs y compila para Pages |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sin emitir archivos |
| `npm test` | Tests con Vitest |
| `npm run test:watch` | Tests en modo watch |
| `npm run resume:validate` | Valida `resume.json` contra el schema Zod |
| `npm run resume:build` | Genera los CV PDF ES/EN |
| `npm run assets:build` | Genera foto, iconos e imagen Open Graph |

## Contenido

- `src/data/resume.json`: experiencia, educación, skills e idiomas.
- `src/data/resume.schema.ts`: validación y tipos del CV.
- `src/data/projects.json`: proyectos, links y traducciones.
- `src/data/site.ts`: datos de contacto, URL del sitio y helpers de assets.
- `src/i18n/dictionaries/es.ts`: textos en español y tipo `Dictionary`.
- `src/i18n/dictionaries/en.ts`: textos en inglés.
- `src/components/`: layout, secciones, proyectos y UI.
- `src/app/`: layout global, metadata, estilos y página principal.

El idioma se cambia desde el header, se guarda en `localStorage` y por defecto sigue el idioma del navegador con fallback a español.

## CV

Los PDFs se generan desde `resume.json` y `scripts/resume/cv-template.ts`:

```bash
npx playwright install chromium
npm run resume:build
```

Salida:

- `public/cv/Francisco-Florit-CV-ES.pdf`
- `public/cv/Francisco-Florit-CV-EN.pdf`

El script valida que cada CV tenga una sola página. Para cambiar el contenido, editar `resume.json` y volver a ejecutar `npm run resume:build`.

## Assets

```bash
npm run assets:build
```

Genera `public/images/profile.jpg`, `public/icon.svg`, `public/apple-icon.png` y `public/og-image.png`. Requiere Playwright Chromium y `sharp`.

La foto se toma por defecto de `../4x4.jpg`. Para usar otra ruta:

```powershell
$env:PHOTO_SOURCE="C:\ruta\a\foto.jpg"; npm run assets:build
```

## Tests y calidad

```bash
npm run lint
npm run typecheck
npm test
```

Los tests cubren contenido bilingüe, formato de fechas, tema, cambio de idioma y las secciones principales.

## Deploy en GitHub Pages

El workflow `.github/workflows/deploy.yml` se ejecuta en cada push a `master` y también puede lanzarse manualmente.

Pasos:

1. Subir el repo a GitHub.
2. Ir a **Settings → Pages** y elegir **Source: GitHub Actions**. El workflow intenta habilitarlo automáticamente, pero puede requerir permisos del repositorio.
3. Hacer push a `master` o ejecutar el workflow desde **Actions**.

El build usa:

- `NEXT_PUBLIC_BASE_PATH=/portfolio`
- `NEXT_PUBLIC_SITE_URL=https://floritfran.github.io/portfolio/`

Para probar el build de Pages localmente:

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/portfolio"
$env:NEXT_PUBLIC_SITE_URL="https://floritfran.github.io/portfolio/"
npm run build:pages
```

El resultado queda en `out/`.
