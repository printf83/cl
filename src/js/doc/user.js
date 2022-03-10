"use strict";
import $ from "../component.js";

export default [
	{
		title: "User",
		msg: "Provide access to easy access login, logout, register, reset password, and edit.",
		anchor: false,
	},

	// {
	// 	title: "Login",
	// 	viewclass: "cl-modal-preview",
	// 	code: function () {
	// 		return new $.user.signin({
	// 			debug: true,
	// 		});
	// 	},
	// },

	// {
	// 	title: "Register",
	// 	viewclass: "cl-modal-preview",
	// 	code: function () {
	// 		return new $.user.signup({ debug: true });
	// 	},
	// },

	// {
	// 	title: "Reset password",
	// 	viewclass: "cl-modal-preview",
	// 	code: function () {
	// 		return new $.user.resetpass({ debug: true });
	// 	},
	// },

	// {
	// 	title: "Change password",
	// 	viewclass: "cl-modal-preview",
	// 	code: function () {
	// 		return new $.user.changepass({ debug: true });
	// 	},
	// },

	// {
	// 	title: "Change password (guest)",
	// 	viewclass: "cl-modal-preview",
	// 	code: function () {
	// 		return new $.user.changepass_guest({
	// 			token: "token",
	// 			debug: true,
	// 		});
	// 	},
	// },

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
