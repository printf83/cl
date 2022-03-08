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
			return new $.user.signin({
				email: "example@example.com",
			});
		},
	},

	{
		title: "Register",
		code: function () {
			return new $.user.signup();
		},
	},

	{
		title: "Reset password",
		code: function () {
			return new $.user.resetpass();
		},
	},

	{
		title: "Change password",
		code: function () {
			return new $.user.changepass();
		},
	},

	{
		title: "Get user info",
		code: function () {
			return new $.button({
				label: "Get info",
				color: "primary",
				onclick: function (event) {
					$.user.profile(event.currentTarget, function (result) {
						console.log(result);
					});
				},
			});
		},
	},

	{
		title: "Sign out",
		code: function () {
			return new $.button({
				label: "Sign out",
				color: "primary",
				onclick: function (event) {
					$.user.signout(event.currentTarget, function (result) {
						console.log(result);
					});
				},
			});
		},
	},
];
