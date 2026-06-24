# Youchul Jeong CV

Public academic CV website built with Astro and deployed with GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The site is configured for the GitHub Pages project path:

```js
base: '/youchul-jeong-cv/'
```

## Content

The website CV content is maintained in:

```text
src/data/cv.json
```

The downloadable public CV PDF is stored at:

```text
public/Youchul Jeong CV.pdf
```

## Updating From Google Docs

1. Update the CV in Google Docs.
2. Download/export the Google Doc as PDF.
3. Optional: download/export the Google Doc as DOCX for local reference.
4. Run:

```bash
npm run update:cv -- --pdf "/path/to/Youchul Jeong CV.pdf"
```

With a local DOCX reference:

```bash
npm run update:cv -- --pdf "/path/to/Youchul Jeong CV.pdf" --docx "/path/to/Youchul Jeong CV.docx"
```

5. If the website text changed, update `src/data/cv.json`.
6. Run:

```bash
npm run build
```

7. Commit and push.

The DOCX reference is stored under `private/`, which is ignored by Git.
