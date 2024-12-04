import { findTool } from '../utils/toolUtils.js';

export function getToolAccess(ctx) {
  const toolName = ctx.message.text.split(' ')[1];
  
  if (!toolName) {
    return ctx.reply('Por favor, especifique o nome da ferramenta. Use /ferramentas para ver as ferramentas disponíveis.');
  }
  
  const tool = findTool(toolName);
  
  if (!tool) {
    return ctx.reply('Ferramenta não encontrada. Use /ferramentas para ver as ferramentas disponíveis.');
  }
  
  return ctx.reply(`Acesso à ${tool.name}:\n${tool.access}`);
}