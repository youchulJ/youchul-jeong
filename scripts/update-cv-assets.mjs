import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const args = process.argv.slice(2);

function readOption(name) {
  const prefix = `--${name}=`;
  const inline = args.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);

  const index = args.indexOf(`--${name}`);
  if (index >= 0) return args[index + 1];

  return undefined;
}

async function ensureFile(filePath, expectedExtension) {
  if (!filePath) return undefined;

  const absolutePath = path.resolve(filePath);
  const details = await stat(absolutePath);
  if (!details.isFile()) {
    throw new Error(`${absolutePath} is not a file.`);
  }

  if (expectedExtension && path.extname(absolutePath).toLowerCase() !== expectedExtension) {
    throw new Error(`${absolutePath} must be a ${expectedExtension} file.`);
  }

  return absolutePath;
}

const pdfPath = await ensureFile(readOption('pdf'), '.pdf');
const docxPath = await ensureFile(readOption('docx'), '.docx');

if (!pdfPath && !docxPath) {
  console.log(`Usage:
  npm run update:cv -- --pdf "/path/to/Youchul Jeong CV.pdf"
  npm run update:cv -- --pdf "/path/to/Youchul Jeong CV.pdf" --docx "/path/to/Youchul Jeong CV.docx"

What this does:
  - Copies the public PDF to public/Youchul Jeong CV.pdf
  - Optionally stores the latest DOCX in private/Youchul Jeong CV.docx for local reference
  - Keeps private DOCX files out of Git by default`);
  process.exit(0);
}

if (pdfPath) {
  const target = path.join(root, 'public', 'Youchul Jeong CV.pdf');
  await copyFile(pdfPath, target);
  console.log(`Updated PDF: ${path.relative(root, target)}`);
}

if (docxPath) {
  const privateDir = path.join(root, 'private');
  await mkdir(privateDir, { recursive: true });
  const target = path.join(privateDir, 'Youchul Jeong CV.docx');
  await copyFile(docxPath, target);
  console.log(`Stored local DOCX reference: ${path.relative(root, target)}`);
}

console.log(`
Next steps:
  1. Update src/data/cv.json if the web text changed.
  2. Run npm run build.
  3. Commit and push the updated files.`);
