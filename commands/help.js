export default {
  name: 'help',
  description: 'List of available commands',
  execute(message) {
    message.reply(`📜 **Pori Moni Commands:**\n
💖 /setup – Set current channel for AI chat\n
📚 /help – Show this help menu\n
😘 /kiss – Send a cute kiss\n
😄 /mood – Show Pori Moni’s mood\n
😡 /angry – Show Pori Moni’s ragi mood\n
🎁 /gift – Send a sweet virtual gift\n
Try messaging anything in setup channel after /setup 💬`);
  }
};
