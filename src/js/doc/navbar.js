"use strict";
import sample from "./sample.js";
import button from "../base/button.js";
import * as core from "../base/core.js";
import div from "../base/div.js";
import h from "../base/h.js";
import input from "../base/input.js";
import * as navbar from "../base/navbar.js";
import span from "../base/span.js";

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
		container: sample.formcontainer,
		import: ["navbar"],
		code: () => {
			return [
				new navbar.container({
					expand: "lg",
					color: "light",
					elem: [
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
		import: ["navbar"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.brand({
						icon: { icon: "fire", color: "danger" },
						href: "#",
					}),
				],
			});
		},
	},

	{
		title: "Icon and text",
		import: ["navbar"],
		code: () => {
			return new navbar.container({
				expand: "lg",
				color: "light",
				elem: [
					new navbar.brand({
						icon: { icon: "fire", color: "danger" },
						label: "Navbar",
						href: "#",
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
						before: "@",
						placeholder: "Username",
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
				elem: [
					new button({
						label: "Main button",
						color: "success",
						outline: true,
						weight: "lg",
					}),
					new button({
						label: "Small button",
						color: "secondary",
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
		container: sample.formcontainer,
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
					dark: true,
					color: "dark",
					elem: fn(id1),
				}),
				new navbar.container({
					expand: "lg",
					dark: true,
					color: "primary",
					elem: fn(id2),
				}),
				new navbar.container({
					expand: "lg",
					style: { backgroundColor: "#e3f2fd" },
					elem: fn(id3),
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
				class: "container",
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
			return new navbar.container({
				expand: "lg",
				color: "light",
				containerfluid: "md",
				elem: [
					new navbar.brand({
						label: "Navbar",
						href: "#",
					}),
				],
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
				position: null, //fixed-top|fixed-bottom|sticky-top|null
				elem: [
					new navbar.brand({
						label: "Navbar",
						href: "#",
					}),
				],
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
								scroll: "100px", //set scroll height here
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
		container: sample.formcontainer,
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
					color: "light",
					elem: fn(id1, "lg"),
				}),
				new navbar.container({
					expand: "",
					color: "light",
					elem: fn(id2, '""'),
				}),
				new navbar.container({
					expand: null,
					color: "light",
					elem: fn(id3, "null"),
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
		container: sample.formcontainer,
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
						new navbar.toggle({
							target: `#${id1}`,
							toggle: "collapse",
						}),

						new navbar.collapsecontainer({
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

						new navbar.toggle({
							target: `#${id2}`,
							toggle: "collapse",
						}),

						new navbar.collapsecontainer({
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
						new navbar.toggle({
							target: `#${id3}`,
							toggle: "collapse",
						}),

						new navbar.brand({
							//brand after toggle
							label: "Navbar",
						}),

						new navbar.collapsecontainer({
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
						new navbar.toggle({
							target: `#${id}`,
							toggle: "collapse",
						}),
					],
				}),
			];
		},
	},
];
