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
import btnclose from "./btnclose.js";
import file from "./file.js";
import a from "./a.js";
import small from "./small.js";

const defaultIcon = {
	icon: "fire",
	weight: "4x",
};
const defaultSize = "sm";
const defaultSizeBanner = "lg";
const defaultMaxWidth = null; //"420px";
const defaultMaxWidthBanner = null; //"720px";
const defaultTitleSize = 5;

let defaultSignInOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: null,
	title: null,
	email: null,
	callback: null,
	close: true,
	backdropcolor: "primary",
	debug: false,
};

let defaultSignUpOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: null,
	title: null,
	callback: null,
	close: true,
	backdropcolor: "primary",
	debug: false,
};

let defaultResetPassOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: null,
	title: null,
	callback: null,
	close: true,
	backdropcolor: "primary",
	debug: false,
};

let defaultChangePassOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: null,
	title: null,
	callback: null,
	close: true,
	debug: false,
};

let defaultChangePassGuestOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: null,
	token: null,
	title: null,
	callback: null,
	close: true,
	backdropcolor: "primary",
	debug: false,
};

let defaultUpdateInfoOption = {
	id: null,
	icon: defaultIcon,
	msg: null,
	size: null,
	token: null,
	title: null,
	callback: null,
	close: true,
	debug: false,
	data: null,
};

let _ONSIGNIN = null;
let _ONSIGNOUT = null;
let _ONCHANGE = null;
let _ONTERM = null;
let _BANNER = null;

export function onsignin(fn) {
	_ONSIGNIN = fn;
}

export function onsignout(fn) {
	_ONSIGNOUT = fn;
}

export function onchange(fn) {
	_ONCHANGE = fn;
}

export function onterm(fn) {
	_ONTERM = fn;
}

export function banner(fn) {
	_BANNER = fn;
}

const fn = {
	banner: (elem) => {
		if (_BANNER && typeof _BANNER === "function") {
			return new div({
				container: true,
				elem: new div({
					row: true,
					elem: [
						new div({
							col: 8,
							display: ["none", "lg-block"],
							elem: new div({
								display: "flex",
								alignitem: "center",
								style: { height: "100%" },
								elem: _BANNER(),
							}),
						}),
						new div({
							col: [12, "lg-4"],
							elem: new div({
								display: "flex",
								alignitem: "center",
								style: { height: "100%" },
								elem: elem,
							}),
						}),
					],
				}),
			});
		} else {
			return elem;
		}
	},
	msg: (msg, icon) => {
		return new alert.container({
			align: "start",
			marginbottom: 0,
			icon: icon,
			elem: msg,
		});
	},
	showmsg: (container, msg, icon) => {
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
	closebtn: (opt) => {
		return !opt.debug
			? new div({
					position: "relative",
					elem: new div({
						position: "absolute",
						class: "w-100",
						elem: new div({
							display: "flex",
							justifycontent: "end",
							elem: new btnclose({
								onclick: (event) => {
									let sender = event.currentTarget;
									let container = sender.closest("div.modal");
									if (opt.callback instanceof Function) {
										opt.callback(false);
									}
									modal.hide(container);
								},
							}),
						}),
					}),
			  })
			: null;
	},
	action: {
		inputchange: (event) => {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			fn.showmsg(container, null);
		},
		signout: (sender, callback) => {
			db.user.signout(
				{
					sender: sender,
				},
				(result) => {
					callback(result);

					//event signout
					if (_ONSIGNOUT && typeof _ONSIGNOUT === "function") {
						_ONSIGNOUT();
					}
				}
			);
		},
		signin: (sender, opt) => {
			let container = sender.closest("form");
			core.validate(container, (result) => {
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
								remember:
									data.remember && data.remember.length === 1 && data.remember[0] === "on"
										? true
										: false,
							},
						},
						(result) => {
							if (result) {
								if (result.success) {
									if (opt.callback instanceof Function) {
										let dlg = container.closest("div.modal");
										modal.hide(dlg);
										opt.callback(true);
									}

									//event signin
									if (_ONSIGNIN && typeof _ONSIGNIN === "function") {
										_ONSIGNIN();
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
		signup: (sender, opt) => {
			let container = sender.closest("form");
			core.validate(container, (result) => {
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
							(result) => {
								if (result) {
									if (result.success) {
										if (opt.callback instanceof Function) {
											let dlg = container.closest("div.modal");
											modal.hide(dlg);
											opt.callback(true);
										} else {
											fn.showmsg(container, "Sign up success", "/");
										}
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
		resetpass: (sender, opt) => {
			let container = sender.closest("form");
			core.validate(container, (result) => {
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
						(result) => {
							if (result) {
								if (result.success) {
									if (opt.callback instanceof Function) {
										let dlg = container.closest("div.modal");
										modal.hide(dlg);
										opt.callback(true);
									} else {
										fn.showmsg(
											container,
											"Please check your email to continue reset password",
											"/"
										);
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
		changepass: (sender, opt) => {
			let container = sender.closest("form");
			core.validate(container, (result) => {
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
							(result) => {
								if (result) {
									if (result.success) {
										if (opt.callback instanceof Function) {
											let dlg = container.closest("div.modal");
											modal.hide(dlg);
											opt.callback(true);
										} else {
											fn.showmsg(container, "Password changed", "/");
										}
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
		changepass_guest: (sender, opt) => {
			let container = sender.closest("form");
			core.validate(container, (result) => {
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
							(result) => {
								if (result) {
									if (result.success) {
										if (opt.callback instanceof Function) {
											let dlg = container.closest("div.modal");
											modal.hide(dlg);
											opt.callback(true);
										} else {
											fn.showmsg(container, "Password changed", "/");
										}
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
		info: (sender, callback) => {
			db.user.info(
				{
					sender: sender,
				},
				(result) => {
					callback(result);
				}
			);
		},
		managepicture: (sender, oldData, newData, callback) => {
			let file_delete = null;
			let file_save = null;

			if (newData) {
				if (oldData) {
					if (oldData !== newData) {
						file_save = newData;
					}
				} else {
					file_save = newData;
				}
			}

			if (oldData) {
				if (newData) {
					if (oldData !== newData) {
						file_delete = oldData;
					}
				} else {
					file_delete = oldData;
				}
			}

			if (file_save) {
				db.file.save(
					file_save,
					() => {
						if (file_delete) {
							db.file.delete(file_delete, callback, sender);
						} else {
							callback();
						}
					},
					sender
				);
			} else {
				if (file_delete) {
					db.file.delete(file_delete, callback, sender);
				} else {
					callback();
				}
			}
		},
		updateinfo: (sender, opt) => {
			let container = sender.closest("form");
			core.validate(container, (result) => {
				if (!result) {
					fn.showmsg(container, "Please provide contact email and name", "-");
				} else {
					container.classList.remove("was-validated");

					let newData = core.getValue(container);

					db.user.info(sender, (oldData) => {
						fn.action.managepicture(sender, oldData.picture, newData.picture, () => {
							db.user.updateinfo(
								{
									sender: sender,
									data: { email: newData.email, name: newData.name, picture: newData.picture },
								},
								(result) => {
									if (result) {
										if (result.success) {
											if (opt.callback instanceof Function) {
												let dlg = container.closest("div.modal");
												modal.hide(dlg);
												opt.callback(true);
											}

											//event onchange
											if (_ONCHANGE && typeof _ONCHANGE === "function") {
												_ONCHANGE();
											}
										} else {
											fn.showmsg(
												container,
												result && result.message ? result.message : null,
												"!!"
											);
										}
									}
								}
							);
						});
					});
				}
			});
		},
		validate: (token, callback) => {
			db.user.validate(token, (result) => {
				callback(result);
			});
		},
	},
	form: {
		container: (id, elem) => {
			return new form({
				id: id,
				align: "center",
				elem: elem,
			});
		},
		signin: (opt) => {
			return new container.form(
				[
					opt.close ? fn.closebtn(opt) : null,
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Sign in" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
					}),

					new input({
						before: new icon("at"),
						name: "email",
						type: "email",
						placeholder: "Email address",
						required: true,
						attr: {
							autocomplete: "off",
						},
						value: opt.email,
						onchange: fn.action.inputchange,
					}),
					new input({
						before: new icon("key"),
						name: "password",
						type: "password",
						placeholder: "Password",
						required: true,
						minlengh: 8,
						attr: {
							autocomplete: "off",
						},
						onchange: fn.action.inputchange,
					}),
					new div({
						display: "flex",
						justifycontent: "center",
						elem: new input({ type: "checkbox", name: "remember", label: "Remember me" }),
					}),
					new container.grid([
						new button({
							label: "Sign in",
							icon: "arrow-right-to-bracket",
							color: "primary",
							onclick: !opt.debug
								? (event) => {
										fn.action.signin(event.currentTarget, opt);
								  }
								: null,
						}),
						new div({
							display: "flex",
							justifycontent: "between",
							elem: [
								new button({
									weight: "sm",
									elem: "Reset password",
									onclick: (event) => {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceChild(container, fn.form.container(opt.id, fn.form.resetpass(opt)));
									},
								}),
								new button({
									weight: "sm",
									elem: "Sign up",
									onclick: (event) => {
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
		signup: (opt) => {
			return new container.form(
				[
					opt.close ? fn.closebtn(opt) : null,
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Sign up" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
					}),

					new input({
						before: new icon("at"),
						name: "email",
						type: "email",
						placeholder: "Email address",
						required: true,
						floatlabel: true,
						attr: {
							autocomplete: "off",
						},
						onchange: fn.action.inputchange,
					}),
					new input({
						before: new icon("key"),
						name: "password",
						type: "password",
						placeholder: "Password",
						required: true,
						minlengh: 8,
						attr: {
							autocomplete: "off",
						},
						onchange: fn.action.inputchange,
					}),
					new input({
						before: new icon("key"),
						name: "password2",
						type: "password",
						placeholder: "Repeat password",
						required: true,
						minlengh: 8,
						attr: {
							autocomplete: "off",
						},
						onchange: fn.action.inputchange,
					}),
					_ONTERM && typeof onterm === "function"
						? new div({
								elem: new small({
									textcolor: "muted",
									elem: [
										"By clicking the sign up button below, I hereby agree to and accept the following ",
										new a({
											href: "javascript:void(0);",
											onclick: _ONTERM,
											elem: "terms and conditions",
										}),
										" governing my use of this website",
									],
								}),
						  })
						: null,
					new container.grid([
						new button({
							label: "Sign up",
							icon: "arrow-up-from-bracket",
							color: "primary",
							onclick: !opt.debug
								? (event) => {
										fn.action.signup(event.currentTarget, opt);
								  }
								: null,
						}),
						new div({
							display: "flex",
							justifycontent: "between",
							elem: [
								new button({
									weight: "sm",
									elem: "Reset password",
									onclick: (event) => {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceChild(container, fn.form.container(opt.id, fn.form.resetpass(opt)));
									},
								}),
								new button({
									weight: "sm",
									elem: "Sign in",
									onclick: (event) => {
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
		resetpass: (opt) => {
			return new container.form(
				[
					opt.close ? fn.closebtn(opt) : null,
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Reset password" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
					}),

					new input({
						before: new icon("at"),
						name: "email",
						type: "email",
						placeholder: "Email address",
						required: true,
						attr: {
							autocomplete: "off",
						},
						onchange: fn.action.inputchange,
					}),

					new container.grid(
						[
							new button({
								label: "Send email",
								icon: "arrow-up-from-bracket",
								color: "primary",
								onclick: !opt.debug
									? (event) => {
											fn.action.resetpass(event.currentTarget, opt);
									  }
									: null,
							}),

							new div({
								display: "flex",
								justifycontent: "between",
								elem: [
									new button({
										weight: "sm",
										elem: "Sign in",
										onclick: (event) => {
											let sender = event.currentTarget;
											let container = sender.closest("form");
											core.replaceChild(
												container,
												fn.form.container(opt.id, fn.form.signin(opt))
											);
										},
									}),
									new button({
										weight: "sm",
										elem: "Sign up",
										onclick: (event) => {
											let sender = event.currentTarget;
											let container = sender.closest("form");
											core.replaceChild(
												container,
												fn.form.container(opt.id, fn.form.signup(opt))
											);
										},
									}),
								],
							}),
						].filter(Boolean)
					),
				].filter(Boolean)
			);
		},
		changepass: (opt) => {
			return new container.form(
				[
					opt.close ? fn.closebtn(opt) : null,
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Change password" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
					}),

					new input({
						before: new icon("key"),
						name: "oldpassword",
						type: "password",
						placeholder: "Old password",
						required: true,
						minlengh: 8,
						attr: {
							autocomplete: "off",
						},
						onchange: fn.action.inputchange,
					}),

					new input({
						before: new icon("key"),
						name: "password",
						type: "password",
						placeholder: "New password",
						required: true,
						minlengh: 8,
						attr: {
							autocomplete: "off",
						},
						onchange: fn.action.inputchange,
					}),

					new input({
						before: new icon("key"),
						name: "password2",
						type: "password",
						placeholder: "Repeat new password",
						required: true,
						minlengh: 8,
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
							onclick: !opt.debug
								? (event) => {
										fn.action.changepass(event.currentTarget, opt);
								  }
								: null,
						}),
						new div({
							display: "flex",
							justifycontent: "between",
							elem: [
								new button({
									weight: "sm",
									elem: "Update profile",
									onclick: (event) => {
										let sender = event.currentTarget;
										let container = sender.closest("form");

										fn.action.info(sender, (result) => {
											if (result) {
												opt.data = result;
												core.replaceChild(
													container,
													fn.form.container(opt.id, fn.form.updateinfo(opt, false))
												);
											}
										});
									},
								}),

								new button({
									weight: "sm",
									elem: "Sign out",
									onclick: (event) => {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										fn.action.signout(sender, () => {
											core.replaceChild(
												container,
												fn.form.container(opt.id, fn.form.signin(opt))
											);
										});
									},
								}),
							],
						}),
					]),
				].filter(Boolean)
			);
		},
		changepass_guest: (opt) => {
			return new container.form(
				[
					opt.close ? fn.closebtn(opt) : null,
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
						before: new icon("key"),
						name: "password",
						type: "password",
						placeholder: "New password",
						required: true,
						minlengh: 8,
						attr: {
							autocomplete: "off",
						},
						onchange: fn.action.inputchange,
					}),

					new input({
						before: new icon("key"),
						name: "password2",
						type: "password",
						placeholder: "Repeat new password",
						required: true,
						minlengh: 8,
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
							onclick: !opt.debug
								? (event) => {
										fn.action.changepass_guest(event.currentTarget, opt);
								  }
								: null,
						}),
						new div({
							display: "flex",
							justifycontent: "between",
							elem: [
								new button({
									weight: "sm",
									elem: "Sign in",
									onclick: (event) => {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceChild(container, fn.form.container(opt.id, fn.form.signin(opt)));
									},
								}),
								new button({
									weight: "sm",
									elem: "Reset password",
									onclick: (event) => {
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
		updateinfo: (opt) => {
			return new container.form(
				[
					opt.close ? fn.closebtn(opt) : null,
					!opt.img && opt.icon ? new icon(opt.icon) : opt.img ? null : new icon(defaultIcon),
					!opt.icon && opt.img ? new img(opt.img) : null,
					new h({ level: defaultTitleSize, marginy: 0, elem: opt.title ? opt.title : "Update info" }),

					new div({
						id: `${opt.id}-msg`,
						display: opt.msg ? null : "none",
						elem: fn.msg(opt.msg, "info"),
					}),

					new file({
						name: "picture",
						value: opt && opt.data ? opt.data.picture : null,
						uploadlabel: "Upload picture",
						uploadicon: "user",
						uploadcolor: "secondary",
						viewlabel: "View picture",
						viewicon: "user",
					}),

					new input({
						before: new icon("envelope"),
						name: "email",
						type: "email",
						placeholder: "Contact email",
						required: true,
						attr: {
							autocomplete: "off",
						},
						value: opt.data?.email,
						onchange: fn.action.inputchange,
					}),
					new input({
						before: new icon("tag"),
						name: "name",
						type: "text",
						placeholder: "Name",
						required: true,
						attr: {
							autocomplete: "off",
						},
						value: opt.data?.name,
						onchange: fn.action.inputchange,
					}),

					new container.grid([
						new button({
							label: "Update profile",
							icon: "arrow-up-from-bracket",
							color: "primary",
							onclick: !opt.debug
								? (event) => {
										fn.action.updateinfo(event.currentTarget, opt);
								  }
								: null,
						}),

						new div({
							display: "flex",
							justifycontent: "between",
							elem: [
								new button({
									weight: "sm",
									elem: "Change password",
									onclick: (event) => {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										core.replaceChild(
											container,
											fn.form.container(opt.id, fn.form.changepass(opt))
										);
									},
								}),

								new button({
									weight: "sm",
									elem: "Sign out",
									onclick: (event) => {
										let sender = event.currentTarget;
										let container = sender.closest("form");
										fn.action.signout(sender, () => {
											core.replaceChild(
												container,
												fn.form.container(opt.id, fn.form.signin(opt))
											);
										});
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

export function info(sender, callback) {
	fn.action.info(sender, callback);
}

export function signout(sender, callback) {
	fn.action.signout(sender, callback);
}

export function validate(token, callback) {
	fn.action.validate(token, callback);
}

export class signin extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultSignInOption, opt);
		opt.id = opt.id || core.UUID();

		if (opt.debug) {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.signin(opt))),
				debug: true,
			});
		} else {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.signin(opt))),
			});
		}
	}
}

export class signup extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultSignUpOption, opt);
		opt.id = opt.id || core.UUID();

		if (opt.debug) {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.signup(opt))),
				debug: true,
			});
		} else {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.signup(opt))),
			});
		}
	}
}

export class resetpass extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultResetPassOption, opt);
		opt.id = opt.id || core.UUID();

		if (opt.debug) {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.resetpass(opt))),
				debug: true,
			});
		} else {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.resetpass(opt))),
			});
		}
	}
}

export class changepass extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultChangePassOption, opt);
		opt.id = opt.id || core.UUID();

		if (opt.debug) {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.changepass(opt))),
				debug: true,
			});
		} else {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.changepass(opt))),
			});
		}
	}
}

export class changepass_guest extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultChangePassGuestOption, opt);
		opt.id = opt.id || core.UUID();

		if (opt.debug) {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.changepass_guest(opt))),
				debug: true,
			});
		} else {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.changepass_guest(opt))),
			});
		}
	}
}

export class updateinfo extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultUpdateInfoOption, opt);
		opt.id = opt.id || core.UUID();

		if (opt.debug) {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.updateinfo(opt))),
				debug: true,
			});
		} else {
			super({
				size: opt.size ? opt.size : _BANNER ? defaultSizeBanner : defaultSize,
				maxwidth: _BANNER ? defaultMaxWidth : defaultMaxWidthBanner,
				backdropcolor: opt.backdropcolor,
				elem: fn.banner(fn.form.container(opt.id, fn.form.updateinfo(opt))),
			});
		}
	}
}
