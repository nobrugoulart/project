export function helpCommand(ctx) {
  const helpText = `
Bem-vindo ao Bot de Ferramentas STRIKE NETWORK! 🚀

Aqui está como usar o bot:

1. Ver Comandos Disponíveis:
   Use /comandos para ver todos os comandos disponíveis

2. Navegar pelas Ferramentas:
   Use /ferramentas para ver todas as ferramentas disponíveis

3. Acessar Ferramentas:
   Use /obter <nome_ferramenta> para acessar uma ferramenta específica
   Exemplo: /obter chatgpt

4. Obter Ajuda:
   Use /ajuda (este comando) para assistência

5. Sobre o Bot:
   Use /sobre para saber mais sobre o bot

Precisa de mais ajuda? Sinta-se à vontade para perguntar no grupo!
`;
  
  return ctx.reply(helpText);
}