import { ADMIN_IDS } from '../config/constants.js';

export function commandsList(ctx) {
  const commands = `
Comandos Disponíveis:
/comandos - Mostrar esta lista de comandos
/ferramentas - Mostrar ferramentas disponíveis
/obter <nome_ferramenta> - Obter acesso a uma ferramenta específica
/ajuda - Exibir informações de ajuda
/sobre - Informações sobre o bot
${ctx.from && ADMIN_IDS.includes(ctx.from.id.toString()) ? `
/atualizar_ferramenta <categoria> <nome_ferramenta> <novo_link_acesso> - Atualizar acesso à ferramenta (Apenas Admin)
/adicionar_ferramenta <categoria> <nome_ferramenta> <link_acesso> - Adicionar nova ferramenta (Apenas Admin)` : ''}
`;
  return ctx.reply(commands);
}