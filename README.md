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
base: process.env.SITE_BASE_PATH || '/youchul-jeong/'
```

Local previews use `/youchul-jeong/`. The GitHub Pages workflow sets
`SITE_BASE_PATH` from the repository name so navigation and assets use the
actual deployed project path, currently `/youchul-jeong-cv/`.

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

## Journal

The Journal tab is at `/youchul-jeong/journal/`. Entries are Markdown files in
`src/content/journal/`, listed newest first. Copy `first-entry.md`, choose a new
filename (used as the URL), and fill in `title`, `date` (`YYYY-MM-DD`), optional
`location`, and `excerpt`. Set `draft: false` when the entry is ready to appear.
Drafts are excluded from both the journal list and generated entry pages.

Put photographs in `public/images/journal/`. Set `cover` to
`images/journal/photo.jpg` and provide `coverAlt`, or insert photographs between
paragraphs with `![Photo description](/youchul-jeong/images/journal/photo.jpg)`.
For captions, use a `<figure>` with an `<img>` and `<figcaption>` in the Markdown.
Build and deploy after editing to update the public journal.
