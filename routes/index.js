var express = require('express');
var router = express.Router();
var csurf = require("csurf");
var passport = require("passport");

var Product = require("../models/product");

var csrfProtection = csurf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find( (err, docs) => {
        var productChunks =[], chunkSize = 3;
        for(var i = 0; i < docs.length; i+=chunkSize)
            productChunks.push(docs.slice(i, i + chunkSize));
        res.render('shop/index', { title: 'Express', products: productChunks });
    });
});
router.get("/users/signup", (req, res, next) => {
    var messages = req.flash("error");
    res.render("users/signup", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post("/users/signup", passport.authenticate("local.signup",{
    successRedirect: "/users/profile",
    failureRedirect: "/users/signup",
    failureFlash: true
}));

router.get("/users/profile", (req, res, next) => {
    res.render("users/profile");
});

router.get("/users/signin", (req, res, next) => {
    var messages = req.flash("error");
    res.render("users/signin", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post("/users/signin", passport.authenticate("local.signin", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/signin",
    failureFlash: true
}));

module.exports = router;
