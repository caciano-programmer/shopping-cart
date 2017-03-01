var express = require('express');
var router = express.Router();
var Cart = require("../models/cart");



var Product = require("../models/product");

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find( (err, docs) => {
        var productChunks =[], chunkSize = 3;
        for(var i = 0; i < docs.length; i+=chunkSize)
            productChunks.push(docs.slice(i, i + chunkSize));
        res.render('shop/index', { title: 'Express', products: productChunks });
    });
});

router.get("/add-to-cart/:id", (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, (err, product) => {
        if(err)
            return res.redirect("/");
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/");
    });
});

module.exports = router;
