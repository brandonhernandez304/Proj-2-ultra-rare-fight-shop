const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    verifiedUser: Boolean
})

const Review = mongoose.model('Review', reviewSchema)