"use strict";
import * as core from "./base/core.js";
import * as cl from "./base/cl.js";
import div from "./base/div.js";
import example from "./base/example.js";
import * as table from "./base/table.js";
import * as navbar from "./base/navbar.js";
import menu from "./base/menu.js";
import toc from "./base/toc.js";
import code from "./base/code.js";
import msg from "./base/msg.js";

import doc_intro from "./doc/intro.js";

import doc_container from "./doc/container.js";
import doc_grid from "./doc/grid.js";
import doc_column from "./doc/column.js";
import doc_gutter from "./doc/gutter.js";

import doc_formcontrol from "./doc/formcontrol.js";
import doc_select from "./doc/select.js";
import doc_checkradio from "./doc/checkradio.js";
import doc_range from "./doc/range.js";
import doc_inputgroup from "./doc/inputgroup.js";
import doc_floatinglabel from "./doc/floatinglabel.js";

import * as sample from "./doc/sample.js";
import doc_button from "./doc/button.js";
import doc_accordion from "./doc/accordion.js";
import doc_alert from "./doc/alert.js";
import doc_badge from "./doc/badge.js";
import doc_breadcrumb from "./doc/breadcrumb.js";
import doc_btngroup from "./doc/btngroup.js";
import doc_card from "./doc/card.js";
import doc_carousel from "./doc/carousel.js";
import doc_btnclose from "./doc/btnclose.js";
import doc_collapse from "./doc/collapse.js";
import doc_dropdown from "./doc/dropdown.js";
import doc_listgroup from "./doc/listgroup.js";
import doc_modal from "./doc/modal.js";
import doc_tab from "./doc/tab.js";
import doc_navbar from "./doc/navbar.js";
import doc_offcanvas from "./doc/offcanvas.js";
import doc_paging from "./doc/paging.js";
import doc_popover from "./doc/popover.js";
import doc_progress from "./doc/progress.js";
import doc_toast from "./doc/toast.js";
import doc_tooltip from "./doc/tooltip.js";

import doc_icon from "./doc/icon.js";

const def_m1 = "Getting started";
const def_m2 = "Introduction";
const def_theme = "pulse";

const db_menu = [
	{
		type: "menu",
		title: "Getting started",
		item: [{ title: "Introduction", source: doc_intro }],
	},
	{
		type: "menu",
		title: "Layout",
		item: [
			{ title: "Containers", source: doc_container },
			{ title: "Grid", source: doc_grid },
			{ title: "Column", source: doc_column },
			{ title: "Gutter", source: doc_gutter },
		],
	},
	{
		type: "menu",
		title: "Forms",
		item: [
			{ title: "Form control", source: doc_formcontrol },
			{ title: "Select", source: doc_select },
			{ title: "Check & radios", source: doc_checkradio },
			{ title: "Range", source: doc_range },
			{ title: "Input group", source: doc_inputgroup },
			{ title: "Floating label", source: doc_floatinglabel },
		],
	},
	{
		type: "menu",
		title: "Components",
		item: [
			{ title: "Accordion", source: doc_accordion },
			{ title: "Alert", source: doc_alert },
			{ title: "Badge", source: doc_badge },
			{ title: "Breadcrumb", source: doc_breadcrumb },
			{ title: "Button", source: doc_button },
			{ title: "Button group", source: doc_btngroup },
			{ title: "Card", source: doc_card },
			{ title: "Carosel", source: doc_carousel },
			{ title: "Close button", source: doc_btnclose },
			{ title: "Collapse", source: doc_collapse },
			{ title: "Dropdown", source: doc_dropdown },
			{ title: "List group", source: doc_listgroup },
			{ title: "Modal", source: doc_modal },
			{ title: "Tab", source: doc_tab },
			{ title: "Navbar", source: doc_navbar },
			{ title: "Offcanvas", source: doc_offcanvas },
			{ title: "Paging", source: doc_paging },
			{ title: "Popover", source: doc_popover },
			{ title: "Progress", source: doc_progress },
			{ title: "Toast", source: doc_toast },
			{ title: "Tooltips", source: doc_tooltip },
		],
	},
	{
		type: "menu",
		title: "Extra",
		item: [
			{ title: "Icon", source: doc_icon },
			{ title: "Menu", source: null },
			{ title: "Table of content", source: null },
			{ title: "Pill", source: null },
			{ title: "Example", source: null },
			{ title: "Label", source: null },
			{ title: "Msg", source: null },
			{ title: "Table", source: null },
		],
	},
	{
		type: "menu",
		title: "Basic",
		item: [
			{ title: "Tag", source: null },
			{ title: "Anchor", source: null },
			{ title: "Bold", source: null },
			{ title: "Code", source: null },
			{ title: "Div", source: null },
			{ title: "Form", source: null },
			{ title: "Header", source: null },
			{ title: "Horizontal line", source: null },
			{ title: "Image", source: null },
			{ title: "La", source: null },
			{ title: "List item", source: null },
			{ title: "Navigation", source: null },
			{ title: "Ordered list", source: null },
			{ title: "Paragraph", source: null },
			{ title: "Pre", source: null },
			{ title: "Small", source: null },
			{ title: "Span", source: null },
			{ title: "Strong", source: null },
			{ title: "Unordered list", source: null },
		],
	},
	{
		type: "navigate",
		title: "Others",
		item: [{ title: "Sandbox", source: "sandbox.html" }],
	},
	{
		type: "action",
		title: "Action",
		item: [
			{
				title: "Memory Test 10",
				source: function (event) {
					startmemoryleaktest(event.currentTarget, 10);
				},
			},
			{
				title: "Memory Test 100",
				source: function (event) {
					startmemoryleaktest(event.currentTarget, 100);
				},
			},
			{
				title: "Memory Test 1000",
				source: function (event) {
					startmemoryleaktest(event.currentTarget, 1000);
				},
			},
			{
				title: "Memory Test 5000",
				source: function (event) {
					startmemoryleaktest(event.currentTarget, 5000);
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

function startmemoryleaktest(sender, limit) {
	if (memoryleaktestrun === true) {
		memoryleaktestrun = false;
	} else {
		sender.classList.add("active");
		memoryleaktestrun = true;
		memoryleaktest(
			0,
			limit,
			function (i, l) {
				if (i === l || memoryleaktestrun === false) {
					sender.innerText = `Memory Test ${l}`;
				} else {
					sender.innerText = `Memory Test ${parseInt((i / l) * 100, 10)}%`;
				}
			},
			function () {
				sender.classList.remove("active");
				cl.init(document.getElementById("root"));
				PR.prettyPrint();
			}
		);
	}
}

let memoryleaktestrun = false;
let ix1 = 0;
let ix2 = 0;
function memoryleaktest(index, limit, progressupdate, callback) {
	if (index < limit && memoryleaktestrun === true) {
		progressupdate(index, limit);

		let process = true;
		if (db_menu[ix1].type === "menu") {
			if (ix2 >= db_menu[ix1].item.length) {
				ix1 = ix1 + 1;
				ix2 = 0;
				process = false;
			}
		} else {
			ix1 = 0;
			ix2 = 0;
			process = false;
		}

		if (process) {
			gen_content(db_menu[ix1].title, db_menu[ix1].item[ix2].title, function () {
				if (index >= limit) {
					callback();
				} else {
					ix2 = ix2 + 1;
					memoryleaktest(index + 1, limit, progressupdate, callback);
				}
			});
		} else {
			memoryleaktest(index, limit, progressupdate, callback);
		}
	} else {
		memoryleaktestrun = false;
		progressupdate(index, limit);
		callback();
	}
}

function gen_example(opt) {
	opt = core.extend(
		{},
		{
			id: null,
			anchor: true,
			title: null,
			msg: null,
			dark: false,
			viewclass: null,
			option: null,
			code: null,
			sample: null,
			container: function (elem) {
				return elem;
			},
		},
		opt
	);

	opt.id = opt.id || core.UUID();

	opt.msg = opt.msg ? (Array.isArray(opt.msg) ? opt.msg : [opt.msg]) : null;

	let m = null;

	if (opt.msg) {
		m = [];
		opt.msg.forEach(function (i) {
			m.push(i);
		});
	}

	if (opt.option) {
		if (m === null) {
			m = [];
		}

		Object.keys(opt.option).forEach(function (optionName) {
			m.push(
				new table.container({
					item: opt.option[optionName],
				})
			);
		});
	}

	return new example({
		id: opt.id,
		anchor: opt.anchor,
		title: opt.title,
		msg: m,
		dark: opt.dark,
		viewclass: opt.viewclass,
		beautifyjs: beautifyjs,
		beautifyhtml: beautifyhtml,
		container: opt.container,
		code: opt.code,
		sample: opt.sample,
	});
}

function beautifyjs(str) {
	return js_beautify(str, {
		preserve_newlines: true,
		max_preserve_newlines: 100,
		keep_array_indentation: false,
		brace_style: "collapse,preserve-inline",
	});
}

function beautifyhtml(str) {
	str = str.replace(/\>/g, ">\n");
	str = str.replace(/\</g, "\n<");
	str = str.replace(/\n\n/g, "\n");
	return html_beautify(str, {
		indent_inner_html: true,
		indent_size: 4,
	});
}

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
				//=============
				//LOADER TYPE 1
				//=============
				setTimeout(
					function (m, callback) {
						let p = function (m) {
							return new Promise(function (res, rej) {
								try {
									let processtimestart = window.performance.now();

									sample.resetindex();
									cl.replaceChild(
										document.getElementById("root"),
										new div({
											marginBottom: 3,
											elem: m.source.map(function (i) {
												return gen_example(i);
											}),
										})
									);

									let processtimeend = window.performance.now();

									gen_toc();

									//count pagespeed
									document.getElementById("pagespeed").innerText = `${(
										processtimeend - processtimestart
									).toFixed(2)} ms`;

									//count page weight
									document.getElementById("pageweight").innerText = `${core.countElement(
										document.getElementById("root")
									)} items`;

									res();
								} catch (ex) {
									rej(ex);
								}
							});
						};
						p(m)
							.then(function () {
								if (callback instanceof Function) {
									callback();
								}
							})
							.catch(function (ex) {
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

				//=============
				//LOADER TYPE 2
				//=============
				// setTimeout(
				// 	function (m, callback) {
				// 		sample.resetindex();
				// 		cl.replaceChild(
				// 			document.getElementById("root"),
				// 			new div({
				// 				marginBottom: 3,
				// 				elem: m.source.map(function (i) {
				// 					return gen_example(i);
				// 				}),
				// 			})
				// 		);

				// 		gen_toc();

				// 		if (callback instanceof Function) {
				// 			callback();
				// 		}
				// 	},
				// 	0,
				// 	m,
				// 	callback
				// );

				//=============
				//LOADER TYPE 3
				//=============
				// sample.resetindex();
				// cl.replaceChild(
				// 	document.getElementById("root"),
				// 	new div({
				// 		marginBottom: 3,
				// 		elem: m.source.map(function (i) {
				// 			return gen_example(i);
				// 		}),
				// 	})
				// );

				// gen_toc();

				// if (callback instanceof Function) {
				// 	callback();
				// }
			} else {
				cl.replaceChild(
					document.getElementById("root"),
					new div({
						marginBottom: 3,
						elem: new msg({
							weight: "lg",
							icon: "!",
							elem: `Documentation for <b>${m1}</b> - <b>${m2}</b> not yet available`,
						}),
					})
				);

				gen_toc();

				if (callback instanceof Function) {
					callback();
				}
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
	let cltheme = document.getElementById("nstheme");
	if (theme) {
		cltheme.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.1.1/dist/${theme}/bootstrap.min.css`;
		cltheme.removeAttribute("disabled");
	} else {
		cltheme.setAttribute("disabled", "disabled");
	}
}

function gen_toc() {
	let li = [];
	let anchor = [].slice.call(document.getElementById("root").getElementsByClassName("anchorjs-link"));
	if (anchor && anchor.length > 0) {
		cl.replaceChild(
			document.getElementById("nextbar"),
			new toc({
				label: "On this page",
				item: anchor.map(function (i) {
					let parent = i.parentElement;
					let id = parent.id;
					return {
						label: parent.innerText,
						attr: { "cl-target-id": id },
						onclick: function (event) {
							let sender = event.currentTarget;
							let id = sender.getAttribute("cl-target-id");
							core.focusElement(document.getElementById(id));
						},
						level: parent.nodeName === "H3" ? 1 : 0,
					};
				}),
			})
		);
	} else {
		cl.replaceChild(document.getElementById("nextbar"), null);
	}
}

function gen_menu(m1, m2, theme) {
	return db_menu.map(function (i) {
		return new menu({
			label: i.title,
			active: i.title === m1,
			item: i.item.map(function (j) {
				return {
					label: j.title,
					active: j.title === m2 || (i.type === "theme" && j.source === theme),
					attr: {
						"cl-m1": i.title,
						"cl-m2": j.title,
						"cl-m3": i.type,
					},
					onclick:
						i.type !== "action"
							? function (event) {
									let sender = event.currentTarget;

									let m1 = sender.getAttribute("cl-m1");
									let m2 = sender.getAttribute("cl-m2");
									let m3 = sender.getAttribute("cl-m3");

									let activeItem = [].slice.call(
										document.getElementById("sidebar").getElementsByClassName("active")
									);

									activeItem.forEach(function (i) {
										if (i.getAttribute("cl-m3") === m3) {
											i.classList.remove("active");
										}
									});

									sender.classList.add("active");

									if (i.type === "menu") {
										sender.innerText = "Loading...";
										gen_content(m1, m2, function () {
											cl.init(document.getElementById("root"));
											PR.prettyPrint();
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

//test upload from laptop
core.documentReady(() => {
	//topbar
	cl.replaceChild(
		document.getElementById("navbar"),
		new navbar.container({
			color: "primary",
			textcolor: "light",
			expand: "lg",
			body: { fluid: "lg" },
			elem: [
				new navbar.toggle({
					target: `#sidebar`,
					toggle: "collapse",
				}),
				new navbar.brand({ label: "cl", icon: "fire" }),
			],
		})
	);

	//sidebar
	cl.replaceChild(
		document.getElementById("sidebar"),
		new div({
			elem: gen_menu(def_m1, def_m2, def_theme),
		})
	);

	//nextbar
	cl.replaceChild(
		document.getElementById("nextbar"),
		new div({
			elem: "Loading...",
		})
	);

	gen_content(def_m1, def_m2, function () {
		cl.init(document.getElementById("root"));
		PR.prettyPrint();
	});

	set_theme(def_theme);

	cl.init(document.body);
});
