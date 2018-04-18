let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let shippingMethodsSchema = new Schema({
	"shippingName" : String,
    "shippingPrice" : String,
    "shippingDate" : String
});

module.exports = mongoose.model('shippingmethod',shippingMethodsSchema);
