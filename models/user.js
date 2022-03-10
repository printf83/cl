require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const schema = mongoose.Schema({
	username: { type: String, require: true },
	password: { type: String, require: true },
	name: String,
	picture: String,
	email: String,
	role: Number,

	authToken: String,
	emailToken: String,
	resetToken: String,
});

schema.pre("save", function (next) {
	let i = this;
	if (i.isModified("password")) {
		bcrypt.hash(i.password, parseInt(process.env.HASHSALT), function (err, hash) {
			if (err) {
				next(err);
			} else {
				i.password = hash;
				next();
			}
		});
	} else {
		next();
	}
});

schema.methods.validatePassword = function (password, callback) {
	bcrypt.compare(password, this.password, function (err, result) {
		if (err) return callback(err, false);
		callback(null, result);
	});
};

schema.methods.generateToken = function (prop, callback) {
	let i = this;
	let t = jwt.sign(i._id.toHexString(), process.env.SESSIONSECRET);

	i[`${prop}Token`] = t;
	i.save(function (err, result) {
		if (err) return callback(err);
		callback(null, result);
	});
};

schema.methods.deleteToken = function (prop, callback) {
	let i = this;
	i.updateOne({ $unset: { [`${prop}Token`]: 1 } }, function (err, result) {
		if (err) return callback(err);
		callback(null, result);
	});
};

schema.statics.findByToken = function (prop, token, callback) {
	if (token) {
		let i = this;
		jwt.verify(token, process.env.SESSIONSECRET, function (err, decode) {
			if (err) return callback(null, err);

			i.findOne({ _id: decode, [`${prop}Token`]: token }, function (err, result) {
				if (err) return callback(err);
				callback(null, result);
			});
		});
	} else {
		callback(null, false);
	}
};

const db = mongoose.model("user", schema);
module.exports = { db, schema };
