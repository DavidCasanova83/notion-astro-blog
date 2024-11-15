// test-notion.js

import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

(async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    console.log('Réponse de Notion:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Erreur lors de la requête à Notion:', error);
  }
})();
