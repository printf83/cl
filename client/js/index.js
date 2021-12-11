"use strict";
import * as core from "./base/core.js";
import * as cl from "./base/cl.js";
import div from "./base/div.js";
import a from "./base/a.js";
import button from "./base/button.js";
import badge from "./base/badge.js";
import carousel from "./base/carousel.js";
import tab from "./base/tab.js";
import * as collapse from "./base/collapse.js";
import * as card from "./base/card.js";
import small from "./base/small.js";
import modal from "./base/modal.js";
import toast from "./base/toast.js";
import example from "./base/example.js";
import * as dlg from "./base/dlg.js";
import * as container from "./base/container.js";
import * as alert from "./base/alert.js";
import h from "./base/h.js";
import hr from "./base/hr.js";
import btngroup from "./base/btngroup.js";
import input from "./base/input.js";
import icon from "./base/icon.js";
import * as table from "./base/table.js";
import dropdown from "./base/dropdown.js";
import accordion from "./base/accordion.js";
import breadcrumb from "./base/breadcrumb.js";
import paging from "./base/paging.js";
import * as navbar from "./base/navbar.js";
import p from "./base/p.js";
import tooltip from "./base/tooltip.js";
import msg from "./base/msg.js";
import menu from "./base/menu.js";
import * as progress from "./base/progress.js";
import offcanvas from "./base/offcanvas.js";
import toc from "./base/toc.js";
import tag from "./base/tag.js";
import code from "./base/code.js";
import b from "./base/b.js";

function gen_example(opt) {
	opt = core.extend(
		{},
		{
			id: null,
			anchor: true,
			title: null,
			msg: null,
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

function stackcontainer(elem) {
	return new container.stack(elem);
}

function formcontainer(elem) {
	return new container.form(elem);
}

function gridcontainer(elem) {
	return new container.grid(elem);
}

let imgindex = 0;
let textindex = 0;

let textdb = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit massa, elementum vel metus id, congue sollicitudin lectus. Praesent ultricies felis eget nisl volutpat gravida. In eleifend iaculis viverra. Proin ut gravida elit, id posuere velit. Nulla congue enim at odio eleifend accumsan. Curabitur felis quam, feugiat in tincidunt ac, pulvinar eu diam. Nullam non erat orci. Sed gravida, ante sed vestibulum accumsan, elit metus feugiat ex, in gravida dolor nunc fermentum magna.",
	"Nam tempor maximus ante vel malesuada. Vivamus nibh neque, cursus finibus risus vel, porttitor accumsan lacus. Nulla facilisi. Sed sit amet sagittis magna, id cursus est. Quisque convallis vel magna quis vestibulum. Curabitur placerat diam odio, in tincidunt felis viverra ac. Aenean quis ante diam. Sed sit amet lectus rutrum tortor feugiat auctor. Fusce euismod est nec posuere accumsan. Donec sodales cursus maximus. Nulla tincidunt quam quis lacus suscipit, ut lobortis erat fringilla. Praesent id diam nec metus mollis maximus. Nam vestibulum lectus quis velit dictum ornare. Phasellus vitae accumsan nisl, sed aliquet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
	"Donec vehicula elit vel purus euismod, et aliquet nisl molestie. Phasellus at porttitor neque. Donec et orci mi. Nulla a laoreet tortor. Cras ac massa ipsum. Suspendisse mi diam, sodales nec felis sit amet, ullamcorper aliquet tellus. In vitae urna ipsum. Donec cursus rutrum magna. Quisque sed nisi a lacus accumsan mollis.",
	"Cras felis orci, feugiat ac volutpat non, porttitor at leo. Mauris sit amet eros tincidunt, cursus felis sit amet, molestie erat. Cras rutrum mi sed nunc tempor, id viverra metus aliquet. Sed aliquet scelerisque rutrum. Donec blandit ante et mauris scelerisque, congue venenatis tortor vehicula. Sed ornare ipsum sed cursus euismod. Aenean placerat nibh nisi, ac pretium nulla aliquet vitae. Mauris vel mauris urna. Morbi ultrices enim tellus, quis volutpat velit feugiat vitae. Vivamus hendrerit consequat rhoncus. In at efficitur lectus, vel volutpat massa. Donec consectetur scelerisque lacinia. Sed tristique risus ac mi efficitur consequat.",
	"Phasellus quis feugiat magna. Fusce placerat, metus eget tempor placerat, velit neque aliquam turpis, vel gravida ex leo sit amet diam. Aenean facilisis vulputate metus, ac dapibus felis vulputate non. Sed vehicula ante nec odio dapibus, id convallis libero auctor. Vivamus facilisis sed tellus a mattis. Donec bibendum imperdiet dui eget porttitor. Nam aliquam mi a nunc luctus rutrum.",
];

let sample = {
	img: function (width, height) {
		return `https://picsum.photos/seed/${imgindex++}/${width ? width : 800}/${height ? height : 400}.webp`;
	},
	text: function () {
		if (textindex >= textdb.length) {
			textindex = 0;
		}
		return textdb[textindex++];
	},
	dropdownoption: function () {
		return [
			{ href: "#", label: "Action" },
			{
				href: "#",
				label: "Another action",
			},
			{
				href: "#",
				label: "Something else here",
			},
			{ value: "-" },
			{
				href: "#",
				label: "Separated link",
			},
		];
	},
	accordionitem: function () {
		return [
			{
				label: "Accordion Item 1",
				elem: ["<b>This is the first item's accordion body.</b> ", sample.text()],
			},
			{
				label: "Accordion Item 2",
				elem: ["<b>This is the second item's accordion body.</b> ", sample.text()],
			},
			{
				label: "Accordion Item 3",
				elem: ["<b>This is the third item's accordion body.</b> ", sample.text()],
			},
		];
	},
};

let s_alert = [
	{
		title: "Alert",
		msg: "Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.",
		anchor: false,
	},

	{
		title: "Example",
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return new alert.container({ color: i, elem: `A simple ${i} alert—check it out!` });
			});
		},
	},

	{
		title: "Link color",
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (i) {
				return new alert.container({
					color: i,
					elem: [
						`A simple ${i} alert with `,
						new alert.link({ label: "an example link", href: "javascript:void(0);" }),
						`. Give it a click if you like.`,
					],
				});
			});
		},
	},

	{
		title: "Additional content",
		code: function () {
			return new alert.container({
				color: "success",
				elem: [
					new alert.heading({ elem: "Well done!" }),
					new p({
						elem: "Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.",
					}),
					new hr(),
					new p({
						marginBottom: 0,
						elem: "Whenever you need to, be sure to use margin utilities to keep things nice and tidy.",
					}),
				],
			});
		},
	},

	{
		title: "Icons",
		code: function () {
			return ["i", "!!", "!", "?", "-", "x", "/", "dosave", "dodelete", "lock", "shield", "logout"].map(function (
				i
			) {
				return new alert.container({ icon: i, message: `An example alert with an <b>"${i}"</b> icon code` });
			});
		},
	},

	{
		title: "Dismissing",
		code: function () {
			return new alert.container({
				close: true,
				color: "warning",
				elem: "<strong>Holy guacamole!</strong> You should check in on some of those fields below.",
			});
		},
	},
];

let s_accordion = [
	{
		title: "Accordion",
		msg: "Build vertically collapsing accordions in combination with our Collapse JavaScript plugin.",
		anchor: false,
	},
	{
		title: "Example",
		msg: "Click the accordions below to expand/collapse the accordion content.",
		sample: { "sample.text": sample.text },
		code: function () {
			return new accordion({
				item: [
					{
						label: "Accordion Item 1",
						elem: ["<b>This is the first item's accordion body.</b> ", sample.text()],
					},
					{
						label: "Accordion Item 2",
						elem: ["<b>This is the second item's accordion body.</b> ", sample.text()],
					},
					{
						label: "Accordion Item 3",
						elem: ["<b>This is the third item's accordion body.</b> ", sample.text()],
					},
				],
			});
		},
	},

	{
		title: "Flush",
		msg: "Set {{flush:true}} to remove the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.",
		sample: { "sample.text": sample.text, "sample.accordionitem": sample.accordionitem },
		code: function () {
			return new accordion({
				flush: true,
				item: sample.accordionitem(),
			});
		},
	},

	{
		title: "Always open",
		msg: "Set {{autoclose:false}} to make accordion items stay open when another item is opened.",
		sample: { "sample.text": sample.text, "sample.accordionitem": sample.accordionitem },
		code: function () {
			return new accordion({
				autoclose: false,
				item: sample.accordionitem(),
			});
		},
	},
];

let s_button = [
	// {
	// 	title: "Title of example 3",
	// 	msg: "Msg or example 3",
	// 	option: {
	// 		"Available Option": [
	// 			["Option", "Value", "Description"],
	// 			["elem", "{}", "Element"],
	// 		],
	// 	},
	// 	code: function () {
	// 		return new button({ label: "Hello", icon: "fire", color: "primary" });
	// 	},
	// },

	{
		anchor: false,
		title: "Buttons",
		msg: "Use Bootstraps custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.",
	},

	{
		title: "Examples",
		container: stackcontainer,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				function (i) {
					return new button({ label: core.capitalize(i), color: i });
				}
			);
		},
	},

	{
		title: "Disable text wrapping",
		container: stackcontainer,
		code: function () {
			return new button({
				label: "Disable text wrapping button",
				color: "primary",
				nowarp: true,
			});
		},
	},

	{
		title: "Button tags",
		container: stackcontainer,
		code: function () {
			return [
				new button({ label: "Link", color: "primary", href: "javascript:void(0);" }),
				new button({ label: "Button", color: "primary" }),
				new button({ label: "Input", color: "primary", type: "input" }),
				new button({ label: "Submit", color: "primary", type: "submit" }),
				new button({ label: "Reset", color: "primary", type: "reset" }),
				new input({
					class: "btn",
					color: "primary",
					textcolor: "light",
					type: "button",
					value: "Input button",
				}),
				new input({
					class: "btn",
					color: "primary",
					textcolor: "light",
					type: "submit",
					value: "Input submit",
				}),
				new input({
					class: "btn",
					color: "primary",
					textcolor: "light",
					type: "reset",
					value: "Input reset",
				}),
			];
		},
	},

	{
		title: "Outline button",
		container: stackcontainer,
		code: function () {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				function (i) {
					return new button({ outline: true, label: core.capitalize(i), color: i });
				}
			);
		},
	},

	{
		title: "Large Size",
		container: stackcontainer,
		code: function () {
			return [
				new button({ weight: "lg", label: "Large button", color: "primary" }),
				new button({ weight: "lg", label: "Large button", color: "secondary" }),
			];
		},
	},

	{
		title: "Small Size",
		container: stackcontainer,
		code: function () {
			return [
				new button({ weight: "sm", label: "Small button", color: "primary" }),
				new button({ weight: "sm", label: "Small button", color: "secondary" }),
			];
		},
	},

	{
		title: "Disabled state",
		container: stackcontainer,
		code: function () {
			return [
				new button({ disabled: true, weight: "lg", label: "Disabled button", color: "primary" }),
				new button({ disabled: true, weight: "lg", label: "Disabled button", color: "secondary" }),
			];
		},
	},

	{
		title: "Disabled button link state",
		container: stackcontainer,
		code: function () {
			return [
				new button({
					disabled: true,
					weight: "lg",
					label: "Primary link",
					color: "primary",
					href: "javascript:void(0);",
				}),
				new button({
					disabled: true,
					weight: "lg",
					label: "Link",
					color: "secondary",
					href: "javascript:void(0);",
				}),
			];
		},
	},

	{
		title: "Block buttons",
		code: function () {
			return new container.grid([
				new button({ label: "Button", color: "primary" }),
				new button({ label: "Button", color: "primary" }),
				new button({ label: "Button", color: "primary" }),
			]);
		},
	},

	{
		title: "Centered in horizontal",
		code: function () {
			return new div({
				display: "grid",
				gap: "2",
				col: 6,
				marginX: "auto",
				elem: [
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
				],
			});
		},
	},

	{
		title: "Right align",
		code: function () {
			return new div({
				class: "d-grid gap-2 d-md-flex justify-content-md-end",
				elem: [
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
					new button({ label: "Button", color: "primary" }),
				],
			});
		},
	},

	{
		title: "Toggle state button",
		container: stackcontainer,
		code: function () {
			return [
				new button({
					toggle: true,
					label: "Toggle button",
					color: "primary",
				}),
				new button({
					toggle: true,
					active: true,
					label: "Active toggle button",
					color: "primary",
				}),
				new button({
					toggle: true,
					label: "Disabled toggle button",
					color: "primary",
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Toggle state button",
		container: stackcontainer,
		code: function () {
			return [
				new button({ toggle: true, label: "Toggle button", color: "primary" }),
				new button({
					toggle: true,
					active: true,
					href: "javascript:void(0)",
					label: "Active toggle button",
					color: "primary",
				}),
				new button({
					toggle: true,
					href: "javascript:void(0)",
					label: "Disabled toggle button",
					color: "primary",
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Toggle state link",
		container: stackcontainer,
		code: function () {
			return [
				new button({
					toggle: true,
					href: "javascript:void(0)",
					label: "Toggle link",
					color: "primary",
				}),
				new button({
					toggle: true,
					active: true,
					href: "javascript:void(0)",
					label: "Active toggle link",
					color: "primary",
				}),
				new button({
					toggle: true,
					href: "javascript:void(0)",
					label: "Disabled toggle link",
					color: "primary",
					disabled: true,
				}),
			];
		},
	},
];

let db_menu = [
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
			{ title: "Check &amp; radios", source: null },
			{ title: "Range", source: null },
			{ title: "Input group", source: null },
			{ title: "Floating label", source: null },
		],
	},
	{
		type: "menu",
		title: "Components",
		item: [
			{ title: "Accordion", source: s_accordion },
			{ title: "Alert", source: s_alert },
			{ title: "Badge", source: null },
			{ title: "Breadcrumb", source: null },
			{ title: "Button", source: s_button },
			{ title: "Button group", source: null },
			{ title: "Card", source: null },
			{ title: "Carosel", source: null },
			{ title: "Close button", source: null },
			{ title: "Collapse", source: null },
			{ title: "Dropdown", source: null },
			{ title: "List group", source: null },
			{ title: "Modal", source: null },
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
					new div({ marginBottom: 3, elem: "No source available" })
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
			elem: gen_menu("Components", "Button", null),
		})
	);

	//nextbar
	cl.replaceChild(
		document.getElementById("nextbar"),
		new div({
			elem: "Loading...",
		})
	);

	gen_content("Components", "Button");
});
