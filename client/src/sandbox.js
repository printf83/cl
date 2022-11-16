"use strict";

import * as core from "./cl/base/core.js";
import div from "./cl/base/div.js";
import * as layout from "./cl/base/layout.js";
import menu from "./cl/base/menu.js";
import * as navbar from "./cl/base/navbar.js";
import tag from "./cl/base/tag.js";
import toast from "./cl/base/toast.js";
import toc from "./cl/base/toc.js";
import * as user from "./cl/base/user.js";

// const sb = {
// 	customer: "./sandbox/customer.js",
// 	state: "./sandbox/state.js",
// };

const sb = {
	customer: "customer",
	state: "state",
};

function genPromiseSource(source) {
	switch (source) {
		case "customer":
			return import(/* webpackChunkName: "customer" */ "./sandbox/customer.js");
			break;
		default:
			return import(/* webpackChunkName: "state" */ "./sandbox/state.js");
			break;
	}
}

const db_menu = [
	{
		type: "menu",
		title: "Main",
		item: [
			{ title: "Customer", source: sb.customer },
			{ title: "State", source: sb.state },
		],
	},
	{
		type: "navigate",
		title: "Others",
		item: [
			{ title: "Documentation", source: "index.html" },
			{ title: "Test", source: "test.html" },
		],
	},
	{
		type: "action",
		title: "User",
		item: [
			{
				title: "Update Profile",
				source: (event) => {
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
			},
			{
				title: "Change Password",
				source: (event) => {
					new user.changepass({
						callback: (result) => {
							if (result) {
								new toast("/", "Password changed").show();
							}
						},
					}).show();
				},
			},
			{
				title: "Sign Out",
				source: (event) => {
					user.signout(event.currentTarget, (result) => {
						if (result) {
							new toast("/", "User successfuly sign out").show();
						} else {
							new toast("!!", "User failed sign out").show();
						}
					});
				},
			},
		],
	},
	{
		type: "theme",
		title: "Theme",
		item: [
			{ title: "Default", source: null },
			{ title: "Cerulean (L|G)", source: "cerulean" },
			{ title: "Cosmo (L|S)", source: "cosmo" },
			{ title: "Cyborg (D|S)", source: "cyborg" },
			{ title: "Darkly (D|S)", source: "darkly" },
			{ title: "Flatly (L|S)", source: "flatly" },
			{ title: "Journal (L|S)", source: "journal" },
			{ title: "Litera (L|S)", source: "litera" },
			{ title: "Lumen (L|S)", source: "lumen" },
			{ title: "Lux (L|S)", source: "lux" },
			{ title: "Materia (L|G)", source: "materia" },
			{ title: "Minty (L|S)", source: "minty" },
			{ title: "Morph (L|G)", source: "morph" },
			{ title: "Pulse (L|S)", source: "pulse" },
			{ title: "Quartz (D|G)", source: "quartz" },
			{ title: "Sandstone (L|S)", source: "sandstone" },
			{ title: "Simplex (L|G)", source: "simplex" },
			{ title: "Sketchy (L|S)", source: "sketchy" },
			{ title: "Slate (D|G)", source: "slate" },
			{ title: "Solar (D|S)", source: "solar" },
			{ title: "Spacelab (L|G)", source: "spacelab" },
			{ title: "Superhero (D|S)", source: "superhero" },
			{ title: "United (L|S)", source: "united" },
			{ title: "Vapor (D|G)", source: "vapor" },
			{ title: "Yeti (L|S)", source: "yeti" },
			{ title: "Zephyr (L|S)", source: "zephyr" },
		],
	},
];

let def_m1 = "Main";
let def_m2 = "Customer";
let def_theme = null;

function find_menu(m1, m2) {
	let m1_index = db_menu.findIndex((i) => i.title === m1);
	if (m1_index > -1) {
		let m2_index = db_menu[m1_index].item.findIndex((i) => i.title === m2);
		if (m2_index > -1) {
			return {
				type: db_menu[m1_index].type,
				source: db_menu[m1_index].item[m2_index].source,
			};
		}
	}

	return null;
}

function gen_content(m1, m2, callback) {
	let m = find_menu(m1, m2);
	if (m) {
		if (m.type === "menu") {
			if (m.source) {
				core.replaceChild(
					document.getElementById("root"),
					new div({
						elem: "Loading...",
					})
				);
				core.replaceChild(
					document.getElementById("nextbar"),
					new div({
						elem: "",
					})
				);

				setTimeout(
					(m, callback) => {
						let p = (m) => {
							return new Promise((res, rej) => {
								try {
									//async import doc source

									// core.importJS(m.source, (m_source) => {
									core.importJSPromise(genPromiseSource(m.source), (m_source) => {
										m_source.main((elem) => {
											core.replaceChild(
												document.getElementById("root"),
												new div({
													elem: elem,
												})
											);

											if (m_source.menu) {
												core.replaceChild(
													document.getElementById("nextbar"),
													new toc({
														label: m_source.name,
														item: m_source.menu,
													})
												);
											} else {
												core.removeChildElement(document.getElementById("nextbar"));
											}

											if (m_source.load) {
												m_source.load();
											}

											gen_url(m1, m2);

											res();
										});
									});
								} catch (ex) {
									rej(ex);
								}
							});
						};
						p(m)
							.then(() => {
								if (callback instanceof Function) {
									callback();
								}
							})
							.catch((ex) => {
								console.error(ex);
								if (callback instanceof Function) {
									callback();
								}
							});
					},
					0,
					m,
					callback
				);
			}
		} else if (m.type === "navigate") {
			window.location = m.source;
		} else if (m.type === "action") {
			m.source();
		} else if (m.type === "theme") {
			set_theme(m.source);
		} else {
			console.warn("Unsupported type", m);
		}
	}
}

function set_theme(theme) {
	core.setting.theme = theme;
}

function gen_url(m1, m2) {
	let title = `${core.setting.title()} - ${m1} | ${m2}`;
	let path = `?m1=${encodeURIComponent(m1)}&m2=${encodeURIComponent(m2)}`;
	let data = `${m1}.${m2}`;

	window.history.pushState(data, title, path);
	document.title = title;
}

function get_url() {
	let p = new URLSearchParams(window.location.search);

	let m1 = p.get("m1");
	let m2 = p.get("m2");
	return m1 && m2
		? {
				m1: decodeURIComponent(m1),
				m2: decodeURIComponent(m2),
		  }
		: null;
}

function gen_menu(m1, m2, theme) {
	return db_menu.map((i) => {
		return new menu({
			label: i.title,
			active: i.title === m1,
			item: i.item.map((j) => {
				return {
					label: j.title,
					active: j.title === m2 || (i.type === "theme" && j.source === theme),
					"cl-m1": i.title,
					"cl-m2": j.title,
					"cl-m3": i.type,
					click:
						i.type !== "action"
							? (event) => {
									let sender = event.currentTarget;

									let m1 = sender.getAttribute("cl-m1");
									let m2 = sender.getAttribute("cl-m2");
									let m3 = sender.getAttribute("cl-m3");

									let activeItem = [].slice.call(
										document.getElementById("sidebar").getElementsByClassName("active")
									);

									activeItem.forEach((i) => {
										if (i.getAttribute("cl-m3") === m3) {
											i.classList.remove("active");
										}
									});

									sender.classList.add("active");

									if (i.type === "menu") {
										sender.innerText = "Loading...";
										gen_content(m1, m2, () => {
											core.init(document.getElementById("root"));
											sender.innerText = m2;
										});
									} else {
										gen_content(m1, m2);
									}
							  }
							: j.source,
				};
			}),
		});
	});
}

core.documentReady(() => {
	//set def_m1 and m2
	let m = get_url();
	if (m && m.m1 !== "undefined" && m.m2 !== "undefined") {
		def_m1 = m.m1;
		def_m2 = m.m2;
	}

	def_theme = core.setting.theme;

	core.replaceWith(
		document.getElementById("main"),
		new layout.l1({
			topid: "navbar",
			leftid: "sidebar",
			rightid: "nextbar",
			mainid: "root",

			topelem: new navbar.container({
				dark: true,
				color: "primary",
				expand: "lg",
				body: { fluid: "lg" },
				elem: [
					new navbar.toggle({
						target: `#sidebar`,
						toggle: "collapse",
					}),
					new navbar.brand({ label: core.setting.title(), icon: core.setting.icon() }),
				],
			}),
			leftelem: new tag({
				class: ["sticky-md-top", "collapse", "navbar-collapse", "cl-vh-menu"],
				overflow: "auto",
				display: "md-block",
				marginTop: 3,
				elem: gen_menu(def_m1, def_m2, def_theme),
			}),
			rightelem: new tag({
				class: ["sticky-lg-top", "cl-vh-menu"],
				overflow: "auto",
				marginTop: 3,
				elem: "",
			}),
			footerelem: new div({
				display: "flex",
				flex: "wrap",
				justifyContent: "center",
				marginBottom: 5,
				gap: 2,
				elem: null,
			}),

			backtotop: false,
		})
	);

	gen_content(def_m1, def_m2, () => {
		core.init(document.getElementById("root"));
	});

	core.setting.theme = core.setting.theme;

	core.init(document.body);
});
