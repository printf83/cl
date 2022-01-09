"use strict";
var path = require("path");
var express = require("express");
var helmet = require("helmet");
const app = express();

app.set("trust proxy", 1);
app.use(express.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, "docs")));

const envPORT = process.env.PORT || 8081;
var server = app.listen(envPORT, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.info(`App listening at http://${host}:${port}`);
});
