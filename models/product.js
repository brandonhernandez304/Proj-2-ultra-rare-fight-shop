const mongoose = require('mongoose')

//REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  verifiedUser: Boolean
})
//PRODUCT SCHEMA
const productSchema = new mongoose.Schema({

  name: {type:String, required: true },
  description: {type:String},
  img: {type:String},
  price: {type:Number},
  qty: {type:Number},
  reviews: [reviewSchema]//reviews is an array  of review subdocs
});

const Product = mongoose.model("Product", productSchema)

module.exports = Product;