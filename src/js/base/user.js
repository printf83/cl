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
				// core.replaceWith(
				// 	container,
				// 	new signin({
				// 		msg: new span({ textcolor: "danger", elem: "Please provide valid email and password" }),
				// 	})
				// );
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
				// core.replaceWith(
				// 	container,
				// 	new signup({
				// 		msg: new span({ textcolor: "danger", elem: "Please provide valid email and password" }),
				// 	})
				// );
			} else {
				let data = core.getValue(container);
				db.user.register(
					{
						sender: sender,
						data: { username: data.email, password: data.password, password2: data.password2 },
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
		});
	},
	resetpass: function (event) {
		let sender = event.currentTarget;
		let container = sender.closest("form");
		core.validate(container, function (result) {
			if (!result) {
				// core.replaceWith(
				// 	container,
				// 	new resetpass({ msg: new span({ textcolor: "danger", elem: "Please provide valid email" }) })
				// );
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
				// core.replaceWith(
				// 	container,
				// 	new changepass({ msg: new span({ textcolor: "danger", elem: "Please provide valid password" }) })
				// );
			} else {
				let data = core.getValue(container);
				db.user.changepass(
					{
						sender: sender,
						data: { oldpassword: data.oldpassword, password: data.password, password2: data.password2 },
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

	issignin: function () {
		return false;
	},
};

export function profile(sender, callback) {
	fn.profile(sender, callback);
}

export function signout(sender, callback) {
	fn.signout(sender, callback);
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

		super.data = {
			id: opt.id,
			display: "flex",
			alignitem: "center",
			justifycontent: "center",
			class: ["w-100", "h-100"],
			elem: new div({
				style: { "max-width": "320px" },
				align: "center",
				elem: new container.form([
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
						onchange: fn.inputchange,
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
						onchange: fn.inputchange,
					}),
					new div({
						display: "flex",
						justifycontent: "center",
						elem: new input({
							name: "remember",
							type: "checkbox",
							label: "Remember me",
						}),
					}),
					new container.grid([
						new button({
							label: "Sign in",
							color: "primary",
							weight: "lg",
							onclick: fn.signin,
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
										core.replaceWith(
											container,
											new resetpass({ id: container.getAttribute("id") })
										);
									},
								}),
								new button({
									weight: "sm",
									elem: "Register",
									onclick: function (event) {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceWith(container, new signup({ id: container.getAttribute("id") }));
									},
								}),
							],
						}),
					]),
				]),
			}),
		};
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

		super.data = {
			id: opt.id,
			display: "flex",
			alignitem: "center",
			justifycontent: "center",
			class: ["w-100", "h-100"],
			elem: new div({
				style: { "max-width": "320px" },
				align: "center",
				elem: new container.form([
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
						onchange: fn.inputchange,
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
						onchange: fn.inputchange,
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
						onchange: fn.inputchange,
					}),
					new container.grid([
						new button({
							label: "Sign up",
							color: "primary",
							weight: "lg",
							onclick: fn.signup,
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
										core.replaceWith(
											container,
											new resetpass({ id: container.getAttribute("id") })
										);
									},
								}),
								new button({
									weight: "sm",
									elem: "Sign in",
									onclick: function (event) {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceWith(container, new signin({ id: container.getAttribute("id") }));
									},
								}),
							],
						}),
					]),
				]),
			}),
		};
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

		super.data = {
			id: opt.id,
			display: "flex",
			alignitem: "center",
			justifycontent: "center",
			class: ["w-100", "h-100"],
			elem: new div({
				style: { "max-width": "320px" },
				align: "center",
				elem: new container.form([
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
						onchange: fn.inputchange,
					}),

					new container.grid([
						new button({
							label: "Send email",
							color: "primary",
							weight: "lg",
							onclick: fn.resetpass,
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
										core.replaceWith(container, new signin({ id: container.getAttribute("id") }));
									},
								}),
								new button({
									weight: "sm",
									elem: "Register",
									onclick: function (event) {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceWith(container, new signup({ id: container.getAttribute("id") }));
									},
								}),
							],
						}),
					]),
				]),
			}),
		};
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

		super.data = {
			id: opt.id,
			display: "flex",
			alignitem: "center",
			justifycontent: "center",
			class: ["w-100", "h-100"],
			elem: new div({
				style: { "max-width": "320px" },
				align: "center",
				elem: new container.form([
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
						onchange: fn.inputchange,
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
						onchange: fn.inputchange,
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
						onchange: fn.inputchange,
					}),

					new container.grid([
						new button({
							label: "Change password",
							color: "primary",
							weight: "lg",
							onclick: fn.changepass,
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
										core.replaceWith(container, fn.signout);
									},
								}),
								new button({
									weight: "sm",
									elem: "Reset password",
									onclick: function (event) {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceWith(
											container,
											new resetpass({ id: container.getAttribute("id") })
										);
									},
								}),
							],
						}),
					]),
				]),
			}),
		};
	}
}
