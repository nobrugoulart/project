import { tools } from '../data/tools.js';
import fs from 'fs/promises';
import { ADMIN_IDS } from '../config/constants.js';

export async function updateTool(ctx) {
  if (!ADMIN_IDS.includes(ctx.from.id.toString())) {
    return ctx.reply('Você não está autorizado a usar este comando.');
  }

  const args = ctx.message.text.split(' ');
  if (args.length < 3) {
    return ctx.reply('Uso: /atualizar_ferramenta <nome_ferramenta> <novo_link_acesso>');
  }

  const toolName = args[1].toLowerCase();
  const newAccess = args.slice(2).join(' ');

  const toolIndex = tools.findIndex(t => t.name.toLowerCase() === toolName);
  if (toolIndex === -1) {
    return ctx.reply('Ferramenta não encontrada.');
  }

  // Atualizar ferramenta
  tools[toolIndex] = {
    ...tools[toolIndex],
    access: newAccess,
    lastUpdated: new Date().toISOString()
  };

  try {
    // Registrar a atualização
    const logEntry = `${new Date().toISOString()} - Atualizado ${toolName} por ${ctx.from.username}\n`;
    await fs.appendFile('logs/tools_updates.log', logEntry);

    return ctx.reply(`✅ Ferramenta ${toolName} atualizada com sucesso!\nNovo acesso: ${newAccess}`);
  } catch (error) {
    console.error('Erro ao atualizar ferramenta:', error);
    return ctx.reply('❌ Erro ao atualizar ferramenta. Por favor, tente novamente mais tarde.');
  }
}