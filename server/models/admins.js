let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
	"userName":String,
	"userPwd":String
});

module.exports = mongoose.model('admin',productSchema);
