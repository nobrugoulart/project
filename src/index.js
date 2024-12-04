import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import { registerCommands } from './commands/index.js';
import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { tools } from './data/tools.js';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configure environment variables
config();

// Redis client setup
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});
redisClient.connect().catch(console.error);

// Initialize Express
const app = express();
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Session middleware with Redis
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

app.use(express.urlencoded({ extended: true }));

// Initialize bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Register commands
registerCommands(bot);

// Import and use routes
import routes from './routes/index.js';
app.use('/', routes);

// Error handling
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  fs.appendFileSync('logs/err.log', `${new Date().toISOString()} - ${err.stack}\n`);
});

// Start both bot and web server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web panel running on port ${PORT}`);
  fs.appendFileSync('logs/out.log', `${new Date().toISOString()} - Web panel started on port ${PORT}\n`);
});

bot.launch()
  .then(() => {
    console.log('Bot started successfully');
    fs.appendFileSync('logs/out.log', `${new Date().toISOString()} - Bot started successfully\n`);
  })
  .catch(err => {
    console.error('Failed to start bot:', err);
    fs.appendFileSync('logs/err.log', `${new Date().toISOString()} - Failed to start bot: ${err.stack}\n`);
  });

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));