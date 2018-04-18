let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
	"productId" : String,
    "productName" : String,
    "salePrice" : Number,
    "productNum" : Number,
    "checked" : String,
    "productImage" : String,
    "album" :[
    	{
    		"url" : String
    	}
    ],
    "productDetail" : String,
    "productDetailImg":[
    	{
    		"url" : String
    	}
    ],
    "comments":[
    	{
    		"userName" : String,
    		"content" : String
    	}
    ],
    "saleNum" : Number,
    "addDate" : Number,
    "productType" : String
});

module.exports = mongoose.model('good',productSchema);
