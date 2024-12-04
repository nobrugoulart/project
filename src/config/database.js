import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../../data/tools.json');

export function saveTools(tools) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(tools, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving tools:', error);
    return false;
  }
}

export function loadTools() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading tools:', error);
    return [];
  }
}