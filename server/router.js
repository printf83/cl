const express = require("express");
const path = require("path");

module.exports = (app) => {
	//static file (required)
	app.use(express.static("./docs"));

	//user, login, register handler, (required)
	require("./routes/user.js")(app);

	//file upload, download handler (required)
	require("./routes/file.js")(app, {
		upload: "auth",
		download: true,
		info: true,
		save: "auth",
		delete: "auth",
		rootdir: __dirname,
	});

	// =================================
	// USER ROUTE HANDLER (GENERIC)
	// =================================

	//state handler using generic route
	require("./routes/generic.js")(app, "state", {
		create: "auth",
		find: true,
		update: "auth",
		delete: "auth",
		list: true,
		excel: false,
		aggregate: false,
	});

	//customer handler using generic route
	require("./routes/generic.js")(app, "customer", {
		create: "auth",
		find: true,
		update: "auth",
		delete: "auth",
		list: true,
		excel: "auth",
		aggregate: false,
	});
};
