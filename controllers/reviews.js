//DEPENDENCIES
const express = require('express');
const reviewsRouter = express.Router();
const Product = require('../models/product')

// ROUTES
// SEED
const reviewSeed = require('../models/reviewSeed');
reviewsRouter.get('/reviewseed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect('/store');
    });
});
// I N D U C E S
// INDEX
reviewsRouter.get('/', (req, res) => {
	Product.find({}, (error, foundProducts) => {
		res.render('index.ejs', {
			products: foundProducts,
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