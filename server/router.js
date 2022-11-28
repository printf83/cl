const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const path = require("path");

module.exports = (app) => {
	app.use("/", expressStaticGzip("/client"));

	//static file (required)
	app.use(express.static("./client"));

	//user, login, register handler, (required)
	require("./routes/user.js")(app);

	//document run
	//TODO: change true to auth
	// require("./routes/run.js")(app, "auth");

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
