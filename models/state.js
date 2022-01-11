const mongoose = require("mongoose");

module.exports = mongoose.model(
	"state",
	mongoose.Schema({
		name: { type: String, require: true },
	})
);
