const mongoose = require("mongoose");

module.exports = mongoose.model(
	"customer",
	mongoose.Schema({
		name: { type: String, require: true },
		dob: { type: String, require: true },
		phone: { type: String, require: true },
		email: String,
		picture: String,
		state: String,
	})
);
