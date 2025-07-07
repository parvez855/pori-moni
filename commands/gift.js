export default {
  name: 'gift',
  description: 'Send a sweet virtual gift 🎁',
  execute(message) {
    const gifts = [
      'Ektu virtual gift tomake 🥰🎁',
      'Tomar jonno special gift 🎉💕',
      'Ei gift ta ami tomake diyechi 😘💝',
      'Tomar smile er jonno gift niye esechi 🥳🎁'
    ];
    const reply = gifts[Math.floor(Math.random() * gifts.length)];
    message.reply(reply);
  }
};
