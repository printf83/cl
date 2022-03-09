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
import modal from "./modal.js";
import img from "./img.js";
import * as alert from "./alert.js";

const defaultIcon = {
	icon: "fire",
	weight: "4x",
};
const defaultSize = "sm";
const defaultTitleSize = 4;

let defaultSignInOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: defaultSize,
	title: null,
	email: null,
	callback: null,
};

let defaultSignUpOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: defaultSize,
	title: null,
	callback: null,
};

let defaultResetPassOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: defaultSize,
	title: null,
	callback: null,
};

let defaultChangePassOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: defaultSize,
	title: null,
	callback: null,
};

let defaultChangePassGuestOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: defaultSize,
	token: null,
	title: null,
	callback: null,
};

const fn = {
	msg: function (msg, icon) {
		return new alert.container({
			align: "start",
			marginbottom: 0,
			icon: icon,
			elem: msg,
		});
	},
	showmsg: function (container, msg, icon) {
		let id = container.getAttribute("id");
		let msgcontainer = document.getElementById(`${id}-msg`);
		core.removeChildElement(msgcontainer);

		if (msg) {
			msgcontainer.classList.remove("d-none");
			core.appendChild(msgcontainer, fn.msg(msg, icon));
		} else {
			msgcontainer.classList.add("d-none");
		}
	},
	action: {
		inputchange: function (event) {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			fn.showmsg(container, null);
		},
		signout: function (sender, callback) {
			db.user.signout(
				{
					sender: sender,
				},
				function (result) {
					callback(result);
				}
			);
		},
		signin: function (sender, opt) {
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.showmsg(container, "Please provide email and password", "-");
				} else {
					let data = core.getValue(container);
					container.classList.remove("was-validated");

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
									if (typeof opt.callback === "function") {
										let dlg = container.closest("div.modal");
										modal.hide(dlg);
										opt.callback();
									} else {
										fn.showmsg(container, "Sign in success", "/");
									}
								} else {
									fn.showmsg(container, result && result.message ? result.message : null, "!!");
								}
							}
						}
					);
				}
			});
		},
		signup: function (sender, opt) {
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.showmsg(container, "Please provide email and password", "-");
				} else {
					let data = core.getValue(container);

					if (data.password !== data.password2) {
						fn.showmsg(container, "Password and retry password not match", "-");
					} else {
						container.classList.remove("was-validated");

						db.user.register(
							{
								sender: sender,
								data: { username: data.email, password: data.password },
							},
							function (result) {
								if (result) {
									if (result.success) {
										fn.showmsg(container, "Sign up success", "/");
									} else {
										fn.showmsg(container, result && result.message ? result.message : null, "!!");
									}
								}
							}
						);
					}
				}
			});
		},
		resetpass: function (sender, opt) {
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.showmsg(container, "Please provide email", "-");
				} else {
					let data = core.getValue(container);
					container.classList.remove("was-validated");

					db.user.resetpass(
						{
							sender: sender,
							data: { username: data.email },
						},
						function (result) {
							if (result) {
								if (result.success) {
									fn.showmsg(container, "Please check your email to continue reset password", "/");
								} else {
									fn.showmsg(container, result && result.message ? result.message : null, "!!");
								}
							}
						}
					);
				}
			});
		},
		changepass: function (sender, opt) {
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.showmsg(container, "Please provide old password, new password and repeat new password", "-");
				} else {
					let data = core.getValue(container);

					if (data.password !== data.password2) {
						fn.showmsg(container, "Password and retry password not match", "-");
					} else {
						container.classList.remove("was-validated");

						db.user.changepass(
							{
								sender: sender,
								data: { oldpassword: data.oldpassword, password: data.password },
							},
							function (result) {
								if (result) {
									if (result.success) {
										fn.showmsg(container, "Password changed", "/");
									} else {
										fn.showmsg(container, result && result.message ? result.message : null, "!!");
									}
								}
							}
						);
					}
				}
			});
		},
		changepass_guest: function (sender, opt) {
			let container = sender.closest("form");
			core.validate(container, function (result) {
				if (!result) {
					fn.showmsg(container, "Please provide new password and repeat new password", "-");
				} else {
					let data = core.getValue(container);

					if (data.password !== data.password2) {
						fn.showmsg(container, "Password and retry password not match", "-");
					} else {
						container.classList.remove("was-validated");

						db.user.changepass_guest(
							{
								sender: sender,
								data: { token: data.token, password: data.password },
							},
							function (result) {
								if (result) {
									if (result.success) {
										fn.showmsg(container, "Password changed", "/");
									} else {
										fn.showmsg(container, result && result.message ? result.message : null, "!!");
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
		validate: function (token, callback) {
			db.user.validate(token, function (result) {
				callback(result);
			});
		},
	},
	form: {
		container: function (id, elem) {
			return new form({
				id: id,
				align: "center",
				elem: elem,
			});
		},
		signin: function (opt) {
			return new container.form(
				[
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Sign in" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
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
							icon: "arrow-right-to-bracket",
							color: "primary",
							weight: "lg",
							onclick: function (event) {
								fn.action.signin(event.currentTarget, opt);
							},
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
									elem: "Sign up",
									onclick: function (event) {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceChild(container, fn.form.container(opt.id, fn.form.signup(opt)));
									},
								}),
							],
						}),
					]),
				].filter(Boolean)
			);
		},
		signup: function (opt) {
			return new container.form(
				[
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Sign up" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
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
							icon: "envelope",
							color: "primary",
							weight: "lg",
							onclick: function (event) {
								fn.action.signup(event.currentTarget, opt);
							},
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
				].filter(Boolean)
			);
		},
		resetpass: function (opt) {
			return new container.form(
				[
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Reset password" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
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
							icon: "envelope",
							color: "primary",
							weight: "lg",
							onclick: function (event) {
								fn.action.resetpass(event.currentTarget, opt);
							},
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
									elem: "Sign up",
									onclick: function (event) {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceChild(container, fn.form.container(opt.id, fn.form.signup(opt)));
									},
								}),
							],
						}),
					]),
				].filter(Boolean)
			);
		},
		changepass: function (opt) {
			return new container.form(
				[
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Change password" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
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
							icon: "floppy-disk",
							color: "primary",
							weight: "lg",
							onclick: function (event) {
								fn.action.changepass(event.currentTarget, opt);
							},
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
											core.replaceChild(
												container,
												fn.form.container(opt.id, fn.form.signin(opt))
											);
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
				].filter(Boolean)
			);
		},
		changepass_guest: function (opt) {
			return new container.form(
				[
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Change password" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
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
							icon: "floppy-disk",
							color: "primary",
							weight: "lg",
							onclick: function (event) {
								fn.action.changepass_guest(event.currentTarget, opt);
							},
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
				].filter(Boolean)
			);
		},
	},
};

export function profile(sender, callback) {
	fn.action.profile(sender, callback);
}

export function signout(sender, callback) {
	fn.action.signout(sender, callback);
}

export function validate(token, callback) {
	fn.action.validate(token, callback);
}

export class signin extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			opt[0] = core.extend({}, defaultSignInOption, opt[0]);
			opt[0].id = opt[0].id || core.UUID();

			if (opt.length === 2) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.signin(opt[0])),
					debug: opt[1]?.debug === true ? true : false,
				});
			} else if (opt.length === 1) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.signin(opt[0])),
				});
			} else {
				console.error("Unsupported argument", opt);
			}
		} else {
			super();
		}
	}
}

export class signup extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			opt[0] = core.extend({}, defaultSignUpOption, opt[0]);
			opt[0].id = opt[0].id || core.UUID();

			if (opt.length === 2) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.signup(opt[0])),
					debug: opt[1]?.debug === true ? true : false,
				});
			} else if (opt.length === 1) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.signup(opt[0])),
				});
			} else {
				console.error("Unsupported argument", opt);
			}
		} else {
			super();
		}
	}
}

export class resetpass extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			opt[0] = core.extend({}, defaultResetPassOption, opt[0]);
			opt[0].id = opt[0].id || core.UUID();

			if (opt.length === 2) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.resetpass(opt[0])),
					debug: opt[1]?.debug === true ? true : false,
				});
			} else if (opt.length === 1) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.resetpass(opt[0])),
				});
			} else {
				console.error("Unsupported argument", opt);
			}
		} else {
			super();
		}
	}
}

export class changepass extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			opt[0] = core.extend({}, defaultChangePassOption, opt[0]);
			opt[0].id = opt[0].id || core.UUID();

			if (opt.length === 2) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.changepass(opt[0])),
					debug: opt[1]?.debug === true ? true : false,
				});
			} else if (opt.length === 1) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.changepass(opt[0])),
				});
			} else {
				console.error("Unsupported argument", opt);
			}
		} else {
			super();
		}
	}
}

export class changepass_guest extends modal {
	constructor(...opt) {
		if (opt && opt.length > 0) {
			opt[0] = core.extend({}, defaultChangePassGuestOption, opt[0]);
			opt[0].id = opt[0].id || core.UUID();

			if (opt.length === 2) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.changepass_guest(opt[0])),
					debug: opt[1]?.debug === true ? true : false,
				});
			} else if (opt.length === 1) {
				super({
					size: opt[0].size,
					elem: fn.form.container(opt[0].id, fn.form.changepass_guest(opt[0])),
				});
			} else {
				console.error("Unsupported argument", opt);
			}
		} else {
			super();
		}
	}
}
