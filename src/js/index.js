"use strict";

// import "../css/sample.css";

import sample from "./doc/sample.js";
import doc from "./doc.js";
import a from "./base/a.js";
import * as core from "./base/core.js";
import div from "./base/div.js";
import example from "./base/example.js";
import * as layout from "./base/layout.js";
import menu from "./base/menu.js";
import msg from "./base/msg.js";
import * as navbar from "./base/navbar.js";
import pill from "./base/pill.js";
import small from "./base/small.js";
import * as table from "./base/table.js";
import tag from "./base/tag.js";
import toc from "./base/toc.js";

const db_menu = [
	{
		type: "menu",
		title: "Getting started",
		item: [{ title: "Introduction", source: doc.intro }],
	},
	{
		type: "menu",
		title: "Layout",
		item: [
			{ title: "Containers", source: doc.container },
			{ title: "Grid", source: doc.grid },
			{ title: "Column", source: doc.column },
			{ title: "Gutter", source: doc.gutter },
		],
	},
	{
		type: "menu",
		title: "Forms",
		item: [
			{ title: "Form control", source: doc.formcontrol },
			{ title: "Select", source: doc.select },
			{ title: "Check & radios", source: doc.checkradio },
			{ title: "Range", source: doc.range },
			{ title: "Input group", source: doc.inputgroup },
			{ title: "Floating label", source: doc.floatinglabel },
		],
	},
	{
		type: "menu",
		title: "Components",
		item: [
			{ title: "Accordion", source: doc.accordion },
			{ title: "Alert", source: doc.alert },
			{ title: "Badge", source: doc.badge },
			{ title: "Breadcrumb", source: doc.breadcrumb },
			{ title: "Button", source: doc.button },
			{ title: "Button group", source: doc.btngroup },
			{ title: "Card", source: doc.card },
			{ title: "Carosel", source: doc.carousel },
			{ title: "Close button", source: doc.btnclose },
			{ title: "Collapse", source: doc.collapse },
			{ title: "Dropdown", source: doc.dropdown },
			{ title: "List group", source: doc.listgroup },
			{ title: "Modal", source: doc.modal },
			{ title: "Tab", source: doc.tab },
			{ title: "Navbar", source: doc.navbar },
			{ title: "Offcanvas", source: doc.offcanvas },
			{ title: "Paging", source: doc.paging },
			{ title: "Popover", source: doc.popover },
			{ title: "Progress", source: doc.progress },
			{ title: "Toast", source: doc.toast },
			{ title: "Tooltips", source: doc.tooltip },
		],
	},
	{
		type: "menu",
		title: "Extra",
		item: [
			{ title: "Icon", source: doc.icon },
			{ title: "Menu", source: doc.menu },
			{ title: "Table of content", source: doc.toc },
			{ title: "Pill", source: doc.pill },
			{ title: "Example", source: doc.example },
			{ title: "Label", source: doc.label },
			{ title: "Msg", source: doc.msg },
			{ title: "Table", source: doc.table },
			{ title: "Layout", source: doc.layout },
		],
	},
	{
		type: "menu",
		title: "Tag",
		item: [
			{ title: "Base", source: doc.tag_base },

			{ title: "Background", source: doc.tag_background },
			{ title: "Borders", source: doc.tag_border },
			{ title: "Colors", source: doc.tag_color },
			{ title: "Display", source: doc.tag_display },
			{ title: "Flex", source: doc.tag_flex },
			{ title: "Float", source: doc.tag_float },
			{ title: "Interactions", source: doc.tag_interaction },
			{ title: "Overflow", source: doc.tag_overflow },
			{ title: "Position", source: doc.tag_position },
			{ title: "Shadows", source: doc.tag_shadow },
			{ title: "Sizing", source: doc.tag_size },
			{ title: "Spacing", source: doc.tag_spacing },
			{ title: "Text", source: doc.tag_text },
			{ title: "Vertical align", source: doc.tag_valign },
			{ title: "Visibility", source: doc.tag_visibility },
		],
	},
	{
		type: "menu",
		title: "Extend tag",
		item: [
			{ title: "Anchor", source: doc.tag_ex_a },
			{ title: "Bold", source: doc.tag_ex_b },
			{ title: "Code", source: doc.tag_ex_code },
			{ title: "Division", source: doc.tag_ex_div },
			{ title: "Form", source: doc.tag_ex_form },
			{ title: "Heading", source: doc.tag_ex_h },
			{ title: "Horizontal rule", source: doc.tag_ex_hr },
			{ title: "Image", source: doc.tag_ex_img },
			{ title: "List item", source: doc.tag_ex_li },
			{ title: "Navigation", source: doc.tag_ex_nav },
			{ title: "Ordered list", source: doc.tag_ex_ol },
			{ title: "Paragraph", source: doc.tag_ex_p },
			{ title: "Preformatted", source: doc.tag_ex_pre },
			{ title: "Small", source: doc.tag_ex_small },
			{ title: "Span", source: doc.tag_ex_span },
			{ title: "Strong", source: doc.tag_ex_strong },
			{ title: "Unordered list", source: doc.tag_ex_ul },
		],
	},
	{
		type: "menu",
		title: "Database",
		item: [
			{ title: "Generic", source: doc.generic },
			{ title: "File", source: doc.file },
			{ title: "Query", source: doc.query },
			{ title: "List", source: doc.list },
			{ title: "User", source: doc.user },
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
				source: (event) => {
					startmemoryleaktest(event.currentTarget, 10);
				},
			},
			{
				title: "Memory Test 100",
				source: (event) => {
					startmemoryleaktest(event.currentTarget, 100);
				},
			},
			{
				title: "Memory Test 1000",
				source: (event) => {
					startmemoryleaktest(event.currentTarget, 1000);
				},
			},
			{
				title: "Memory Test 5000",
				source: (event) => {
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

let def_m1 = "Getting started";
let def_m2 = "Introduction";
let def_theme = null;

function randomtheme() {
	let db_theme = db_menu[db_menu.length - 1].item;
	let cur_theme = db_theme[Math.floor(Math.random() * db_theme.length)].source;

	while (cur_theme === def_theme) {
		cur_theme = db_theme[Math.floor(Math.random() * db_theme.length)].source;
	}

	if (cur_theme === "") {
		cur_theme = null;
	}

	def_theme = cur_theme;
	set_theme(cur_theme);
}

function startmemoryleaktest(sender, limit) {
	if (memoryleaktestrun === true) {
		memoryleaktestrun = false;
	} else {
		sender.classList.add("active");
		memoryleaktestrun = true;
		memoryleaktest(
			0,
			limit,
			(i, l) => {
				if (i === l || memoryleaktestrun === false) {
					sender.innerText = `Memory Test ${l}`;
				} else {
					sender.innerText = `Memory Test ${parseInt((i / l) * 100, 10)}%`;
				}
			},
			() => {
				sender.classList.remove("active");
				core.init(document.getElementById("root"));
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
			gen_content(db_menu[ix1].title, db_menu[ix1].item[ix2].title, () => {
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

let dblibrary = {
	a: `import a from "../base/a.js";`,
	accordion: `import accordion from "../base/accordion.js";`,
	alert: `import * as alert from "../base/alert.js";`,
	b: `import b from "../base/b.js";`,
	badge: `import badge from "../base/badge.js";`,
	breadcrumb: `import breadcrumb from "../base/breadcrumb.js";`,
	btnclose: `import btnclose from "../base/btnclose.js";`,
	btngroup: `import btngroup from "../base/btngroup.js";`,
	btntoolbar: `import btntoolbar from "../base/btntoolbar.js";`,
	button: `import button from "../base/button.js";`,
	card: `import * as card from "../base/card.js";`,
	carousel: `import carousel from "../base/carousel.js";`,
	code: `import code from "../base/code.js";`,
	codepreview: `import codepreview from "../base/codepreview.js";`,
	collapse: `import * as collapse from "../base/collapse.js";`,
	container: `import * as container from "../base/container.js";`,
	core: `import * as core from "../base/core.js";`,
	db: `import * as db from "../base/api.js";`,
	div: `import div from "../base/div.js";`,
	dlg: `import * as dlg from "../base/dlg.js";`,
	dropdown: `import dropdown from "../base/dropdown.js";`,
	example: `import example from "../base/example.js";`,
	file: `import file from "../base/file.js";`,
	form: `import form from "../base/form.js";`,
	h: `import h from "../base/h.js";`,
	hr: `import hr from "../base/hr.js";`,
	icon: `import icon from "../base/icon.js";`,
	img: `import img from "../base/img.js";`,
	input: `import input from "../base/input.js";`,
	inputgroup: `import * as inputgroup from "../base/inputgroup.js";`,
	label: `import label from "../base/label.js";`,
	layout: `import * as layout from "../base/layout.js";`,
	li: `import li from "../base/li.js";`,
	listgroup: `import listgroup from "../base/listgroup.js";`,
	list: `import * as list from "../base/list.js";`,
	menu: `import menu from "../base/menu.js";`,
	modal: `import modal from "../base/modal.js";`,
	msg: `import msg from "../base/msg.js";`,
	nav: `import nav from "../base/nav.js";`,
	navbar: `import * as navbar from "../base/navbar.js";`,
	offcanvas: `import offcanvas from "../base/offcanvas.js";`,
	ol: `import ol from "../base/ol.js";`,
	option: `import * as option from "../base/option.js";`,
	p: `import p from "../base/p.js";`,
	paging: `import paging from "../base/paging.js";`,
	pill: `import pill from "../base/pill.js";`,
	pre: `import pre from "../base/pre.js";`,
	progress: `import * as progress from "../base/progress.js";`,
	query: `import * as query from "../base/query.js";`,
	small: `import small from "../base/small.js";`,
	span: `import span from "../base/span.js";`,
	strong: `import strong from "../base/strong.js";`,
	tab: `import tab from "../base/tab.js";`,
	table: `import * as table from "../base/table.js";`,
	tag: `import tag from "../base/tag.js";`,
	toast: `import toast from "../base/toast.js";`,
	toc: `import toc from "../base/toc.js";`,
	tooltip: `import tooltip from "../base/tooltip.js";`,
	ul: `import ul from "../base/ul.js";`,
	user: `import * as user from "../base/user.js";`,
	sample: `import sample from "./sample.js";	//for documentation purpose only`,
};

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
			import: null,
			container: (elem) => {
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
		opt.msg.forEach((i) => {
			m.push(i);
		});
	}

	if (opt.option) {
		if (m === null) {
			m = [];
		}

		Object.keys(opt.option).forEach((optionName) => {
			m.push(
				new table.container({
					item: opt.option[optionName],
				})
			);
		});
	}

	let i = [];
	if (opt.code) {
		i.push('"use strict";');
		i.push(`	`);
		i.push(`\/\/\/library`);
		i.push(dblibrary.core);
		if (opt.import) {
			let importList = [];
			opt.import.forEach((item) => {
				if (dblibrary[item]) {
					importList.push(dblibrary[item]);
				} else {
					importList.push(`\/\/\/[Error] Unknow library ${item}`);
				}
			});

			i = i.concat(importList.sort());
		}
		i.push(`	`);

		// i.push(`let code = () = {};`);

		i.push(`\/\/\/code`);
		i.push(`let code = ${opt.code.toString()};`);
		i.push(`	`);

		i.push(`\/\/\/loader`);
		i.push(`core.documentReady(() => {`);
		i.push(`	core.appendChild(document.body, code());`);
		i.push(`});`);
	}

	return new example({
		id: opt.id,
		anchor: opt.anchor,
		title: opt.title,
		msg: m,
		dark: opt.dark,
		viewclass: opt.viewclass,
		container: opt.container,
		import: i && i.length > 0 ? i : null,
		code: opt.code,
		sample: opt.sample,
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
					(m, callback) => {
						let p = (m) => {
							return new Promise((res, rej) => {
								try {
									import(m.source).then((o) => {
										let p = o.default;

										let processtimestart = window.performance.now();

										sample.resetindex();
										core.replaceChild(
											document.getElementById("root"),
											new div({
												marginbottom: 3,
												elem: p.map((i) => {
													return gen_example(i);
												}),
											})
										);

										let processtimeend = window.performance.now();

										gen_toc();
										gen_url(m1, m2);
										//count pagespeed
										document.getElementById("pagespeed").innerText = `${(
											processtimeend - processtimestart
										).toFixed(2)} ms`;

										//count page weight
										document.getElementById("pageweight").innerText = `${core.countElement(
											document.getElementById("root")
										)} items`;

										res();
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

				//=============
				//LOADER TYPE 2
				//=============
				// setTimeout(
				// 	(m, callback) => {
				// 		sample.resetindex();
				// 		core.replaceChild(
				// 			document.getElementById("root"),
				// 			new div({
				// 				marginbottom: 3,
				// 				elem: m.source.map((i) => {
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
				// core.replaceChild(
				// 	document.getElementById("root"),
				// 	new div({
				// 		marginbottom: 3,
				// 		elem: m.source.map((i) => {
				// 			return gen_example(i);
				// 		}),
				// 	})
				// );

				// gen_toc();

				// if (callback instanceof Function) {
				// 	callback();
				// }
			} else {
				core.replaceChild(
					document.getElementById("root"),
					new div({
						marginbottom: 3,
						elem: new msg({
							weight: "lg",
							icon: "!",
							elem: `Documentation for <b>${m1}</b> - <b>${m2}</b> not yet available`,
						}),
					})
				);

				gen_toc();
				gen_url(m1, m2);

				//count pagespeed
				document.getElementById("pagespeed").innerText = `0 ms`;

				//count page weight
				document.getElementById("pageweight").innerText = `0 item`;

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
		cltheme.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.1.3/dist/${theme}/bootstrap.min.css`;
		cltheme.removeAttribute("disabled");
		document.getElementById("pagetheme").innerText = `${theme}`;
	} else {
		cltheme.setAttribute("disabled", "disabled");
		document.getElementById("pagetheme").innerText = `default`;
	}
}

function gen_toc() {
	let li = [];
	let anchor = [].slice.call(document.getElementById("root").getElementsByClassName("anchorjs-link"));
	if (anchor && anchor.length > 0) {
		core.replaceChild(
			document.getElementById("nextbar"),
			new toc({
				label: "On this page",
				item: anchor.map((i) => {
					//remove debug example
					if (!i.classList.contains("anchorjs-link-debug")) {
						let parent = i.parentElement;
						let id = parent.id;
						return {
							label: parent.innerText,
							attr: { "cl-target-id": id },
							onclick: (event) => {
								let sender = event.currentTarget;
								let id = sender.getAttribute("cl-target-id");
								core.focusElement(document.getElementById(id));
							},
							level: parent.nodeName === "H3" ? 1 : 0,
						};
					}
				}),
			})
		);
	} else {
		core.replaceChild(document.getElementById("nextbar"), null);
	}
}

function gen_url(m1, m2) {
	let title = `BS5 JS Builder - ${m1} | ${m2}`;
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
					attr: {
						"cl-m1": i.title,
						"cl-m2": j.title,
						"cl-m3": i.type,
					},
					onclick:
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

core.documentReady(() => {
	//set def_m1 and m2
	let m = get_url();
	if (m && m.m1 !== "undefined" && m.m2 !== "undefined") {
		def_m1 = m.m1;
		def_m2 = m.m2;
	}

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
					new navbar.brand({ label: "cl", icon: "fire" }),
				],
			}),
			leftelem: new tag({
				class: ["sticky-md-top", "collapse", "navbar-collapse", "cl-vh-menu"],
				overflow: "auto",
				display: "md-block",
				margintop: 3,
				elem: gen_menu(def_m1, def_m2, def_theme),
			}),
			rightelem: new tag({
				class: ["sticky-lg-top", "cl-vh-menu"],
				overflow: "auto",
				margintop: 3,
				elem: "",
			}),
			footerelem: new div({
				display: "flex",
				flex: "wrap",
				justifycontent: "center",
				marginbottom: 5,
				gap: 2,
				elem: [
					new a({
						class: "text-decoration-none",
						elem: new pill({
							icon: "swatchbook",
							title: "Theme",
							color: "primary",
							elem: [new small({ id: "pagetheme", elem: "default" })],
						}),
						href: "javascript:void(0)",
						onclick: randomtheme,
					}),
					new pill({
						icon: "eye",
						title: "Viewport",
						color: "primary",
						elem: [
							new small("d-inline d-sm-none", "xs"),
							new small("d-none d-sm-inline d-md-none", "sm"),
							new small("d-none d-md-inline d-lg-none", "md"),
							new small("d-none d-lg-inline d-xl-none", "lg"),
							new small("d-none d-xl-inline d-xxl-none", "xl"),
							new small("d-none d-xxl-inline", "xxl"),
						],
					}),
					new pill({
						icon: "stopwatch",
						title: "Build speed",
						color: "primary",
						elem: [new small({ id: "pagespeed", elem: "0 ms" })],
					}),
					new pill({
						icon: "balance-scale",
						title: "Page weight",
						color: "primary",
						elem: [new small({ id: "pageweight", elem: "0 item" })],
					}),
				],
			}),

			backtotop: true,
		})
	);

	gen_content(def_m1, def_m2, () => {
		core.init(document.getElementById("root"));
		PR.prettyPrint();
	});

	set_theme(def_theme);

	core.init(document.body);
});
