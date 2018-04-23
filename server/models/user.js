let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	"userId":String,
	"userName":String,
	"userPwd":String,
	"orderList":[
		{
			"userId":String,
            "orderId" : String,
            "orderTotal" : Number,
            "addressInfo" : {
                "addressId" : String,
                "userName" : String,
                "streetName" : String,
                "postCode" : Number,
                "tel" : Number,
                "isDefault" : Boolean
            },
            "shippingMethodInfo":{
            	"shippingName" : String,
			    "shippingPrice" : String,
			    "shippingDate" : String
            },
            "goodsList" : [ 
                {
                    "productId" : String,
                    "productName" : String,
                    "salePrice" : String,
                    "productImage" : String,
                    "productNum" : String,
                    "checked" : String,
                    'album':[
                    	{
                    		"url" : String
                    	}
                    ]
                }
            ],
            "orderStatus" : String,
            "createDate" : String
        }
	],
	"cartList":[
		{
			"productId":String,
			"productName":String,
			"salePrice":String,
			"productImage":String,
			"checked":String,
			"productNum":String,
			'album':[
				{
					'url':String
				}
			]
		}
	],
	"addressList":[
		{
		"addressId":String,
        "userName":String,
        "streetName":String,
        "postCode":Number,
        "tel":Number,
        "isDefault":Boolean
		}
	]
})


module.exports = mongoose.model('user',userSchema);
