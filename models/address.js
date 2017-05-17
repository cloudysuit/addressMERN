var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HistorySchema = new Schema({
	search: {
		type: String
	}
});

var Click = mongoose.model("History", HistorySchema);

module.exports = History;