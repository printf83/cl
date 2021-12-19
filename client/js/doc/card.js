"use strict";
import * as core from "../base/core.js";
import * as doc_core from "./core.js";
import * as sample from "./sample.js";
import * as card from "../base/card.js";
import listgroup from "../base/listgroup.js";
import button from "../base/button.js";
import div from "../base/div.js";
import tag from "../base/tag.js";
import p from "../base/p.js";
import tab from "../base/tab.js";
import small from "../base/small.js";

export default [
	{
		title: "Cards",
		msg: "Bootstrap’s cards provide a flexible and extensible content container with multiple variants and optionew ",
		anchor: false,
	},

	{
		title: "Example",
		sample: { "sample.img": sample.img },
		code: function () {
			return new card.container({
				style: { width: "18rem" },
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
		code: function () {
			return new card.container(new card.body("This is some text within a card body."));
		},
	},

	{
		title: "Titles, text, and links",
		msg: [
			"Card titles are used by adding {{card.title}}. In the same way, links are added and placed next to each other by adding {{card.link}}.",
			"Subtitles are used by adding a {{card.subtitle}}. If the {{card.title}} and the {{card.subtitle}} items are placed in a {{card.body}} item, the card title and subtitle are aligned nicely.",
		],
		code: function () {
			return new card.container({
				style: { width: "18rem" },
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
		title: "Images",
		msg: '{{placement: "top"}} places an {{card.img}} to the top of the card. With {{card.text}}, text can be added to the card. Text within {{card.text}} can also be styled with the standard HTML tags.',
		sample: { "sample.img": sample.img },
		code: function () {
			return new card.container({
				style: { width: "18rem" },
				elem: [
					new card.img({
						placement: "top",
						src: sample.img(286, 143),
					}),
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
		code: function () {
			return new card.container({
				style: { width: "18rem" },
				elem: new listgroup({
					flush: true,
					item: [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }],
				}),
			});
		},
	},

	{
		title: "List groups with card header",
		code: function () {
			return new card.container({
				style: { width: "18rem" },
				elem: [
					new card.header("Feature"),
					new listgroup({
						flush: true,
						item: [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }],
					}),
				],
			});
		},
	},

	{
		title: "List groups with card footer",
		code: function () {
			return new card.container({
				style: { width: "18rem" },
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
			});
		},
	},

	{
		title: "Kitchen Sink",
		msg: "Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.",
		sample: { "sample.img": sample.img },
		code: function () {
			return new card.container({
				style: { width: "18rem" },
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
		code: function () {
			return new card.container({
				elem: [
					new card.header("Feature"),
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
		title: "Header with {{h*}} class",
		msg: 'Card headers can be styled by adding {{class: "h*"}} elements into {{card.header}}.',
		code: function () {
			return new card.container({
				elem: [
					new card.header({
						class: "h5",
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
		code: function () {
			return new card.container({
				elem: [
					new card.header("Quote"),
					new card.body({
						elem: new tag({
							tag: "blockquote",
							class: "mb-0",
							elem: [
								new p("A well-known quote, contained in a blockquote element."),
								new tag({
									tag: "footer",
									class: "blockquote-footer",
									elem: [
										"Someone famous in",
										new tag({
											tag: "cite",
											attr: { title: "Source Title" },
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
		code: function () {
			return new card.container({
				align: "center",
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
		code: function () {
			return new div({
				row: true,
				gap: 2,
				elem: [
					new div({
						col: "sm-6",
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
						col: "sm-6",
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
		msg: "Use our handful of available sizing utilities to quickly set a card’s width.",
		code: function () {
			return [
				new card.container({
					class: "w-75 mb-3",
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
					class: "w-50",
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
		code: function () {
			return [
				new card.container({
					style: { width: "18rem" },
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
		container: doc_core.stackcontainer,
		code: function () {
			return [
				new card.container({
					style: { width: "18rem" },
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
					align: "center",
					style: { width: "18rem" },
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
					align: "end",
					style: { width: "18rem" },
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
		sample: { "sample.text": sample.text },
		code: function () {
			return new tab({
				type: "tab",
				item: [
					{
						label: "First",
						active: true,
						elem: ["<b>This is the first item's tab body.</b> ", sample.text()].join(""),
					},
					{
						label: "Second",
						elem: ["<b>This is the second item's tab body.</b> ", sample.text()].join(""),
					},
					{
						label: "Third",
						elem: ["<b>This is the third item's tab body.</b> ", sample.text()].join(""),
					},
				],
			});
		},
	},

	{
		title: "Pill style tab",
		sample: { "sample.text": sample.text },
		code: function () {
			return new tab({
				type: "pill",
				item: [
					{
						label: "First",
						active: true,
						elem: ["<b>This is the first item's tab body.</b> ", sample.text()].join(""),
					},
					{
						label: "Second",
						elem: ["<b>This is the second item's tab body.</b> ", sample.text()].join(""),
					},
					{
						label: "Third",
						elem: ["<b>This is the third item's tab body.</b> ", sample.text()].join(""),
					},
				],
			});
		},
	},

	{
		title: "Images",
		container: doc_core.stackcontainer,
		sample: { "sample.img": sample.img },
		code: function () {
			return [
				new card.container({
					elem: [
						new card.img({
							placement: "top",
							src: sample.img(857, 428),
						}),
						new card.body({
							elem: [
								new card.title("Card Title"),
								new card.text(
									"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
								),
								new card.text({ color: "muted", elem: new small({ elem: "Last updated 3 mins ago" }) }),
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
						new card.img({
							placement: "bottom",
							src: sample.img(857, 428),
						}),
					],
				}),
			];
		},
	},

	{
		title: "Image overlays",
		sample: { "sample.img": sample.img },
		code: function () {
			return new card.container({
				textcolor: "light",
				elem: [
					new card.img({
						src: sample.img(857, 428),
					}),
					new card.imgoverlay({
						elem: [
							new card.title("Card Title"),
							new card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
							new card.text({ color: "muted", elem: new small("Last updated 3 mins ago") }),
						],
					}),
				],
			});
		},
	},

	{
		title: "Horizontal",
		sample: { "sample.img": sample.img },
		code: function () {
			return new card.container({
				class: "h-100",
				elem: [
					new card.horizontal({
						size: "sm-4",
						left: [
							new card.img({
								placement: "left",
								src: sample.img(285, 285),
							}),
						],
						right: new card.container({
							class: "h-100",
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
										new card.text({ color: "muted", elem: new small("Last updated 3 mins ago") }),
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
		container: doc_core.stackcontainer,
		code: function () {
			return new card.container({
				color: "primary",
				textcolor: "light",
				style: { width: "18rem" },
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
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ color: "primary", textcolor: "light" },
				{ color: "secondary", textcolor: "light" },
				{ color: "success", textcolor: "light" },
				{ color: "danger", textcolor: "light" },
				{ color: "warning" },
				{ color: "info" },
				{ color: "light" },
				{ color: "dark", textcolor: "light" },
			].map(function (i) {
				return new card.container({
					color: i.color,
					textcolor: i.textcolor,
					style: { width: "18rem" },
					elem: [
						new card.header("Header"),
						new card.body({
							elem: [
								new card.title(`${core.capitalize(i.color)} card title`),
								new card.text(
									`Some quick example text to build on the ${i.color} card title and make up the bulk of the card's content.`
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
		container: doc_core.stackcontainer,
		code: function () {
			return new card.container({
				bordercolor: "primary",
				style: { width: "18rem" },
				elem: [
					new card.header({ elem: "Header" }),
					new card.body({
						textcolor: "primary",
						elem: [
							new card.title({ elem: `Primary card title` }),
							new card.text({
								elem: "Some quick example text to build on the card title and make up the bulk of the card's content.",
							}),
						],
					}),
				],
			});
		},
	},

	{
		title: "Example border color",
		container: doc_core.stackcontainer,
		code: function () {
			return [
				{ color: "primary", textcolor: "primary" },
				{ color: "secondary", textcolor: "secondary" },
				{ color: "success", textcolor: "success" },
				{ color: "danger", textcolor: "danger" },
				{ color: "warning" },
				{ color: "info" },
				{ color: "light" },
				{ color: "dark", textcolor: "dark" },
			].map(function (i) {
				return new card.container({
					bordercolor: i.color,
					style: { width: "18rem" },
					elem: [
						new card.header({ elem: "Header" }),
						new card.body({
							textcolor: i.textcolor,
							elem: [
								new card.title({ elem: `${core.capitalize(i.color)} card title` }),
								new card.text({
									elem: "Some quick example text to build on the card title and make up the bulk of the card's content.",
								}),
							],
						}),
					],
				});
			});
		},
	},

	{
		title: "Mixins utilities",
		container: doc_core.stackcontainer,
		code: function () {
			return new card.container({
				bordercolor: "success",
				style: { width: "18rem" },
				elem: [
					new card.header({
						color: "transparent",
						class: "border-success",
						elem: "Header",
					}),
					new card.body({
						textcolor: "success",
						elem: [
							new card.title(`Success card title`),
							new card.text({
								elem: "Some quick example text to build on the card title and make up the bulk of the card's content.",
							}),
						],
					}),
					new card.footer({
						class: "border-success",
						color: "transparent",
						elem: "Footer",
					}),
				],
			});
		},
	},

	{
		title: "Card groups",
		container: doc_core.stackcontainer,
		sample: { "sample.img": sample.img, "sample.cardwithimg": sample.cardwithimg },
		code: function () {
			return new card.group({
				elem: [
					new card.container({
						elem: [
							new card.img({
								placement: "top",
								src: sample.img(286, 143),
							}),
							new card.body({
								elem: [
									new card.title("Card Title"),
									new card.text({
										elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
									}),
								],
							}),
						],
					}),
					sample.cardwithimg()[1],
					sample.cardwithimg()[2],
				],
			});
		},
	},

	{
		title: "Card groups with footer",
		container: doc_core.stackcontainer,
		sample: {
			"sample.img": sample.img,
			"sample.cardwithfooter": sample.cardwithfooter,
		},
		code: function () {
			return new card.group({
				elem: [
					new card.container({
						elem: [
							new card.img({
								placement: "top",
								src: sample.img(286, 143),
							}),
							new card.body({
								elem: [
									new card.title("Card Title"),
									new card.text({
										elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
									}),
								],
							}),
							new card.footer({ elem: "Last updated 3 mins ago" }),
						],
					}),

					sample.cardwithfooter()[1],
					sample.cardwithfooter()[2],
				],
			});
		},
	},

	{
		title: "Card grid using {{row-cols-md-2}}",
		sample: { "sample.cardwithimg": sample.cardwithimg },
		code: function () {
			return new div({
				row: true,
				rowcol: [1, "md-2"],
				gap: 4,
				elem: [
					new div({ col: true, elem: sample.cardwithimg()[0] }),
					new div({ col: true, elem: sample.cardwithimg()[1] }),
					new div({ col: true, elem: sample.cardwithimg()[2] }),
					new div({ col: true, elem: sample.cardwithimg()[3] }),
				],
			});
		},
	},

	{
		title: "Card grid using {{row-cols-md-3}}",
		sample: { "sample.cardwithimg": sample.cardwithimg },
		code: function () {
			return new div({
				row: true,
				rowcol: [1, "md-3"],
				gap: 4,
				elem: [
					new div({ col: true, elem: sample.cardwithimg()[0] }),
					new div({ col: true, elem: sample.cardwithimg()[1] }),
					new div({ col: true, elem: sample.cardwithimg()[2] }),
					new div({ col: true, elem: sample.cardwithimg()[3] }),
				],
			});
		},
	},

	{
		title: "Card grid with {{h-100}} class",
		sample: { "sample.img": sample.img, "sample.cardh100": sample.cardh100 },
		code: function () {
			return new div({
				row: true,
				rowcol: [1, "md-3"],
				gap: 4,
				elem: [
					new div({
						col: true,
						elem: new card.container({
							class: "h-100",
							elem: [
								new card.img({
									placement: "top",
									src: sample.img(286, 143),
								}),
								new card.body({
									elem: [
										new card.title("Card Title"),
										new card.text({
											elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
										}),
									],
								}),
							],
						}),
					}),
					new div({ col: true, elem: sample.cardh100()[0] }),
					new div({ col: true, elem: sample.cardh100()[1] }),
					new div({ col: true, elem: sample.cardh100()[2] }),
				],
			});
		},
	},

	{
		title: "Card grid with {{h-100}} class",
		sample: {
			"sample.img": sample.img,
			"sample.cardwithfooterh100": sample.cardwithfooterh100,
		},
		code: function () {
			return new div({
				row: true,
				rowcol: [1, "md-3"],
				gap: 4,
				elem: [
					new div({
						col: true,
						elem: new card.container({
							class: "h-100",
							elem: [
								new card.img({
									placement: "top",
									src: sample.img(286, 143),
								}),
								new card.body({
									elem: [
										new card.title("Card Title"),
										new card.text({
											elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
										}),
									],
								}),
								new card.footer({ elem: "Last updated 3 mins ago" }),
							],
						}),
					}),
					new div({ col: true, elem: sample.cardwithfooterh100()[0] }),
					new div({ col: true, elem: sample.cardwithfooterh100()[1] }),
					new div({ col: true, elem: sample.cardwithfooterh100()[2] }),
				],
			});
		},
	},
];
