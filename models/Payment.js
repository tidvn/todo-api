const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  keyId: mongoose.Types.ObjectId,
  amount: Number,
  orderId: String,
  requestId: String,
  resultCode: Number,
  txHash: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{ collection: 'Payments' });

module.exports = mongoose.model("Payments", paymentSchema);
