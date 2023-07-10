const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pendingSchema = new Schema({
  orderId: String,
  requestId: String,
  orderInfo: String,
  keyId: mongoose.Types.ObjectId,
  amount: Number,
  ipnUrl: String,
  redirectUrl: String,
  resultCode: Number,
  message: String,
  walletAddr: String,
  createdAt: {
    type: Date,
    default: Date.now,    
    expires: 300,
  },
},{ collection: 'Pendings' });

module.exports = mongoose.model("Pendings", pendingSchema);
