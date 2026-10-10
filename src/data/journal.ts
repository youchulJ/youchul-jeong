import type { MarkdownInstance } from 'astro';
type JournalFrontmatter = { title: string; date: string; location?: string; excerpt?: string; draft?: boolean; cover?: string; coverAlt?: string; protectPhotos?: boolean; photoCaption?: string; dateLabel?: string; gallery?: { src: string; alt: string; caption: string }[]; };
const posts = import.meta.glob<MarkdownInstance<JournalFrontmatter>>('../content/journal/*.md', { eager: true });
export const journalEntries = Object.entries(posts)
  .filter(([, post]) => post.frontmatter.draft !== true)
  .map(([path, post]) => ({ slug: path.split('/').pop()!.replace(/\.md$/, ''), ...post }))
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
