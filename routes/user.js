module.exports = function (app) {
	const $ = require(`../models/user.js`);

	const fn = {
		auth: (req, res, next) => {
			let token = req.cookies.auth;
			$.db.findByToken("auth", token, (err, result) => {
				if (err) throw err;
				if (!result)
					return res.json({
						success: false,
						message: "Please sign in to continue",
					});

				req.authToken = token;
				req.user = result;
				next();
			});
		},
		signin: function (req, res) {
			let { username, password } = req.body;
			if (!username || !password) return res.json({ success: false, message: "Username and password required" });

			$.db.findOne({ username: username }, function (err, user) {
				if (err || !user) return res.json({ success: false, message: "User not found" });

				user.validatePassword(password, (err, result) => {
					if (err || !result) return res.json({ success: false, message: "User not found" });

					user.generateToken("auth", (err, user) => {
						if (err) return res.json({ success: false, message: err.message });

						res.cookie("auth", user.authToken).json({
							success: true,
							username: user.username,
						});
					});
				});
			});

			// });
		},
		signout: function (req, res) {
			req.user.deleteToken("auth", (err, user) => {
				if (err) return res.json({ success: false, message: err.message });
				res.status(200);
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
				});

				newuser.save((err) => {
					if (err) {
						console.log(err);
						return res.json({ success: false });
					}

					res.json({
						success: true,
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

					res.json({
						success: true,
						token: user.resetToken,
					});
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
			res.json({
				id: req.user._id,
				username: req.user.username,
			});
		},
	};

	app.get(`/api/user/signout`, fn.auth, fn.signout);
	app.post(`/api/user/register`, fn.register);
	app.post(`/api/user/signin`, fn.signin);
	app.post(`/api/user/resetpass`, fn.resetpass);
	app.post(`/api/user/changepass`, fn.auth, fn.changepass);
	app.post(`/api/user/changepass_guest`, fn.changepass_guest);
	app.get(`/api/user/profile`, fn.auth, fn.profile);
};
