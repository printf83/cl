const mongoose = require("mongoose");
const schema = mongoose.Schema({
	fieldname: { type: String, require: true },
	originalname: { type: String, require: true },
	encoding: { type: String, require: true },
	mimetype: { type: String, require: true },
	saved: { type: Boolean, require: true },
	filename: { type: String, require: true },
	size: { type: Number, require: true },
	data: { type: Buffer },
});
const db = mongoose.model("file", schema);
module.exports = { db, schema };
