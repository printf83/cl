"use strict";
import sample from "./sample.js";
import listgroup from "../base/listgroup.js";
import div from "../base/div.js";
import h from "../base/h.js";
import small from "../base/small.js";
import p from "../base/p.js";
import badge from "../base/badge.js";
import list from "./list.js";

export default [
	{
		title: "List group",
		msg: "List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.",
		anchor: false,
	},

	{
		title: "Basic example",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				item: [
					{ elem: "An item" },
					{ elem: "A second item" },
					{ elem: "A third item" },
					{ elem: "A fourth item" },
					{ elem: "And a fifth one" },
				],
			});
		},
	},

	{
		title: "Active items",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				item: [
					{
						elem: "An active item",

						//marker
						active: true,
					},
					{ elem: "A second item" },
					{ elem: "A third item" },
					{ elem: "A fourth item" },
					{ elem: "And a fifth one" },
				],
			});
		},
	},

	{
		title: "Disabled items",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				item: [
					{
						elem: "An disabled item",

						//marker
						disabled: true,
					},
					{ elem: "A second item" },
					{ elem: "A third item" },
					{ elem: "A fourth item" },
					{ elem: "And a fifth one" },
				],
			});
		},
	},

	{
		title: "List group of links",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				type: "div",
				item: [
					{
						elem: "A disabled item",

						//marker
						href: "#",
						disabled: true,
					},
					{
						elem: "A second item",

						//marker
						href: "#",
					},
					{ href: "#", elem: "A third item" },
					{ href: "#", elem: "A fourth item" },
					{ href: "#", elem: "And a fifth one" },
				],
			});
		},
	},

	{
		title: "List group of buttons",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				type: "div",
				item: [
					{
						elem: "A disabled item",

						//marker
						onclick: () => {},
						disabled: true,
					},
					{
						elem: "A second item",

						//marker
						onclick: () => {},
					},
					{ onclick: () => {}, elem: "A third item" },
					{ onclick: () => {}, elem: "A fourth item" },
					{ onclick: () => {}, elem: "And a fifth one" },
				],
			});
		},
	},

	{
		title: "Flush",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				item: [
					{ elem: "An item" },
					{ elem: "A second item" },
					{ elem: "A third item" },
					{ elem: "A fourth item" },
					{ elem: "And a fifth one" },
				],

				//marker
				flush: true,
			});
		},
	},

	{
		title: "Numbered",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				item: [
					{ elem: "An item" },
					{ elem: "A second item" },
					{ elem: "A third item" },
					{ elem: "A fourth item" },
					{ elem: "And a fifth one" },
				],

				//marker
				type: "ol",
			});
		},
	},

	{
		title: "Numbered custom content",
		import: ["listgroup", "div", "badge"],
		code: () => {
			//marker
			let el = [
				new div({
					class: "ms-2 me-auto",
					elem: [new div("fw-bold", "Subheading"), "Cras justo odio"],
				}),

				new badge({
					pill: true,
					color: "primary",
					label: "14",
				}),
			];

			return new listgroup({
				item: [
					{
						display: "flex",
						justifycontent: "between",
						alignitem: "start",
						elem: el,
					},
					{
						display: "flex",
						justifycontent: "between",
						alignitem: "start",
						elem: el,
					},
					{
						display: "flex",
						justifycontent: "between",
						alignitem: "start",
						elem: el,
					},
				],

				//marker
				type: "ol",
			});
		},
	},

	{
		title: "Horizontal",
		msg: [
			"Add {{.list-group-horizontal}} to change the layout of list group items from vertical to horizontal across all breakpoints. Alternatively, choose a responsive variant {{.list-group-horizontal-{sm|md|lg|xl|xxl} }}to make a list group horizontal starting at that breakpoint’s {{min-width}}. Currently <b>horizontal list groups cannot be combined with flush list groups.</b>",
			"<b>ProTip:</b> Want equal-width list group items when horizontal? Add {{.flex-fill}} to each list group item.",
		],
		container: sample.stackcontainer,
		import: ["listgroup"],
		code: () => {
			let el = [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }];

			return [true, "sm", "md", "lg", "xl", "xxl", ["md", "xxl"]].map((i) => {
				return new listgroup({
					item: [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }],

					//marker
					horizontal: i,
				});
			});
		},
	},

	{
		title: "Contextual classes",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				item: [
					{
						elem: `A simple primary list group item`,

						//marker
						color: "primary",
					},
				],
			});
		},
	},

	{
		title: "Contextual classes example",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				item: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
					return {
						elem: `A simple ${i} list group item`,

						//marker
						color: i,
					};
				}),
			});
		},
	},

	{
		title: "Contextual classes with action example",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				type: "div",
				item: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map((i) => {
					return {
						elem: `A simple ${i} list group item`,

						//marker
						action: true,
						href: "#",
						color: i,
					};
				}),
			});
		},
	},

	{
		title: "With badge",
		import: ["badge", "listgroup"],
		code: () => {
			let itemfn = (text, badgeLabel) => {
				return {
					display: "flex",
					justifycontent: "between",
					alignitem: "start",
					elem: [
						text,

						//marker
						new badge({
							pill: true,
							color: "primary",
							label: badgeLabel,
						}),
					],
				};
			};

			return new listgroup({
				item: [itemfn("A list item", 14), itemfn("A second list item", 2), itemfn("A third list item", 1)],
			});
		},
	},

	{
		title: "Custom content",
		import: ["div", "h", "small", "p", "listgroup"],
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
								new h({ level: 5, marginbottom: 1, elem: title }),
								new small({
									textcolor: !active ? "muted" : null,
									elem: `${days} days ago`,
								}),
							],
						}),
						new p({ marginbottom: 1, elem: "Some placeholder content in a paragraph." }),
						new small({
							textcolor: !active ? "muted" : null,
							elem: `And some${!active ? " muted" : ""} small print.`,
						}),
					],
				};
			};

			return new listgroup({
				type: "div",
				item: [
					itemfn("List group item heading 1", true, 1),
					itemfn("List group item heading 2", false, 3),
					itemfn("List group item heading 3", false, 7),
				],
			});
		},
	},

	{
		title: "Checkboxes",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				type: "div",
				item: [
					{
						label: "First checkbox",

						//marker
						type: "checkbox",
						value: "1",
					},
					{
						label: "Second checkbox",

						//marker
						type: "checkbox",
						value: "2",
						checked: true,
					},
					{
						label: "Third checkbox",

						//marker
						type: "checkbox",
						value: "3",
						disabled: true,
					},
					{
						label: "Fourth checkbox",

						//marker
						type: "checkbox",
						value: "4",
					},
					{
						label: "Fifth checkbox",

						//marker
						type: "checkbox",
						value: "5",
					},
				],
			});
		},
	},

	{
		title: "Radio",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				type: "div",
				item: [
					{
						label: "First radio",

						//marker
						type: "radio",
						name: "g10",
						value: "1",
					},
					{
						label: "Second radio",

						//marker
						type: "radio",
						name: "g10",
						value: "2",
						checked: true,
					},
					{
						label: "Third radio",

						//marker
						type: "radio",
						name: "g10",
						value: "3",
						disabled: true,
					},
					{
						label: "Fourth radio",

						//marker
						type: "radio",
						name: "g10",
						value: "4",
					},
					{
						label: "Fifth radio",

						//marker
						type: "radio",
						name: "g10",
						value: "5",
					},
				],
			});
		},
	},

	{
		title: "Switch",
		import: ["listgroup"],
		code: () => {
			return new listgroup({
				type: "div",
				item: [
					{
						label: "First switch",

						//marker
						type: "switch",
						value: "1",
					},
					{
						label: "Second switch",

						//marker
						type: "switch",
						value: "2",
						checked: true,
					},
					{
						label: "Third switch",

						//marker
						type: "switch",
						value: "3",
						disabled: true,
					},
					{
						label: "Fourth switch",

						//marker
						type: "switch",
						value: "4",
					},
					{
						label: "Fifth switch",

						//marker
						type: "switch",
						value: "5",
					},
				],
			});
		},
	},
];
