require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 50;

const mongoose = require("mongoose");
const schema = mongoose.Schema({
	username: { type: String, require: true },
	password: { type: String, require: true },
	token: String,
});

schema.pre("save", function (next) {
	let i = this;
	if (i.isModified("password")) {
		bcrypt.genSalt(salt, function (err, salt) {
			if (err) return next(err);

			bcrypt.hash(i.password, salt, function (err, hash) {
				if (err) return next(err);
				i.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

schema.methods.validatePassword = function (password, callback) {
	bcrypt.compare(password, this.password, function (err, isMatch) {
		if (err) return callback(next);
		callback(null, isMatch);
	});
};

schema.methods.generateToken = function (callback) {
	let i = this;
	let t = jwt.sign(i._id.toHexString(), process.env.SESSIONSECRET);

	i.token = t;
	i.save(function (err, result) {
		if (err) return callback(err);
		callback(null, result);
	});
};

schema.methods.deleteToken = function (token, callback) {
	let i = this;
	i.update({ $unset: { token: 1 } }, function (err, result) {
		if (err) return cb(err);
		cb(null, result);
	});
};

schema.statics.findByToken = function (token, callback) {
	let i = this;

	jwt.verify(token, process.env.SESSIONSECRET, function (err, decode) {
		i.findOne({ _id: decode, token: token }, function (err, result) {
			if (err) return callback(err);
			callback(null, result);
		});
	});
};

const db = mongoose.model("user", schema);
module.exports = { db, schema };
