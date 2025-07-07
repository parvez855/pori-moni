export default {
  name: 'help',
  description: 'List of available commands',
  execute(message) {
    message.reply(`📜 **Pori Moni Commands:**\n
💖 /setup – Set current channel for AI chat\n
📚 /help – Show this help menu\n
Try messaging anything in setup channel after /setup 💬`);
  }
};
