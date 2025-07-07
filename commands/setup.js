
const SetupChannel = require('../models/SetupChannel');

module.exports = {
  name: 'setup',
  description: 'Set current channel for AI replies',
  async execute(message) {
    if (!message.member.permissions.has('Administrator')) return message.reply('🔒 You need admin permission!');
    await SetupChannel.findOneAndUpdate(
      { guildId: message.guildId },
      { channelId: message.channel.id },
      { upsert: true }
    );
    message.reply(`✅ AI chat enabled in this channel!`);
  }
};
