"use strict";
import * as doc_core from "./core.js";
import * as sample from "./sample.js";
import * as listgroup from "../base/listgroup.js";
import div from "../base/div.js";
import p from "../base/p.js";
import small from "../base/small.js";
import h from "../base/h.js";
import badge from "../base/badge.js";

/* 
    \}\),\n+\t+new example\(\{
    },\n\n\t{
    
    new 
    new 

    elems:
    elem:

    ex.sample
    sample

    javascript:void(0)
    #
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
			return new listgroup.container({ elem: sample.listgroupitem() });
		},
	},

	{
		title: "Active items",
		code: function () {
			return new listgroup.container({
				elem: [
					new listgroup.item({ elem: "An active item", active: true }),
					new listgroup.item({ elem: "A second item" }),
					new listgroup.item({ elem: "A third item" }),
					new listgroup.item({ elem: "A fourth item" }),
					new listgroup.item({ elem: "And a fifth one" }),
				],
			});
		},
	},

	{
		title: "Disabled items",
		code: function () {
			return new listgroup.container({
				elem: [
					new listgroup.item({ elem: "A disabled item", disabled: true }),
					new listgroup.item({ elem: "A second item" }),
					new listgroup.item({ elem: "A third item" }),
					new listgroup.item({ elem: "A fourth item" }),
					new listgroup.item({ elem: "And a fifth one" }),
				],
			});
		},
	},

	{
		title: "List group of links",
		code: function () {
			return new listgroup.container({
				type: "div",
				elem: [
					new listgroup.item({
						href: "#",
						elem: "A disabled item",
						disabled: true,
					}),
					new listgroup.item({ href: "#", elem: "A second item" }),
					new listgroup.item({ href: "#", elem: "A third item" }),
					new listgroup.item({ href: "#", elem: "A fourth item" }),
					new listgroup.item({ href: "#", elem: "And a fifth one" }),
				],
			});
		},
	},

	{
		title: "List group of buttons",
		code: function () {
			return new listgroup.container({
				type: "div",
				elem: [
					new listgroup.item({
						onclick: function () {},
						elem: "A disabled item",
						disabled: true,
					}),
					new listgroup.item({ onclick: function () {}, elem: "A second item" }),
					new listgroup.item({ onclick: function () {}, elem: "A third item" }),
					new listgroup.item({ onclick: function () {}, elem: "A fourth item" }),
					new listgroup.item({ onclick: function () {}, elem: "And a fifth one" }),
				],
			});
		},
	},

	{
		title: "Flush",
		sample: { "sample.listgroupitem": sample.listgroupitem },
		code: function () {
			return new listgroup.container({
				flush: true,
				elem: sample.listgroupitem(),
			});
		},
	},

	{
		title: "Numbered",
		sample: { "sample.listgroupitem": sample.listgroupitem },
		code: function () {
			return new listgroup.container({
				type: "ol",
				elem: sample.listgroupitem(),
			});
		},
	},

	{
		title: "Numbered custom content",
		sample: { "sample.listgroupitemcustomcontent": sample.listgroupitemcustomcontent },
		code: function () {
			return new listgroup.container({
				type: "ol",
				elem: [
					new listgroup.item({
						display: "flex",
						justifyContent: "between",
						alignItem: "start",
						elem: sample.listgroupitemcustomcontent(),
					}),
					new listgroup.item({
						display: "flex",
						justifyContent: "between",
						alignItem: "start",
						elem: sample.listgroupitemcustomcontent(),
					}),
					new listgroup.item({
						display: "flex",
						justifyContent: "between",
						alignItem: "start",
						elem: sample.listgroupitemcustomcontent(),
					}),
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
				new listgroup.container({
					horizontal: true,
					elem: sample.listgroupitem3(),
				}),

				new listgroup.container({
					horizontal: "sm",
					elem: sample.listgroupitem3(),
				}),

				new listgroup.container({
					horizontal: "md",
					elem: sample.listgroupitem3(),
				}),

				new listgroup.container({
					horizontal: "lg",
					elem: sample.listgroupitem3(),
				}),

				new listgroup.container({
					horizontal: "xl",
					elem: sample.listgroupitem3(),
				}),

				new listgroup.container({
					horizontal: "xxl",
					elem: sample.listgroupitem3(),
				}),

				new listgroup.container({
					horizontal: ["md", "xxl"],
					elem: sample.listgroupitem3(),
				}),
			];
		},
	},

	{
		title: "Contextual classes",
		code: function () {
			return new listgroup.container({
				elem: [new listgroup.item({ color: "primary", elem: `A simple primary list group item` })],
			});
		},
	},

	{
		title: "Contextual classes example",
		code: function () {
			return new listgroup.container({
				elem: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (
					i
				) {
					return new listgroup.item({ color: i, elem: `A simple ${i} list group item` });
				}),
			});
		},
	},

	{
		title: "Contextual classes with action example",
		code: function () {
			return new listgroup.container({
				type: "div",
				elem: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(function (
					i
				) {
					return new listgroup.item({
						action: true,
						href: "#;",
						color: i,
						elem: `A simple ${i} list group item`,
					});
				}),
			});
		},
	},

	{
		title: "With badge",
		code: function () {
			let itemfn = function (text, badgeLabel) {
				return new listgroup.item({
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
				});
			};

			return new listgroup.container({
				elem: [itemfn("A list item", 14), itemfn("A second list item", 2), itemfn("A third list item", 1)],
			});
		},
	},

	{
		title: "Custom content",
		code: function () {
			let itemfn = function (title, active, days) {
				return new listgroup.item({
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
				});
			};

			return new listgroup.container({
				type: "div",
				elem: [
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
			return new listgroup.container({
				type: "div",
				elem: [
					new listgroup.item({ type: "checkbox", value: "1", label: "First checkbox" }),
					new listgroup.item({
						type: "checkbox",
						value: "2",
						label: "Second checkbox",
						active: true,
					}),
					new listgroup.item({
						type: "checkbox",
						value: "3",
						label: "Third checkbox",
						disabled: true,
					}),
					new listgroup.item({
						type: "checkbox",
						value: "4",
						label: "Fourth checkbox",
						color: "primary",
					}),
					new listgroup.item({ type: "checkbox", value: "5", label: "Fifth checkbox" }),
				],
			});
		},
	},

	{
		title: "Radio",
		code: function () {
			return new listgroup.container({
				type: "div",
				elem: [
					new listgroup.item({
						type: "radio",
						name: "g10",
						value: "1",
						label: "First radio",
					}),
					new listgroup.item({
						type: "radio",
						name: "g10",
						value: "2",
						label: "Second radio",
						active: true,
					}),
					new listgroup.item({
						type: "radio",
						name: "g10",
						value: "3",
						label: "Third radio",
						disabled: true,
					}),
					new listgroup.item({
						type: "radio",
						name: "g10",
						value: "4",
						label: "Fourth radio",
						color: "primary",
					}),
					new listgroup.item({
						type: "radio",
						name: "g10",
						value: "5",
						label: "Fifth radio",
					}),
				],
			});
		},
	},

	{
		title: "Switch",
		code: function () {
			return new listgroup.container({
				type: "div",
				elem: [
					new listgroup.item({ type: "switch", value: "1", label: "First switch" }),
					new listgroup.item({
						type: "switch",
						value: "2",
						label: "Second switch",
						active: true,
					}),
					new listgroup.item({
						type: "switch",
						value: "3",
						label: "Third switch",
						disabled: true,
					}),
					new listgroup.item({
						type: "switch",
						value: "4",
						label: "Fourth switch",
						color: "primary",
					}),
					new listgroup.item({ type: "switch", value: "5", label: "Fifth switch" }),
				],
			});
		},
	},
];
