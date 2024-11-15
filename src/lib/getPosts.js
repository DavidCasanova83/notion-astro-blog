// src/lib/getPosts.js

import { notion } from './notion.js';

// Fonction pour récupérer les articles publiés
export async function getPosts() {
  // Requête à la base de données Notion
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true, // Ne récupérer que les articles marqués comme publiés
      },
    },
    sorts: [
      {
        property: 'Publish Date',
        direction: 'descending', // Trier par date de publication décroissante
      },
    ],
    page_size: 100, // Nombre maximal d'articles à récupérer
  });

  console.log('response', response);
  
  // Extraction des données nécessaires pour chaque article
  const posts = response.results.map((page) => {
    const properties = page.properties;

    const title = properties.Title.title[0]?.plain_text || 'Sans titre';
    const slug = properties.Slug.rich_text[0]?.plain_text || '';
    const publishDate = properties['Publish Date'].date?.start || '';
    const tag = properties.Tags?.select?.name || '';

    return {
      id: page.id,
      title,
      slug,
      publishDate,
      tag
    };
  });

  return posts;
}
