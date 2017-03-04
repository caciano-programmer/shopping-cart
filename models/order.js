/**
 * Created by Caciano on 3/4/2017.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var schema = new Schema
({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    paymentId: {type: String, required: true}
});

module.exports = mongoose.model("Order", schema);