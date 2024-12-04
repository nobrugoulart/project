import { tools } from '../data/tools.js';

export function toolsList(ctx) {
  let message = 'Ferramentas Disponíveis:\n\n';
  
  tools.forEach(tool => {
    message += `- ${tool.name}\n`;
  });
  
  message += '\nUse /obter <nome_ferramenta> para acessar uma ferramenta específica';
  
  return ctx.reply(message);
}