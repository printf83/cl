const mongoose = require("mongoose");
const schema = mongoose.Schema({
	name: { type: String, require: true },
});
const db = mongoose.model("state", schema);
module.exports = { db, schema };
