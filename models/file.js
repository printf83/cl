const mongoose = require("mongoose");
const schema = mongoose.Schema({
	fieldname: { type: String, require: true },
	originalname: { type: String, require: true },
	encoding: { type: String, require: true },
	mimetype: { type: String, require: true },
	destination: { type: String, require: true },
	filename: { type: String, require: true },
	path: { type: String, require: true },
	size: { type: Number, require: true },
});
const db = mongoose.model("file", schema);
module.exports = { db, schema };
