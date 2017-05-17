var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HistorySchema = new Schema({
	search: {
		type: String
	},
	date: {
		type: Date,
		default:Date.now
	}
});

var Click = mongoose.model("History", HistorySchema);

module.exports = History;