const keySchema = require("../models/Key");
const pendingSchema = require("../models/Pending");
const paymentSchema = require("../models/Payment");
const mongoose = require('mongoose');


exports.getKeyById = async (id) => {
    return await keySchema.findById(id);
};

exports.addPaymentPending = async (pending) => {
    return await pendingSchema.create(pending); 
};

exports.queryPayment = async (requestId,orderId,key) => {
    try {
        const keyId = mongoose.Types.ObjectId(key)

        const result = await pendingSchema.findOne({ requestId, orderId,keyId }) || await paymentSchema.findOne({ requestId, orderId,keyId })
        return result
      } catch{
        return null
      }
    
};

// exports.createBlog = async (blog) => {
//     return await BlogModel.create(blog);
// };
// exports.getBlogById = async (id) => {
//     return await BlogModel.findById(id);
// };

// exports.updateBlog = async (id, blog) => {
//     return await BlogModel.findByIdAndUpdate(id, blog);
// };

// exports.deleteBlog = async (id) => {
//     return await BlogModel.findByIdAndDelete(id);
// };
// exports.getAllBlogs = async () => {
//     return await BlogModel.find();
// };

// exports.addPaymentPending = async (blog) => {
//     return await BlogModel.create(blog);
// };
// exports.getBlogById = async (id) => {
//     return await BlogModel.findById(id);
// };

// exports.updateBlog = async (id, blog) => {
//     return await BlogModel.findByIdAndUpdate(id, blog);
// };

// exports.deleteBlog = async (id) => {
//     return await BlogModel.findByIdAndDelete(id);
// };
