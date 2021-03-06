"use strict";
import $ from "../component.js";

export default [
	{
		title: "Gutters",
		msg: "Gutters are the padding between your columns, used to responsively space and align content in the Bootstrap grid system.",
		anchor: false,
	},

	{
		title: "How they work",
		msg: new $.ul({
			elem: [
				new $.li({
					elem: "<b>Gutters are the gaps between column content, created by horizontal <code>padding</code>.</b> We set <code>padding-right</code> and <code>padding-left</code> on each column, and use negative margin to offset that at the start and end of each row to align content.",
				}),
				new $.li({
					elem: "<b>Gutters start at <code>1.5rem </code>(<code>24px</code>) wide.</b> This allows us to match Bootstrap grid to the <a href='https://getbootstrap.com/docs/5.0/utilities/spacing/'>padding and margin spacers</a> scale.",
				}),
				new $.li({
					elem: "<b>Gutters can be responsively adjusted.</b> Use breakpoint-specific gutter classes to modify horizontal gutters, vertical gutters, and all gutters.",
				}),
			],
		}),
	},

	{
		title: "Horizontal gutters",
		msg: "{{.gx-*}} classes can be used to control the horizontal gutter widths. The {{.container}} or {{.container-fluid}} parent may need to be adjusted if larger gutters are used too to avoid unwanted overflow, using a matching padding utility. For example, in the following example we’ve increased the padding with {{.px-4}}:",
		code: function () {
			return new $.div(
				"container px-4",
				new $.div(
					"row gx-5",
					Array(2).fill(new $.div("col", new $.div("p-3 border bg-light", "Custom column padding")))
				)
			);
		},
	},

	{
		msg: "An alternative solution is to add a wrapper around the {{.row}} with the {{.overflow-hidden}} class:",
		code: function () {
			return new $.div(
				"container overflow-hidden",
				new $.div(
					"row gx-5",
					new $.div(
						"row gx-5",
						Array(2).fill(new $.div("col", new $.div("p-3 border bg-light", "Custom column padding")))
					)
				)
			);
		},
	},

	{
		title: "Vertical gutters",
		msg: "{{.gy-*}} classes can be used to control the vertical gutter widths. Like the horizontal gutters, the vertical gutters can cause some overflow below the {{.row}} at the end of a page. If this occurs, you add a wrapper around {{.row}} with the {{.overflow-hidden}} class:",
		code: function () {
			return new $.div(
				"container overflow-hidden",
				new $.div(
					"row gy-5",
					Array(4).fill(new $.div("col-6", new $.div("p-3 border bg-light", "Custom column padding")))
				)
			);
		},
	},

	{
		title: "Horizontal & vertical gutters",
		msg: "{{.g-*}} classes can be used to control the horizontal gutter widths, for the following example we use a smaller gutter width, so there won’t be a need to add the {{.overflow-hidden}} wrapper class.",
		code: function () {
			return new $.div(
				"container",
				new $.div(
					"row g-2",
					Array(4).fill(new $.div("col-6", new $.div("p-3 border bg-light", "Custom column padding")))
				)
			);
		},
	},

	{
		title: "Row columns gutters",
		msg: "Gutter classes can also be added to <a href='https://getbootstrap.com/docs/5.0/layout/grid/#row-columns'>row columns</a>. In the following example, we use responsive row columns and responsive gutter classes.",
		code: function () {
			return new $.div(
				"container",
				new $.div(
					"row row-cols-2 row-cols-lg-5 g-2 g-lg-3",
					Array(10).fill(new $.div("col-6", new $.div("p-3 border bg-light", "Row column")))
				)
			);
		},
	},

	{
		title: "No gutters",
		msg: [
			"The gutters between columns in Bootstrap predefined grid classes can be removed with {{.g-0}}. This removes the negative {{margins}} from {{.row}} and the horizontal {{padding}} from all immediate children column",
			"<b>Need an edge-to-edge design?</b> Drop the parent {{.container}} or {{.container-fluid.}}",
			"In practice, here’s how it looks. Note you can continue to use this with all other predefined grid classes (including column widths, responsive tiers, reorders, and more).",
		],
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div("row g-0", [
				new $.div("col-sm-6 col-md-8", ".col-sm-6 .col-md-8"),
				new $.div("col-6 col-md-4", ".col-6 .col-md-4"),
			]);
		},
	},
];
