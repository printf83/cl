"use strict";
const LIBNAME = /component.Z./g;
const SAMPLELIBNAME = /doc_sample./g;

import "../css/sample.css";

import sample from "./doc/sample.js";
import doc from "./doc.js";
import $ from "./component.js";

const def_m1 = "Components";
const def_m2 = "Modal";
const def_theme = null;

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
				$.core.init(document.getElementById("root"));
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
	opt = $.core.extend(
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

	opt.id = opt.id || $.core.UUID();

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
				new $.table.container({
					item: opt.option[optionName],
				})
			);
		});
	}

	return new $.example({
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
	let opt = {
		max_preserve_newlines: 50,
		brace_style: "collapse",
	};

	str = str.replace(LIBNAME, "$.");
	str = str.replace(SAMPLELIBNAME, "sample.");

	return js_beautify(str, opt);
}

function beautifyhtml(str) {
	let opt = {
		indent_inner_html: true,
		indent_size: 4,
	};

	str = str.replace(/\>/g, ">\n");
	str = str.replace(/\</g, "\n<");
	str = str.replace(/\n\n/g, "\n");
	return html_beautify(str, opt);
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
									$.core.replaceChild(
										document.getElementById("root"),
										new $.div({
											marginbottom: 3,
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
									document.getElementById("pageweight").innerText = `${$.core.countElement(
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
				// 		$.core.replaceChild(
				// 			document.getElementById("root"),
				// 			new $.div({
				// 				marginbottom: 3,
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
				// $.core.replaceChild(
				// 	document.getElementById("root"),
				// 	new $.div({
				// 		marginbottom: 3,
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
				$.core.replaceChild(
					document.getElementById("root"),
					new $.div({
						marginbottom: 3,
						elem: new $.msg({
							weight: "lg",
							icon: "!",
							elem: `Documentation for <b>${m1}</b> - <b>${m2}</b> not yet available`,
						}),
					})
				);

				gen_toc();

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
		$.core.replaceChild(
			document.getElementById("nextbar"),
			new $.toc({
				label: "On this page",
				item: anchor.map(function (i) {
					//remove debug example
					if (!i.classList.contains("anchorjs-link-debug")) {
						let parent = i.parentElement;
						let id = parent.id;
						return {
							label: parent.innerText,
							attr: { "cl-target-id": id },
							onclick: function (event) {
								let sender = event.currentTarget;
								let id = sender.getAttribute("cl-target-id");
								$.core.focusElement(document.getElementById(id));
							},
							level: parent.nodeName === "H3" ? 1 : 0,
						};
					}
				}),
			})
		);
	} else {
		$.core.replaceChild(document.getElementById("nextbar"), null);
	}
}

function gen_menu(m1, m2, theme) {
	return db_menu.map(function (i) {
		return new $.menu({
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
											$.core.init(document.getElementById("root"));
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
$.core.documentReady(() => {
	//topbar
	$.core.replaceChild(
		document.getElementById("navbar"),
		new $.navbar.container({
			color: "primary",
			textcolor: "light",
			expand: "lg",
			body: { fluid: "lg" },
			elem: [
				new $.navbar.toggle({
					target: `#sidebar`,
					toggle: "collapse",
				}),
				new $.navbar.brand({ label: "cl", icon: "fire" }),
			],
		})
	);

	//sidebar
	$.core.replaceChild(
		document.getElementById("sidebar"),
		new $.div({
			elem: gen_menu(def_m1, def_m2, def_theme),
		})
	);

	//nextbar
	$.core.replaceChild(
		document.getElementById("nextbar"),
		new $.div({
			elem: "Loading...",
		})
	);

	gen_content(def_m1, def_m2, function () {
		$.core.init(document.getElementById("root"));
		PR.prettyPrint();
	});

	set_theme(def_theme);

	$.core.init(document.body);

	//backtotop
	document.getElementById("backtotop").addEventListener("click", function () {
		document.getElementById("root").scrollIntoView({ behavior: "smooth", block: "start" });
	});
});
