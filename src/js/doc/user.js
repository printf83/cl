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
	// 	code: () => {
	// 		return new $.user.signin({
	// 			debug: true,
	// 		});
	// 	},
	// },

	// {
	// 	title: "Register",
	// 	viewclass: "cl-modal-preview",
	// 	code: () => {
	// 		return new $.user.signup({ debug: true });
	// 	},
	// },

	// {
	// 	title: "Reset password",
	// 	viewclass: "cl-modal-preview",
	// 	code: () => {
	// 		return new $.user.resetpass({ debug: true });
	// 	},
	// },

	{
		title: "Change password",
		viewclass: "cl-modal-preview",
		code: () => {
			return new $.user.changepass({ debug: true });
		},
	},

	{
		msg: "Live preview",
		code: () => {
			return new $.button({
				label: "Change password",
				icon: "key",
				color: "primary",
				onclick: (event) => {
					new $.user.changepass({
						callback: (result) => {
							if (result) {
								new $.toast("/", "Password changed").show();
							}
						},
					}).show();
				},
			});
		},
	},

	{
		title: "Update profile",
		viewclass: "cl-modal-preview",
		code: () => {
			return new $.user.updateinfo({ debug: true });
		},
	},

	{
		msg: "Live preview",
		code: () => {
			return new $.button({
				label: "Update profile",
				icon: "user",
				color: "primary",
				onclick: (event) => {
					let sender = event.currentTarget;
					$.user.info(sender, (result) => {
						if (result && result.email) {
							new $.user.updateinfo({
								data: result,
								sender: sender,
								callback: (result) => {
									if (result) {
										new $.toast("/", "Your information updated").show();
									}
								},
							}).show();
						}
					});
				},
			});
		},
	},

	// {
	// 	title: "Change password (guest)",
	// 	viewclass: "cl-modal-preview",
	// 	code: () => {
	// 		return new $.user.changepass_guest({
	// 			token: "token",
	// 			debug: true,
	// 		});
	// 	},
	// },

	{
		title: "Get user info",
		code: () => {
			return new $.button({
				label: "Get info",
				icon: "user",
				color: "primary",
				onclick: (event) => {
					$.user.info(event.currentTarget, (result) => {
						if (result) {
							new $.toast("i", `Hai ${result.name}`).show();
						}
					});
				},
			});
		},
	},

	{
		title: "Sign out",
		code: () => {
			return new $.button({
				label: "Sign out",
				icon: "power-off",
				color: "danger",
				onclick: (event) => {
					$.user.signout(event.currentTarget, (result) => {
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
