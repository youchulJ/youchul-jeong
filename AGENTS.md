# Agent Notes

## CV Update Workflow

When the user provides an updated Word CV and PDF export:

1. Treat the user's `.docx` as the source of truth for website text.
2. Extract the latest CV text from the `.docx` and compare it with `src/data/cv.json`.
3. Update `src/data/cv.json` to match the latest CV content.
4. If the displayed Profile text changes, update both `src/data/cv.json` and the hardcoded Profile paragraph in `src/pages/index.astro`.
5. Replace the public PDF by running:

   ```bash
   npm run update:cv -- --pdf "/path/to/CV.pdf" --docx "/path/to/CV.docx"
   ```

6. Keep the DOCX only as a private local reference in `private/Youchul Jeong CV.docx`; do not commit private DOCX files.
7. Run `npm run build` before committing.
8. Start a local preview with `npm run dev -- --host 127.0.0.1` and open the printed `/youchul-jeong-cv/` URL in Firefox for review.
9. Commit the website data, template, and public PDF changes after the user approves the preview.

## Design Preferences

- Keep the site minimal: white background, black text, thin rules, generous whitespace.
- Avoid decorative cards, shadows, gradients, and dense UI chrome.
- Keep Profile concise and readable in two short paragraphs.
- Keep Technical Skills as broad categories, not detailed tool lists.
- Preserve section folding, but do not allow the right sidebar to create its own scrollbar.
