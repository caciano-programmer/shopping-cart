var express = require('express');
var router = express.Router();
var csurf = require("csurf");
var passport = require("passport");

var csrfProtection = csurf();
router.use(csrfProtection);

router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("users/profile");
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
