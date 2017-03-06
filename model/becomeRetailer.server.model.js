var mongoose = require('mongoose');
var schema = mongoose.Schema;

var retailerSchema = new schema({
	name: { type: String, require: true },
	contactNum: { type: Number, require: true },
	email: { type: String, require: true },
	message: { type: String, require: true }
}, {timestamp:true});

module.exports = mongoose.model('becomeRetailer', retailerSchema);