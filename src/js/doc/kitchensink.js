"use strict";
import sample from "../doc/sample.js";

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
	},

	{
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
	},

	{
		title: "Legend",
		import: ["input", "file"],
		container: sample.formcontainer,
		code: () => {
			return [
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
			];
		},
	},

	{
		title: "Radio buttons",
		import: ["input"],
		container: sample.formcontainer,
		code: () => {
			return [
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
			];
		},
	},

	{
		title: "Checkboxes",
		import: ["input"],
		container: sample.formcontainer,
		code: () => {
			return [
				new input({
					label: "Default checkbox",
					type: "checkbox",
				}),
				new input({
					label: "Checked checkbox",
					type: "checkbox",
					checked: true,
				}),
			];
		},
	},

	{
		title: "Switches",
		import: ["input"],
		container: sample.formcontainer,
		code: () => {
			return [
				new input({
					label: "Default switch checkbox input",
					type: "switch",
				}),
				new input({
					label: "Checked switch checkbox input",
					type: "switch",
					checked: true,
				}),
			];
		},
	},

	{
		title: "Ranges",
		import: ["input"],
		container: sample.formcontainer,
		code: () => {
			return [
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
			];
		},
	},

	{
		import: ["input", "button"],
		container: sample.formcontainer,
		code: () => {
			return [
				new button({
					type: "submit",
					color: "primary",
					elem: "Submit",
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
			];
		},
	},

	{
		title: "Floating labels",
		import: ["input"],
		container: sample.formcontainer,
		code: () => {
			return [
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

			return [fn(null, 10), fn("success", 25), fn("info", 50), fn("warning", 75), fn("danger", 100)];
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

	{
		title: "Containers",
	},

	{
		title: "List groups",
		import: ["listgroup", "badge", "sample"],
		code: () => {
			let itemfn = (text, badgeLabel) => {
				return {
					display: "flex",
					justifycontent: "between",
					alignitem: "start",
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
		import: ["listgroup", "sample"],
		code: () => {
			let itemfn = (text, active, disabled) => {
				return {
					display: "flex",
					justifycontent: "between",
					alignitem: "start",
					active: active,
					disabled: disabled,
					elem: text,
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
		import: ["listgroup", "sample", "div", "h", "small", "p"],
		code: () => {
			let itemfn = (title, active, days) => {
				return {
					href: "#",
					action: true,
					active: active,
					elem: [
						new div({
							class: "w-100",
							display: "flex",
							justifycontent: "between",
							elem: [
								new h({
									level: 5,
									marginbottom: 1,
									elem: title,
								}),
								new small({
									textcolor: !active ? "muted" : null,
									elem: `${days} days ago`,
								}),
							],
						}),
						new p({
							marginbottom: 1,
							elem: sample.shorttext(),
						}),
						new small({
							textcolor: !active ? "muted" : null,
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
		import: ["card"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new card.container({
					color: i,
					style: {
						width: "18rem",
					},
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
		import: ["card"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new card.container({
					bordercolor: i,
					textcolor: i,
					style: {
						width: "18rem",
					},
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
		import: ["card", "listgroup"],
		code: () => {
			return new card.container({
				elem: [
					new card.header("Header"),
					new card.body({
						elem: [new card.title("Card Title"), new card.subtitle("Card sub title")],
					}),
					new card.img({
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
		import: ["card"],
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
		import: ["accordion"],
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
		import: ["modal"],
		code: () => {
			return new modal({
				title: "Modal title",
				elem: "Modal body text goes here.",

				button: ["Save changes", "Close"],
				debug: true, //this last option is for this documentation preview only
			});
		},
	},

	{
		title: "Offcanvas",
		container: sample.stackcontainer,
		import: ["offcanvas", "dropdown", "p", "button"],
		code: () => {
			let fnContent = new div({
				elem: [
					new p({
						elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
					}),
					new dropdown({
						label: "Drowdown button",
						color: "secondary",
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
			});

			let fnButton = (title, opt) =>
				new button({
					label: title,
					color: "primary",
					onclick: () => {
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
		import: ["tooltip", "button"],
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
					}),
				});

			return [fn("top"), fn("left"), fn("right"), fn("bottom")];
		},
	},

	{
		title: "Tooltip",
		container: sample.stackcontainer,
		import: ["tooltip", "button"],
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
					}),
				});

			return [fn("top"), fn("left"), fn("right"), fn("bottom")];
		},
	},

	{
		title: "Toast",
		viewclass: "cl-modal-preview",
		import: ["toast"],
		code: () => {
			return new toast({
				color: "primary",
				textcolor: "light",
				icon: {
					icon: "fire",
					color: "primary",
				},
				title: "Bootstrap",
				elem: "Hello, world! This is a toast message.",
				debug: true, //this last option is for this documentation preview only
			});
		},
	},
];
