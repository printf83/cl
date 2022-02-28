const mongoose = require("mongoose");

const schema = mongoose.Schema({
	name: { type: String, require: true },
	dob: { type: String, require: true },
	phone: { type: String, require: true },
	email: String,
	picture: String,
	state: String,
});

// schema.pre("save", function () {
// 	if (this.picture) {
// 		//call save picture on route
// 		let f = require("./routes/file.js");
// 	}
// });

// schema.pre("remove", function () {
// 	if (this.picture) {
// 		//call delete picture on route
// 	}
// });

const db = mongoose.model("customer", schema);
module.exports = { db, schema };
