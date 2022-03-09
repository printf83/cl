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
		viewclass: "cl-modal-preview",
		code: function () {
			return new $.user.signin(
				{
					email: "example@example.com",
				},
				{ debug: true }
			);
		},
	},

	{
		title: "Register",
		viewclass: "cl-modal-preview",
		code: function () {
			return new $.user.signup({}, { debug: true });
		},
	},

	{
		title: "Reset password",
		viewclass: "cl-modal-preview",
		code: function () {
			return new $.user.resetpass({}, { debug: true });
		},
	},

	{
		title: "Change password",
		viewclass: "cl-modal-preview",
		code: function () {
			return new $.user.changepass({}, { debug: true });
		},
	},

	{
		title: "Change password (guest)",
		viewclass: "cl-modal-preview",
		code: function () {
			return new $.user.changepass_guest({
				token: "eyJhbGciOiJIUzI1NiJ9.NjIyN2ExMjg4NWZlYjg0NGJhZTcwNzAx.s0o-0jDFa5ABoOaEkyf4BgqHye_isniy5udtilhRLk0",
			});
		},
	},

	{
		title: "Get user info",
		code: function () {
			return new $.button({
				label: "Get info",
				icon: "user",
				color: "primary",
				onclick: function (event) {
					$.user.profile(event.currentTarget, function (result) {
						new $.toast("i", JSON.stringify(result)).show();
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
				icon: "power-off",
				color: "danger",
				onclick: function (event) {
					$.user.signout(event.currentTarget, function (result) {
						if (result) {
							new $.toast("/", "User successfuly sign out").show();
						} else {
							new $.toast("!!", "User failed sign out").show();
						}
					});
				},
			});
		},
	},
];
