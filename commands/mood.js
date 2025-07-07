module.exports = {
  name: 'mood',
  description: 'Show Pori Moni’s mood',
  execute(message) {
    const moods = [
      'Ami ekhon onek happy 😄💕',
      'Kichu ta mishti ragi hoyechi 😡🤭',
      'Feeling playful ajke! 😏🥰',
      'Ami ekto shy hoye gelam 🥺💖',
      'Tomar kotha bhabte bhabte ami excited 😍🔥'
    ];
    const mood = moods[Math.floor(Math.random() * moods.length)];
    message.reply(mood);
  }
};
