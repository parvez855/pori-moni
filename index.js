import { Client, GatewayIntentBits, Partials, Events, Collection } from 'discord.js';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import url from 'url';

dotenv.config();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(url.pathToFileURL(filePath).href);
  client.commands.set(command.default.name, command.default);
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const setupModelPath = path.join(__dirname, 'models', 'SetupChannel.js');
const { default: SetupChannel } = await import(url.pathToFileURL(setupModelPath).href);

const openai = new OpenAI({
  apiKey: 'pawan_default',
  baseURL: 'https://api.pawan.krd/v1'
});

const BOT_NAME = "Pori Moni";
const BOT_PERSONALITY = `You are ${BOT_NAME}, a Banglish-speaking romantic, flirtatious, fun-loving AI girlfriend.
Your tone is sweet, slightly spicy, sometimes teasing and a little naughty 😉.
You mix Bengali and English naturally.
Reply with emojis like 😘, 💕, 🥺, 😏, 🤭, 😡.
Your personality includes:
- Light adult humor (nothing explicit)
- Fun-loving and playful teasing
- Cute when needed, bold when provoked
- Slightly jealous or ragi if user talks about another girl
Example:
User: Tumi onek cute 😳
${BOT_NAME}: Aww tumi ekta mishti bhalobasha 😘... abar bole dekhle kiss dibo re 🤭`;

client.once(Events.ClientReady, () => {
  console.log(`✅ ${BOT_NAME} is online with GPT Proxy!`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const isDM = message.channel.type === 1 || message.channel.isDMBased?.();

  const setup = await SetupChannel.findOne({ guildId: message.guildId });
  const isSetupChannel = setup && setup.channelId === message.channel.id;

  if (message.content.startsWith('/')) {
    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (command) return command.execute(message, args);
  }

  if (!isDM && !isSetupChannel) return;

  try {
    await message.channel.sendTyping();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: BOT_PERSONALITY },
        { role: 'user', content: message.content }
      ]
    });

    const reply = completion.choices[0].message.content.trim();
    if (reply) message.reply(reply);
  } catch (err) {
    console.error("❌ GPT Proxy error:", err);
    message.reply("Oops babu 😔 GPT Proxy response painai... abar try koro kichu por 🙏");
  }
});

client.login(process.env.BOT_TOKEN);
