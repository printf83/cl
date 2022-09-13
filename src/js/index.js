"use strict";

// import "../css/sample.css";

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
import doc from "./doc.js";
import * as dlg from "./base/dlg.js";
import span from "./base/span.js";
import p from "./base/p.js";
import h from "./base/h.js";

const DEBUG = false;

let def_main_menu = "Getting started";
let def_sub_menu = "Introduction";
let def_theme = null;

const db_menu = [
	{
		type: "menu",
		title: "Getting started",
		icon: { icon: "book-open", color: "primary" },
		item: [
			{ title: "Introduction", source: doc.intro },
			{ title: "Bootswatch", source: doc.bootswatch },
		],
	},
	{
		type: "menu",
		title: "Layout",
		icon: { icon: "grip", color: "info" },
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
		icon: { icon: "list-check", color: "secondary" },
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
		icon: { icon: "server", color: "warning" },
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
			{ title: "Placeholders", source: doc.placeholder },
			{ title: "Popover", source: doc.popover },
			{ title: "Progress", source: doc.progress },
			{ title: "Toast", source: doc.toast },
			{ title: "Tooltips", source: doc.tooltip },
		],
	},
	{
		type: "menu",
		title: "Extra",
		icon: { icon: "heart", color: "danger" },
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
		title: "Base Tag",
		icon: { icon: "tag", color: "success" },
		item: [
			{ title: "Basic", source: doc.tag_base },
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
		title: "Extended tag",
		icon: { icon: "screwdriver-wrench", color: "primary" },
		item: [
			{ title: "Anchor", source: doc.tag_ex_a },
			{ title: "Abbreviation", source: doc.tag_ex_abbr },
			{ title: "Bold", source: doc.tag_ex_b },
			{ title: "Blockquote", source: doc.tag_ex_blockquote },
			{ title: "Cite", source: doc.tag_ex_cite },
			{ title: "Code", source: doc.tag_ex_code },
			{ title: "Division", source: doc.tag_ex_div },
			{ title: "Emphasis", source: doc.tag_ex_em },
			{ title: "Form", source: doc.tag_ex_form },
			{ title: "Footer", source: doc.tag_ex_footer },
			{ title: "Heading", source: doc.tag_ex_h },
			{ title: "Horizontal rule", source: doc.tag_ex_hr },
			{ title: "Italic", source: doc.tag_ex_i },
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
		icon: { icon: "database", color: "info" },
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
		icon: { icon: "link", color: "secondary" },
		item: [
			{ title: "Sandbox", source: "sandbox.html" },
			{ title: "Test", source: "test.html" },
		],
	},
	{
		type: "action",
		title: "Action",
		icon: { icon: "bolt-lightning", color: "danger" },
		item: [
			{
				title: "Memory Test 10",
				source: (sender) => {
					startmemoryleaktest(sender, 10);
				},
			},
			{
				title: "Memory Test 100",
				source: (sender) => {
					startmemoryleaktest(sender, 100);
				},
			},
			{
				title: "Memory Test 1000",
				source: (sender) => {
					startmemoryleaktest(sender, 1000);
				},
			},
			{
				title: "Memory Test 5000",
				source: (sender) => {
					startmemoryleaktest(sender, 5000);
				},
			},
		],
	},
	{
		type: "theme",
		title: "Theme",
		icon: { icon: "swatchbook", color: "success" },
		item: [
			{ title: "Default", source: null },
			{ title: "Cerulean", source: "cerulean" },
			{ title: "Cosmo", source: "cosmo" },
			{ title: "Cyborg", source: "cyborg" },
			{ title: "Darkly", source: "darkly" },
			{ title: "Flatly", source: "flatly" },
			{ title: "Journal", source: "journal" },
			{ title: "Litera", source: "litera" },
			{ title: "Lumen", source: "lumen" },
			{ title: "Lux", source: "lux" },
			{ title: "Materia", source: "materia" },
			{ title: "Minty", source: "minty" },
			{ title: "Morph", source: "morph" },
			{ title: "Pulse", source: "pulse" },
			{ title: "Quartz", source: "quartz" },
			{ title: "Sandstone", source: "sandstone" },
			{ title: "Simplex", source: "simplex" },
			{ title: "Sketchy", source: "sketchy" },
			{ title: "Slate", source: "slate" },
			{ title: "Solar", source: "solar" },
			{ title: "Spacelab", source: "spacelab" },
			{ title: "Superhero", source: "superhero" },
			{ title: "United", source: "united" },
			{ title: "Vapor", source: "vapor" },
			{ title: "Yeti", source: "yeti" },
			{ title: "Zephyr", source: "zephyr" },
		],
	},
];

const dblibrary = {
	a: `import a from "./base/a.js";`,
	abbr: `import a from "./base/abbr.js";`,
	accordion: `import accordion from "./base/accordion.js";`,
	alert: `import * as alert from "./base/alert.js";`,
	b: `import b from "./base/b.js";`,
	badge: `import badge from "./base/badge.js";`,
	blockquote: `import blockquote from "./base/blockquote.js";`,
	breadcrumb: `import breadcrumb from "./base/breadcrumb.js";`,
	btnclose: `import btnclose from "./base/btnclose.js";`,
	btngroup: `import btngroup from "./base/btngroup.js";`,
	btntoolbar: `import btntoolbar from "./base/btntoolbar.js";`,
	button: `import button from "./base/button.js";`,
	card: `import * as card from "./base/card.js";`,
	carousel: `import carousel from "./base/carousel.js";`,
	cite: `import cite from "./base/cite.js";`,
	code: `import code from "./base/code.js";`,
	codepreview: `import codepreview from "./base/codepreview.js";`,
	collapse: `import * as collapse from "./base/collapse.js";`,
	container: `import * as container from "./base/container.js";`,
	core: `import * as core from "./base/core.js";`,
	db: `import * as db from "./base/api.js";`,
	div: `import div from "./base/div.js";`,
	dlg: `import * as dlg from "./base/dlg.js";`,
	dropdown: `import dropdown from "./base/dropdown.js";`,
	em: `import example from "./base/em.js";`,
	example: `import example from "./base/example.js";`,
	file: `import file from "./base/file.js";`,
	form: `import form from "./base/form.js";`,
	footer: `import footer from "./base/footer.js";`,
	h: `import h from "./base/h.js";`,
	hr: `import hr from "./base/hr.js";`,
	i: `import icon from "./base/i.js";`,
	icon: `import icon from "./base/icon.js";`,
	img: `import img from "./base/img.js";`,
	input: `import input from "./base/input.js";`,
	inputgroup: `import * as inputgroup from "./base/inputgroup.js";`,
	label: `import label from "./base/label.js";`,
	layout: `import * as layout from "./base/layout.js";`,
	li: `import li from "./base/li.js";`,
	listgroup: `import listgroup from "./base/listgroup.js";`,
	list: `import * as list from "./base/list.js";`,
	menu: `import menu from "./base/menu.js";`,
	modal: `import modal from "./base/modal.js";`,
	msg: `import msg from "./base/msg.js";`,
	nav: `import nav from "./base/nav.js";`,
	navbar: `import * as navbar from "./base/navbar.js";`,
	offcanvas: `import offcanvas from "./base/offcanvas.js";`,
	ol: `import ol from "./base/ol.js";`,
	option: `import * as option from "./base/option.js";`,
	p: `import p from "./base/p.js";`,
	paging: `import paging from "./base/paging.js";`,
	pill: `import pill from "./base/pill.js";`,
	pre: `import pre from "./base/pre.js";`,
	progress: `import * as progress from "./base/progress.js";`,
	query: `import * as query from "./base/query.js";`,
	small: `import small from "./base/small.js";`,
	span: `import span from "./base/span.js";`,
	strong: `import strong from "./base/strong.js";`,
	tab: `import tab from "./base/tab.js";`,
	table: `import * as table from "./base/table.js";`,
	tag: `import tag from "./base/tag.js";`,
	toast: `import toast from "./base/toast.js";`,
	toc: `import toc from "./base/toc.js";`,
	tooltip: `import tooltip from "./base/tooltip.js";`,
	ul: `import ul from "./base/ul.js";`,
	user: `import * as user from "./base/user.js";`,
	sample: `import sample from "./doc/sample.js";	//for documentation purpose only`,
};

let randomtheme_callback = null;
function randomtheme(callback) {
	randomtheme_callback = callback;

	let cur_theme = core.randomdb("index_theme", db_menu[db_menu.length - 1].item).source;

	if (cur_theme === "") {
		cur_theme = null;
	}

	def_theme = cur_theme;
	set_theme(cur_theme);
}

function set_theme(theme) {
	core.setting.theme = theme;
}

core.setting.themechange = (theme) => {
	activate_menu("theme", theme, "theme");

	let el = document.getElementById("pagetheme");
	if (el) {
		if (theme) {
			el.innerText = `${core.capitalize(theme)}`;
		} else {
			el.innerText = `Default`;
		}
	}

	reload_page(() => {
		if (randomtheme_callback && typeof randomtheme_callback === "function") {
			randomtheme_callback();
			randomtheme_callback = null;
		}
	});
};

let dbmenukey = [];
function randompage(callback) {
	let i = core.randomdb("index_dbmenukey", dbmenukey);

	load_page(false, i.main_menu, i.sub_menu, () => {
		gen_tableofcontent();
		update_scrollspy();
		activate_menu(i.main_menu, i.sub_menu, "menu");
		update_url(i.main_menu, i.sub_menu);
		update_pagerandom(i.main_menu, i.sub_menu);

		core.init(document.getElementById("root"));
		PR.prettyPrint();
		core.codemarker(document);

		if (callback && typeof callback === "function") {
			callback();
		}
	});
}

function startmemoryleaktest(sender, limit) {
	if (memoryleaktestrun === true) {
		memoryleaktestrun = false;
	} else {
		new dlg.confirmbox(
			"!!",
			`
			Are you sure to start <b>Memory Leak Test</b>?<br/><br/>
			This test use by developer to check memory leak on this framework by open every page one by one for <b>${limit}</b> times. This test may make your device laggy.<br/><br/>
			If you want to stop the test, please click on this <b>Memory Leak Test</b> again to stop the test.`,
			{
				label: "Understand",
				onclick: () => {
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
						(main_menu, sub_menu, type_menu) => {
							sender.classList.remove("active");
							// core.init(document.getElementById("root"));
							PR.prettyPrint();
							core.codemarker(document);
							activate_menu(main_menu, sub_menu, type_menu);
						}
					);
				},
			}
		).show();
	}
}

let memoryleaktestrun = false;

let last_main_menu = 0;
let last_sub_menu = 0;
function memoryleaktest(index, limit, progressupdate, callback) {
	if (index < limit && memoryleaktestrun === true) {
		progressupdate(index, limit);

		let p = core.randomdb("index_dbmenukey", dbmenukey);

		last_main_menu = p.main_menu;
		last_sub_menu = p.sub_menu;
		load_page(false, p.main_menu, p.sub_menu, () => {
			core.init(document.getElementById("root"));

			if (index >= limit) {
				callback(last_main_menu, last_sub_menu, "menu");
			} else {
				memoryleaktest(index + 1, limit, progressupdate, callback);
			}
		});
	} else {
		memoryleaktestrun = false;
		progressupdate(index, limit);
		callback(last_main_menu, last_sub_menu, "menu");
	}
}

function gen_page(opt) {
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
			source: null,
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

	let sourcecode = [];
	if (opt.code) {
		sourcecode.push('"use strict";');
		sourcecode.push(`	`);
		sourcecode.push(`\/\/\/library`);
		sourcecode.push(dblibrary.core);
		if (opt.import) {
			let importList = [];
			opt.import.forEach((item) => {
				if (dblibrary[item]) {
					importList.push(dblibrary[item]);
				} else {
					importList.push(`\/\/\/[Error] Unknow library ${item}`);
				}
			});

			sourcecode = sourcecode.concat(importList.sort());
		}
		sourcecode.push(`	`);

		sourcecode.push(`\/\/\/code`);
		sourcecode.push(`let code = ${opt.code.toString()};`);
		sourcecode.push(`	`);

		sourcecode.push(`\/\/\/loader`);
		sourcecode.push(`core.documentReady(() => {`);
		sourcecode.push(`	core.replaceChild(document.getElementById("root"), code());`);
		sourcecode.push(`});`);
	}

	return new example({
		id: opt.id,
		anchor: opt.anchor,
		title: opt.title,
		msg: m,
		dark: opt.dark,
		viewclass: opt.viewclass,
		container: opt.container,
		source: sourcecode && sourcecode.length > 0 ? sourcecode : null,
		code: opt.code,
		sample: opt.sample,
	});
}

function find_menu(main_menu, sub_menu) {
	let main_menu_index = db_menu.findIndex((i) => i.title === main_menu);
	if (main_menu_index > -1) {
		let sub_menu_index = db_menu[main_menu_index].item.findIndex((i) => i.title === sub_menu);
		if (sub_menu_index > -1) {
			return {
				type: db_menu[main_menu_index].type,
				source: db_menu[main_menu_index].item[sub_menu_index].source,
			};
		}
	}

	return null;
}

let cur_main_menu = null;
let cur_sub_menu = null;

function gen_page_placeholder() {
	let fn = (col) => {
		return new div({
			placeholderanimation: "glow",
			elem: Array.isArray(col)
				? col.map((i) => {
						return new span({ col: i, marginend: 1, placeholder: true });
				  })
				: new span({ col: col, placeholder: true }),
		});
	};

	let f = (len, maxcol) => {
		return fn(Array.from({ length: len }, () => core.rnd(1, maxcol)));
	};

	return new div({
		ariahidden: true,
		marginbottom: 5,
		elem: [
			new h({ level: 1, paddingtop: 3, fontsize: 3, elem: f(2, 4) }),
			new div({
				elem: new p({
					fontweight: "light",
					fontsize: 5,
					elem: f(12, 5),
				}),
			}),
			new h({ level: 3, paddingtop: 3, elem: f(2, 3) }),
			new div({
				elem: new p({
					elem: f(6, 6),
				}),
			}),
			new h({ level: 3, paddingtop: 3, elem: f(2, 3) }),
			new div({
				elem: new p({
					elem: f(6, 6),
				}),
			}),
		],
	});
}

function reload_page(callback) {
	console.log("reload active doc");
	if (cur_main_menu && cur_sub_menu) {
		load_page(false, cur_main_menu, cur_sub_menu, () => {
			gen_tableofcontent();
			update_scrollspy();
			activate_menu(cur_main_menu, cur_sub_menu, "menu");
			update_url(cur_main_menu, cur_sub_menu);
			update_pagerandom(cur_main_menu, cur_sub_menu);

			core.init(document.getElementById("root"));
			PR.prettyPrint();
			core.codemarker(document);

			if (callback && typeof callback === "function") {
				callback();
			}
		});
	}
}

function load_page(showloading, main_menu, sub_menu, callback) {
	let menu_item = find_menu(main_menu, sub_menu);
	if (menu_item) {
		if (menu_item.type === "menu") {
			cur_main_menu = main_menu;
			cur_sub_menu = sub_menu;

			//loading
			if (showloading) {
				core.replaceChild(document.getElementById("root"), gen_page_placeholder());
				core.replaceChild(document.getElementById("nextbar"), gen_tableofcontent_placeholder());
			}
			//loading end

			if (menu_item.source) {
				setTimeout(
					(menu_item, callback) => {
						//load page using promise
						let page_loader = (menu_item) => {
							return new Promise((res, rej) => {
								try {
									//async import doc source
									core.importJS(menu_item.source, (menu_item_source) => {
										let processtimestart = DEBUG ? window.performance.now() : null;

										// sample.resetindex();
										core.replaceChild(
											document.getElementById("root"),
											new div({
												marginbottom: 3,
												tabindex: 0,
												elem: menu_item_source.map((i) => {
													return gen_page(i);
												}),
											})
										);

										let processtimeend = DEBUG ? window.performance.now() : null;

										if (DEBUG) {
											//count pagespeed
											document.getElementById("pagespeed").innerText = `${(
												processtimeend - processtimestart
											).toFixed(2)} ms`;

											//count page weight
											document.getElementById("pageweight").innerText = `${core.countElement(
												document.getElementById("root")
											)} items`;
										}

										res();
									});
								} catch (ex) {
									rej(ex);
								}
							});
						};

						page_loader(menu_item)
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
					menu_item,
					callback
				);
			} else {
				core.replaceChild(
					document.getElementById("root"),
					new div({
						marginbottom: 3,
						elem: new msg({
							weight: "lg",
							icon: "!",
							elem: `Documentation for <b>${main_menu}</b> - <b>${sub_menu}</b> not yet available`,
						}),
					})
				);

				if (DEBUG) {
					//count pagespeed
					document.getElementById("pagespeed").innerText = `0 ms`;

					//count page weight
					document.getElementById("pageweight").innerText = `0 item`;
				}

				if (callback instanceof Function) {
					callback();
				}
			}
		} else if (menu_item.type === "navigate") {
			window.location = menu_item.source;
		} else if (menu_item.type === "action") {
			menu_item.source();
		} else if (menu_item.type === "theme") {
			set_theme(menu_item.source);
		} else {
			console.warn("Unsupported type", menu_item);
		}
	}
}

function gen_tableofcontent() {
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
							href: `#${id}`,
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

function gen_tableofcontent_placeholder() {
	let fn = (col) => {
		return new div({
			placeholderanimation: "glow",
			elem: Array.isArray(col)
				? col.map((i) => {
						return new span({ col: i, marginend: 1, placeholder: true });
				  })
				: new span({ col: col, placeholder: true }),
		});
	};

	let f0 = (len, maxcol) => {
		return fn(Array.from({ length: len }, () => core.rnd(1, maxcol)));
	};

	let f1 = (len, maxcol) => {
		return {
			label: f0(len, maxcol),
		};
	};

	return new toc({
		ariahidden: true,
		label: f0(3, 3),
		item: [f1(3, 3), f1(3, 3), f1(3, 3), f1(3, 3), f1(3, 3)],
	});
}

function update_scrollspy() {
	//update scroll-spy
	const dataSpyList = document.querySelectorAll('[data-bs-spy="scroll"]');
	if (dataSpyList && dataSpyList.length > 0) {
		dataSpyList.forEach((dataSpyEl) => {
			let inst = bootstrap.ScrollSpy.getInstance(dataSpyEl);
			if (inst) {
				inst.refresh();
			} else {
				console.warn("scrollspy not build");
			}
		});
	}
}

function update_pagerandom(main_menu, sub_menu) {
	let pagerandomlabel = document.getElementById("pagerandom");
	pagerandomlabel.innerText = sub_menu;
}

function update_url(main_menu, sub_menu) {
	let title = `${core.setting.title()} - ${main_menu} | ${sub_menu}`;
	let path = `?m1=${encodeURIComponent(main_menu)}&m2=${encodeURIComponent(sub_menu)}`;
	let data = `${main_menu}.${sub_menu}`;

	window.history.pushState(data, title, path);
	document.title = title;
}

function get_url_param() {
	let p = new URLSearchParams(window.location.search);

	let main_menu = p.get("m1");
	let sub_menu = p.get("m2");
	return main_menu && sub_menu
		? {
				main_menu: decodeURIComponent(main_menu),
				sub_menu: decodeURIComponent(sub_menu),
		  }
		: null;
}

function alpha_only(str) {
	if (str) {
		return str.replace(/[^a-zA-Z]/g, "").toLowerCase();
	} else {
		return "";
	}
}

function activate_menu(main_menu, sub_menu, type_menu) {
	//remove last active for each type
	let activeItem = [].slice.call(document.getElementById("sidebar").getElementsByClassName("active"));

	for (let x = 0; x < activeItem.length; x++) {
		if (activeItem[x].getAttribute("cl-m3") === type_menu) {
			activeItem[x].classList.remove("active");
			if (type_menu !== "theme") {
				if (activeItem[x].getAttribute("cl-main_menu") !== main_menu) {
					let iul = activeItem[x].closest("ul");
					if (iul) {
						try {
							let isib = iul.previousSibling;
							iul.classList.remove("show");
							if (isib) {
								isib.classList.add("collapsed");
								isib.setAttribute("aria-expanded", "false");
							}
						} catch {}
					}
				}
			}
		}
	}

	//set current active
	let current_active_menu_item = document.getElementById(
		`${type_menu}_${alpha_only(main_menu)}_${alpha_only(sub_menu)}`
	);
	if (current_active_menu_item) {
		current_active_menu_item.classList.add("active");

		if (type_menu !== "theme") {
			let cul = current_active_menu_item.closest("ul");
			if (cul) {
				try {
					let csib = cul.previousSibling;
					cul.classList.add("show");

					if (csib) {
						csib.classList.remove("collapsed");
						csib.setAttribute("aria-expanded", "true");
					}
				} catch {}
			}
		}
	}
}

function gen_menu() {
	dbmenukey = [];

	return db_menu.map((i) => {
		return new menu({
			label: i.title,
			icon: i.icon,
			arrow: !i.icon,
			item: i.item.map((j) => {
				if (i.type === "menu") {
					dbmenukey.push({ main_menu: i.title, sub_menu: j.title });
				}

				return {
					id: `${i.type}_${alpha_only(i.title)}_${alpha_only(j.title)}`,
					class: `cl-${i.type}-item`,
					label: j.title,
					attr: {
						"cl-m1": i.title,
						"cl-m2": j.title,
						"cl-m3": i.type,
					},
					onclick: (event) => {
						let sender = event.currentTarget;

						let main_menu = sender.getAttribute("cl-m1");
						let sub_menu = sender.getAttribute("cl-m2");
						let type_menu = sender.getAttribute("cl-m3");

						let m = find_menu(main_menu, sub_menu);
						if (m) {
							if (m.type === "menu") {
								sender.innerText = "Loading";
								load_page(true, main_menu, sub_menu, () => {
									gen_tableofcontent();
									update_scrollspy();
									activate_menu(main_menu, sub_menu, type_menu);
									update_url(main_menu, sub_menu);
									update_pagerandom(main_menu, sub_menu);

									core.init(document.getElementById("root"));
									PR.prettyPrint();
									core.codemarker(document);

									sender.innerText = sub_menu;
								});
							} else if (m.type === "theme") {
								set_theme(m.source);
							} else if (m.type === "action") {
								m.source(sender);
							}
						}
					},
				};
			}),
		});
	});
}

function cl_event_handler(event) {
	core.eventhandler(event);
}

core.documentReady(() => {
	let url_param = get_url_param();
	if (url_param && url_param.main_menu !== "undefined" && url_param.sub_menu !== "undefined") {
		def_main_menu = url_param.main_menu;
		def_sub_menu = url_param.sub_menu;
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
				margintop: 3,
				elem: gen_menu(),
			}),
			rightelem: new tag({
				class: ["sticky-lg-top", "cl-vh-menu"],
				overflow: "auto",
				margintop: 3,
				elem: gen_tableofcontent_placeholder(),
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
							icon: "shuffle",
							title: "Choose random page",
							color: "primary",
							elem: [new small({ id: "pagerandom", elem: "Random Page" })],
						}),
						href: "javascript:void(0)",
						onclick: () => {
							let pagerandomlabel = document.getElementById("pagerandom");
							pagerandomlabel.innerText = "Loading";
							randompage(() => {
								core.focusElement(pagerandomlabel);
							});
						},
					}),

					new a({
						class: "text-decoration-none",
						elem: new pill({
							icon: "swatchbook",
							title: "Choose random theme",
							color: "primary",
							elem: [new small({ id: "pagetheme", elem: "Default" })],
						}),
						href: "javascript:void(0)",
						onclick: () => {
							let pagethemelabel = document.getElementById("pagetheme");
							pagethemelabel.innerText = "Loading";

							randomtheme(() => {
								core.focusElement(pagethemelabel);
							});
						},
					}),

					new pill({
						icon: "eye",
						title: "Viewport",
						color: "primary",
						elem: [
							new small("d-inline d-sm-none", "XS"),
							new small("d-none d-sm-inline d-md-none", "SM"),
							new small("d-none d-md-inline d-lg-none", "MD"),
							new small("d-none d-lg-inline d-xl-none", "LG"),
							new small("d-none d-xl-inline d-xxl-none", "XL"),
							new small("d-none d-xxl-inline", "XXL"),
						],
					}),

					DEBUG
						? new pill({
								icon: "stopwatch",
								title: "Build speed",
								color: "primary",
								elem: [new small({ id: "pagespeed", elem: "0 ms" })],
						  })
						: null,
					DEBUG
						? new pill({
								icon: "balance-scale",
								title: "Page weight",
								color: "primary",
								elem: [new small({ id: "pageweight", elem: "0 item" })],
						  })
						: null,
				].filter(Boolean),
			}),
			mainelem: gen_page_placeholder(),

			backtotop: true,
		})
	);

	cur_main_menu = def_main_menu;
	cur_sub_menu = def_sub_menu;

	core.init(document);
});
