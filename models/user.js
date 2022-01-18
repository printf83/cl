const mongoose = require("mongoose");
const schema = mongoose.Schema({
	username: { type: String, require: true },
	password: { type: String, require: true },
	name: { type: String, require: true },
	role: String,
	email: String,
	picture: String,
});
const db = mongoose.model("user", schema);
module.exports = { db, schema };
