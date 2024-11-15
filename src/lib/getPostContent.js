// src/lib/getPostContent.js

import { notion } from './notion.js';
import { NotionToMarkdown } from 'notion-to-md';

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPostContent(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const mdblocks = await n2m.pageToMarkdown(pageId);

    // Convertit les blocs Notion en chaîne Markdown
    const markdownObject = n2m.toMarkdownString(mdblocks);
    const markdown = markdownObject.parent; // Extrait la chaîne Markdown

    const properties = page.properties;

    const title = properties.Title?.title[0]?.plain_text || 'Sans titre';
    const tag = properties.Tags?.select?.name || '';
    const publishDate = properties['Publish Date']?.date?.start || '';

    return {
      id: page.id,
      title,
      markdown,
      publishDate,
      tag
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du contenu de l'article:", error);
    return null;
  }
}
