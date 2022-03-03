module.exports = function (app) {
	const $ = require(`../models/user.js`);

	const fn = {
		auth: (req, res, next) => {
			let token = req.cookies.auth;
			$.db.findByToken(token, (err, result) => {
				if (err) throw err;
				if (!result)
					return res.json({
						error: true,
					});

				req.token = token;
				req.user = result;
				next();
			});
		},
		signin: function (req, res) {
			// $.db.findByToken(token, function (err, user) {
			// 	if (err) return res.status(400).json({ success: false, message: err });
			// 	if (user) return res.status(400).json({ success: false, message: "Already login" });

			let { username, password } = req.body;

			$.db.findOne({ username: username }, function (err, user) {
				if (err) return res.json({ isAuth: false, message: "User not found" });

				user.validatePassword(password, (err, result) => {
					if (err) return res.json({ isAuth: false, message: "User not found" });

					user.generateToken((err, user) => {
						if (err) return res.status(400).send(err);

						res.cookie("auth", user.token).json({
							isAuth: true,
							id: user._id,
							username: user.username,
						});
					});
				});
			});

			// });
		},
		signout: function (req, res) {
			req.user.deleteToken(req.token, (err, user) => {
				if (err) return res.status(400).send(err);
				res.sendStatus(200);
			});
		},
		register: function (req, res) {
			let { username, password, password2 } = req.body;
			if (password !== password2) return res.status(400).json({ message: "Password not match" });

			$.db.findOne({ username: username }, function (err, user) {
				if (user) return res.status(400).json({ auth: false, message: "email exits" });

				let newuser = new $.db({
					username: username,
					password: password,
				});

				newuser.save((err) => {
					if (err) {
						console.log(err);
						return res.status(400).json({ success: false });
					}

					res.status(200).json({
						succes: true,
					});
				});
			});
		},
		resetpass: function (req, res) {},
		changepass: function (req, res) {},
		profile: function (req, res) {
			res.json({
				isAuth: true,
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
