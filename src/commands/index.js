import { commandsList } from './commandsList.js';
import { toolsList } from './toolsList.js';
import { getToolAccess } from './getToolAccess.js';
import { helpCommand } from './helpCommand.js';
import { aboutCommand } from './aboutCommand.js';
import { startCommand } from './startCommand.js';
import { updateTool } from './updateTool.js';
import { addTool } from './addTool.js';

export function registerCommands(bot) {
  bot.command('start', startCommand);
  bot.command('comandos', commandsList);
  bot.command('ferramentas', toolsList);
  bot.command('ajuda', helpCommand);
  bot.command('sobre', aboutCommand);
  bot.command('obter', getToolAccess);
  bot.command('atualizar_ferramenta', updateTool);
  bot.command('adicionar_ferramenta', addTool);
}