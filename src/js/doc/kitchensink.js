"use strict";
import sample from "../doc/sample.js";

import a from "../base/a.js";
import abbr from "../base/abbr.js";
import accordion from "../base/accordion.js";
import * as alert from "../base/alert.js";
import b from "../base/b.js";
import badge from "../base/badge.js";
import blockquote from "../base/blockquote.js";
import breadcrumb from "../base/breadcrumb.js";
import btnclose from "../base/btnclose.js";
import btngroup from "../base/btngroup.js";
import btntoolbar from "../base/btntoolbar.js";
import button from "../base/button.js";
import * as card from "../base/card.js";
import carousel from "../base/carousel.js";
import cite from "../base/cite.js";
import code from "../base/code.js";
import codepreview from "../base/codepreview.js";
import * as collapse from "../base/collapse.js";
import * as container from "../base/container.js";
import * as core from "../base/core.js";
import * as db from "../base/api.js";
import div from "../base/div.js";
import * as dlg from "../base/dlg.js";
import dropdown from "../base/dropdown.js";
import em from "../base/em.js";
import example from "../base/example.js";
import file from "../base/file.js";
import form from "../base/form.js";
import footer from "../base/footer.js";
import h from "../base/h.js";
import hr from "../base/hr.js";
import i from "../base/i.js";
import icon from "../base/icon.js";
import img from "../base/img.js";
import input from "../base/input.js";
import * as inputgroup from "../base/inputgroup.js";
import label from "../base/label.js";
import * as layout from "../base/layout.js";
import li from "../base/li.js";
import listgroup from "../base/listgroup.js";
import * as list from "../base/list.js";
import menu from "../base/menu.js";
import modal from "../base/modal.js";
import msg from "../base/msg.js";
import nav from "../base/nav.js";
import * as navbar from "../base/navbar.js";
import offcanvas from "../base/offcanvas.js";
import ol from "../base/ol.js";
import * as option from "../base/option.js";
import p from "../base/p.js";
import paging from "../base/paging.js";
import pill from "../base/pill.js";
import pre from "../base/pre.js";
import * as progress from "../base/progress.js";
import * as query from "../base/query.js";
import small from "../base/small.js";
import span from "../base/span.js";
import strong from "../base/strong.js";
import tab from "../base/tab.js";
import * as table from "../base/table.js";
import tag from "../base/tag.js";
import toast from "../base/toast.js";
import toc from "../base/toc.js";
import tooltip from "../base/tooltip.js";
import ul from "../base/ul.js";
import * as user from "../base/user.js";

export default [
	{
		title: "Kitchen Sink",
		msg: "Themes from bootswatch",
		anchor: false,
	},

	{
		title: "Navbars",
		container: sample.formcontainer,
		import: ["input", "button", "navbar"],
		code: () => {
			let id1 = core.UUID();
			let id2 = core.UUID();
			let id3 = core.UUID();

			let fn = (id) => {
				return [
					new navbar.toggle({
						target: `#${id}`,
						toggle: "collapse",
					}),

					new navbar.brand({
						label: "Navbar",
					}),

					new navbar.collapsecontainer({
						id: id,
						elem: [
							new navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									new navbar.item({
										label: "Home",
										active: true,
									}),
									new navbar.item({
										label: "Features",
									}),
									new navbar.item({
										label: "Pricing",
									}),
									new navbar.item({
										label: "About",
									}),
									new navbar.item({
										label: "Dropdown",
										option: [
											{
												href: "#",
												label: "Action",
											},
											{
												href: "#",
												label: "Another action",
											},
											{
												href: "#",
												label: "Something else here",
											},
											{
												value: "-",
											},
											{
												href: "#",
												label: "Separated link",
											},
										],
									}),
								],
							}),
							new navbar.formcontainer([
								new input({
									type: "search",
									placeholder: "Search",
									hiddenlabel: "Search",
									class: "me-2",
								}),
								new button({
									label: "Search",
									color: "secondary",
								}),
							]),
						],
					}),
				];
			};

			return [
				new navbar.container({
					expand: "lg",
					dark: true,
					color: "primary",
					elem: fn(id1),
				}),
				new navbar.container({
					expand: "lg",
					dark: true,
					color: "dark",
					elem: fn(id2),
				}),
				new navbar.container({
					expand: "lg",
					color: "light",
					elem: fn(id3),
				}),
			];
		},
	},

	{
		title: "Buttons",
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({ label: core.capitalize(i), color: i });
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({ label: core.capitalize(i), color: i, disabled: true });
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({ label: core.capitalize(i), color: i, outline: true });
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["dropdown"],
		code: () => {
			let fn = (color) => {
				return new dropdown({
					label: core.capitalize(color),
					color: color,
					splittoggle: true,
					option: [
						{
							label: "Dropdown link",
						},
						{
							label: "Dropdown link",
						},
					],
				});
			};

			return ["primary", "success", "info", "danger"].map((i) => {
				return fn(i);
			});
		},
	},

	{
		container: sample.stackcontainer,
		import: ["button"],
		code: () => {
			return [
				new button({ label: "Large button", color: "primary", weight: "lg" }),
				new button({ label: "Default button", color: "primary" }),
				new button({ label: "Small button", color: "primary", weight: "sm" }),
			];
		},
	},

	{
		import: ["container", "button"],
		code: () => {
			return new container.grid([
				new button({ label: "Block button", color: "primary" }),
				new button({ label: "Block button", color: "primary" }),
			]);
		},
	},

	{
		import: ["button", "btngroup"],
		code: () => {
			let fn = (label, checked) => {
				return new button({
					type: "checkbox",
					label: label,
					checked: checked,
					color: "primary",
				});
			};

			return new btngroup({
				elem: [fn("Checkbox 1", false), fn("Checkbox 2", false), fn("Checkbox 3", true)],
			});
		},
	},

	{
		import: ["button", "btngroup"],
		code: () => {
			let fn = (label, checked) => {
				return new button({
					type: "radio",
					name: "g10",
					label: label,
					checked: checked,
					color: "primary",
				});
			};

			return new btngroup({
				elem: [fn("Radio 1", false), fn("Radio 2", false), fn("Radio 3", true)],
			});
		},
	},

	{
		import: ["button", "btngroup"],
		code: () => {
			return new btngroup({
				vertical: true,
				elem: Array(6).fill(
					new button({
						label: "Button",
						color: "primary",
					})
				),
			});
		},
	},

	{
		import: ["button", "btngroup"],
		code: () => {
			return new btngroup({
				elem: [
					new button({
						label: "Left",
						color: "secondary",
					}),
					new button({
						label: "Middle",
						color: "secondary",
					}),
					new button({
						label: "Right",
						color: "secondary",
					}),
				],
			});
		},
	},

	{
		import: ["button", "btngroup", "btntoolbar"],
		code: () => {
			let fn = (label) => {
				return new button({
					label: label,
					color: "secondary",
				});
			};
			return new btntoolbar({
				gap: 2,
				elem: [
					new btngroup({
						elem: [fn(1), fn(2), fn(3), fn(4)],
					}),
					new btngroup({
						elem: [fn(5), fn(6), fn(7)],
					}),
					new btngroup({
						elem: fn(8),
					}),
				],
			});
		},
	},

	{
		title: "Typography",
		import: ["h"],
		code: () => {
			return [1, 2, 3, 4, 5, 6].map((i) => {
				return new h(i, `Heading ${i}`);
			});
		},
	},

	{
		import: ["h", "small", "p", "sample"],
		code: () => {
			return [
				new h({ level: 3, elem: ["Heading ", new small({ textcolor: "muted", elem: "with muted text" })] }),
				new p("lead", sample.shorttext()),
			];
		},
	},

	{
		title: "Example body text",
		import: ["p"],
		code: () => {
			return [
				new p(
					`Nullam quis risus eget <a href="#">urna mollis ornare</a> vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.`
				),
				new p(`<small>This line of text is meant to be treated as fine print.</small>`),
				new p(`The following is <strong>rendered as bold text</strong>.`),
				new p(`The following is <em>rendered as italicized text</em>.`),
				new p(`An abbreviation of the word attribute is <abbr title="attribute">attr</abbr>.`),
			];
		},
	},

	{
		title: "Emphasis classes",
		import: ["p", "sample"],
		code: () => {
			return ["muted", "primary", "secondary", "warning", "danger", "success", "info", "dark", "light"].map(
				(i) => new p({ textcolor: i, elem: sample.shorttext() })
			);
		},
	},

	{
		title: "Blockquotes",
		import: ["sample"],
		code: () => {
			let fn = (align) => {
				return `
				<figure${align ? ' class="text-' + align + '"' : ``}>
					<blockquote class="blockquote">
						<p class="mb-0">${sample.shorttext()}</p>
					</blockquote>
					<figcaption class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></figcaption>
				</figure$>`;
			};

			return [fn(null), fn("center"), fn("end")];
		},
	},

	{
		title: "Tables",
		import: ["table", "b"],
		code: () => {
			let fn = (d) => {
				return new table.tr({
					class: `table-${d}`,
					elem: [
						new table.td({ elem: new b({ elem: d ? core.capitalize(d) : "Default" }) }),
						new table.td({ elem: "Column content" }),
						new table.td({ elem: "Column content" }),
						new table.td({ elem: "Column content" }),
					],
				});
			};

			return new table.container({
				hover: true,
				elem: [
					new table.thead({
						elem: new table.tr({
							elem: [
								new table.td({ elem: "Type" }),
								new table.td({ elem: "Column heading" }),
								new table.td({ elem: "Column heading" }),
								new table.td({ elem: "Column heading" }),
							],
						}),
					}),
					new table.tbody({
						elem: [
							fn("active"),
							fn(null),
							fn("primary"),
							fn("secondary"),
							fn("success"),
							fn("danger"),
							fn("warning"),
							fn("info"),
							fn("light"),
							fn("dark"),
						],
					}),
				],
			});
		},
	},

	{
		title: "Forms",
		import: ["input", "tag", "file", "div"],
		container: sample.formcontainer,
		code: () => {
			return [
				new tag({ tag: "legend", elem: "Legend" }),
				new input({
					label: "Email",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "email",
					readonly: true,
					plaintext: true,
					value: "email@example.com",
				}),
				new input({
					label: "Email address",
					type: "email",
					placeholder: "Enter email",
					helper: "We'll never share your email with anyone else.",
				}),
				new input({
					label: "Password",
					type: "password",
					placeholder: "Password",
				}),
				new input({
					label: "Example select",
					type: "select",
					option: ["1", "2", "3", "4", "5"],
				}),
				new input({
					label: "Example select",
					type: "select",
					multiple: true,
					rows: 4,
					option: ["1", "2", "3", "4", "5"],
				}),
				new input({
					label: "Example textarea",
					type: "textarea",
				}),
				new file({
					label: "Default file input example",
				}),
				new tag({ tag: "legend", class: "mt-3", elem: "Radio buttons" }),
				new input({
					name: "g11",
					label: "Option one is this and that—be sure to include why it's great",
					type: "radio",
					checked: true,
				}),
				new input({
					name: "g11",
					label: "Option two can be something else and selecting it will deselect option one",
					type: "radio",
				}),
				new input({
					name: "g11",
					label: "Option three is disabled",
					type: "radio",
					disabled: true,
				}),
				new tag({ tag: "legend", class: "mt-3", elem: "Checkboxes" }),
				new input({
					label: "Default checkbox",
					type: "checkbox",
				}),
				new input({
					label: "Checked checkbox",
					type: "checkbox",
					checked: true,
				}),
				new tag({ tag: "legend", class: "mt-3", elem: "Switches" }),
				new input({
					label: "Default switch checkbox input",
					type: "switch",
				}),
				new input({
					label: "Checked switch checkbox input",
					type: "switch",
					checked: true,
				}),
				new tag({ tag: "legend", class: "mt-3", elem: "Ranges" }),
				new input({
					label: "Example range",
					type: "range",
				}),
				new input({
					label: "Disabled range",
					type: "range",
					min: 0,
					max: 10,
					value: 5,
					disabled: true,
				}),
				new input({
					label: "Example range",
					type: "range",
					min: 0,
					max: 10,
					value: 5,
				}),
				new div({
					marginy: 3,
					elem: new button({
						type: "submit",
						color: "primary",
						elem: "Submit",
					}),
				}),
				new input({
					label: "Disabled input",
					type: "text",
					disabled: true,
					placeholder: "Disabled inpute here...",
				}),
				new input({
					label: "Readonly input",
					type: "text",
					readonly: true,
					placeholder: "Readonly inpute here...",
				}),
				new input({
					label: "Valid input",
					type: "text",
					value: "correct value",
					valid: "Success! You've done it.",
				}),
				new input({
					label: "Invalid input",
					type: "text",
					value: "wrong value",
					invalid: "Sorry, that username's taken. Try another?",
				}),
				new input({
					label: "Large input",
					type: "text",
					weight: "lg",
					placeholder: ".form-control-lg",
				}),
				new input({
					label: "Default input",
					type: "text",
					placeholder: "Default input",
				}),
				new input({
					label: "Large input",
					type: "text",
					weight: "sm",
					placeholder: ".form-control-sm",
				}),
				new input({
					label: "Input addon",
					type: "number",
					before: "$",
					after: ".00",
				}),

				new input({
					placeholder: "Recipient's username",
					type: "text",
					after: new button({
						outline: true,
						color: "primary",
						label: "Button",
					}),
				}),

				new tag({ tag: "legend", class: "mt-3", elem: "Floating labels" }),
				new input({
					type: "email",
					label: "Email address",
					floatlabel: true,
				}),

				new input({
					type: "password",
					label: "Password",
					floatlabel: true,
				}),
			];
		},
	},

	{
		title: "Navs",
	},
	{
		title: "Tabs",
		import: ["nav", "sample"],
		container: sample.formcontainer,
		code: () => {
			return new tab({
				item: [
					{
						label: "First",
						elem: `<b>This is the first item's tab body.</b> ${sample.text()}`,
					},
					{
						label: "Second",
						elem: `<b>This is the second item's tab body.</b> ${sample.text()}`,
					},
					{
						label: "Third",
						elem: `<b>This is the third item's tab body.</b> ${sample.text()}`,
					},
					{
						label: "Disabled",
						disabled: true,
						elem: "This is the last item's tab body.",
					},
				],
			});
		},
	},

	{
		title: "Pills",
		import: ["nav", "sample"],
		container: sample.formcontainer,
		code: () => {
			let fn = (headAlign) =>
				new tab({
					type: "pill",
					headAlign: headAlign,
					item: [
						{
							label: "First",
							elem: `<b>This is the first item's tab body.</b> ${sample.text()}`,
						},
						{
							label: "Second",
							elem: `<b>This is the second item's tab body.</b> ${sample.text()}`,
						},
						{
							label: "Third",
							elem: `<b>This is the third item's tab body.</b> ${sample.text()}`,
						},
						{
							label: "Disabled",
							disabled: true,
							elem: "This is the last item's tab body.",
						},
					],
				});

			return [fn(null), fn("fill"), fn("vertical")];
		},
	},

	{
		title: "Breadcrumbs",
		import: ["breadcrumb"],
		container: sample.formcontainer,
		code: () => {
			return [
				new breadcrumb({
					item: [
						{
							label: "Home",
							href: "#",
							active: true,
						},
					],
				}),
				new breadcrumb({
					item: [
						{
							label: "Home",
							href: "#",
						},
						{
							label: "Library",
							href: "#",
							active: true,
						},
					],
				}),
				new breadcrumb({
					item: [
						{
							label: "Home",
							href: "#",
						},
						{
							label: "Library",
							href: "#",
						},
						{
							label: "Data",
							active: true,
							href: "#",
						},
					],
				}),
			];
		},
	},

	{
		title: "Pagination",
		import: ["paging"],
		container: sample.formcontainer,
		code: () => {
			let fn = (weight) =>
				new paging({
					limit: 10,
					skip: 60,
					total: 1260,
					max: 3,
					weight: weight,
					onchange: (event) => {
						new toast("i", `Skip changed to ${event.detail.skip}`).show();
					},
				});

			return [fn("sm"), fn(), fn("lg")];
		},
	},

	{
		title: "Indicators",
	},

	{
		title: "Alerts",
		import: ["alert"],
		code: () => {
			let fn = (color, elem) => {
				return new div({
					col: ["lg-4", "md-6", "sm-12"],
					elem: new alert.container({
						close: true,
						color: color,
						elem: elem,
					}),
				});
			};

			return [
				new alert.container({
					color: "warning",
					close: true,
					elem: [
						new alert.heading("Warning!"),
						new p({
							elem: [
								"Best check yo self, you're not looking too good. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, ",
								new alert.link("#", "vel scelerisque nisl consectetur et"),
								".",
							],
						}),
					],
				}),

				new div({
					container: true,
					padding: 0,
					elem: new div({
						row: true,
						elem: [
							fn("danger", "<b>Oh snap!</b> Change a few things up and try submitting again."),
							fn("success", "<b>Well done!</b> You successfully read this important alert message."),
							fn(
								"info",
								"<b>Heads up!</b> This alert needs your attention, but it's not super important."
							),
							fn("primary", "<b>Oh snap!</b> Change a few things up and try submitting again."),
							fn("secondary", "<b>Well done!</b> You successfully read this important alert message."),
							fn(
								"light",
								"<b>Heads up!</b> This alert needs your attention, but it's not super important."
							),
						],
					}),
				}),
			];
		},
	},

	{
		title: "Badge",
		import: ["badge"],
		container: sample.stackcontainer,
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new badge({
					label: core.capitalize(i),
					color: i,
				});
			});
		},
	},
	{
		import: ["badge"],
		container: sample.stackcontainer,
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new badge({
					label: core.capitalize(i),
					color: i,
					pill: true,
				});
			});
		},
	},

	{
		title: "Progress",
	},

	{
		title: "Basic",
		import: ["progress"],
		container: sample.formcontainer,
		code: () => {
			return new progress.container({
				item: {
					value: 25,
				},
			});
		},
	},

	{
		title: "Contextual alternatives",
		import: ["progress"],
		container: sample.formcontainer,
		code: () => {
			let fn = (color, value) =>
				new progress.container({
					item: {
						color: color,
						value: value,
					},
				});

			return [fn("success", 25), fn("info", 50), fn("warning", 75), fn("danger", 100)];
		},
	},

	{
		title: "Multiple bars",
		import: ["progress"],
		container: sample.formcontainer,
		code: () => {
			return new progress.container({
				item: [
					{
						value: 15,
					},
					{
						color: "success",
						value: 30,
					},
					{
						color: "info",
						value: 20,
					},
				],
			});
		},
	},

	{
		title: "Striped",
		import: ["progress"],
		container: sample.formcontainer,
		code: () => {
			let fn = (color, value) =>
				new progress.container({
					item: {
						color: color,
						value: value,
						stripe: true,
					},
				});

			return [fn(null, 15), fn("success", 25), fn("info", 50), fn("warning", 75), fn("danger", 100)];
		},
	},

	{
		title: "Animated",
		import: ["progress"],
		code: () => {
			return new progress.container({
				item: {
					value: 75,
					stripe: true,
					animated: true,
				},
			});
		},
	},
];
