const express = require("express");
const path = require("path");

module.exports = function (app) {
	//static file
	app.use(express.static(path.join(__dirname, "docs")));

	//setup router
	require("./routes/file.js")(app, {
		upload: "auth",
		download: true,
		info: true,
		save: "auth",
		delete: "auth",
	}); //file upload, download handler (required)
	require("./routes/user.js")(app); //user, login, register handler, (required)

	require("./routes/generic.js")(app, "state", {
		create: "auth",
		find: true,
		update: "auth",
		delete: "auth",
		list: true,
		excel: false,
		aggregate: false,
	}); //state handler using generic route
	require("./routes/generic.js")(app, "customer", {
		create: "auth",
		find: true,
		update: "auth",
		delete: "auth",
		list: true,
		excel: "auth",
		aggregate: false,
	}); //customer handler using generic route
};
