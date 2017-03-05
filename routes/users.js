var express = require('express');
var router = express.Router();
var csurf = require("csurf");
var passport = require("passport");
var order = require("../models/order");
var Cart = require("../models/cart");

var csrfProtection = csurf();
router.use(csrfProtection);

router.get("/profile", isLoggedIn, (req, res, next) => {
    order.find({user: req.user}, (err, orders) => {
        if(err) return err;
        orders.forEach( (order) => {
            let cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render("users/profile", {orders: orders});
    });
});

router.get("/logout", isLoggedIn, (req, res, next) => {
    req.logout();
    res.redirect("/");
});
router.use("/", notLoggedIn, (req, res, next) => {
    next();
});

router.get("/signup", (req, res, next) => {
    var messages = req.flash("error");
    res.render("users/signup", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post("/signup", passport.authenticate("local.signup",{
    failureRedirect: "/users/signup",
    failureFlash: true
}), (req, res, next) => {
    if(req.session.oldUrl)
    {
        let redirect = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(redirect);
    }else
        res.redirect("users/profile");

});
router.get("/signin", (req, res, next) => {
    var messages = req.flash("error");
    res.render("users/signin", {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post("/signin", passport.authenticate("local.signin", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/signin",
    failureFlash: true
}));

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated()) return next();
    res.redirect("/");
}
function notLoggedIn(req, res, next)
{
    if(!req.isAuthenticated()) return next();
    res.redirect("/");
}

module.exports = router;
