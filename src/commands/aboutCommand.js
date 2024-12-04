export function aboutCommand(ctx) {
  const aboutText = `
Bot de Ferramentas VIP 🤖

Este bot fornece acesso fácil a várias ferramentas e recursos em diferentes categorias:

• Ferramentas de MINERAÇÃO DE ANÚNCIOS
• Ferramentas SEO
• Inteligência Artificial
• Mineração de Produtos
• Fóruns
• Acesso a Streaming
• Imagens e Vídeos
• E muito mais!

Use /ferramentas para explorar os recursos disponíveis e /ajuda para instruções de uso.
`;
  
  return ctx.reply(aboutText);
}