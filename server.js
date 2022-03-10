"use strict";
require("dotenv").config();

if (process.env.DBURL) {
	const fs = require("fs");
	const path = require("path");
	const express = require("express");
	const helmet = require("helmet");
	const compression = require("compression");
	const cookieparser = require("cookie-parser");

	const app = express();

	app.set("trust proxy", 1);
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieparser(process.env.SESSIONSECRET));
	app.use(compression());
	app.use(
		helmet.contentSecurityPolicy({
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
				styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
				imgSrc: ["*", "data:"],
				connectSrc: ["'self'"],
				frameSrc: ["'self'"],
			},
		})
	);
	app.use(helmet.hidePoweredBy());
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.frameguard());
	app.use(helmet.hsts());

	app.use(express.static(path.join(__dirname, "docs")));

	//setup db
	const dbconfig = {
		url: process.env.DBURL,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	};

	const mongoose = require("mongoose");
	const { fstat } = require("fs");
	mongoose.Promise = global.Promise;

	mongoose
		.connect(dbconfig.url, dbconfig.options)
		.then(() => {
			console.info("Successfully connected to MongoDB.");
		})
		.catch((err) => {
			console.warn("Could not connect to MongoDB.");
			console.error(err);
			console.warn("Continue without connecting to MongoDB.");
		});

	//delete tmp folder
	fs.rmSync("./tmp", { recursive: true, force: true });

	//create file folder
	fs.mkdir("./file", (err) => {});

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

	//start server
	const envPORT = process.env.PORT || 3000;
	const server = app.listen(envPORT, function () {
		let host = server.address().address;
		let port = server.address().port;

		console.info(`App listening at http://${host}:${port}`);
	});
} else {
	console.error("Environment variables not set");
}
