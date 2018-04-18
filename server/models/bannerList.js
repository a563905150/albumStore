let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bannerListSchema = new Schema({
	"url":String
});

module.exports = mongoose.model('bannerlist',bannerListSchema);
