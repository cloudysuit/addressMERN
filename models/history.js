var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var History = new Schema({
	search: {
		type: String
	},
	date: {
		type: Date,
		default:Date.now
	}
});

var Click = mongoose.model("History", History);

module.exports = History;