"use strict";
import * as core from "./core.js";
import input from "./input.js";
import * as container from "./container.js";
import div from "./div.js";
import icon from "./icon.js";
import h from "./h.js";
import button from "./button.js";
import form from "./form.js";
import * as db from "./api.js";
import span from "./span.js";

let defaultSignInOption = {
	id: null,
	icon: {
		icon: "fire",
		weight: "5x",
	},
	msg: null,
	title: "Welcome",
	email: null,
};

let defaultRegisterOption = {
	id: null,
	icon: {
		icon: "fire",
		weight: "5x",
	},
	msg: null,
	title: "Register",
};

let defaultResetPassOption = {
	id: null,
	icon: {
		icon: "fire",
		weight: "5x",
	},
	msg: null,
	title: "Reset Password",
};

let defaultChangePassOption = {
	id: null,
	icon: {
		icon: "fire",
		weight: "5x",
	},
	msg: null,
	title: "Change Password",
};

let defaultChangePassGuestOption = {
	id: null,
	icon: {
		icon: "fire",
		weight: "5x",
	},
	msg: null,
	token: null,
	title: "Change Password",
};

const fn = {
	msg: function (container, msg, color) {
		let id = container.getAttribute("id");
		let msgcontainer = document.getElementById(`${id}-msg`);
		core.removeChildElement(msgcontainer);

		if (msg) {
			msgcontainer.classList.remove("d-none");
			core.appendChild(
				msgcontainer,
				new span({
					textcolor: color,
					elem: msg,
				})
			);
		} else {
			msgcontainer.classList.add("d-none");
		}
	},
	issignin: function () {
		return false;
	},
	action: {
		inputchange: function (event) {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			fn.msg(container, null);
		},
		signout: function (sender, callback) {
			db.user.signout(
				{
					sender: sender,
				},
				function (result) {}
			);

			setTimeout(
				function (callback) {
					callback(true);
				},
				1000,
				callback
			);
		},
		signin: function (event) {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.msg(container, "Please provide email and password", "danger");
				} else {
					let data = core.getValue(container);
					db.user.signin(
						{
							sender: sender,
							data: {
								username: data.email,
								password: data.password,
							},
						},
						function (result) {
							if (result) {
								if (result.success) {
									fn.msg(container, `Sign in success. Welcome ${result.username}`, "success");
								} else {
									fn.msg(container, result && result.message ? result.message : null, "danger");
								}
							}
						}
					);
				}
			});
		},
		signup: function (event) {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.msg(container, "Please provide email and password", "danger");
				} else {
					let data = core.getValue(container);

					if (data.password !== data.password2) {
						fn.msg(container, "Password and retry password not match", "danger");
					} else {
						db.user.register(
							{
								sender: sender,
								data: { username: data.email, password: data.password },
							},
							function (result) {
								if (result) {
									if (result.success) {
										fn.msg(
											container,
											"Signup success. Please sign in using email and password you just sign up",
											"success"
										);
									} else {
										fn.msg(container, result && result.message ? result.message : null, "danger");
									}
								}
							}
						);
					}
				}
			});
		},
		resetpass: function (event) {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.msg(container, "Please provide email", "danger");
				} else {
					let data = core.getValue(container);
					db.user.resetpass(
						{
							sender: sender,
							data: { username: data.email },
						},
						function (result) {
							if (result) {
								if (result.success) {
									fn.msg(container, "Please check your email to continue reset password", "success");
								} else {
									fn.msg(container, result && result.message ? result.message : null, "danger");
								}
							}
						}
					);
				}
			});
		},
		changepass: function (event) {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.msg(container, "Please provide old password, new password and repeat new password", "danger");
				} else {
					let data = core.getValue(container);

					if (data.password !== data.password2) {
						fn.msg(container, "Password and retry password not match", "danger");
					} else {
						db.user.changepass(
							{
								sender: sender,
								data: { oldpassword: data.oldpassword, password: data.password },
							},
							function (result) {
								if (result) {
									if (result.success) {
										fn.msg(container, "Password changed", "success");
									} else {
										fn.msg(container, result && result.message ? result.message : null, "danger");
									}
								}
							}
						);
					}
				}
			});
		},
		changepass_guest: function (event) {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.msg(container, "Please provide new password and repeat new password", "danger");
				} else {
					let data = core.getValue(container);

					if (data.password !== data.password2) {
						fn.msg(container, "Password and retry password not match", "danger");
					} else {
						db.user.changepass_guest(
							{
								sender: sender,
								data: { token: data.token, password: data.password },
							},
							function (result) {
								if (result) {
									if (result.success) {
										fn.msg(container, "Password changed", "success");
									} else {
										fn.msg(container, result && result.message ? result.message : null, "danger");
									}
								}
							}
						);
					}
				}
			});
		},
		profile: function (sender, callback) {
			db.user.profile(
				{
					sender: sender,
				},
				function (result) {
					callback(result);
				}
			);
		},
	},
	form: {
		container: function (id, elem) {
			return {
				id: id,
				display: "flex",
				alignitem: "center",
				justifycontent: "center",
				class: ["w-100", "h-100"],
				elem: new div({
					style: { "max-width": "320px" },
					align: "center",
					elem: elem,
				}),
			};
		},
		signout: function () {},
		signin: function (opt) {
			return new container.form([
				!opt.img && opt.icon ? new icon(opt.icon) : null,
				!opt.icon && opt.img ? new img(opt.img) : null,
				new h(3, opt.title),

				new div({
					id: `${opt.id}-msg`,
					display: opt.msg ? null : "none",
					elem: opt.msg,
				}),

				new input({
					name: "email",
					type: "email",
					label: "Email address",
					floatlabel: true,
					required: true,
					attr: {
						autocomplete: "off",
					},
					value: opt.email,
					onchange: fn.action.inputchange,
				}),
				new input({
					name: "password",
					type: "password",
					label: "Password",
					required: true,
					minlengh: 8,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),
				new container.grid([
					new button({
						label: "Sign in",
						color: "primary",
						weight: "lg",
						onclick: fn.action.signin,
					}),
					new div({
						display: "flex",
						justifycontent: "between",
						elem: [
							new button({
								weight: "sm",
								elem: "Reset password",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.resetpass(opt)));
								},
							}),
							new button({
								weight: "sm",
								elem: "Register",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.signup(opt)));
								},
							}),
						],
					}),
				]),
			]);
		},
		signup: function (opt) {
			return new container.form([
				!opt.img && opt.icon ? new icon(opt.icon) : null,
				!opt.icon && opt.img ? new img(opt.img) : null,
				new h(3, opt.title),

				new div({
					id: `${opt.id}-msg`,
					display: opt.msg ? null : "none",
					elem: opt.msg,
				}),

				new input({
					name: "email",
					type: "email",
					label: "Email address",
					required: true,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),
				new input({
					name: "password",
					type: "password",
					label: "Password",
					required: true,
					minlengh: 8,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),
				new input({
					name: "password2",
					type: "password",
					label: "Repeat password",
					required: true,
					minlengh: 8,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),
				new container.grid([
					new button({
						label: "Sign up",
						color: "primary",
						weight: "lg",
						onclick: fn.action.signup,
					}),
					new div({
						display: "flex",
						justifycontent: "between",
						elem: [
							new button({
								weight: "sm",
								elem: "Reset password",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.resetpass(opt)));
								},
							}),
							new button({
								weight: "sm",
								elem: "Sign in",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.signin(opt)));
								},
							}),
						],
					}),
				]),
			]);
		},
		resetpass: function (opt) {
			return new container.form([
				!opt.img && opt.icon ? new icon(opt.icon) : null,
				!opt.icon && opt.img ? new img(opt.img) : null,
				new h(3, opt.title),

				new div({
					id: `${opt.id}-msg`,
					display: opt.msg ? null : "none",
					elem: opt.msg,
				}),

				new input({
					name: "email",
					type: "email",
					label: "Email address",
					required: true,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),

				new container.grid([
					new button({
						label: "Send email",
						color: "primary",
						weight: "lg",
						onclick: fn.action.resetpass,
					}),

					new div({
						display: "flex",
						justifycontent: "between",
						elem: [
							new button({
								weight: "sm",
								elem: "Sign in",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.signin(opt)));
								},
							}),
							new button({
								weight: "sm",
								elem: "Register",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.signup(opt)));
								},
							}),
						],
					}),
				]),
			]);
		},
		changepass: function (opt) {
			return new container.form([
				!opt.img && opt.icon ? new icon(opt.icon) : null,
				!opt.icon && opt.img ? new img(opt.img) : null,
				new h(3, opt.title),

				new div({
					id: `${opt.id}-msg`,
					display: opt.msg ? null : "none",
					elem: opt.msg,
				}),

				new input({
					name: "oldpassword",
					type: "password",
					label: "Old password",
					required: true,
					minlengh: 8,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),

				new input({
					name: "password",
					type: "password",
					label: "New password",
					required: true,
					minlengh: 8,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),

				new input({
					name: "password2",
					type: "password",
					label: "Repeat new password",
					required: true,
					minlengh: 8,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),

				new container.grid([
					new button({
						label: "Change password",
						color: "primary",
						weight: "lg",
						onclick: fn.action.changepass,
					}),
					new div({
						display: "flex",
						justifycontent: "between",
						elem: [
							new button({
								weight: "sm",
								elem: "Sign out",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									fn.action.signout(sender, function () {
										core.replaceChild(container, fn.form.container(opt.id, fn.form.signin(opt)));
									});
								},
							}),
							new button({
								weight: "sm",
								elem: "Reset password",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.resetpass(opt)));
								},
							}),
						],
					}),
				]),
			]);
		},
		changepass_guest: function (opt) {
			return new container.form([
				!opt.img && opt.icon ? new icon(opt.icon) : null,
				!opt.icon && opt.img ? new img(opt.img) : null,
				new h(3, opt.title),

				new div({
					id: `${opt.id}-msg`,
					display: opt.msg ? null : "none",
					elem: opt.msg,
				}),

				new input({
					name: "token",
					type: "hidden",
					value: opt.token,
				}),

				new input({
					name: "password",
					type: "password",
					label: "New password",
					required: true,
					minlengh: 8,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),

				new input({
					name: "password2",
					type: "password",
					label: "Repeat new password",
					required: true,
					minlengh: 8,
					floatlabel: true,
					attr: {
						autocomplete: "off",
					},
					onchange: fn.action.inputchange,
				}),

				new container.grid([
					new button({
						label: "Change password",
						color: "primary",
						weight: "lg",
						onclick: fn.action.changepass_guest,
					}),
					new div({
						display: "flex",
						justifycontent: "between",
						elem: [
							new button({
								weight: "sm",
								elem: "Sign in",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.signin(opt)));
								},
							}),
							new button({
								weight: "sm",
								elem: "Reset password",
								onclick: function (event) {
									let sender = event.currentTarget;
									let container = sender.closest("form");
									core.replaceChild(container, fn.form.container(opt.id, fn.form.resetpass(opt)));
								},
							}),
						],
					}),
				]),
			]);
		},
		profile: function () {},
	},
};

export function profile(sender, callback) {
	fn.action.profile(sender, callback);
}

export function signout(sender, callback) {
	fn.action.signout(sender, callback);
}

export class signin extends form {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultSignInOption, opt);
		opt.id = opt.id || core.UUID();
		super.data = fn.form.container(opt.id, fn.form.signin(opt));
	}
}

export class signup extends form {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultRegisterOption, opt);
		opt.id = opt.id || core.UUID();
		super.data = fn.form.container(opt.id, fn.form.signup(opt));
	}
}

export class resetpass extends form {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultResetPassOption, opt);
		opt.id = opt.id || core.UUID();
		super.data = fn.form.container(opt.id, fn.form.resetpass(opt));
	}
}

export class changepass extends form {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultChangePassOption, opt);
		opt.id = opt.id || core.UUID();
		super.data = fn.form.container(opt.id, fn.form.changepass(opt));
	}
}

export class changepass_guest extends form {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultChangePassGuestOption, opt);
		opt.id = opt.id || core.UUID();
		super.data = fn.form.container(opt.id, fn.form.changepass_guest(opt));
	}
}
