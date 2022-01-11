const mongoose = require("mongoose");

module.exports = mongoose.model(
	"user",
	mongoose.Schema({
		username: { type: String, require: true },
		password: { type: String, require: true },
		name: { type: String, require: true },
		role: String,
		email: String,
		picture: String,
	})
);
