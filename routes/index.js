var express = require('express');
var router = express.Router();
var Product = require("../models/product");
var csurf = require("csurf");

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
    res.render("users/signup", {csrfToken: req.csrfToken()});
});
router.post("/users/signup", (req, res, next) => {
    res.redirect("/");
});

module.exports = router;
