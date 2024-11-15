// src/lib/notion.js

// Importation du client Notion
import { Client } from '@notionhq/client';

// Importation de dotenv pour gérer les variables d'environnement
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Initialisation du client Notion avec votre jeton d'intégration
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
