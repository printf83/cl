"use strict";
import * as core from "../base/core.js";
import * as user from "../base/user.js";
import toast from "../base/toast.js";
import button from "../base/button.js";
import sample from "./sample.js";
import modal from "../base/modal.js";
import img from "../base/img.js";
import btngroup from "../base/btngroup.js";
import p from "../base/p.js";

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
		msg: ["Auto show login form if user not sign in"],
		import: ["button", "toast", "user"],
		code: () => {
			return new button({
				label: "Get user info",
				icon: "user",
				color: "primary",
				onclick: (event) => {
					user.info(event.currentTarget, (result) => {
						if (result) {
							new toast("/", `Hai ${result.name}`).show();
						}
					});
				},
			});
		},
	},

	{
		title: "Get guest info",
		msg: ["Return {{user info}} if it is sign in user, or {{null}} if guest"],
		import: ["button", "toast", "user"],
		code: () => {
			return new button({
				label: "Get guest info",
				icon: "user",
				color: "primary",
				onclick: (event) => {
					user.info_guest(event.currentTarget, (result) => {
						if (result) {
							new toast("/", `Hai ${result.name}`).show();
						} else {
							new toast("!", `Hai guest`).show();
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
		title: "Banner",
		msg: [
			"Setup banner that appear on user dialog like sign up, sign in, profile editor and others using {{core.user.banner}}. You can use this function before {{core.documentReady}}",
		],
		container: sample.stackcontainer,
		import: ["user", "toast", "sample", "btngroup"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						label: "Attach",
						icon: "play",
						color: "success",
						onclick: () => {
							core.user.banner = () => {
								return new img({
									class: "img-fluid",
									src: sample.img(730, 550),
								});

								// return new carousel({
								// 	control: true,
								// 	indicators: true,
								// 	item: [
								// 		sample.img(510, 510),
								// 		sample.img(510, 510),
								// 		sample.img(510, 510),
								// 		sample.img(510, 510),
								// 		sample.img(510, 510),
								// 		sample.img(510, 510),
								// 	],
								// });
							};

							new toast("/", "User banner attached").show();
						},
					}),

					new button({
						icon: "stop",
						color: "danger",
						onclick: () => {
							core.user.banner = null;
							new toast("-", "User banner detached").show();
						},
					}),

					new button({
						icon: "eye",
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
					}),
				],
			});
		},
	},

	{
		title: "Sign up terms",
		msg: [
			"Setup terms dialog that appear on user sign up dialog using {{core.user.onterm}}. You can use this function before {{core.documentReady}}",
		],
		container: sample.stackcontainer,
		import: ["user", "toast", "sample", "modal", "btngroup", "p"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						label: "Attach",
						icon: "play",
						color: "success",
						onclick: () => {
							core.user.onterm = () => {
								new modal({
									size: "xl",
									title: "Term and conditions",
									elem: [
										new p(sample.text()),
										new p(sample.text()),
										new p(sample.text()),
										new p(sample.text()),
										new p(sample.text()),
										new p(sample.text()),
										new p(sample.text()),
										new p(sample.text()),
										new p(sample.text()),
										new p(sample.text()),
									],
									button: [
										{
											label: "Okay",
											onclick: () => {},
										},
										"Close",
									],
								}).show();
							};

							new toast("/", "User sign up term attached").show();
						},
					}),

					new button({
						icon: "stop",
						color: "danger",
						onclick: () => {
							core.user.onterm = null;

							new toast("-", "User sign up term detached").show();
						},
					}),

					new button({
						icon: "eye",
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
					}),
				],
			});
		},
	},

	{
		title: "Event",
		msg: [
			"Setup function to detect user sign in, sign out or update profile. You can use this function before {{core.documentReady}}",
		],
		container: sample.stackcontainer,
		import: ["user", "toast", "btngroup"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						label: "Attach",
						icon: "play",
						color: "success",
						onclick: () => {
							core.user.onsignin = () => {
								new toast("i", "User sign in event trigged").show();
							};
							core.user.onsignout = () => {
								new toast("-", "User sign out event trigged").show();
							};
							core.user.onchange = () => {
								new toast("!", "User profile changed event trigged").show();
							};

							new toast("/", "User event attached").show();
						},
					}),

					new button({
						icon: "stop",
						color: "danger",
						onclick: () => {
							core.user.onsignin = null;
							core.user.onsignout = null;
							core.user.onchange = null;

							new toast("-", "User event detached").show();
						},
					}),

					new button({
						icon: "eye",
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
					}),
				],
			});
		},
	},
];
