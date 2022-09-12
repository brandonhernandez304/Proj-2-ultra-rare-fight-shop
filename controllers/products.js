//DEPENDENCIES
const express = require('express');
const productsRouter = express.Router();
const Product = require('../models/product')

// ROUTES
// SEED
const productSeed = require('../models/productSeed');
productsRouter.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect('/store');
    });
});
// I N D U C E S
// INDEX
productsRouter.get('/', (req, res) => {
	Product.find({}, (error, foundProducts) => {
		res.render('index.ejs', {
			products: foundProducts,
		});
	});
});
// NEW
productsRouter.get('/new', (req, res) => {
	res.render('new.ejs');
});
// DELETE
productsRouter.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/store');
    });
});

// UPDATE
productsRouter.put('/:id', (req,res)=>{
    Product.findByIdAndUpdate(req.params.id, req.body, ()=>{
        res.redirect(`/store`);
    })
})

// CREATE


productsRouter.post('/', (req, res) => {
    
    Product.create(req.body, (error, createdProduct) => {
        
        res.redirect("/store");
    });
})




// EDIT
productsRouter.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        console.log(foundProduct)
        res.render('edit.ejs', {
            product: foundProduct
            
        });
    });
});

// SHOW
productsRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});

// EXPORTS
module.exports = productsRouter;