module.exports = function (app) {
	const $ = require(`../models/user.js`);

	const fn = {
		auth: (req, res, next) => {
			let token = req.cookies.auth;
			$.db.findByToken(token, (err, result) => {
				if (err) throw err;
				if (!result)
					return res.json({
						success: false,
						message: "Please sign in to continue",
					});

				req.token = token;
				req.user = result;
				next();
			});
		},
		signin: function (req, res) {
			// $.db.findByToken(token, function (err, user) {
			// 	if (err) return res.json({ success: false, message: err });
			// 	if (user) return res.json({ success: false, message: "Already login" });

			let { username, password } = req.body;

			$.db.findOne({ username: username }, function (err, user) {
				if (err || !user) return res.json({ success: false, message: "User not found" });

				user.validatePassword(password, (err, result) => {
					if (err || !result) return res.json({ success: false, message: "User not found" });

					user.generateToken((err, user) => {
						if (err) return res.json({ success: false, message: err.message });

						res.cookie("auth", user.token).json({
							success: true,
							username: user.username,
						});
					});
				});
			});

			// });
		},
		signout: function (req, res) {
			req.user.deleteToken((err, user) => {
				if (err) return res.json({ success: false, message: err.message });
				res.status(200);
			});
		},
		register: function (req, res) {
			let { username, password, password2 } = req.body;
			if (password !== password2) return res.json({ success: false, message: "Password not match" });

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
			res.json({
				success: true,
			});
		},
		changepass: function (req, res) {
			let { oldpassword, password, password2 } = req.body;
			if (password !== password2) return res.json({ success: false, message: "Password not match" });

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
	app.get(`/api/user/profile`, fn.auth, fn.profile);
};
