import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  guildId: String,
  channelId: String
});

export default mongoose.model('SetupChannel', schema);
