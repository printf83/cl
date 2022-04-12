"use strict";
require("dotenv").config();

if (process.env.DBURL) {
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

	//file management
	require("./server-file.js")();

	//router manager
	require("./server-router.js")(app);

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
