var express = require('express');
var router = express.Router();
var Cart = require("../models/cart");
var Order = require("../models/order");


var Product = require("../models/product");

/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash("success")[0];
    Product.find( (err, docs) => {
        var productChunks =[], chunkSize = 3;
        for(var i = 0; i < docs.length; i+=chunkSize)
            productChunks.push(docs.slice(i, i + chunkSize));
        res.render('shop/index', { title: 'Express', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
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
router.get("/reduce/:id", (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect("/shopping-cart");
});
router.get("/remove/:id", (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect("/shopping-cart");
});
router.get("/shopping-cart", (req, res, next) => {
    if(!req.session.cart)
        return res.render("shop/shopping-cart", {products: null});
    var cart = new Cart(req.session.cart);
    res.render("shop/shopping-cart", {products: cart.generateArray(), totalPrice: cart.totalPrice})
});
router.get("/checkout", isLoggedIn, (req, res, next) => {
    if(!req.session.cart)
        return res.redirect("/shopping-cart");
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash("error")[0];
    res.render("shop/checkout", {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});
router.post("/checkout", isLoggedIn, (req, res, next) => {
    if(!req.session.cart)
        return res.redirect("/shopping-cart");
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")("sk_test_4V9h0JCD1vlFLq1ZwhTk6Q5u");
    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken,
        description: "Test Charge"
    }, function(err, charge) {
        if(err) {
            req.flash("error", err.message);
            res.redirect("/checkout");
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result)
        {
            req.flash("success", "Successfully bought product");
            req.session.cart = null;
            res.redirect("/");
        });
    });
});

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated()) return next();
    req.session.oldUrl = req.url;
    res.redirect("/users/signin");
}

module.exports = router;
