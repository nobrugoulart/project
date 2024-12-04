import logging
from telegram.ext import ApplicationBuilder, CommandHandler
from config import BOT_TOKEN
from handlers.commands import (
    start,
    help_command,
    about,
    list_commands,
    list_tools,
    get_tool
)

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

def main():
    # Create the Application and pass it your bot's token
    application = ApplicationBuilder().token(BOT_TOKEN).build()

    # Add command handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("about", about))
    application.add_handler(CommandHandler("commands", list_commands))
    application.add_handler(CommandHandler("tools", list_tools))
    application.add_handler(CommandHandler("get", get_tool))

    # Start the bot
    application.run_polling()