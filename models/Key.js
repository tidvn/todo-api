const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keySchema = new Schema({
  keyName: String,
  walletAddr: String,
  owner: mongoose.Types.ObjectId,
  secret: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{ collection: 'Keys' });

module.exports = mongoose.model("Keys", keySchema);
