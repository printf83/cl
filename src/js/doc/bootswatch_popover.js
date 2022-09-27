"use strict";
import sample from "./sample.js";

import accordion from "../base/accordion.js";
import * as alert from "../base/alert.js";
import b from "../base/b.js";
import badge from "../base/badge.js";
import breadcrumb from "../base/breadcrumb.js";
import btngroup from "../base/btngroup.js";
import btntoolbar from "../base/btntoolbar.js";
import button from "../base/button.js";
import * as card from "../base/card.js";
import * as container from "../base/container.js";
import * as core from "../base/core.js";
import div from "../base/div.js";
import dropdown from "../base/dropdown.js";
import file from "../base/file.js";
import h from "../base/h.js";
import input from "../base/input.js";
import listgroup from "../base/listgroup.js";
import modal from "../base/modal.js";
import * as navbar from "../base/navbar.js";
import offcanvas from "../base/offcanvas.js";
import p from "../base/p.js";
import paging from "../base/paging.js";
import * as progress from "../base/progress.js";
import small from "../base/small.js";
import tab from "../base/tab.js";
import * as table from "../base/table.js";
import toast from "../base/toast.js";
import tooltip from "../base/tooltip.js";
import ul from "../base/ul.js";

export default [
	{
		title: "Popover global property",
		anchor: false,
	},

	{
		title: "Navbars",
		container: sample.vstackcontainer,
		import: ["sample", "input", "button", "navbar"],
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
										popover: sample.popover("danger", "2rem"), //marker
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
												popover: sample.popover(), //marker
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
									popover: sample.popover(), //marker
								}),
								new button({
									label: "Search",
									color: "secondary",
									popover: sample.popover(), //marker
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
					popover: sample.popover(), //marker
				}),
				new navbar.container({
					expand: "lg",
					dark: true,
					color: "dark",
					elem: fn(id2),
					popover: sample.popover(), //marker
				}),
				new navbar.container({
					expand: "lg",
					color: "light",
					elem: fn(id3),
					popover: sample.popover(), //marker
				}),
			];
		},
	},

	{
		title: "Buttons",
		container: sample.stackcontainer,
		import: ["sample", "button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({
						label: core.capitalize(i),
						color: i,
						popover: sample.popover(), //marker
					});
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["sample", "button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({
						label: core.capitalize(i),
						color: i,
						disabled: true,
						popover: sample.popover(), //marker
					});
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["sample", "button"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"].map(
				(i) => {
					return new button({
						label: core.capitalize(i),
						color: i,
						outline: true,
						popover: sample.popover(), //marker
					});
				}
			);
		},
	},

	{
		container: sample.stackcontainer,
		import: ["sample", "dropdown"],
		code: () => {
			let fn = (color) => {
				return new dropdown({
					label: core.capitalize(color),
					color: color,
					splittoggle: true,
					popover: sample.popover(), //marker
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
		import: ["sample", "button"],
		code: () => {
			return [
				new button({ label: "Large button", color: "primary", weight: "lg" }),
				new button({ label: "Default button", color: "primary" }),
				new button({
					label: "Small button",
					color: "primary",
					weight: "sm",
					popover: sample.popover(), //marker
				}),
			];
		},
	},

	{
		import: ["sample", "container", "button"],
		code: () => {
			return new container.grid([
				new button({ label: "Block button", color: "primary" }),
				new button({
					label: "Block button",
					color: "primary",
					popover: sample.popover(), //marker
				}),
			]);
		},
	},

	{
		import: ["sample", "button", "btngroup"],
		code: () => {
			let fn = (label, checked) => {
				return new button({
					type: "checkbox",
					label: label,
					checked: checked,
					color: "primary",
					popover: sample.popover(), //marker
				});
			};

			return new btngroup({
				elem: [fn("Checkbox 1", false), fn("Checkbox 2", false), fn("Checkbox 3", true)],
			});
		},
	},

	{
		import: ["sample", "button", "btngroup"],
		code: () => {
			let fn = (label, checked) => {
				return new button({
					type: "radio",
					name: "g10",
					label: label,
					checked: checked,
					color: "primary",
					popover: sample.popover(), //marker
				});
			};

			return new btngroup({
				elem: [fn("Radio 1", false), fn("Radio 2", false), fn("Radio 3", true)],
			});
		},
	},

	{
		import: ["sample", "button", "btngroup"],
		code: () => {
			return new btngroup({
				vertical: true,
				elem: Array(6).fill(
					new button({
						label: "Button",
						color: "primary",
						popover: sample.popover(), //marker
					})
				),
			});
		},
	},

	{
		import: ["sample", "button", "btngroup"],
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
						popover: sample.popover(), //marker
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
		import: ["sample", "button", "btngroup", "btntoolbar"],
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
	},

	{
		import: ["sample", "h"],
		code: () => {
			return [1, 2, 3, 4, 5, 6].map((i) => {
				return new h(i, `Heading ${i}`);
			});
		},
	},

	{
		import: ["sample", "h", "small", "p", "sample"],
		code: () => {
			return [
				new h({ level: 3, elem: ["Heading ", new small({ textColor: "muted", elem: "with muted text" })] }),
				new p("lead", sample.shorttext()),
			];
		},
	},

	{
		title: "Example body text",
		import: ["sample", "p"],
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
		import: ["sample", "p", "sample"],
		code: () => {
			return ["muted", "primary", "secondary", "warning", "danger", "success", "info", "dark", "light"].map(
				(i) =>
					new p({
						textColor: i,
						elem: sample.shorttext(),
						popover: sample.popover(), //marker
					})
			);
		},
	},

	{
		title: "Blockquotes",
		import: ["sample", "sample"],
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
		import: ["sample", "table", "b"],
		code: () => {
			let fn = (d) => {
				return new table.tr({
					class: `table-${d}`,
					elem: [
						new table.td({ scope: "row", elem: new b({ elem: d ? core.capitalize(d) : "Default" }) }),
						new table.td({ elem: "Column content" }),
						new table.td({ elem: "Column content" }),
						new table.td({ elem: "Column content", popover: sample.popover() /*marker*/ }),
					],
				});
			};

			return new table.container({
				hover: true,
				elem: [
					new table.thead({
						elem: new table.tr({
							elem: [
								new table.th({ elem: "Type" }),
								new table.th({ elem: "Column heading" }),
								new table.th({ elem: "Column heading" }),
								new table.th({ elem: "Column heading", popover: sample.popover() /*marker*/ }),
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
	},

	{
		title: "Legend",
		import: ["sample", "input", "file"],
		container: sample.formcontainer,
		code: () => {
			return [
				new input({
					popover: sample.popover(), //marker
					label: "Email",
					labelsize: "sm-2",
					ctlsize: "sm-10",
					type: "email",
					readonly: true,
					plaintext: true,
					value: "email@example.com",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Email address",
					type: "email",
					placeholder: "Enter email",
					helper: "We'll never share your email with anyone else.",
					autocomplete: "email",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Password",
					type: "password",
					placeholder: "Password",
					autocomplete: "current-password",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Example select",
					type: "select",
					option: ["1", "2", "3", "4", "5"],
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Example select",
					type: "select",
					multiple: true,
					rows: 4,
					option: ["1", "2", "3", "4", "5"],
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Example textarea",
					type: "textarea",
				}),
				new file({
					popover: sample.popover(), //marker
					label: "Default file input example",
				}),
			];
		},
	},

	{
		title: "Radio buttons",
		import: ["sample", "input"],
		container: sample.vstackcontainer,
		code: () => {
			return [
				new input({
					popover: sample.popover(), //marker
					name: "g11",
					label: "Option one is this and that—be sure to include why it's great",
					type: "radio",
					checked: true,
				}),
				new input({
					popover: sample.popover(), //marker
					name: "g11",
					label: "Option two can be something else and selecting it will deselect option one",
					type: "radio",
				}),
				new input({
					popover: sample.popover(), //marker
					name: "g11",
					label: "Option three is disabled",
					type: "radio",
					disabled: true,
				}),
			];
		},
	},

	{
		title: "Checkboxes",
		import: ["sample", "input"],
		container: sample.vstackcontainer,
		code: () => {
			return [
				new input({
					popover: sample.popover(), //marker
					label: "Default checkbox",
					type: "checkbox",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Checked checkbox",
					type: "checkbox",
					checked: true,
				}),
			];
		},
	},

	{
		title: "Switches",
		import: ["sample", "input"],
		container: sample.vstackcontainer,
		code: () => {
			return [
				new input({
					popover: sample.popover(), //marker
					label: "Default switch checkbox input",
					type: "switch",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Checked switch checkbox input",
					type: "switch",
					checked: true,
				}),
			];
		},
	},

	{
		title: "Ranges",
		import: ["sample", "input"],
		container: sample.vstackcontainer,
		code: () => {
			return [
				new input({
					popover: sample.popover(), //marker
					label: "Example range",
					type: "range",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Disabled range",
					type: "range",
					min: 0,
					max: 10,
					value: 5,
					disabled: true,
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Example range",
					type: "range",
					min: 0,
					max: 10,
					value: 5,
				}),
			];
		},
	},

	{
		import: ["sample", "input", "button"],
		container: sample.formcontainer,
		code: () => {
			return [
				new button({
					popover: sample.popover(), //marker
					type: "submit",
					color: "primary",
					elem: "Submit",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Disabled input",
					type: "text",
					disabled: true,
					placeholder: "Disabled inpute here...",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Readonly input",
					type: "text",
					readonly: true,
					placeholder: "Readonly inpute here...",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Valid input",
					type: "text",
					value: "correct value",
					valid: "Success! You've done it.",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Invalid input",
					type: "text",
					value: "wrong value",
					invalid: "Sorry, that username's taken. Try another?",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Large input",
					type: "text",
					weight: "lg",
					placeholder: ".form-control-lg",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Default input",
					type: "text",
					placeholder: "Default input",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Large input",
					type: "text",
					weight: "sm",
					placeholder: ".form-control-sm",
				}),
				new input({
					popover: sample.popover(), //marker
					label: "Input addon",
					type: "number",
					before: "$",
					after: ".00",
				}),

				new input({
					popover: sample.popover(), //marker
					placeholder: "Recipient's username",
					type: "text",
					after: new button({
						outline: true,
						color: "primary",
						label: "Button",
					}),
				}),
			];
		},
	},

	{
		title: "Floating labels",
		import: ["sample", "input"],
		container: sample.formcontainer,
		code: () => {
			return [
				new input({
					popover: sample.popover(), //marker
					type: "email",
					label: "Email address",
					floatlabel: true,
					autocomplete: "email",
				}),

				new input({
					type: "password",
					label: "Password",
					floatlabel: true,
					autocomplete: "current-password",
				}),
			];
		},
	},

	{
		title: "Navs",
	},
	{
		title: "Tabs",
		import: ["sample", "nav"],
		container: sample.vstackcontainer,
		code: () => {
			return new tab({
				item: [
					{
						label: "First",
						elem: `<b>This is the first item's tab body.</b> ${sample.text()}`,
					},
					{
						label: "Second",
						popover: sample.popover(), //marker
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
		import: ["sample", "nav"],
		container: sample.vstackcontainer,
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
							popover: sample.popover(), //marker
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
		import: ["sample", "breadcrumb"],
		container: sample.vstackcontainer,
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
							popover: sample.popover(), //marker
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
		import: ["sample", "paging"],
		container: sample.vstackcontainer,
		code: () => {
			let fn = (weight) =>
				new paging({
					popover: sample.popover(), //marker
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
		import: ["sample", "alert"],
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
							fn(
								"danger",
								"<b>Oh snap!</b> <a class='alert-link' href='#'>Change a few things up</a> and try submitting again."
							),
							fn(
								"success",
								"<b>Well done!</b> You successfully read <a class='alert-link' href='#'>this important alert message</a>."
							),
							fn(
								"info",
								"<b>Heads up!</b> This <a class='alert-link' href='#'>alert needs your attention</a>, but it's not super important."
							),
							fn(
								"primary",
								"<b>Oh snap!</b> <a class='alert-link' href='#'>Change a few things up</a> and try submitting again."
							),
							fn(
								"secondary",
								"<b>Well done!</b> You successfully read <a class='alert-link' href='#'>this important alert message</a>."
							),
							fn(
								"light",
								"<b>Heads up!</b> This <a class='alert-link' href='#'>alert needs your attention</a>, but it's not super important."
							),
						],
					}),
				}),
			];
		},
	},

	{
		title: "Badge",
		import: ["sample", "badge"],
		container: sample.stackcontainer,
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new badge({
					popover: sample.popover(), //marker
					label: core.capitalize(i),
					color: i,
				});
			});
		},
	},
	{
		import: ["sample", "badge"],
		container: sample.stackcontainer,
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new badge({
					popover: sample.popover(), //marker
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
		import: ["sample", "progress"],
		container: sample.vstackcontainer,
		code: () => {
			return new progress.container({
				popover: sample.popover(), //marker
				item: {
					value: 25,
					popover: sample.popover(), //marker
				},
			});
		},
	},

	{
		title: "Contextual alternatives",
		import: ["sample", "progress"],
		container: sample.vstackcontainer,
		code: () => {
			let fn = (color, value) =>
				new progress.container({
					popover: sample.popover(), //marker
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
		import: ["sample", "progress"],
		container: sample.vstackcontainer,
		code: () => {
			return new progress.container({
				item: [
					{
						value: 15,
					},
					{
						color: "success",
						value: 30,
						popover: sample.popover(), //marker
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
		import: ["sample", "progress"],
		container: sample.vstackcontainer,
		code: () => {
			let fn = (color, value) =>
				new progress.container({
					item: {
						color: color,
						value: value,
						stripe: true,
						popover: sample.popover(), //marker
					},
				});

			return [fn(null, 10), fn("success", 25), fn("info", 50), fn("warning", 75), fn("danger", 100)];
		},
	},

	{
		title: "Animated",
		import: ["sample", "progress"],
		code: () => {
			return new progress.container({
				item: {
					value: 75,
					stripe: true,
					animated: true,
					popover: sample.popover(), //marker
				},
			});
		},
	},

	{
		title: "Containers",
	},

	{
		title: "List groups",
		import: ["sample", "listgroup", "badge"],
		code: () => {
			let itemfn = (text, badgeLabel) => {
				return {
					display: "flex",
					justifyContent: "between",
					alignItem: "start",
					elem: [
						text,
						new badge({
							pill: true,
							color: "primary",
							label: badgeLabel,
						}),
					],
				};
			};

			return new listgroup({
				item: [itemfn(sample.shorttext(), 14), itemfn(sample.shorttext(), 2), itemfn(sample.shorttext(), 1)],
			});
		},
	},

	{
		import: ["sample", "listgroup"],
		code: () => {
			let itemfn = (text, active, disabled) => {
				return {
					display: "flex",
					justifyContent: "between",
					alignItem: "start",
					active: active,
					disabled: disabled,
					elem: text,
					popover: sample.popover(), //marker
				};
			};

			return new listgroup({
				item: [
					itemfn(sample.shorttext(), true, false),
					itemfn(sample.shorttext(), false, false),
					itemfn(sample.shorttext(), false, true),
				],
			});
		},
	},

	{
		import: ["sample", "listgroup", "div", "h", "small", "p"],
		code: () => {
			let itemfn = (title, active, days) => {
				return {
					href: "#",
					action: true,
					active: active,
					elem: [
						new div({
							width: 100,
							display: "flex",
							justifyContent: "between",
							elem: [
								new h({
									level: 5,
									marginBottom: 1,
									elem: title,
								}),
								new small({
									textColor: !active ? "muted" : null,
									elem: `${days} days ago`,
								}),
							],
						}),
						new p({
							marginBottom: 1,
							elem: sample.shorttext(),
						}),
						new small({
							textColor: !active ? "muted" : null,
							elem: `And some${!active ? " muted" : ""} small print.`,
						}),
					],
				};
			};

			return new listgroup({
				item: [itemfn("List group item heading", true, 14), itemfn("List group item heading", false, 2)],
			});
		},
	},

	{
		title: "Cards",
	},

	{
		container: sample.stackcontainer,
		import: ["sample", "card"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new card.container({
					color: i,
					width: "18rem",
					elem: [
						new card.header("Header"),
						new card.body({
							elem: [
								new card.title(`${core.capitalize(i)} card title`),
								new card.text(
									`Some quick example text to build on the ${i} card title and make up the bulk of the card's content.`
								),
							],
						}),
					],
				});
			});
		},
	},

	{
		container: sample.stackcontainer,
		import: ["sample", "card"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new card.container({
					borderColor: i,
					textColor: i,
					width: "18rem",
					elem: [
						new card.header("Header"),
						new card.body({
							elem: [
								new card.title(`${core.capitalize(i)} card title`),
								new card.text(
									`Some quick example text to build on the ${i} card title and make up the bulk of the card's content.`
								),
							],
						}),
					],
				});
			});
		},
	},

	{
		import: ["sample", "card", "listgroup"],
		code: () => {
			return new card.container({
				elem: [
					new card.header("Header"),
					new card.body({
						elem: [new card.title("Card Title"), new card.subtitle("Card sub title")],
					}),
					new card.img({
						placement: "middle",
						src: sample.img(286, 143),
					}),
					new card.body({
						elem: [
							new card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
						],
					}),
					new listgroup({
						flush: true,
						item: [
							{
								elem: "An item",
							},
							{
								elem: "A second item",
								popover: sample.popover(), //marker
							},
							{
								elem: "A third item",
							},
						],
					}),
					new card.body({
						elem: [
							new card.link({
								href: "#",
								elem: "Link 1",
								popover: sample.popover(), //marker
							}),
							new card.link({
								href: "#",
								elem: "Link 2",
							}),
						],
					}),
					new card.footer("Last updated 3 mins ago"),
				],
			});
		},
	},

	{
		import: ["sample", "card"],
		code: () => {
			return new card.container({
				elem: new card.body({
					elem: [
						new card.title("Card Title"),
						new card.subtitle("Card subtitle"),
						new card.text(
							"Some quick example text to build on the card title and make up the bulk of the card's content."
						),
						new card.link({
							href: "#",
							elem: "Link 1",
							popover: sample.popover(), //marker
						}),
						new card.link({
							href: "#",
							elem: "Link 2",
						}),
					],
				}),
			});
		},
	},

	{
		title: "Accordions",
	},

	{
		import: ["sample", "accordion"],
		code: () => {
			return new accordion({
				item: [
					{
						label: "Accordion Item 1",
						elem: ["<b>This is the first item's accordion body.</b> ", sample.text()],
					},
					{
						label: "Accordion Item 2",
						elem: ["<b>This is the second item's accordion body.</b> ", sample.text()],
						popover: sample.popover(), //marker
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
		title: "Dialogs",
	},

	{
		title: "Modals",
		viewclass: "cl-modal-preview",
		import: ["sample", "modal"],
		code: () => {
			return new modal({
				elem: "Modal body text goes here.",
				button: ["Save changes", "Close"],
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Offcanvas",
		container: sample.stackcontainer,
		import: ["sample", "offcanvas", "dropdown", "p", "button"],
		code: () => {
			let fnContent = new div({
				elem: [
					new p({
						elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
					}),
					new dropdown({
						label: "Drowdown button",
						color: "secondary",
						popover: sample.popover(), //marker
						option: [
							{
								href: "#",
								label: "Action",
							},
							{
								href: "#",
								label: "Another action",
								popover: sample.popover(), //marker
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
			});

			let fnButton = (title, opt) =>
				new button({
					label: title,
					color: "primary",
					click: () => {
						new offcanvas(opt).show();
					},
				});

			return [
				fnButton("Show offcanvas", {
					close: true,
					backdrop: true,
					color: "light",
					title: "Offcanvas",
					elem: fnContent,
				}),

				fnButton("Show top offcanvas", {
					placement: "top",
					close: true,
					backdrop: true,
					color: "light",
					title: "Offcanvas",
					elem: fnContent,
					popover: sample.popover(), //marker
				}),

				fnButton("Show bottom offcanvas", {
					placement: "bottom",
					close: true,
					backdrop: true,
					color: "light",
					title: "Offcanvas",
					elem: fnContent,
				}),

				fnButton("Show end offcanvas", {
					placement: "end",
					close: true,
					backdrop: true,
					color: "light",
					title: "Offcanvas",
					elem: fnContent,
				}),

				fnButton("Enable body scrolling", {
					close: true,
					scroll: true,
					backdrop: false,
					color: "light",
					title: "Offcanvas",
					elem: fnContent,
				}),

				fnButton("Enable backdrop", {
					close: true,
					scroll: false,
					backdrop: true,
					color: "light",
					title: "Offcanvas",
					elem: fnContent,
				}),

				fnButton("Enable both scrolling & backdrop", {
					close: true,
					backdrop: true,
					scroll: true,
					color: "light",
					title: "Offcanvas",
					elem: fnContent,
				}),
			];
		},
	},

	{
		title: "Popover",
		container: sample.stackcontainer,
		import: ["sample", "tooltip", "button"],
		code: () => {
			let fn = (placement) =>
				new tooltip({
					type: "popover",
					title: "Popover title",
					msg: `${core.capitalize(placement)} popover`,
					placement: placement,
					elem: new button({
						label: core.capitalize(placement),
						outline: true,
						color: "primary",
						popover: sample.popover(),
					}),
				});

			return [fn("top"), fn("left"), fn("right"), fn("bottom")];
		},
	},

	{
		title: "Tooltip",
		container: sample.stackcontainer,
		import: ["sample", "tooltip", "button"],
		code: () => {
			let fn = (placement) =>
				new tooltip({
					type: "tooltip",
					msg: `${core.capitalize(placement)} tooltip`,
					placement: placement,
					elem: new button({
						label: core.capitalize(placement),
						outline: true,
						color: "primary",
						popover: sample.popover(),
					}),
				});

			return [fn("top"), fn("left"), fn("right"), fn("bottom")];
		},
	},

	{
		title: "Toast",
		viewclass: "cl-modal-preview",
		import: ["sample", "toast"],
		code: () => {
			return new toast({
				color: "primary",
				popover: sample.popover(),
				elem: "Hello, world! This is a toast message.",
				debug: true, // documentation purpose only
			});
		},
	},
];
