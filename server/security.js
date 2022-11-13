const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cookieparser = require("cookie-parser");

module.exports = (app) => {
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
				"script-src-attr": null,
			},
		})
	);
	app.use(helmet.hidePoweredBy());
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.frameguard());
	app.use(helmet.hsts());
};
