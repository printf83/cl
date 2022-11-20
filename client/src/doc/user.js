"use strict";
import * as core from "../dist/cl/base/core.js";
import * as user from "../dist/cl/base/user.js";
import toast from "../dist/cl/base/toast.js";
import button from "../dist/cl/base/button.js";
import sample from "./sample.js";
import modal from "../dist/cl/base/modal.js";
import img from "../dist/cl/base/img.js";
import btngroup from "../dist/cl/base/btngroup.js";
import p from "../dist/cl/base/p.js";

const reloadUserDoc = () => {
	let activeElem = document.getElementById("sidebar").getElementsByClassName("active");
	if (activeElem && activeElem.length > 0) {
		let menuItem = null;
		for (let i = 0; i < activeElem.length; i++) {
			if (
				activeElem[i].getAttribute("cl-m1") === "Database" &&
				activeElem[i].getAttribute("cl-m2") === "User" &&
				activeElem[i].getAttribute("cl-m3") === "menu"
			) {
				menuItem = activeElem[i];
				i = activeElem.length;

				menuItem.dispatchEvent(new Event("click"));
			}
		}
	}
};

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
				click: (event) => {
					//marker
					new user.changepass({
						callback: (result) => {
							if (result) {
								new toast("/", "Password changed").show();
							}
						},
					}).show();
					//-
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
				click: (event) => {
					let sender = event.currentTarget;

					//marker
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
					//-
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
				click: (event) => {
					//marker
					user.info(event.currentTarget, (result) => {
						if (result) {
							new toast("/", `Hai ${result.name}`).show();
						}
					});
					//-
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
				click: (event) => {
					//marker
					user.info_guest(event.currentTarget, (result) => {
						if (result) {
							new toast("/", `Hai ${result.name}`).show();
						} else {
							new toast("!", `Hai guest`).show();
						}
					});
					//-
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
				click: (event) => {
					//marker
					user.signout(event.currentTarget, (result) => {
						if (result) {
							new toast("/", "User successfuly sign out").show();
						} else {
							new toast("!!", "User failed sign out").show();
						}
					});
					//-
				},
			});
		},
	},

	{
		title: "Icon and title",
		msg: [
			"Change application icon and title that appear on the user dialog using {{core.setting.icon}} and {{core.setting.title}}. You can use this function before {{core.documentReady}}",
		],
		container: sample.stackcontainer,
		import: ["user", "toast", "sample", "btngroup"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						label: "Run",
						icon: "play",
						color: "success",
						click: () => {
							//marker
							core.setting.title = () => "Bootstrap";
							core.setting.icon = (color, weight) => {
								return {
									color: color,
									weight: weight,
									type: "fab",
									icon: "bootstrap",
								};
							};
							//-

							new toast("/", "Application icon and title changed").show();
							reloadUserDoc(); // documentation purpose only
						},
					}),

					new button({
						icon: "stop",
						color: "danger",
						click: () => {
							//marker
							core.setting.icon = null;
							core.setting.title = null;
							//-

							new toast("-", "Application icon and title reset").show();
							reloadUserDoc(); // documentation purpose only
						},
					}),
				],
			});
		},
	},

	{
		title: "Banner",
		msg: [
			"Setup banner that appear on user dialog like sign up, sign in, profile editor and others using {{core.setting.banner}}. You can use this function before {{core.documentReady}}. Banner only visible on the large screen (desktop)",
		],
		container: sample.stackcontainer,
		import: ["user", "toast", "sample", "btngroup"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						label: "Run",
						icon: "play",
						color: "success",
						click: () => {
							//marker
							core.setting.banner = (type) => {
								return new img({
									fluid: true,
									rounded: true,
									alt: `Image for ${type}`,
									src: sample.img(730, 580),
								});
							};
							//-

							new toast("/", "User banner change").show();
							reloadUserDoc(); // documentation purpose only
						},
					}),

					new button({
						icon: "stop",
						color: "danger",
						click: () => {
							//marker
							core.setting.banner = null;

							new toast("-", "User banner reset").show();
							reloadUserDoc(); // documentation purpose only
						},
					}),
				],
			});
		},
	},

	{
		title: "Sign up terms",
		msg: [
			"Setup terms dialog that appear on user sign up dialog using {{core.setting.term}}. You can use this function before {{core.documentReady}}",
		],
		container: sample.stackcontainer,
		import: ["user", "toast", "sample", "modal", "btngroup", "p"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						label: "Run",
						icon: "play",
						color: "success",
						click: () => {
							//marker
							core.setting.term = () => {
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
											click: () => {},
										},
										"Close",
									],
								}).show();
							};
							//-

							new toast("/", "User sign up term change").show();
							reloadUserDoc(); // documentation purpose only
						},
					}),

					new button({
						icon: "stop",
						color: "danger",
						click: () => {
							//marker
							core.setting.term = null;

							new toast("-", "User sign up term reset").show();
							reloadUserDoc(); // documentation purpose only
						},
					}),
				],
			});
		},
	},

	{
		title: "Event",
		msg: [
			"Setup function to detect user sign in, sign out or update profile using {{core.setting.userchange}} function. You can use this function before {{core.documentReady}}",
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
						click: () => {
							//marker
							core.setting.userchange = (result) => {
								if (result) {
									new toast("/", `Hai ${result.name}`).show();
								} else {
									new toast("!", `Hai guest`).show();
								}
							};
							//-

							new toast("/", "User event attached").show();
							reloadUserDoc(); // documentation purpose only
						},
					}),

					new button({
						icon: "stop",
						color: "danger",
						click: () => {
							//marker
							core.setting.userchange = null;

							new toast("-", "User event detached").show();
							reloadUserDoc(); // documentation purpose only
						},
					}),
				],
			});
		},
	},
];
