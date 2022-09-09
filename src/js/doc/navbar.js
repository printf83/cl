"use strict";
import sample from "./sample.js";
import button from "../base/button.js";
import * as core from "../base/core.js";
import div from "../base/div.js";
import h from "../base/h.js";
import input from "../base/input.js";
import * as navbar from "../base/navbar.js";
import span from "../base/span.js";
import toast from "../base/toast.js";
import * as table from "../base/table.js";
import dropdown from "../base/dropdown.js";
import p from "../base/p.js";

export default [
	{
		title: "Navbar",
		msg: "Documentation and examples for Bootstrap’s powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for Bootstrap collapse plugin.",
		anchor: false,
	},

	{
		title: "Supported content",
		import: ["navbar", "button", "input"],
		code: () => {
			let id = core.UUID();

			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
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
									new navbar.item({ label: "Home", active: true }),
									new navbar.item({ label: "Link" }),
									new navbar.item({
										label: "Dropdown",
										option: [
											{ href: "#", label: "Action" },
											{ href: "#", label: "Another action" },
											{ href: "#", label: "Something else here" },
											{ value: "-" },
											{ href: "#", label: "Separated link" },
										],
									}),
									new navbar.item({ label: "Disabled", disabled: true }),
								],
							}),
							new navbar.formcontainer([
								new input({
									type: "search",
									placeholder: "Search",
									hiddenlabel: "Search",
									class: "me-2",
								}),
								new button({ label: "Search", color: "success", outline: true }),
							]),
						],
					}),
				],
			});
		},
	},

	{
		title: "Brand",
	},

	{
		title: "Text",
		msg: "Add your text within an element with the {{new navbar.brand}}.",
		container: sample.vstackcontainer,
		import: ["navbar"],
		code: () => {
			return [
				new navbar.container({
					expand: "lg",
					color: "light",
					elem: [
						//marker
						new navbar.brand({
							label: "Navbar",
							href: "#",
						}),
					],
				}),

				new navbar.container({
					expand: "lg",
					color: "light",
					elem: [
						new navbar.brand({
							label: "Navbar",
						}),
					],
				}),
			];
		},
	},

	{
		title: "Icon",
		import: ["navbar", "sample"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.brand({
						href: "#",

						//marker
						icon: sample.icon(),
					}),
				],
			});
		},
	},

	{
		title: "Icon and text",
		import: ["navbar", "sample"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.brand({
						href: "#",

						//marker
						icon: sample.icon(),
						label: "Navbar",
					}),
				],
			});
		},
	},

	{
		title: "Nav",
	},

	{
		title: "Nav item",
		import: ["navbar"],
		code: () => {
			var id = core.UUID();
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.toggle({
						//this id must same with new navbar.collapsecontainer id
						//marker
						target: `#${id}`,
						toggle: "collapse",
					}),

					new navbar.brand({
						label: "Navbar",
					}),

					new navbar.collapsecontainer({
						//this id must same with new navbar.toggle id
						//marker
						id: id,
						elem: [
							new navbar.itemcontainer({
								//marker
								parenttype: "collapse",
								elem: [
									new navbar.item({
										label: "Home",
										href: "#",
										active: true,
									}),
									new navbar.item({
										label: "Features",
										href: "#",
									}),
									new navbar.item({
										label: "Pricing",
										href: "#",
									}),
									new navbar.item({
										label: "Disabled",
										href: "#",
										disabled: true,
									}),
								],
							}),
						],
					}),
				],
			});
		},
	},

	{
		title: "Nav item dropdown",
		import: ["navbar"],
		code: () => {
			var id = core.UUID();
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.toggle({
						target: `#${id}`, //this id must same with new navbar.collapsecontainer id
						toggle: "collapse",
					}),

					new navbar.brand({
						label: "Navbar",
					}),

					new navbar.collapsecontainer({
						id: id, //this id must same with new navbar.toggle id
						elem: [
							new navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									new navbar.item({
										label: "Home",
										href: "#",
										active: true,
									}),
									new navbar.item({
										label: "Features",
										href: "#",
									}),
									new navbar.item({
										label: "Pricing",

										//marker
										option: [
											{ href: "#", label: "Action" },
											{ href: "#", label: "Another action" },
											{ href: "#", label: "Something else here" },
											{ value: "-" },
											{ href: "#", label: "Separated link" },
										],
									}),
									new navbar.item({
										label: "Disabled",
										href: "#",
										disabled: true,
									}),
								],
							}),
						],
					}),
				],
			});
		},
	},

	{
		title: "Nav with form",
		import: ["button", "input", "navbar"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					//marker
					new navbar.formcontainer({
						elem: [
							new input({
								type: "search",
								placeholder: "Search",
								hiddenlabel: "Search",
								class: "me-2",
							}),
							new button({ label: "Search", color: "success", outline: true }),
						],
					}),
				],
			});
		},
	},

	{
		title: "Nav with form and header",
		import: ["button", "input", "navbar"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					//marker
					new navbar.brand({
						label: "Navbar",
					}),

					new navbar.formcontainer({
						elem: [
							new input({
								type: "search",
								placeholder: "Search",
								hiddenlabel: "Search",
								class: "me-2",
							}),
							new button({ label: "Search", color: "success", outline: true }),
						],
					}),
				],
			});
		},
	},

	{
		title: "Nav with input group",
		import: ["input", "navbar"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new input({
						type: "text",
						placeholder: "Username",

						//marker
						before: "@",
					}),
				],
			});
		},
	},

	{
		title: "Nav with button",
		import: ["button", "navbar"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				containerclass: "justify-content-start gap-2",

				//marker
				elem: [
					new button({
						label: "Main button",
						color: "success",
						outline: true,
						weight: "lg",
					}),
					new button({
						label: "Small button",
						color: "danger",
						outline: true,
						weight: "sm",
					}),
				],
			});
		},
	},

	{
		title: "Nav with text",
		import: ["navbar"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",

				//marker
				elem: new navbar.text("Navbar text with an inline element"),
			});
		},
	},

	{
		title: "Mix and match",
		import: ["navbar"],
		code: () => {
			var id = core.UUID();
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.brand({
						label: "Navbar w/ text",
					}),

					new navbar.toggle({
						target: `#${id}`, //this id must same with new navbar.collapsecontainer id
						toggle: "collapse",
					}),

					new navbar.collapsecontainer({
						id: id, //this id must same with new navbar.toggle id
						elem: [
							new navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									new navbar.item({
										label: "Home",
										href: "#",
										active: true,
									}),
									new navbar.item({
										label: "Features",
										href: "#",
									}),
									new navbar.item({
										label: "Pricing",
										href: "#",
									}),
								],
							}),
							new navbar.text("Navbar text with an inline element"),
						],
					}),
				],
			});
		},
	},

	{
		title: "Color schemes",
		import: ["navbar", "button", "input"],
		container: sample.vstackcontainer,
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
									new navbar.item({ label: "Home", active: true }),
									new navbar.item({ label: "Link" }),
									new navbar.item({
										label: "Dropdown",
										option: [
											{ href: "#", label: "Action" },
											{ href: "#", label: "Another action" },
											{ href: "#", label: "Something else here" },
											{ value: "-" },
											{ href: "#", label: "Separated link" },
										],
									}),
									new navbar.item({ label: "Disabled", disabled: true }),
								],
							}),
							new navbar.formcontainer([
								new input({
									type: "search",
									placeholder: "Search",
									hiddenlabel: "Search",
									class: "me-2",
								}),
								new button({ label: "Search", color: "success", outline: true }),
							]),
						],
					}),
				];
			};

			return [
				new navbar.container({
					expand: "lg",
					elem: fn(id1),

					//marker
					dark: true,
					color: "dark",
				}),
				new navbar.container({
					expand: "lg",
					elem: fn(id2),

					//marker
					dark: true,
					color: "primary",
				}),
				new navbar.container({
					expand: "lg",
					elem: fn(id3),

					//marker
					style: { "background-color": "#e3f2fd" },
				}),
			];
		},
	},

	{
		title: "Container",
	},

	{
		title: "Inside container",
		import: ["div", "navbar"],
		code: () => {
			return new div({
				//marker
				container: true,

				elem: new navbar.container({
					expand: "lg",
					color: "light",
					elem: [
						new navbar.brand({
							label: "Navbar",
							href: "#",
						}),
					],
				}),
			});
		},
	},

	{
		title: "Change container fluid",
		import: ["navbar"],
		code: () => {
			return new div({
				//marker
				container: "fluid",

				elem: new navbar.container({
					expand: "lg",
					color: "light",
					elem: [
						new navbar.brand({
							label: "Navbar",
							href: "#",
						}),
					],
				}),
			});
		},
	},

	{
		title: "Position",
		import: ["navbar"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.brand({
						label: "Navbar",
						href: "#",
					}),
				],

				//marker
				position: null, //fixed-top|fixed-bottom|sticky-top|null
			});
		},
	},

	{
		title: "Scrolling",
		msg: [
			"Add {{scroll:'height'}} option to a {{new navbar.itemcontainer}} to enable vertical scrolling within the toggleable contents of a collapsed navbar. At larger viewports when the navbar is expanded, content will appear as it does in a default navbar.",
			"Please note that this behavior comes with a potential drawback of overflow—when setting overflow-y: auto (required to scroll the content here), overflow-x is the equivalent of auto, which will crop some horizontal content.",
			"Here’s an example navbar using {{scroll:'height'}}, with some extra margin utilities for optimum spacing.",
		],
		import: ["input", "button", "navbar"],
		code: () => {
			var id = core.UUID();
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
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
									new navbar.item({ label: "Home", active: true }),
									new navbar.item("Link"),
									new navbar.item({
										label: "Dropdown",
										option: [
											{ href: "#", label: "Action" },
											{ href: "#", label: "Another action" },
											{ href: "#", label: "Something else here" },
											{ value: "-" },
											{ href: "#", label: "Separated link" },
										],
									}),
									new navbar.item({ label: "Disabled", disabled: true }),
								],

								//set scroll height here
								//marker
								scroll: "100px",
							}),
							new navbar.formcontainer({
								elem: [
									new input({
										type: "search",
										placeholder: "Search",
										hiddenlabel: "Search",
										class: "me-2",
									}),
									new button({ label: "Search", color: "success", outline: true }),
								],
							}),
						],
					}),
				],
			});
		},
	},

	{
		title: "Responsive behaviors",
		msg: [
			"{{new navbar.container}} can use {{new navbar.toggle}}, {{new navbar.collapsecontainer}}, and add {{expand:'sm|md|lg|xl|xxl'}} option into {{new navbar.container}} to determine when their content collapses behind a button. In combination with other option, you can easily choose when to show or hide particular elements.",
			"For {{new navbar.container}} that never collapse, add the {{expand:''}} option on the {{new navbar.container}}. For {{new navbar.container}} that always collapse, don’t add any .navbar-expand class.",
		],
		container: sample.vstackcontainer,
		import: ["navbar", "button", "input"],
		code: () => {
			let id1 = core.UUID();
			let id2 = core.UUID();
			let id3 = core.UUID();

			let fn = (id, title) => {
				return [
					new navbar.toggle({
						target: `#${id}`,
						toggle: "collapse",
					}),

					new navbar.brand({
						label: title,
					}),

					new navbar.collapsecontainer({
						id: id,
						elem: [
							new navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									new navbar.item({ label: "Home", active: true }),
									new navbar.item({ label: "Link" }),
								],
							}),
							new navbar.formcontainer([
								new input({
									type: "search",
									placeholder: "Search",
									hiddenlabel: "Search",
									class: "me-2",
								}),
								new button({ label: "Search", color: "success", outline: true }),
							]),
						],
					}),
				];
			};

			return [
				new navbar.container({
					color: "light",
					elem: fn(id1, "lg"),

					//marker
					expand: "lg",
				}),
				new navbar.container({
					color: "light",
					elem: fn(id2, '""'),

					//marker
					expand: "",
				}),
				new navbar.container({
					color: "light",
					elem: fn(id3, "null"),

					//marker
					expand: null,
				}),
			];
		},
	},

	{
		title: "Toggle",
		msg: [
			"Navbar toggles are left-aligned by default, but should they follow a sibling element like a .navbar-brand, they’ll automatically be aligned to the far right. Reversing your markup will reverse the placement of the toggle. Below are examples of different toggle styles.",
			"With no .navbar-brand shown at the smallest breakpoint",
		],
		container: sample.vstackcontainer,
		import: ["input", "button", "navbar"],
		code: () => {
			var id1 = core.UUID();
			var id2 = core.UUID();
			var id3 = core.UUID();
			return [
				new navbar.container({
					expand: "lg",
					color: "light",
					elem: [
						//marker
						new navbar.toggle({
							target: `#${id1}`,
							toggle: "collapse",
						}),

						new navbar.collapsecontainer({
							//marker
							id: id1,

							elem: [
								new navbar.brand({
									//brand inside collapsecontainer
									label: "Hidden brand",
								}),
								new navbar.itemcontainer({
									parenttype: "collapse",
									elem: [
										new navbar.item({ label: "Home", active: true }),
										new navbar.item("Link"),
										new navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								new navbar.formcontainer({
									elem: [
										new input({
											type: "search",
											placeholder: "Search",
											hiddenlabel: "Search",
											class: "me-2",
										}),
										new button({ label: "Search", color: "success", outline: true }),
									],
								}),
							],
						}),
					],
				}),
				new navbar.container({
					expand: "lg",
					color: "light",
					elem: [
						new navbar.brand({
							//brand before toggle
							label: "Navbar",
						}),

						//marker
						new navbar.toggle({
							target: `#${id2}`,
							toggle: "collapse",
						}),

						new navbar.collapsecontainer({
							//marker
							id: id2,

							elem: [
								new navbar.itemcontainer({
									parenttype: "collapse",
									elem: [
										new navbar.item({ label: "Home", active: true }),
										new navbar.item("Link"),
										new navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								new navbar.formcontainer({
									elem: [
										new input({
											type: "search",
											placeholder: "Search",
											hiddenlabel: "Search",
											class: "me-2",
										}),
										new button({ label: "Search", color: "success", outline: true }),
									],
								}),
							],
						}),
					],
				}),
				new navbar.container({
					expand: "lg",
					color: "light",
					elem: [
						//marker
						new navbar.toggle({
							target: `#${id3}`,
							toggle: "collapse",
						}),

						new navbar.brand({
							//brand after toggle
							label: "Navbar",
						}),

						new navbar.collapsecontainer({
							//marker
							id: id3,

							elem: [
								new navbar.itemcontainer({
									parenttype: "collapse",
									elem: [
										new navbar.item({ label: "Home", active: true }),
										new navbar.item("Link"),
										new navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								new navbar.formcontainer({
									elem: [
										new input({
											type: "search",
											placeholder: "Search",
											hiddenlabel: "Search",
											class: "me-2",
										}),
										new button({ label: "Search", color: "success", outline: true }),
									],
								}),
							],
						}),
					],
				}),
			];
		},
	},

	{
		title: "External content",
		import: ["div", "h", "span", "navbar"],
		code: () => {
			var id = core.UUID();
			return [
				//collapsecontainer outside container
				new navbar.collapsecontainer({
					//marker
					id: id,

					elem: new div("p-2", [
						new h({ level: 5, elem: "Collapsed content" }),
						new span("text-muted", "Toggleable via the navbar brand."),
					]),
				}),

				new navbar.container({
					expand: null,
					color: "light",
					elem: [
						new navbar.brand({
							label: "Navbar",
							href: "#",
						}),

						//marker
						new navbar.toggle({
							target: `#${id}`,
							toggle: "collapse",
						}),
					],
				}),
			];
		},
	},

	{
		title: "Collapse container event",
		msg: [
			new table.container({
				item: [
					["Option", "Description"],
					[
						"<code>onshow</code>",
						"This event fires immediately when the <code>show</code> instance method is called.",
					],
					[
						"<code>onshown</code>",
						"This event is fired when the collapse container has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>onhide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>onhidden</code>",
						"This event is fired when the collapse container has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
				],
			}),
		],
		import: ["navbar", "button", "input", "toast"],
		code: () => {
			let id = core.UUID();
			let fn = (sender, event) =>
				`Collapse container <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new navbar.container({
				expand: null,
				color: "light",
				elem: [
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
									new navbar.item({ label: "Home", active: true }),
									new navbar.item({ label: "Link" }),
									new navbar.item({
										label: "Dropdown",
										option: [
											{ href: "#", label: "Action" },
											{ href: "#", label: "Another action" },
											{ href: "#", label: "Something else here" },
											{ value: "-" },
											{ href: "#", label: "Separated link" },
										],
									}),
									new navbar.item({ label: "Disabled", disabled: true }),
								],
							}),
							new navbar.formcontainer([
								new input({
									type: "search",
									placeholder: "Search",
									hiddenlabel: "Search",
									class: "me-2",
								}),
								new button({ label: "Search", color: "success", outline: true }),
							]),
						],

						//marker
						onshow: (event) => {
							new toast("i", fn(event.currentTarget, "onshow")).show();
						},
						onshown: (event) => {
							new toast("/", fn(event.currentTarget, "onshown")).show();
						},
						onhide: (event) => {
							new toast("!", fn(event.currentTarget, "onhide")).show();
						},
						onhidden: (event) => {
							new toast("x", fn(event.currentTarget, "onhidden")).show();
						},
					}),
				],
			});
		},
	},

	{
		title: "Offcanvas container event",
		msg: [
			new table.container({
				item: [
					["Option", "Description"],
					[
						"<code>onshow</code>",
						"This event fires immediately when the <code>show</code> instance method is called.",
					],
					[
						"<code>onshown</code>",
						"This event is fired when the collapse container has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>onhide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>onhidden</code>",
						"This event is fired when the collapse container has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
				],
			}),
		],
		import: ["navbar", "toast"],
		code: () => {
			let id = core.UUID();
			let fn = (sender, event) => `Offcanvas <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new navbar.container({
				expand: null,
				color: "light",
				elem: [
					new navbar.toggle({
						target: `#${id}`,
						toggle: "offcanvas",
					}),

					new navbar.brand({
						label: "Navbar",
					}),

					new navbar.offcanvascontainer({
						id: id,
						placement: "start",
						elem: new div({
							elem: [
								new navbar.itemcontainer({
									parenttype: "offcanvas",
									elem: [
										new navbar.item({ label: "Home", active: true }),
										new navbar.item({ label: "Link" }),
										new navbar.item({
											label: "Dropdown",
											option: [
												{ href: "#", label: "Action" },
												{ href: "#", label: "Another action" },
												{ href: "#", label: "Something else here" },
												{ value: "-" },
												{ href: "#", label: "Separated link" },
											],
										}),
										new navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
							],
						}),

						//marker
						onshow: (event) => {
							new toast("i", fn(event.currentTarget, "onshow")).show();
						},
						onshown: (event) => {
							new toast("/", fn(event.currentTarget, "onshown")).show();
						},
						onhide: (event) => {
							new toast("!", fn(event.currentTarget, "onhide")).show();
						},
						onhidden: (event) => {
							new toast("x", fn(event.currentTarget, "onhidden")).show();
						},
					}),
				],
			});
		},
	},
];
