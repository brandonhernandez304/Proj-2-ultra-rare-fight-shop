// DEPENDENCIES
const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const app = express();
const productsRouter = require("./controllers/products.js");
const reviewsRouter = require("./controllers/reviews.js")
const LoremIpsum = require('lorem-ipsum').LoremIpsum
const mongoose = require("mongoose");
// LOREM IPSUM
const bodyLorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence:{
        max:16,
        min:4
    }
});
const titleLorem = new LoremIpsum({
    sentencesPerParagraph:{
        max:1,
        min:1
    },
    wordsPerSentence:{
        max: 10,
        min:3
    }
});
const authorLorem = new LoremIpsum({
    sentencesPerParagraph:{
        max:1,
        min:1
    },
    wordsPerSentence:{
        max: 2,
        min:1
    }
});

// DATABASE CONFIGURATION
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
// ROUTES
app.get('/', (req,res)=>{
    res.render('index.ejs')
})

// LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})