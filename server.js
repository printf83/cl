"use strict";
var path = require("path");
var express = require("express");
var helmet = require("helmet");
var compression = require("compression");
const app = express();

app.set("trust proxy", 1);
app.use(express.json());
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

const envPORT = process.env.PORT || 8081;
var server = app.listen(envPORT, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.info(`App listening at http://${host}:${port}`);
});
