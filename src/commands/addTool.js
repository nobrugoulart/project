import { tools } from '../data/tools.js';
import { ADMIN_IDS } from '../config/constants.js';
import fs from 'fs/promises';

export async function addTool(ctx) {
  if (!ADMIN_IDS.includes(ctx.from.id.toString())) {
    return ctx.reply('Você não está autorizado a usar este comando.');
  }

  const args = ctx.message.text.split(' ');
  if (args.length < 3) {
    return ctx.reply('Uso: /adicionar_ferramenta <nome_ferramenta> <link_acesso>');
  }

  const toolName = args[1].toLowerCase();
  const access = args.slice(2).join(' ');

  // Verificar se a ferramenta já existe
  const toolExists = tools.some(t => t.name.toLowerCase() === toolName);
  if (toolExists) {
    return ctx.reply('Uma ferramenta com este nome já existe.');
  }

  // Adicionar nova ferramenta
  const newTool = {
    name: toolName,
    access: access,
    lastUpdated: new Date().toISOString()
  };

  tools.push(newTool);

  try {
    // Registrar a adição
    const logEntry = `${new Date().toISOString()} - Adicionada nova ferramenta ${toolName} por ${ctx.from.username}\n`;
    await fs.appendFile('logs/tools_updates.log', logEntry);

    return ctx.reply(`✅ Nova ferramenta "${toolName}" adicionada com sucesso!`);
  } catch (error) {
    console.error('Erro ao adicionar ferramenta:', error);
    return ctx.reply('❌ Erro ao adicionar ferramenta. Por favor, tente novamente mais tarde.');
  }
}