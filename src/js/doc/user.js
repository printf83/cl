"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "User",
		msg: "Provide access to easy access login, logout, register, reset password, and edit.",
		anchor: false,
	},

	{
		title: "Login",
		code: function () {
			return new $.user.login();
		},
	},
];
