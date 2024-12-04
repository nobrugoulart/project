import { tools } from '../data/tools.js';

export function findTool(toolName) {
  return tools.find(tool => tool.name.toLowerCase() === toolName.toLowerCase()) || null;
}