module.exports = {
  name: 'kiss',
  description: 'Send a cute kiss 💋',
  execute(message) {
    const kisses = [
      'Tumi amar priyo! 😘💋',
      'Ektu kiss dao na re! 🤭💖',
      'Miss you! Here’s a kiss 😘💕',
      'Amar moner kiss gula tomake diyechi 🥰💋'
    ];
    const reply = kisses[Math.floor(Math.random() * kisses.length)];
    message.reply(reply);
  }
};
