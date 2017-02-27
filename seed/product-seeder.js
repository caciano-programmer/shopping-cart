/**
 * Created by Caciano on 2/27/2017.
 */

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/db", (err) => { if(err) throw err; });
mongoose.Promise = global.Promise;

var Product = require("../models/product");
var products =
[
    new Product({
    imagePath: "../public/images/Gothiccover.png",
    title: "Gothic Video Game",
    description: "Awesome Game",
    price: 10
    }),
    new Product({
        imagePath: "../public/images/dark.jpg",
        title: "Dark Souls",
        description: "Awesome Game",
        price: 10
    }),
    new Product({
        imagePath: "../public/images/gears.jpg",
        title: "Gears of war",
        description: "Awesome Game",
        price: 10
    }),
    new Product({
        imagePath: "../public/images/nba.jpg",
        title: "NBA2k",
        description: "Awesome Game",
        price: 10
    }),
    new Product({
        imagePath: "../public/images/halo.jpg",
        title: "Halo 5",
        description: "Awesome Game",
        price: 10
    }),
    new Product({
        imagePath: "../public/images/Oblivion.png",
        title: "Oblivion",
        description: "Awesome Game",
        price: 10
    })
];

for(var i = 0, done = 0; i < products.length; i++, done++)
    products[i].save( (err, result) => {
        if(done == products.length) mongoose.disconnect();
    });

mongoose.disconnect();