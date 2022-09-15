// DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const app = express();
const productsRouter = require("./controllers/products.js");
const reviewsRouter = require("./controllers/reviews.js");
const mongoose = require("mongoose");
// Allow use of Heroku's port or your own local port, depending on the environment


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
    );
DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE  
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use("/store", productsRouter);
app.use('/', reviewsRouter);
// ROUTES
app.get('/', (req,res)=>{
    res.render('index.ejs')
})

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})