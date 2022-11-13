"use strict";

require("dotenv").config();

if (process.env.DBURL) {
	const express = require("express");

	const app = express();

	//security
	require("./server/security.js")(app);

	//db
	require("./server/db.js")();

	//file
	require("./server/file.js")();

	//router
	require("./server/router.js")(app);

	//start server
	const envPORT = process.env.PORT || 3000;
	const server = app.listen(envPORT, () => {
		let host = server.address().address;
		let port = server.address().port;

		console.info(`App listening at http://${host}:${port}`);
	});
} else {
	console.error("Environment variables not set");
}
