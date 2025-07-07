// 📁 File: index.js (With Free GPT Proxy Support)

const { Client, GatewayIntentBits, Partials, Events, Collection } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

// 🔧 Bot Setup
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
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// 🔌 MongoDB Setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const SetupChannel = require('./models/SetupChannel');

// 🤖 GPT Proxy Setup
const configuration = new Configuration({
  apiKey: "pawan_default",
  basePath: "https://api.pawan.krd/v1"
});
const openai = new OpenAIApi(configuration);

// 🤖 Bot Personality
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

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: BOT_PERSONALITY },
        { role: 'user', content: message.content }
      ]
    });

    const reply = completion.data.choices[0].message.content.trim();
    if (reply) message.reply(reply);
  } catch (err) {
    console.error("❌ GPT Proxy error:", err);
    message.reply("Oops babu 😔 GPT Proxy response painai... abar try koro kichu por 🙏");
  }
});

client.login(process.env.BOT_TOKEN);
