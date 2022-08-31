"use strict";
import * as user from "../base/user.js";
import toast from "../base/toast.js";
import button from "../base/button.js";
import sample from "./sample.js";
import modal from "../base/modal.js";

export default [
	{
		title: "User",
		msg: "Provide access to easy access login, logout, register, reset password, and edit.",
		anchor: false,
	},

	//==============================
	{
		title: "Login",
		viewclass: "cl-modal-preview",
		import: ["user"],
		code: () => {
			return new user.signin({
				debug: true,
			});
		},
	},

	{
		title: "Register",
		viewclass: "cl-modal-preview",
		import: ["user"],
		code: () => {
			return new user.signup({ debug: true });
		},
	},

	{
		title: "Reset password",
		viewclass: "cl-modal-preview",
		import: ["user"],
		code: () => {
			return new user.resetpass({ debug: true });
		},
	},
	//==============================

	{
		title: "Change password",
		viewclass: "cl-modal-preview",
		import: ["user"],
		code: () => {
			return new user.changepass({ debug: true });
		},
	},

	{
		msg: "Live preview",
		import: ["button", "toast", "user"],
		code: () => {
			return new button({
				label: "Change password",
				icon: "key",
				color: "primary",
				onclick: (event) => {
					new user.changepass({
						callback: (result) => {
							if (result) {
								new toast("/", "Password changed").show();
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
		import: ["user"],
		code: () => {
			return new user.updateinfo({ debug: true });
		},
	},

	{
		msg: "Live preview",
		import: ["button", "toast", "user"],
		code: () => {
			return new button({
				label: "Update profile",
				icon: "user",
				color: "primary",
				onclick: (event) => {
					let sender = event.currentTarget;
					user.info(sender, (result) => {
						if (result && result.email) {
							new user.updateinfo({
								data: result,
								sender: sender,
								callback: (result) => {
									if (result) {
										new toast("/", "Your information updated").show();
									}
								},
							}).show();
						}
					});
				},
			});
		},
	},

	//==============================
	{
		title: "Change password (guest)",
		viewclass: "cl-modal-preview",
		import: ["user"],
		code: () => {
			return new user.changepass_guest({
				token: "token",
				debug: true,
			});
		},
	},
	//==============================

	{
		title: "Get user info",
		import: ["button", "toast", "user"],
		code: () => {
			return new button({
				label: "Get info",
				icon: "user",
				color: "primary",
				onclick: (event) => {
					user.info(event.currentTarget, (result) => {
						if (result) {
							new toast("i", `Hai ${result.name}`).show();
						}
					});
				},
			});
		},
	},

	{
		title: "Sign out",
		import: ["button", "toast", "user"],
		code: () => {
			return new button({
				label: "Sign out",
				icon: "power-off",
				color: "danger",
				onclick: (event) => {
					user.signout(event.currentTarget, (result) => {
						if (result) {
							new toast("/", "User successfuly sign out").show();
						} else {
							new toast("!!", "User failed sign out").show();
						}
					});
				},
			});
		},
	},

	{
		title: "Sign up terms",
		container: sample.stackcontainer,
		import: ["user", "toast", "sample", "modal"],
		code: () => {
			return [
				new button({
					label: "Attach sign up term",
					icon: "play",
					color: "success",
					onclick: () => {
						user.onterm(() => {
							new modal({
								weight: "lg",
								title: "Term and conditions",
								elem: sample.text(),
								button: [
									{
										label: "Okay",
										onclick: () => {},
									},
									"Close",
								],
							}).show();
						});

						new toast("/", "User sign up term attached").show();
					},
				}),

				new button({
					label: "Detached sign up term",
					icon: "stop",
					color: "warning",
					onclick: () => {
						user.onterm(null);

						new toast("/", "User sign up term detached").show();
					},
				}),
			];
		},
	},

	{
		title: "Event",
		container: sample.stackcontainer,
		import: ["user", "toast"],
		code: () => {
			return [
				new button({
					label: "Attach user event",
					icon: "play",
					color: "success",
					onclick: () => {
						user.onsignin(() => {
							new toast("i", "User sign in event trigged").show();
						});
						user.onsignout(() => {
							new toast("-", "User sign out event trigged").show();
						});
						user.onchange(() => {
							new toast("!", "User profile changed event trigged").show();
						});

						new toast("/", "User event attached").show();
					},
				}),

				new button({
					label: "Detached user event",
					icon: "stop",
					color: "warning",
					onclick: () => {
						user.onsignin(null);
						user.onsignout(null);
						user.onchange(null);

						new toast("/", "User event detached").show();
					},
				}),
			];
		},
	},
];
