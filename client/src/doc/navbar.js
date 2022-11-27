"use strict";
import sample from "./sample.js";
import button from "../dist/cl/base/button.js";
import * as core from "../dist/cl/base/core.js";
import div from "../dist/cl/base/div.js";
import h from "../dist/cl/base/h.js";
import input from "../dist/cl/base/input.js";
import * as navbar from "../dist/cl/base/navbar.js";
import span from "../dist/cl/base/span.js";
import toast from "../dist/cl/base/toast.js";
import * as table from "../dist/cl/base/table.js";
import dropdown from "../dist/cl/base/dropdown.js";
import p from "../dist/cl/base/p.js";
import fn from "./sample.js";

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
					new navbar.brand({
						label: "Navbar",
						href: "#",
					}),

					new navbar.toggle({
						target: `#${id}`,
						toggle: "collapse",
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
						//-
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
						icon: sample.icon(), //marker
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
						//-
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
					new navbar.brand({
						label: "Navbar",
						href: "#",
					}),

					new navbar.toggle({
						//this id must same with new navbar.collapsecontainer id
						target: `#${id}`, //marker
						toggle: "collapse",
					}),

					new navbar.collapsecontainer({
						//this id must same with new navbar.toggle id
						id: id, //marker

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
					new navbar.brand({
						label: "Navbar",
						href: "#",
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
									new navbar.item({
										label: "Dropdown link",

										//marker
										option: [
											{ href: "#", label: "Action" },
											{ href: "#", label: "Another action" },
											{ href: "#", label: "Something else here" },
										],
										//-
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
							}),
							new button({ label: "Search", color: "success", outline: true }),
						],
					}),
					//-
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
						href: "#",
					}),
					//-

					new navbar.formcontainer({
						elem: [
							new input({
								type: "search",
								placeholder: "Search",
								hiddenlabel: "Search",
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
				//-
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
						href: "#",
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
					new navbar.brand({
						label: "Navbar",
						href: "#",
					}),

					new navbar.toggle({
						target: `#${id}`,
						toggle: "collapse",
					}),

					new navbar.collapsecontainer({
						id: id,
						elem: [
							new navbar.itemcontainer({
								parenttype: "collapse",
								elem: [
									new navbar.item({ label: "Home", active: true }),
									new navbar.item({ label: "Features" }),
									new navbar.item({ label: "Pricing" }),
									new navbar.item({ label: "About" }),
								],
							}),
							new navbar.formcontainer([
								new input({
									type: "search",
									placeholder: "Search",
									hiddenlabel: "Search",
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
					color: "dark", //marker
				}),
				new navbar.container({
					expand: "lg",
					elem: fn(id2),
					color: "primary", //marker
				}),
				new navbar.container({
					expand: "lg",
					elem: fn(id3),
					backgroundColor: "#e3f2fd", //marker
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
				container: true, //marker

				elem: new navbar.container({
					expand: "lg",
					color: "light",
					elem: new div({
						container: "fluid", //marker
						elem: new navbar.brand({
							label: "Navbar",
							href: "#",
						}),
					}),
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
					new navbar.brand({
						label: "Navbar scroll",
						href: "#",
					}),

					new navbar.toggle({
						target: `#${id}`,
						toggle: "collapse",
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
						href: "#",
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
					elem: fn(id1, "xl"),

					//marker
					expand: "xl",
				}),
				new navbar.container({
					color: "light",
					elem: fn(id2, "lg"),

					//marker
					expand: "lg",
				}),
				new navbar.container({
					color: "light",
					elem: fn(id3, "md"),

					//marker
					expand: "md",
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
						//-

						new navbar.collapsecontainer({
							//marker
							id: id1,

							elem: [
								new navbar.brand({
									//brand inside collapsecontainer
									label: "Hidden brand",
									href: "#",
								}),
								new navbar.itemcontainer({
									parenttype: "collapse",
									elem: [
										new navbar.item({ label: "Home", active: true }),
										new navbar.item({ label: "Link" }),
										new navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								new navbar.formcontainer({
									elem: [
										new input({
											type: "search",
											placeholder: "Search",
											hiddenlabel: "Search",
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
							href: "#",
						}),

						//marker
						new navbar.toggle({
							target: `#${id2}`,
							toggle: "collapse",
						}),
						//-

						new navbar.collapsecontainer({
							//marker
							id: id2,

							elem: [
								new navbar.itemcontainer({
									parenttype: "collapse",
									elem: [
										new navbar.item({ label: "Home", active: true }),
										new navbar.item({ label: "Link" }),
										new navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								new navbar.formcontainer({
									elem: [
										new input({
											type: "search",
											placeholder: "Search",
											hiddenlabel: "Search",
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
						//-

						new navbar.brand({
							label: "Navbar",
							href: "#",
						}),

						new navbar.collapsecontainer({
							//marker
							id: id3,

							elem: [
								new navbar.itemcontainer({
									parenttype: "collapse",
									elem: [
										new navbar.item({ label: "Home", active: true }),
										new navbar.item({ label: "Link" }),
										new navbar.item({ label: "Disabled", disabled: true }),
									],
								}),
								new navbar.formcontainer({
									elem: [
										new input({
											type: "search",
											placeholder: "Search",
											hiddenlabel: "Search",
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
					id: id, //marker
					bgColor: "dark",
					textBgColor: "dark",
					// padding: 4, //dont put padding here
					elem: new div({
						padding: 4, //put padding here to prevent lagging
						elem: [
							new h({ level: 5, elem: "Collapsed content" }),
							new span("text-muted", "Toggleable via the navbar brand."),
						],
					}),
				}),

				new navbar.container({
					expand: null,
					color: "dark",
					elem: new div({
						container: "fluid",
						elem: [
							//marker
							new navbar.toggle({
								target: `#${id}`,
								toggle: "collapse",
							}),
							//-
						],
					}),
				}),
			];
		},
	},

	{
		title: "Offcanvas",
		container: sample.vstackcontainer,
		import: ["navbar"],
		code: () => {
			let id1 = core.UUID();
			let id2 = core.UUID();
			let fn = (id, color, title) => {
				return [
					new navbar.brand({
						label: title,
						href: "#",
					}),

					new navbar.toggle({
						target: `#${id}`,
						toggle: "offcanvas",
					}),

					new navbar.offcanvascontainer({
						id: id,
						placement: "end",
						color: color,
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
					}),
				];
			};

			return [
				new navbar.container({
					expand: "lg",
					elem: fn(id1, "light", "Light Offcanvas"),
				}),
				new navbar.container({
					expand: "lg",
					color: "dark",
					elem: fn(id2, "dark", "Dark Offcanvas"),
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
						"<code>show</code>",
						"This event fires immediately when the <code>show</code> instance method is called.",
					],
					[
						"<code>shown</code>",
						"This event is fired when the collapse container has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>hide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>hidden</code>",
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
				expand: "lg",
				elem: [
					new navbar.brand({
						label: "Navbar event",
						href: "#",
					}),

					new navbar.toggle({
						target: `#${id}`,
						toggle: "collapse",
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
								}),
								new button({ label: "Search", color: "success", outline: true }),
							]),
						],

						//marker
						show: (event) => {
							new toast("i", fn(event.currentTarget, "show")).show();
						},
						shown: (event) => {
							new toast("/", fn(event.currentTarget, "shown")).show();
						},
						hide: (event) => {
							new toast("!", fn(event.currentTarget, "hide")).show();
						},
						hidden: (event) => {
							new toast("x", fn(event.currentTarget, "hidden")).show();
						},
						//-
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
						"<code>show</code>",
						"This event fires immediately when the <code>show</code> instance method is called.",
					],
					[
						"<code>shown</code>",
						"This event is fired when the collapse container has been made visible to the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>hide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>hidden</code>",
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
				expand: "lg",
				elem: [
					new navbar.brand({
						label: "Offcanvas event",
						href: "#",
					}),

					new navbar.toggle({
						target: `#${id}`,
						toggle: "offcanvas",
					}),

					new navbar.offcanvascontainer({
						id: id,
						placement: "end",
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
						show: (event) => {
							new toast("i", fn(event.currentTarget, "show")).show();
						},
						shown: (event) => {
							new toast("/", fn(event.currentTarget, "shown")).show();
						},
						hide: (event) => {
							new toast("!", fn(event.currentTarget, "hide")).show();
						},
						hidden: (event) => {
							new toast("x", fn(event.currentTarget, "hidden")).show();
						},
						//-
					}),
				],
			});
		},
	},
];
