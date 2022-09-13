const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
  user: String,
  content: String,
  rating: {type: Number, min: 1, max: 5, default: 5}
 }, {
  timestamps: true
 });
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