require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = function (app) {
	const $ = require(`../models/user.js`);

	const fn = {
		auth: (req, res, next) => {
			let token = req.cookies.auth;
			$.db.findByToken("auth", token, (err, result) => {
				if (err) throw err;
				if (!result) return res.status(400).json({ success: false, message: "Please sign up to continue" });

				req.authToken = token;
				req.user = result;
				next();
			});
		},
		extend: function (out) {
			out = out || {};

			for (let i = 1; i < arguments.length; i++) {
				if (!arguments[i]) continue;

				for (let key in arguments[i]) {
					if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
				}
			}

			return out;
		},
		UUID: function (format) {
			return (format || "cl-xxxxxxxxxxxx").replace(/[xy]/g, function (c) {
				var r = (Math.random() * 16) | 0,
					v = c === "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			});
		},
		email: function (opt, callback) {
			let transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.EMAILADDRESS,
					pass: process.env.EMAILPASSWORD,
				},
			});

			transporter.sendMail(
				fn.extend(
					{},
					{
						from: process.env.EMAILADDRESS,
						to: null,
						subject: null,
						html: null,
						text: null,
					},
					opt
				),
				function (err, result) {
					if (err) {
						callback({ success: false, message: err.message });
					} else {
						callback({ success: true, message: result.response });
					}
				}
			);
		},
		validate: function (req, res) {
			let { token } = req.body;
			if (!token) return res.json({ success: false, message: "Token required" });

			$.db.findByToken("email", token, (err, user) => {
				if (err) throw err;

				//delete email validation token
				user.deleteToken("email", (err, user) => {
					if (err) return res.json({ success: false, message: err.message });
					res.json({
						success: true,
					});
				});
			});
		},
		signin: function (req, res) {
			let { username, password } = req.body;
			if (!username || !password) return res.json({ success: false, message: "Username and password required" });

			$.db.findOne({ username: username }, function (err, user) {
				if (err || !user) return res.json({ success: false, message: "User not found" });

				user.validatePassword(password, (err, result) => {
					if (err || !result) return res.json({ success: false, message: "User not found" });

					if (!user.emailToken) {
						user.generateToken("auth", (err, user) => {
							if (err) return res.json({ success: false, message: err.message });

							res.cookie("auth", user.authToken).json({
								success: true,
								username: user.username,
							});
						});
					} else {
						return res.json({ success: false, message: "Please validate your email" });
					}
				});
			});

			// });
		},
		signout: function (req, res) {
			req.user.deleteToken("auth", (err, user) => {
				if (err) return res.json({ success: false, message: err.message });
				res.status(200).json({ success: true });
			});
		},
		register: function (req, res) {
			let { username, password } = req.body;
			if (!username || !password) return res.json({ success: false, message: "Username and password required" });

			$.db.findOne({ username: username }, function (err, user) {
				if (user) return res.json({ success: false, message: "User already registered" });

				let newuser = new $.db({
					username: username,
					password: password,
					email: username,
					name: username,
					emailToken: fn.UUID(),
				});

				newuser.save((err) => {
					if (err) {
						console.log(err);
						return res.json({ success: false });
					}

					newuser.generateToken("email", (err, user) => {
						if (err) return res.json({ success: false, message: err.message });
						fn.email(
							{
								to: user.email,
								subject: "CL Confirmation Email",
								html: `Click here to validate your email <a href="https://bs5-js-builder.herokuapp.com/?validateUser=${user.emailToken}">https://bs5-js-builder.herokuapp.com/?validateUser=${user.emailToken}</a>`,
							},
							function (result) {
								if (result && result.success) {
									res.json({
										success: true,
									});
								} else {
									res.json({
										success: false,
										token: result.message,
									});
								}
							}
						);
					});
				});
			});
		},
		resetpass: function (req, res) {
			let { username } = req.body;
			if (!username) return res.json({ success: false, message: "Username required" });

			$.db.findOne({ username: username }, function (err, user) {
				if (err || !user) return res.json({ success: false, message: "User not found" });

				user.generateToken("reset", (err, user) => {
					if (err) return res.json({ success: false, message: err.message });
					fn.email(
						{
							to: user.email,
							subject: "CL Reset Password",
							html: `Click here to reset password <a href="https://bs5-js-builder.herokuapp.com/?resetPassword=${user.resetToken}">https://bs5-js-builder.herokuapp.com/?resetPassword=${user.resetToken}</a>`,
						},
						function (result) {
							if (result && result.success) {
								res.json({
									success: true,
								});
							} else {
								res.json({
									success: false,
									token: result.message,
								});
							}
						}
					);
				});
			});
		},
		changepass: function (req, res) {
			let { oldpassword, password } = req.body;
			if (!oldpassword || !password)
				return res.json({ success: false, message: "Username and password required" });

			req.user.validatePassword(oldpassword, (err, result) => {
				if (err || !result) return res.json({ success: false, message: "Invalid old password" });

				req.user.password = password;
				req.user.save((err) => {
					if (err) {
						console.log(err);
						return res.json({ success: false, message: err.message });
					}

					res.json({
						success: true,
					});
				});
			});
		},
		changepass_guest: function (req, res) {
			let { token, password } = req.body;
			if (!token || !password) return res.json({ success: false, message: "Token and password required" });

			$.db.findByToken("reset", token, (err, user) => {
				if (err) throw err;

				user.password = password;
				user.save((err) => {
					if (err) {
						console.log(err);
						return res.json({ success: false, message: err.message });
					}

					//delete reset token
					user.deleteToken("reset", (err, user) => {
						if (err) return res.json({ success: false, message: err.message });
						res.json({
							success: true,
						});
					});
				});
			});
		},
		profile: function (req, res) {
			if (req.user) {
				res.json({
					email: req.user.email,
					picture: req.user.picture,
					name: req.user.name,
					role: req.user.role,
					username: req.user.username,
				});
			} else {
				res.json(null);
			}
		},
	};

	app.get(`/api/user/validate`, fn.validate);
	app.get(`/api/user/signout`, fn.auth, fn.signout);
	app.post(`/api/user/register`, fn.register);
	app.post(`/api/user/signin`, fn.signin);
	app.post(`/api/user/resetpass`, fn.resetpass);
	app.post(`/api/user/changepass`, fn.auth, fn.changepass);
	app.post(`/api/user/changepass-guest`, fn.changepass_guest);
	app.get(`/api/user/profile`, fn.auth, fn.profile);
};
