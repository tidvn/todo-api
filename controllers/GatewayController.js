const Pending = require("../models/Pending");
const Service = require("../services");
const mongoose = require('mongoose');
exports.getAllPayment = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json({ data: blogs, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const pending = new Pending({
      orderId : req.body.orderId,
      requestId : req.body.requestId,
      orderInfo : req.body.orderInfo,
      amount : req.body.amount,
      ipnUrl : req.body.ipnUrl,
      redirectUrl : req.body.redirectUrl,
      resultCode : 8000,
      message : "Wait for Pay",
      keyId : mongoose.Types.ObjectId(req.token.sub),
      walletAddr : req.token.addr
    })
    const response = {
      requestId: pending.requestId,
      orderId : pending.orderId,
      amount : pending.amount,
      message : pending.message,
      resultCode : pending.resultCode,
      payUrl : process.env.WEB + "/pay/" + pending._id.toHexString(),
      responseTime : (new Date(pending.createdAt).getTime()).toString(),
    }
    await Service.addPaymentPending(pending);
    res.json( response );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.queryPayment = async (req, res) => {
  try {
    const results = await Service.queryPayment(req.body.requestId, req.body.orderId , req.token.sub);
    
    var response = {
      orderId : results.orderId,
      amount : results.amount,
      resultCode : results.resultCode,
      responseTime : (new Date(results.createdAt).getTime()).toString(),
    }
    if(results.txHash){
      response.paymentId=results._id.toHexString()
      response.txHash = results.txHash
    }else{   
      response.message = results.message   
      response.requestId= results.requestId
      response.payUrl = process.env.WEB + "/pay/" + results._id.toHexString()
    }
    res.json( response );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

