//DEPENDENCIES
const express = require('express');
const reviewsRouter = express.Router();
const Product = require('../models/product')
reviewsRouter.post('/store/:id/reviews', create)
module.exports = {
    create
};
// ROUTES
// SEED
const reviewSeed = require('../models/reviewSeed');
reviewsRouter.get('/reviewseed', (req, res) => {
    Review.deleteMany({}, (error, allReviews) => {});

    Review.create(reviewSeed, (error, data) => {
        res.redirect('/store');
    });
});
// I N D U C E S
// INDEX
reviewsRouter.get('/', (req, res) => {
	Review.find({}, (error, foundReviews) => {
		res.render('index.ejs', {
			reviews: foundReviews,
		});
	});
});
// NEW
reviewsRouter.get('/new', (req, res) => {
	res.render('new.ejs');
});
// DELETE
reviewsRouter.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/store');
    });
});

// UPDATE
reviewsRouter.put('/:id', (req,res)=>{
    Product.findByIdAndUpdate(req.params.id, req.body, ()=>{
        res.redirect(`/store`);
    })
})

// CREATE

function create(req,res){
    Product.findById(req.params.id, function(err, product){
        product.reviews.push(req.body);
        product.save(function(err){
            res.redirect(`/store/${product._id}`);
        });
    });
}
reviewsRouter.post('/', (req, res) => {
    
    Product.create(req.body, (error, createdProduct) => {
        
        res.redirect("/store");
    });
})




// EDIT
reviewsRouter.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        console.log(foundProduct)
        res.render('edit.ejs', {
            product: foundProduct
            
        });
    });
});

// SHOW
reviewsRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});

// EXPORTS
module.exports = reviewsRouter;