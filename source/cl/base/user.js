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
import * as dlg from "./dlg.js";
import * as alert from "./alert.js";
import btnclose from "./btnclose.js";
import file from "./file.js";
import a from "./a.js";
import small from "./small.js";
import tag from "./tag.js";

const defaultIconWeight = "4x";
const defaultIconColor = "primary";
const defaultSize = "md";
const defaultSizeBanner = "xl";
const defaultMaxWidth = null; //"420px";
const defaultMaxWidthBanner = null; //"720px";
const defaultTitleSize = 5;

let defaultSignInOption = {
	id: null,
	icon: null,
	msg: null,
	size: null,
	title: null,
	email: null,
	callback: null,
	close: true,
	backdropcolor: null,
	debug: false,
};

let defaultSignUpOption = {
	id: null,
	icon: null,
	msg: null,
	size: null,
	title: null,
	callback: null,
	close: true,
	backdropcolor: null,
	debug: false,
};

let defaultResetPassOption = {
	id: null,
	icon: null,
	msg: null,
	size: null,
	title: null,
	callback: null,
	close: true,
	backdropcolor: null,
	debug: false,
};

let defaultChangePassOption = {
	id: null,
	icon: null,
	msg: null,
	size: null,
	title: null,
	callback: null,
	close: true,
	debug: false,
};

let defaultChangePassGuestOption = {
	id: null,
	icon: null,
	msg: null,
	size: null,
	token: null,
	title: null,
	callback: null,
	close: true,
	backdropcolor: null,
	debug: false,
};

let defaultUpdateInfoOption = {
	id: null,
	icon: null,
	msg: null,
	size: null,
	token: null,
	title: null,
	callback: null,
	close: true,
	debug: false,
	data: null,
};

const fn = {
	banner: (type, elem) => {
		if (core.setting.banner && typeof core.setting.banner === "function") {
			return new div({
				row: true,
				elem: [
					new div({
						col: 8,
						display: ["none", "lg-block"],
						elem: new div({
							display: "flex",
							alignItem: "center",
							height: 100,
							elem: core.setting.banner(type),
						}),
					}),
					new div({
						col: [12, "lg-4"],
						elem: new div({
							display: "flex",
							alignItem: "center",
							height: 100,
							elem: elem,
						}),
					}),
				],
			});
		} else {
			return elem;
		}
	},
	header: (defaultTitle, opt) => {
		return [
			opt.icon ? new icon(opt.icon) : new icon(core.setting.icon(defaultIconColor, defaultIconWeight)),
			new tag({
				col: true,
				marginY: 0,
				elem: new small({
					textColor: "muted",
					elem: core.setting.title(),
				}),
			}),
			new tag({
				col: true,
				marginY: 0,
				elem: new h({ level: defaultTitleSize, marginY: 0, elem: opt.title ? opt.title : defaultTitle }),
			}),

			new tag({
				col: true,
				display: opt.msg ? "null" : "none",
				elem: new div({
					id: `${opt.id}_msg`,
					elem: fn.msg(opt.msg, "i"),
				}),
			}),
		].filter(Boolean);
	},
	msg: (msg, icon) => {
		return new alert.container({
			textAlign: "start",
			marginBottom: 0,
			icon: icon,
			elem: msg,
		});
	},
	showmsg: (container, msg, icon) => {
		let id = container.getAttribute("id");
		let msglabel = document.getElementById(`${id}_msg`);
		let msgcontainer = msglabel.parentElement;

		core.removeChildElement(msglabel);

		if (msg) {
			msgcontainer.classList.remove("d-none");
			core.appendChild(msglabel, fn.msg(msg, icon));
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
						width: 100,
						elem: new div({
							display: "flex",
							justifyContent: "end",
							elem: new btnclose({
								click: (event) => {
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
	modalbulder: (type, form, opt) => {
		return {
			title: null,
			icon: null,

			size: opt.size ? opt.size : core.setting.banner ? defaultSizeBanner : defaultSize,
			maxWidth: core.setting.banner ? defaultMaxWidth : defaultMaxWidthBanner,
			backdropcolor: opt.backdropcolor,
			elem: [opt.close ? fn.closebtn(opt) : null, fn.banner(type, fn.form.container(opt.id, form(opt)))].filter(
				Boolean
			),
		};
	},
	modalbodybuilder: (sender, type, form, opt) => {
		let container = sender.closest("div.modal-body");
		core.replaceWith(
			container,
			new div({
				class: "modal-body",
				elem: [opt.close ? fn.closebtn(opt) : null, fn.banner(type, fn.form.container(opt.id, form(opt)))],
			})
		);
	},
	action: {
		inputchange: (event) => {
			let sender = event.currentTarget;
			let container = sender.closest("form");
			fn.showmsg(container, null);
		},
		signout: (sender, callback) => {
			new dlg.confirmbox("!!", `Are you sure to <b>Sign out</b> now?`, [
				{
					label: "Yes",
					click: () => {
						db.user.signout(
							{
								sender: sender,
							},
							(result) => {
								callback(result);

								//event
								if (core.setting.userchange && typeof core.setting.userchange === "function") {
									fn.action.info_guest(sender, function (current_guest_info) {
										core.setting.userchange(current_guest_info);
									});
								}
							}
						);
					},
				},
				{
					label: "No",
				},
			]).show();
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

									//event
									if (core.setting.userchange && typeof core.setting.userchange === "function") {
										fn.action.info_guest(sender, function (current_guest_info) {
											core.setting.userchange(current_guest_info);
										});
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
											fn.showmsg(
												container,
												"Sign up success. Please check your email for validation.",
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
											fn.showmsg(
												container,
												"Password changed. Please use your new password next time you sign in.",
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
											fn.showmsg(
												container,
												"Password changed. Please use your new password to sign in.",
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
		info_guest: (sender, callback) => {
			db.user.info_guest(
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

											//event
											if (
												core.setting.userchange &&
												typeof core.setting.userchange === "function"
											) {
												fn.action.info_guest(sender, function (current_guest_info) {
													core.setting.userchange(current_guest_info);
												});
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
	//FORM
	form: {
		container: (id, elem) => {
			return new form({
				id: id,
				textAlign: "center",
				rowCol: 1,
				elem: elem.map((i) => {
					return new div({ col: true, elem: i });
				}),
			});
		},
		signin: (opt) => {
			return fn.header("Sign in", opt).concat(
				[
					new input({
						before: new icon("at"),
						name: "email",
						type: "email",
						placeholder: "Email address",
						required: true,
						autocomplete: "email",
						value: opt.email,
						change: fn.action.inputchange,
					}),
					new input({
						before: new icon("key"),
						name: "password",
						type: "password",
						placeholder: "Password",
						required: true,
						minlengh: 8,
						autocomplete: "current-password",
						change: fn.action.inputchange,
					}),
					new div({
						display: "flex",
						justifyContent: "center",
						elem: new input({ type: "checkbox", name: "remember", label: "Remember me" }),
					}),
					new container.grid([
						new button({
							label: "Sign in",
							weight: "lg",
							icon: "arrow-right-to-bracket",
							color: "primary",
							click: !opt.debug
								? (event) => {
										fn.action.signin(event.currentTarget, opt);
								  }
								: null,
						}),
						new div({
							display: "flex",
							justifyContent: "between",
							elem: [
								new button({
									weight: "sm",
									color: "transparent",
									elem: "Reset password",
									click: (event) => {
										let sender = event.currentTarget;
										fn.modalbodybuilder(sender, "resetpass", fn.form.resetpass, opt);
									},
								}),
								new button({
									weight: "sm",
									color: "transparent",
									elem: "Sign up",
									click: (event) => {
										let sender = event.currentTarget;
										fn.modalbodybuilder(sender, "signup", fn.form.signup, opt);
									},
								}),
							],
						}),
					]),
				].filter(Boolean)
			);
		},
		signup: (opt) => {
			return fn.header("Sign up", opt).concat(
				[
					new input({
						before: new icon("at"),
						name: "email",
						type: "email",
						placeholder: "Email address",
						required: true,
						floatlabel: true,
						autocomplete: "email",
						change: fn.action.inputchange,
					}),
					new input({
						before: new icon("key"),
						name: "password",
						type: "password",
						placeholder: "Password",
						required: true,
						minlengh: 8,
						autocomplete: "new-password",
						change: fn.action.inputchange,
					}),
					new input({
						before: new icon("key"),
						name: "password2",
						type: "password",
						placeholder: "Repeat password",
						required: true,
						minlengh: 8,
						autocomplete: "new-password",
						change: fn.action.inputchange,
					}),
					core.setting.term && typeof core.setting.term === "function"
						? new div({
								elem: new small({
									textColor: "muted",
									elem: [
										"By clicking sign up you are agreeing to the ",
										new a({
											href: "#",
											click: core.setting.term,
											elem: "Terms and Conditions",
										}),
										".",
									],
								}),
						  })
						: null,
					new container.grid([
						new button({
							label: "Sign up",
							weight: "lg",
							icon: "arrow-up-from-bracket",
							color: "primary",
							click: !opt.debug
								? (event) => {
										fn.action.signup(event.currentTarget, opt);
								  }
								: null,
						}),
						new div({
							display: "flex",
							justifyContent: "between",
							elem: [
								new button({
									weight: "sm",
									color: "transparent",
									elem: "Reset password",
									click: (event) => {
										let sender = event.currentTarget;
										fn.modalbodybuilder(sender, "resetpass", fn.form.resetpass, opt);
									},
								}),
								new button({
									weight: "sm",
									color: "transparent",
									elem: "Sign in",
									click: (event) => {
										let sender = event.currentTarget;
										fn.modalbodybuilder(sender, "signin", fn.form.signin, opt);
									},
								}),
							],
						}),
					]),
				].filter(Boolean)
			);
		},
		resetpass: (opt) => {
			return fn.header("Reset password", opt).concat(
				[
					new input({
						before: new icon("at"),
						name: "email",
						type: "email",
						placeholder: "Email address",
						required: true,
						autocomplete: "email",
						change: fn.action.inputchange,
					}),

					new container.grid(
						[
							new button({
								label: "Send email",
								weight: "lg",
								icon: "arrow-up-from-bracket",
								color: "primary",
								click: !opt.debug
									? (event) => {
											fn.action.resetpass(event.currentTarget, opt);
									  }
									: null,
							}),

							new div({
								display: "flex",
								justifyContent: "between",
								elem: [
									new button({
										weight: "sm",
										color: "transparent",
										elem: "Sign in",
										click: (event) => {
											let sender = event.currentTarget;
											fn.modalbodybuilder(sender, "signin", fn.form.signin, opt);
										},
									}),
									new button({
										weight: "sm",
										color: "transparent",
										elem: "Sign up",
										click: (event) => {
											let sender = event.currentTarget;
											fn.modalbodybuilder(sender, "signup", fn.form.signup, opt);
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
			return fn.header("Change password", opt).concat(
				[
					new input({
						before: new icon("key"),
						name: "oldpassword",
						type: "password",
						placeholder: "Old password",
						required: true,
						minlengh: 8,
						autocomplete: "current-password",
						change: fn.action.inputchange,
					}),

					new input({
						before: new icon("key"),
						name: "password",
						type: "password",
						placeholder: "New password",
						required: true,
						minlengh: 8,
						autocomplete: "new-password",
						change: fn.action.inputchange,
					}),

					new input({
						before: new icon("key"),
						name: "password2",
						type: "password",
						placeholder: "Repeat new password",
						required: true,
						minlengh: 8,
						autocomplete: "new-password",
						change: fn.action.inputchange,
					}),

					new container.grid([
						new button({
							label: "Change password",
							weight: "lg",
							icon: "floppy-disk",
							color: "primary",
							click: !opt.debug
								? (event) => {
										fn.action.changepass(event.currentTarget, opt);
								  }
								: null,
						}),
						new div({
							display: "flex",
							justifyContent: "between",
							elem: [
								new button({
									weight: "sm",
									color: "transparent",
									elem: "Update profile",
									click: (event) => {
										let sender = event.currentTarget;

										fn.action.info(sender, (result) => {
											if (result) {
												opt.data = result;
												fn.modalbodybuilder(sender, "updateinfo", fn.form.updateinfo, opt);
											}
										});
									},
								}),

								new button({
									weight: "sm",
									color: "transparent",
									elem: "Sign out",
									click: (event) => {
										let sender = event.currentTarget;

										fn.action.signout(sender, () => {
											fn.modalbodybuilder(sender, "signin", fn.form.signin, opt);
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
			return fn.header("Change password", opt).concat(
				[
					new tag({
						col: true,
						display: "none",
						elem: new input({
							name: "token",
							type: "hidden",
							value: opt.token,
						}),
					}),

					new input({
						before: new icon("key"),
						name: "password",
						type: "password",
						placeholder: "New password",
						required: true,
						minlengh: 8,
						autocomplete: "new-password",
						change: fn.action.inputchange,
					}),

					new input({
						before: new icon("key"),
						name: "password2",
						type: "password",
						placeholder: "Repeat new password",
						required: true,
						minlengh: 8,
						autocomplete: "new-password",
						change: fn.action.inputchange,
					}),

					new container.grid([
						new button({
							label: "Change password",
							weight: "lg",
							icon: "floppy-disk",
							color: "primary",
							click: !opt.debug
								? (event) => {
										fn.action.changepass_guest(event.currentTarget, opt);
								  }
								: null,
						}),
						new div({
							display: "flex",
							justifyContent: "between",
							elem: [
								new button({
									weight: "sm",
									color: "transparent",
									elem: "Sign in",
									click: (event) => {
										let sender = event.currentTarget;
										fn.modalbodybuilder(sender, "signin", fn.form.signin, opt);
									},
								}),
								new button({
									weight: "sm",
									color: "transparent",
									elem: "Reset password",
									click: (event) => {
										let sender = event.currentTarget;
										fn.modalbodybuilder(sender, "resetpass", fn.form.resetpass, opt);
									},
								}),
							],
						}),
					]),
				].filter(Boolean)
			);
		},
		updateinfo: (opt) => {
			return fn.header("Update info", opt).concat(
				[
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
						autocomplete: "email",
						value: opt.data?.email,
						change: fn.action.inputchange,
					}),
					new input({
						before: new icon("tag"),
						name: "name",
						type: "text",
						placeholder: "Name",
						required: true,
						autocomplete: "username",
						value: opt.data?.name,
						change: fn.action.inputchange,
					}),

					new container.grid([
						new button({
							label: "Update profile",
							weight: "lg",
							icon: "arrow-up-from-bracket",
							color: "primary",
							click: !opt.debug
								? (event) => {
										fn.action.updateinfo(event.currentTarget, opt);
								  }
								: null,
						}),

						new div({
							display: "flex",
							justifyContent: "between",
							elem: [
								new button({
									weight: "sm",
									color: "transparent",
									elem: "Change password",
									click: (event) => {
										let sender = event.currentTarget;
										fn.modalbodybuilder(sender, "changepass", fn.form.changepass, opt);
									},
								}),

								new button({
									weight: "sm",
									color: "transparent",
									elem: "Sign out",
									click: (event) => {
										let sender = event.currentTarget;
										fn.modalbodybuilder(sender, "signout", fn.form.signout, opt);
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

export function info_guest(sender, callback) {
	fn.action.info_guest(sender, callback);
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

		let d = fn.modalbulder("signin", fn.form.signin, opt);

		if (opt.debug) {
			d.debug = true;
		}

		super(d);
	}
}

export class signup extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultSignUpOption, opt);
		opt.id = opt.id || core.UUID();

		let d = fn.modalbulder("signup", fn.form.signup, opt);

		if (opt.debug) {
			d.debug = true;
		}

		super(d);
	}
}

export class resetpass extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultResetPassOption, opt);
		opt.id = opt.id || core.UUID();

		let d = fn.modalbulder("resetpass", fn.form.resetpass, opt);

		if (opt.debug) {
			d.debug = true;
		}

		super(d);
	}
}

export class changepass extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultChangePassOption, opt);
		opt.id = opt.id || core.UUID();

		let d = fn.modalbulder("changepass", fn.form.changepass, opt);

		if (opt.debug) {
			d.debug = true;
		}

		super(d);
	}
}

export class changepass_guest extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultChangePassGuestOption, opt);
		opt.id = opt.id || core.UUID();

		let d = fn.modalbulder("changepass_guest", fn.form.changepass_guest, opt);

		if (opt.debug) {
			d.debug = true;
		}

		super(d);
	}
}

export class updateinfo extends modal {
	constructor(opt) {
		opt = core.extend({}, defaultUpdateInfoOption, opt);
		opt.id = opt.id || core.UUID();

		let d = fn.modalbulder("updateinfo", fn.form.updateinfo, opt);

		if (opt.debug) {
			d.debug = true;
		}

		super(d);
	}
}
