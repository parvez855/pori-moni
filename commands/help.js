export default {
  name: 'help',
  description: 'Show available commands',
  execute(message) {
    message.reply(`📜 **Pori Moni Commands:**
💖 /setup – Set current channel for AI chat
📚 /help – Show this help menu
😘 /kiss – Send a cute kiss
😄 /mood – Show Pori Moni’s mood
😡 /angry – Show Pori Moni’s ragi mood
🎁 /gift – Send a sweet virtual gift
Try messaging anything in setup channel after /setup 💬`);
  }
};
