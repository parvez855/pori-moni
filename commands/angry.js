export default {
  name: 'angry',
  description: 'Show Pori Moni is a bit ragi 😡',
  execute(message) {
    const angryReplies = [
      'Ami ekto ragi hoyechi 😡, keno eto late korle? 😤',
      'Tomar kotha shune ami boro ragi hoye gelam 🤬',
      'Oya! Bujhte paro na ragi ami? 🤨😠',
      'Ragi holeo ami tomake bhalobashi 💕😡'
    ];
    const reply = angryReplies[Math.floor(Math.random() * angryReplies.length)];
    message.reply(reply);
  }
};
