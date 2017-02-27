/**
 * Created by Caciano on 2/27/2017.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var schema = new Schema
({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model("Product", schema);