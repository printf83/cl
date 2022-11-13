const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: { type: String, require: true },
	dob: { type: String, require: true },
	phone: { type: String, require: true },
	email: String,
	picture: String,
	state: String,
});

const db = mongoose.model("customer", schema);
module.exports = { db, schema };
