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
import * as dlg from "./base/dlg.js";

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

const def_m1 = "Components";
const def_m2 = "Modal";
const def_theme = "journal";

const db_menu = [
	{
		type: "menu",
		title: "Getting started",
		item: [{ title: "Introduction", source: null }],
	},
	{
		type: "menu",
		title: "Layout",
		item: [
			{ title: "Containers", source: null },
			{ title: "Grid", source: null },
			{ title: "Column", source: null },
			{ title: "Gutter", source: null },
		],
	},
	{
		type: "menu",
		title: "Forms",
		item: [
			{ title: "Form control", source: null },
			{ title: "Select", source: null },
			{ title: "Check & radios", source: null },
			{ title: "Range", source: null },
			{ title: "Input group", source: null },
			{ title: "Floating label", source: null },
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
			{ title: "Tab", source: null },
			{ title: "Navbar", source: null },
			{ title: "Offcanvas", source: null },
			{ title: "Paging", source: null },
			{ title: "Popover", source: null },
			{ title: "Progress", source: null },
			{ title: "Spinners", source: null },
			{ title: "Toast", source: null },
			{ title: "Tooltips", source: null },
		],
	},
	{
		type: "menu",
		title: "Extend",
		item: [{ title: "Icon", source: null }],
	},
	{
		type: "navigate",
		title: "Others",
		item: [{ title: "Sandbox", source: "sandbox.html" }],
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

function gen_example(opt) {
	opt = core.extend(
		{},
		{
			id: null,
			anchor: true,
			title: null,
			msg: null,
			dark: false,
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

	let m = opt.msg ? (Array.isArray(opt.msg) ? opt.msg : [opt.msg]) : [];

	if (opt.option) {
		Object.keys(opt.option).forEach((optionName) => {
			m.push(
				new table.container({
					caption: optionName,
					captiontop: true,
					item: opt.option[optionName].map(function (i, ix) {
						if (ix > 0) {
							i[0] = { elem: new code({ elem: i[0] }) };
							return i;
						} else {
							return i;
						}
					}),
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

function gen_content(m1, m2) {
	let m = find_menu(m1, m2);
	if (m) {
		if (m.type === "menu") {
			if (m.source) {
				setTimeout(
					function (m) {
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

						cl.init(document.getElementById("root"));
						PR.prettyPrint();

						gen_toc();
					},
					1,
					m
				);
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
			}
		} else if (m.type === "navigate") {
			window.location = m.source;
		} else if (m.type === "theme") {
			let cltheme = document.getElementById("nstheme");
			if (m.source) {
				cltheme.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.1.1/dist/${m.source}/bootstrap.min.css`;
				cltheme.removeAttribute("disabled");
			} else {
				cltheme.setAttribute("disabled", "disabled");
			}
		} else {
			console.warn("Unsupported type", m);
		}
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
					onclick: function (event) {
						let sender = event.currentTarget;

						let m1 = sender.getAttribute("cl-m1");
						let m2 = sender.getAttribute("cl-m2");
						let m3 = sender.getAttribute("cl-m3");

						gen_content(m1, m2);

						let activeItem = [].slice.call(
							document.getElementById("sidebar").getElementsByClassName("active")
						);

						activeItem.forEach(function (i) {
							if (i.getAttribute("cl-m3") === m3) {
								i.classList.remove("active");
							}
						});

						sender.classList.add("active");
					},
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

	gen_content(def_m1, def_m2);
});
