const $ = require(`./models/user.js`);

module.exports = {
	auth: (req, res, next) => {
		let token = req.cookies.auth;
		$.db.findByToken("auth", token, (err, result) => {
			if (err || !result || !(result instanceof $.db)) {
				res.cookie("auth", "expired", {
					httpOnly: true,
					sameSite: "strict",
					maxAge: -1,
					expired: true,
				});
				return res.status(400).json({ success: false, message: "Please sign up to continue" });
			}

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
};
