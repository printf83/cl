"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import * as card from "../base/card.js";
import button from "../base/button.js";
import listgroup from "../base/listgroup.js";
import tab from "../base/tab.js";
import div from "../base/div.js";
import p from "../base/p.js";
import small from "../base/small.js";
import footer from "../base/footer.js";
import cite from "../base/cite.js";
import blockquote from "../base/blockquote.js";

export default [
	{
		title: "Cards",
		msg: "Bootstrap’s cards provide a flexible and extensible content container with multiple variants and option.",
		anchor: false,
	},

	{
		title: "Example",
		import: ["button", "card", "sample"],
		code: () => {
			return new card.container({
				width: "18rem",
				elem: [
					new card.img({ "data-test": "card.img", placement: "top", src: sample.img(286, 143) }),
					new card.body({
						elem: [
							new card.title("Card Title"),
							new card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
							new button({ label: "Go somewhere", color: "primary" }),
						],
					}),
				],
			});
		},
	},

	{
		title: "Body",
		msg: "The building block of a card is the {{card.body}}. Use it whenever you need a padded section within a card.",
		import: ["card"],
		code: () => {
			return new card.container(/*marker*/ new card.body("This is some text within a card body."));
		},
	},

	{
		title: "Titles, subtitle, text, and links",
		msg: [
			"Card titles are used by adding {{card.title}}. In the same way, links are added and placed next to each other by adding {{card.link}}.",
			"Subtitles are used by adding a {{card.subtitle}}. If the {{card.title}} and the {{card.subtitle}} items are placed in a {{card.body}} item, the card title and subtitle are aligned nicely.",
		],
		import: ["card"],
		code: () => {
			return new card.container({
				width: "18rem",
				elem: new card.body({
					//marker
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
					//-
				}),
			});
		},
	},

	{
		title: "Images",
		msg: '{{placement: "top"}} places an {{card.img}} to the top of the card. With {{card.text}}, text can be added to the card. Text within {{card.text}} can also be styled with the standard HTML tags.',
		import: ["card", "sample"],
		code: () => {
			return new card.container({
				width: "18rem",
				elem: [
					//marker
					new card.img({
						placement: "top",
						src: sample.img(286, 143),
					}),
					//-

					new card.body({
						elem: new card.text({
							elem: "Some quick example text to build on the card title and make up the bulk of the card's content.",
						}),
					}),
				],
			});
		},
	},

	{
		title: "List groups",
		msg: "Create lists of content in a card with a flush list group.",
		import: ["listgroup", "card"],
		code: () => {
			return new card.container({
				width: "18rem",

				//marker
				elem: new listgroup({
					flush: true,
					item: [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }],
				}),
				//-
			});
		},
	},

	{
		title: "List groups with card header",
		import: ["listgroup", "card"],
		code: () => {
			return new card.container({
				width: "18rem",

				//marker
				elem: [
					new card.header("Feature"),
					new listgroup({
						flush: true,
						item: [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }],
					}),
				],
				//-
			});
		},
	},

	{
		title: "List groups with card footer",
		import: ["listgroup", "card"],
		code: () => {
			return new card.container({
				width: "18rem",

				//marker
				elem: [
					new listgroup({
						flush: true,
						item: [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }],
					}),
					new card.footer({
						muted: false,
						elem: "Card footer",
					}),
				],
				//-
			});
		},
	},

	{
		title: "Kitchen Sink",
		msg: "Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.",
		import: ["listgroup", "card", "sample"],
		code: () => {
			return new card.container({
				width: "18rem",
				elem: [
					new card.img({
						placement: "top",
						src: sample.img(286, 143),
					}),
					new card.body({
						elem: [
							new card.title("Card Title"),
							new card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
						],
					}),
					new listgroup({
						flush: true,
						item: [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }],
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
				],
			});
		},
	},

	{
		title: "Header and footer",
		msg: "Add an optional header and/or footer within a card.",
		import: ["button", "card"],
		code: () => {
			return new card.container({
				elem: [
					new card.header("Feature"), //marker
					new card.body({
						elem: [
							new card.title("Special title treatment"),
							new card.text("With supporting text below as a natural lead-in to additional content."),
							new button({ label: "Go somewhere", color: "primary" }),
						],
					}),
					new card.footer("2 days ago"), //marker
				],
			});
		},
	},

	{
		title: "Header with {{h*}} class",
		msg: 'Card headers can be styled by adding {{class: "h*"}} elements into {{card.header}}.',
		import: ["button", "card"],
		code: () => {
			return new card.container({
				elem: [
					new card.header({
						class: "h5", //marker
						elem: "Feature",
					}),
					new card.body({
						elem: [
							new card.title("Special title treatment"),
							new card.text("With supporting text below as a natural lead-in to additional content."),
							new button({ label: "Go somewhere", color: "primary" }),
						],
					}),
				],
			});
		},
	},

	{
		title: "Quote",
		import: ["tag", "p", "blockquote", "footer", "cite", "card"],
		code: () => {
			return new card.container({
				elem: [
					new card.header("Quote"),
					new card.body({
						//marker
						elem: new blockquote({
							class: "mb-0",
							elem: [
								new p("A well-known quote, contained in a blockquote element."),
								new footer({
									class: "blockquote-footer",
									elem: [
										"Someone famous in",
										new cite({
											title: "Source Title",
											elem: "Source Title",
										}),
									],
								}),
							],
						}),
					}),
				],
			});
		},
	},

	{
		title: "Align center card text",
		import: ["button", "card"],
		code: () => {
			return new card.container({
				align: "center", //marker
				elem: [
					new card.header("Feature"),
					new card.body({
						elem: [
							new card.title("Special title treatment"),
							new card.text("With supporting text below as a natural lead-in to additional content."),
							new button({ label: "Go somewhere", color: "primary" }),
						],
					}),
					new card.footer("2 days ago"),
				],
			});
		},
	},

	{
		title: "Sizing",
		msg: "Cards assume no specific width to start, so they’ll be 100% wide unless otherwise stated. You can change this as needed with custom CSS, grid classes, grid Sass mixins, or utilities.",
	},

	{
		title: "Using grid markup",
		msg: "Using the grid, wrap cards in columns and rows as needed.",
		import: ["div", "button", "card"],
		code: () => {
			return new div({
				row: true, //marker
				gap: 2,
				elem: [
					new div({
						col: "sm-6", //marker
						elem: new card.container({
							elem: [
								new card.body({
									elem: [
										new card.title("Special title treatment"),
										new card.text(
											"With supporting text below as a natural lead-in to additional content."
										),
										new button({ label: "Go somewhere", color: "primary" }),
									],
								}),
							],
						}),
					}),
					new div({
						col: "sm-6", //marker
						elem: new card.container({
							elem: [
								new card.body({
									elem: [
										new card.title("Special title treatment"),
										new card.text(
											"With supporting text below as a natural lead-in to additional content."
										),
										new button({ label: "Go somewhere", color: "primary" }),
									],
								}),
							],
						}),
					}),
				],
			});
		},
	},

	{
		title: "Using utilities",
		msg: "Use Bootstrap handful of available sizing utilities to quickly set a card’s width.",
		import: ["button", "card"],
		code: () => {
			return [
				new card.container({
					class: "w-75 mb-3", //marker
					elem: [
						new card.body({
							elem: [
								new card.title("Special title treatment"),
								new card.text("With supporting text below as a natural lead-in to additional content."),
								new button({ label: "Button", color: "primary" }),
							],
						}),
					],
				}),
				new card.container({
					class: "w-50", //marker
					elem: [
						new card.body({
							elem: [
								new card.title("Special title treatment"),
								new card.text("With supporting text below as a natural lead-in to additional content."),
								new button({ label: "Button", color: "primary" }),
							],
						}),
					],
				}),
			];
		},
	},

	{
		title: "Using custom CSS",
		msg: "Use custom CSS in your stylesheets or as inline styles to set a width.",
		import: ["button", "card"],
		code: () => {
			return [
				new card.container({
					width: "18rem", //marker
					elem: [
						new card.body({
							elem: [
								new card.title("Special title treatment"),
								new card.text("With supporting text below as a natural lead-in to additional content."),
								new button({ label: "Go somewhere", color: "primary" }),
							],
						}),
					],
				}),
			];
		},
	},

	{
		title: "Text alignment",
		msg: 'You can quickly change the text alignment of any card—in its entirety or specific parts—with {{align:"null|center|end"}}.',
		container: sample.stackcontainer,
		import: ["button", "card"],
		code: () => {
			return [
				new card.container({
					align: "start", //marker
					width: "18rem",
					elem: [
						new card.body({
							elem: [
								new card.title("Special title treatment"),
								new card.text("With supporting text below as a natural lead-in to additional content."),
								new button({ label: "Go somewhere", color: "primary" }),
							],
						}),
					],
				}),
				new card.container({
					align: "center", //marker
					width: "18rem",
					elem: [
						new card.body({
							elem: [
								new card.title("Special title treatment"),
								new card.text("With supporting text below as a natural lead-in to additional content."),
								new button({ label: "Go somewhere", color: "primary" }),
							],
						}),
					],
				}),
				new card.container({
					align: "end", //marker
					width: "18rem",
					elem: [
						new card.body({
							elem: [
								new card.title("Special title treatment"),
								new card.text("With supporting text below as a natural lead-in to additional content."),
								new button({ label: "Go somewhere", color: "primary" }),
							],
						}),
					],
				}),
			];
		},
	},

	{
		title: "Tab in card",
		msg: "{{tab}} is working navbar in card",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "tab",
				item: [
					{
						label: "First",
						active: true,
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
				],
			});
		},
	},

	{
		title: "Pill style tab",
		import: ["tab", "sample"],
		code: () => {
			return new tab({
				type: "pill", //marker
				item: [
					{
						label: "First",
						active: true,
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
				],
			});
		},
	},

	{
		title: "Images",
		container: sample.stackcontainer,
		import: ["small", "card", "sample"],
		code: () => {
			return [
				new card.container({
					elem: [
						//marker
						new card.img({
							placement: "top",
							src: sample.img(857, 428),
						}),
						//-

						new card.body({
							elem: [
								new card.title("Card Title"),
								new card.text(
									"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
								),
								new card.text({ color: "muted", elem: new small("Last updated 3 mins ago") }),
							],
						}),
					],
				}),
				new card.container({
					elem: [
						new card.body({
							elem: [
								new card.title("Card Title"),
								new card.text(
									"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
								),
								new card.text({ color: "muted", elem: new small("Last updated 3 mins ago") }),
							],
						}),

						//marker
						new card.img({
							placement: "bottom",
							src: sample.img(857, 428),
						}),
						//-
					],
				}),
			];
		},
	},

	{
		title: "Image overlays",
		import: ["small", "card", "sample"],
		code: () => {
			return new card.container({
				textColor: "light",
				elem: [
					new card.img({
						src: sample.img(857, 428),
					}),

					//marker
					new card.imgoverlay({
						elem: [
							new card.title("Card Title"),
							new card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
							new card.text({ color: "muted", elem: new small("Last updated 3 mins ago") }),
						],
					}),
					//-
				],
			});
		},
	},

	{
		title: "Horizontal",
		import: ["small", "card", "sample"],
		code: () => {
			return new card.container({
				height: 100,
				elem: [
					/*marker*/ new card.horizontal({
						size: "sm-4",
						start: [
							new card.img({
								placement: "left",
								src: sample.img(285, 285),
							}),
						],
						end: new card.container({
							height: 100,
							flush: true,
							elem: [
								new card.header({
									elem: "Header",
								}),
								new card.body({
									elem: [
										new card.title("Card Title"),
										new card.text(
											"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
										),
										new card.text({
											color: "muted",
											elem: new small("Last updated 3 mins ago"),
										}),
									],
								}),
								new card.footer({
									elem: "Footer",
								}),
							],
						}),
					}),
				],
			});
		},
	},

	{
		title: "Card styles",
		msg: "Cards include various options for customizing their backgrounds, borders, and color.",
	},

	{
		title: "Background and color",
		container: sample.stackcontainer,
		import: ["card"],
		code: () => {
			return new card.container({
				bgColor: "primary", //marker
				textBgColor: "primary", //marker
				width: "18rem",
				elem: [
					new card.header("Header"),
					new card.body({
						elem: [
							new card.title("Primary card title"),
							new card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
						],
					}),
				],
			});
		},
	},

	{
		title: "Example background and color",
		container: sample.stackcontainer,

		import: ["card"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new card.container({
					bgColor: i, //marker
					textBgColor: i, //marker
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
		title: "Border color",
		container: sample.stackcontainer,

		import: ["card"],
		code: () => {
			return new card.container({
				width: "18rem",
				elem: [
					new card.header("Header"),
					new card.body({
						textColor: "primary",
						elem: [
							new card.title("Primary card title"),
							new card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
						],
					}),
				],

				borderColor: "primary",
			});
		},
	},

	{
		title: "Example border color",
		container: sample.stackcontainer,

		import: ["card"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
				return new card.container({
					borderColor: i, //marker
					textColor: i, //marker
					width: "18rem",
					elem: [
						new card.header("Header"),
						new card.body({
							textColor: i,
							elem: [
								new card.title(`${core.capitalize(i)} card title`),
								new card.text(
									"Some quick example text to build on the card title and make up the bulk of the card's content."
								),
							],
						}),
					],
				});
			});
		},
	},

	{
		title: "Mixins utilities",
		container: sample.stackcontainer,
		import: ["card"],
		code: () => {
			return new card.container({
				borderColor: "success",
				width: "18rem",
				elem: [
					new card.header({
						bgColor: "success",
						textBgColor: "success",
						elem: "Header",
					}),
					new card.body({
						textColor: "success",
						elem: [
							new card.title("Success card title"),
							new card.text(
								"Some quick example text to build on the card title and make up the bulk of the card's content."
							),
						],
					}),
					new card.footer({
						elem: "Footer",
					}),
				],
			});
		},
	},

	{
		title: "Card groups",
		container: sample.stackcontainer,
		import: ["card", "sample"],
		code: () => {
			const str = [
				"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
				"This card has supporting text below as a natural lead-in to additional content.",
				"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
			];

			let fn = (str) => {
				return new card.container({
					elem: [
						new card.img({
							placement: "top",
							src: sample.img(415, 207),
						}),
						new card.body({
							elem: [new card.title("Card Title"), new card.text(str)],
						}),
					],
				});
			};

			//marker
			return new card.group({
				elem: [fn(str[0]), fn(str[1]), fn(str[2])],
			});
			//-
		},
	},

	{
		title: "Card groups with footer",
		container: sample.stackcontainer,
		import: ["card", "sample"],
		code: () => {
			const str = [
				"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
				"This card has supporting text below as a natural lead-in to additional content.",
				"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
			];

			let fn = (str) => {
				return new card.container({
					elem: [
						new card.img({
							placement: "top",
							src: sample.img(415, 207),
						}),
						new card.body({
							elem: [new card.title("Card Title"), new card.text(str)],
						}),
						new card.footer("Last updated 3 mins ago"), //marker
					],
				});
			};

			//marker
			return new card.group({
				elem: [fn(str[0]), fn(str[1]), fn(str[2])],
			});
			//-
		},
	},

	{
		title: "Card grid using {{row-cols-md-2}}",
		import: ["div", "card", "sample"],
		code: () => {
			const str = [
				"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
				"This card has supporting text below as a natural lead-in to additional content.",
				"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
			];

			let fn = (str) => {
				return new card.container({
					elem: [
						new card.img({
							placement: "top",
							src: sample.img(415, 207),
						}),
						new card.body({
							elem: [new card.title("Card Title"), new card.text(str)],
						}),
					],
				});
			};

			return new div({
				row: true,
				gap: 4,
				elem: [
					new div({ col: true, elem: fn(str[0]) }),
					new div({ col: true, elem: fn(str[1]) }),
					new div({ col: true, elem: fn(str[1]) }),
					new div({ col: true, elem: fn(str[2]) }),
				],

				//marker
				rowCol: [1, "md-2"],
			});
		},
	},

	{
		title: "Card grid using {{row-cols-md-3}}",
		import: ["div", "card", "sample"],
		code: () => {
			const str = [
				"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
				"This card has supporting text below as a natural lead-in to additional content.",
				"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
			];

			let fn = (str) => {
				return new card.container({
					elem: [
						new card.img({
							placement: "top",
							src: sample.img(415, 207),
						}),
						new card.body({
							elem: [new card.title("Card Title"), new card.text(str)],
						}),
					],
				});
			};

			return new div({
				row: true,
				gap: 4,
				elem: [
					new div({ col: true, elem: fn(str[0]) }),
					new div({ col: true, elem: fn(str[1]) }),
					new div({ col: true, elem: fn(str[1]) }),
					new div({ col: true, elem: fn(str[2]) }),
				],

				//marker
				rowCol: [1, "md-3"],
			});
		},
	},

	{
		title: "Card grid with {{h-100}} class",
		import: ["div", "card", "sample"],
		code: () => {
			const str = [
				"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
				"This card has supporting text below as a natural lead-in to additional content.",
				"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
			];

			let fn = (str) => {
				return new card.container({
					elem: [
						new card.img({
							placement: "top",
							src: sample.img(286, 143),
						}),
						new card.body({
							elem: [new card.title("Card Title"), new card.text(str)],
						}),
					],

					//marker
					height: 100,
				});
			};

			return new div({
				row: true,
				rowCol: [1, "md-3"],
				gap: 4,
				elem: [
					new div({ col: true, elem: fn(str[0]) }),
					new div({ col: true, elem: fn(str[1]) }),
					new div({ col: true, elem: fn(str[1]) }),
					new div({ col: true, elem: fn(str[2]) }),
				],
			});
		},
	},

	{
		title: "Card grid with {{h-100}} class",
		import: ["div", "card", "sample"],
		code: () => {
			const str = [
				"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
				"This card has supporting text below as a natural lead-in to additional content.",
				"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
			];

			let fn = (str) => {
				return new card.container({
					elem: [
						new card.img({
							placement: "top",
							src: sample.img(286, 143),
						}),
						new card.body({
							elem: [new card.title("Card Title"), new card.text(str)],
						}),
						new card.footer("Last updated 3 mins ago"),
					],

					//marker
					height: 100,
				});
			};

			return new div({
				row: true,
				rowCol: [1, "md-3"],
				gap: 4,
				elem: [
					new div({ col: true, elem: fn(str[0]) }),
					new div({ col: true, elem: fn(str[1]) }),
					new div({ col: true, elem: fn(str[1]) }),
					new div({ col: true, elem: fn(str[2]) }),
				],
			});
		},
	},
];
