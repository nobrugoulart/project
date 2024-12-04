from telegram import Update
from telegram.ext import ContextTypes
from utils.tool_utils import find_tool
from data.tools import tools

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Welcome to VIP Tools Bot! Use /help to see available commands."
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = """
Welcome to the VIP Tools Bot! 🚀

Here's how to use the bot:

1. View Available Commands:
   Use /commands to see all available commands

2. Browse Tools:
   Use /tools to see all available tools

3. Access Tools:
   Use /get <tool_name> to access a specific tool
   Example: /get chatgpt

4. Get Help:
   Use /help (this command) for assistance

5. About the Bot:
   Use /about to learn more about the bot

Need more help? Feel free to ask in the group!
"""
    await update.message.reply_text(help_text)

async def about(update: Update, context: ContextTypes.DEFAULT_TYPE):
    about_text = """
VIP Tools Bot 🤖

This bot provides easy access to various tools and resources across different categories:

• AD MINING Tools
• SEO Tools
• Artificial Intelligence
• Product Mining
• Forums
• Streaming Access
• Images and Videos
• And more!

Use /tools to explore available resources and /help for usage instructions.
"""
    await update.message.reply_text(about_text)

async def list_commands(update: Update, context: ContextTypes.DEFAULT_TYPE):
    commands_text = """
Available Commands:
/commands - Show this list of commands
/tools - Show available tools
/get <tool_name> - Get access to a specific tool
/help - Display help information
/about - Information about the bot
"""
    await update.message.reply_text(commands_text)

async def list_tools(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message = "Available Tools:\n\n"
    
    for category, tools_list in tools.items():
        message += f"{category}:\n"
        for tool in tools_list:
            message += f"- {tool['name']}\n"
        message += "\n"
    
    message += "\nUse /get <tool_name> to access a specific tool"
    await update.message.reply_text(message)

async def get_tool(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text(
            "Please specify a tool name. Use /tools to see available tools."
        )
        return

    tool_name = context.args[0]
    tool = find_tool(tool_name)
    
    if not tool:
        await update.message.reply_text(
            "Tool not found. Use /tools to see available tools."
        )
        return
    
    await update.message.reply_text(
        f"Access to {tool['name']}:\n{tool['access']}"
    )