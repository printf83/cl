"use strict";
import * as doc_core from "./core.js";
import * as sample from "./sample.js";
import listgroup from "../base/listgroup.js";
import div from "../base/div.js";
import p from "../base/p.js";
import small from "../base/small.js";
import h from "../base/h.js";
import badge from "../base/badge.js";

/* 
    \}\),\n+\t+ns.example\(\{
    },\n\n\t{
    
    ns. 
    new 

    elems:
    elem:

    ex.sample
    sample

    javascript:void(0)
    #

	container: new cont.stack(),
	container: doc_core.stackcontainer,
*/

export default [
	{
		title: "List group",
		msg: "List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.",
		anchor: false,
	},

	{
		title: "Basic example",
		sample: { "sample.listgroupitem": sample.listgroupitem },
		code: function () {
			return new listgroup({ item: sample.listgroupitem() });
		},
	},

	{
		title: "Active items",
		code: function () {
			return new listgroup({
				item: [
					{ elem: "An active item", active: true },
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
		code: function () {
			return new listgroup({
				item: [
					{ elem: "An disabled item", disabled: true },
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
		code: function () {
			return new listgroup({
				type: "div",
				item: [
					{
						href: "#",
						elem: "A disabled item",
						disabled: true,
					},
					{ href: "#", elem: "A second item" },
					{ href: "#", elem: "A third item" },
					{ href: "#", elem: "A fourth item" },
					{ href: "#", elem: "And a fifth one" },
				],
			});
		},
	},

	{
		title: "List group of buttons",
		code: function () {
			return new listgroup({
				type: "div",
				item: [
					{
						onclick: function () {},
						elem: "A disabled item",
						disabled: true,
					},
					{ onclick: function () {}, elem: "A second item" },
					{ onclick: function () {}, elem: "A third item" },
					{ onclick: function () {}, elem: "A fourth item" },
					{ onclick: function () {}, elem: "And a fifth one" },
				],
			});
		},
	},

	{
		title: "Flush",
		sample: { "sample.listgroupitem": sample.listgroupitem },
		code: function () {
			return new listgroup({
				flush: true,
				item: sample.listgroupitem(),
			});
		},
	},

	{
		title: "Numbered",
		sample: { "sample.listgroupitem": sample.listgroupitem },
		code: function () {
			return new listgroup({
				type: "ol",
				item: sample.listgroupitem(),
			});
		},
	},

	{
		title: "Numbered custom content",
		sample: { "sample.listgroupitemcustomcontent": sample.listgroupitemcustomcontent },
		code: function () {
			return new listgroup({
				type: "ol",
				item: [
					{
						display: "flex",
						justifyContent: "between",
						alignItem: "start",
						elem: sample.listgroupitemcustomcontent(),
					},
					{
						display: "flex",
						justifyContent: "between",
						alignItem: "start",
						elem: sample.listgroupitemcustomcontent(),
					},
					{
						display: "flex",
						justifyContent: "between",
						alignItem: "start",
						elem: sample.listgroupitemcustomcontent(),
					},
				],
			});
		},
	},

	{
		title: "Horizontal",
		msg: [
			"Add {{.list-group-horizontal}} to change the layout of list group items from vertical to horizontal across all breakpoints. Alternatively, choose a responsive variant {{.list-group-horizontal-{sm|md|lg|xl|xxl} }}to make a list group horizontal starting at that breakpoint’s {{min-width}}. Currently <b>horizontal list groups cannot be combined with flush list groups.</b>",
			"<b>ProTip:</b> Want equal-width list group items when horizontal? Add {{.flex-fill}} to each list group item.",
		],
		container: doc_core.stackcontainer,
		sample: { "sample.listgroupitem3": sample.listgroupitem3 },
		code: function () {
			return [
				new listgroup({
					horizontal: true,
					item: sample.listgroupitem3(),
				}),

				new listgroup({
					horizontal: "sm",
					item: sample.listgroupitem3(),
				}),

				new listgroup({
					horizontal: "md",
					item: sample.listgroupitem3(),
				}),

				new listgroup({
					horizontal: "lg",
					item: sample.listgroupitem3(),
				}),

				new listgroup({
					horizontal: "xl",
					item: sample.listgroupitem3(),
				}),

				new listgroup({
					horizontal: "xxl",
					item: sample.listgroupitem3(),
				}),

				new listgroup({
					horizontal: ["md", "xxl"],
					item: sample.listgroupitem3(),
				}),
			];
		},
	},

	{
		title: "Contextual classes",
		code: function () {
			return new listgroup({
				item: [{ color: "primary", elem: `A simple primary list group item` }],
			});
		},
	},

	{
		title: "Contextual classes example",
		code: function () {
			return new listgroup({
				item: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (
					i
				) {
					return { color: i, elem: `A simple ${i} list group item` };
				}),
			});
		},
	},

	{
		title: "Contextual classes with action example",
		code: function () {
			return new listgroup({
				type: "div",
				item: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (
					i
				) {
					return {
						action: true,
						href: "#;",
						color: i,
						elem: `A simple ${i} list group item`,
					};
				}),
			});
		},
	},

	{
		title: "With badge",
		code: function () {
			let itemfn = function (text, badgeLabel) {
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
				item: [itemfn("A list item", 14), itemfn("A second list item", 2), itemfn("A third list item", 1)],
			});
		},
	},

	{
		title: "Custom content",
		code: function () {
			let itemfn = function (title, active, days) {
				return {
					href: "#",
					action: true,
					active: active,
					elem: [
						new div({
							class: "w-100",
							display: "flex",
							justifyContent: "between",
							elem: [
								new h({ level: 5, marginBottom: 1, elem: title }),
								new small({
									textcolor: !active ? "muted" : null,
									elem: `${days} days ago`,
								}),
							],
						}),
						new p({ marginBottom: 1, elem: "Some placeholder content in a paragraph." }),
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
		code: function () {
			return new listgroup({
				type: "div",
				item: [
					{ type: "checkbox", value: "1", label: "First checkbox" },
					{
						type: "checkbox",
						value: "2",
						label: "Second checkbox",
						checked: true,
					},
					{
						type: "checkbox",
						value: "3",
						label: "Third checkbox",
						disabled: true,
					},
					{
						type: "checkbox",
						value: "4",
						label: "Fourth checkbox",
					},
					{ type: "checkbox", value: "5", label: "Fifth checkbox" },
				],
			});
		},
	},

	{
		title: "Radio",
		code: function () {
			return new listgroup({
				type: "div",
				item: [
					{
						type: "radio",
						name: "g10",
						value: "1",
						label: "First radio",
					},
					{
						type: "radio",
						name: "g10",
						value: "2",
						label: "Second radio",
						checked: true,
					},
					{
						type: "radio",
						name: "g10",
						value: "3",
						label: "Third radio",
						disabled: true,
					},
					{
						type: "radio",
						name: "g10",
						value: "4",
						label: "Fourth radio",
					},
					{
						type: "radio",
						name: "g10",
						value: "5",
						label: "Fifth radio",
					},
				],
			});
		},
	},

	{
		title: "Switch",
		code: function () {
			return new listgroup({
				type: "div",
				item: [
					{ type: "switch", value: "1", label: "First switch" },
					{
						type: "switch",
						value: "2",
						label: "Second switch",
						checked: true,
					},
					{
						type: "switch",
						value: "3",
						label: "Third switch",
						disabled: true,
					},
					{
						type: "switch",
						value: "4",
						label: "Fourth switch",
					},
					{ type: "switch", value: "5", label: "Fifth switch" },
				],
			});
		},
	},
];
