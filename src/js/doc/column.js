"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Columns",
		msg: "Learn how to modify columns with a handful of options for alignment, ordering, and offsetting thanks to Bootstrap flexbox grid system. Plus, see how to use column classes to manage widths of non-grid elements.",
		anchor: false,
	},

	{
		msg: new $.alert.container({
			color: "primary",
			elem: "<b>Heads up!</b> Be sure to <a href='https://getbootstrap.com/docs/5.1/layout/grid/'>read the Grid page</a> first before diving into how to modify and customize your grid column",
		}),
	},

	{
		title: "How they work",
		msg: new $.ul({
			elem: [
				new $.li({
					elem: "<b>Columns build on the grid’s flexbox architecture.</b> Flexbox means we have options for changing individual columns and modifying groups of columns at the row level. You choose how columns grow, shrink, or otherwise change.",
				}),
				new $.li({
					elem: "<b>When building grid layouts, all content goes in column</b> The hierarchy of Bootstrap’s grid goes from container to row to column to your content. On rare occasions, you may combine content and column, but be aware there can be unintended consequences.",
				}),
				new $.li({
					elem: "<b>Bootstrap includes predefined classes for creating fast, responsive layouts.</b> With six breakpoints and a dozen columns at each grid tier, we have dozens of classes already built for you to create your desired layouts. This can be disabled via Sass if you wish.",
				}),
			],
		}),
	},

	{
		title: "Alignment",
		msg: "Use flexbox alignment utilities to vertically and horizontally align column",
	},

	{
		title: "Vertical alignment",
		viewclass: "cl-highlight-col cl-highlight-row",
		code: function () {
			return new $.div(
				"container",
				["row align-items-start", "row align-items-center", "row align-items-end"].map(function (i) {
					return new $.div({
						class: i,
						style: { "min-height": "10rem" },
						elem: Array(3).fill(new $.div("col", "One of three columns")),
					});
				})
			);
		},
	},

	{
		title: "Vertical alignment",
		viewclass: "cl-highlight-col cl-highlight-row",
		code: function () {
			return new $.div(
				"container",
				new $.div({
					class: "row",
					style: { "min-height": "10rem" },
					elem: [
						new $.div("col align-self-start", "One of three columns"),
						new $.div("col align-self-center", "One of three columns"),
						new $.div("col align-self-end", "One of three columns"),
					],
				})
			);
		},
	},

	{
		title: "Horizontal alignment",
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div(
				"container",
				[
					"row justify-content-start",
					"row justify-content-center",
					"row justify-content-end",
					"row justify-content-around",
					"row justify-content-between",
					"row justify-content-evenly",
				].map(function (i) {
					return new $.div(i, Array(2).fill(new $.div("col-4", "One of two columns")));
				})
			);
		},
	},

	{
		title: "Column wrapping",
		msg: "If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new $.line.",
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div(
				"container",
				new $.div("row", [
					new $.div("col-9", ".col-9"),
					new $.div(
						"col-4",
						".col-4 : Since 9 + 4 = 13 > 12, this 4-column-wide div gets wrapped onto a new $.line as one contiguous unit."
					),
					new $.div("col-6", ".col-6 : Subsequent columns continue along the new $.line."),
				])
			);
		},
	},

	{
		title: "Column breaks",
		msg: "Breaking columns to a new $.line in flexbox requires a small hack: add an element with width: 100% wherever you want to wrap your columns to a new $.line. Normally this is accomplished with multiple .rows, but not every implementation method can account for this.",
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div(
				"container",
				new $.div("row", [
					new $.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					new $.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					new $.span({ class: "w-100" }),
					new $.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					new $.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
				])
			);
		},
	},

	{
		msg: "You may also apply this break at specific breakpoints with Bootstrap responsive display utilities.",
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div(
				"container",
				new $.div("row", [
					new $.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					new $.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					new $.span({ class: "w-100", display: ["none", "md-block"] }),
					new $.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
					new $.div("col-6 col-sm-3", ".col-6 .col-sm-3"),
				])
			);
		},
	},

	{
		title: "Reordering",
	},

	{
		title: "Order classes",
		msg: "Use {{.order-}} classes for controlling the <b>visual order</b> of your content. These classes are responsive, so you can set the {{order}} by breakpoint (e.g., {{.order-1.order-md-2}}). Includes support for 1 through 5 across all six grid tiers.",
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div(
				"container",
				new $.div("row", [
					new $.div("col", "First in DOM, no order applied"),
					new $.div("col order-5", "Second in DOM, with a larger order"),
					new $.div("col order-1", "Third in DOM, with an order of 1"),
				])
			);
		},
	},

	{
		title: "Offsetting columns",
		msg: "You can offset grid columns in two ways: Bootstrap responsive {{.offset-}} grid classes and Bootstrap margin utilities. Grid classes are sized to match columns while margins are more useful for quick layouts where the width of the offset is variable.",
	},

	{
		title: "Offset classes",
		msg: "Move columns to the right using {{.offset-md-*}} classes. These classes increase the left margin of a column by {{*}} column For example, {{.offset-md-4}} moves {{.col-md-4}} over four column",
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div("container", [
				new $.div("row", [
					new $.div("col-md-4", ".col-md-4"),
					new $.div("col-md-4 offset-md-4", ".col-md-4 .offset-md-4"),
				]),
				new $.div("row", [
					new $.div("col-md-3 offset-md-3", ".col-md-3 .offset-md-3"),
					new $.div("col-md-3 offset-md-3", ".col-md-3 .offset-md-3"),
				]),
				new $.div("row", new $.div("col-md-6 offset-md-3", ".col-md-6 .offset-md-3")),
			]);
		},
	},

	{
		msg: "In addition to column clearing at responsive breakpoints, you may need to reset offsets. See this in action in the grid example.",
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div("container", [
				new $.div("row", [
					new $.div("col-sm-5 col-md-6", ".col-sm-5 .col-md-6"),
					new $.div(
						"col-sm-5 offset-sm-2 col-md-6 offset-md-0",
						".col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0"
					),
				]),
				new $.div("row", [
					new $.div("col-sm-6 col-md-5 col-lg-6", ".col-sm-6 .col-md-5 .col-lg-6"),
					new $.div(
						"col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0",
						".col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0"
					),
				]),
			]);
		},
	},

	{
		title: "Margin utilities",
		msg: "With the move to flexbox in v4, you can use margin utilities like .me-auto to force sibling columns away from one another.",
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div("container", [
				new $.div("row", [
					new $.div("col-md-4", ".col-md-4"),
					new $.div("col-md-4 ms-auto", ".col-md-4 .ms-auto"),
				]),
				new $.div("row", [
					new $.div("col-md-4 ms-auto", ".col-md-4 .ms-auto"),
					new $.div("col-md-4 ms-auto", ".col-md-4 .ms-auto"),
				]),
				new $.div("row", [
					new $.div("col-auto ms-auto", ".col-auto .ms-auto"),
					new $.div("col-auto", ".col-auto"),
				]),
			]);
		},
	},

	{
		title: "Standalone column classes",
		msg: "The .col-* classes can also be used outside a .row to give an element a specific width. Whenever column classes are used as non direct children of a row, the paddings are omitted.",
		viewclass: "cl-highlight-col",
		code: function () {
			return [
				new $.div("col-3 bg-light p-3 border", "  .col-3: width of 25%"),
				new $.div("col-sm-9 bg-light p-3 border", " .col-sm-9: width of 75% above sm breakpoint"),
			];
		},
	},

	{
		msg: "The classes can be used together with utilities to create responsive floated images. Make sure to wrap the content in a .clearfix wrapper to clear the float if the text is shorter.",
		sample: { "sample.text": sample.text, "sample.img": sample.img },
		viewclass: "cl-highlight-col",
		code: function () {
			return new $.div("clearfix", [
				new $.img({ src: sample.img(200, 200), class: "col-md-6 float-md-end mb-3 ms-md-3" }),
				new $.p(sample.text()),
				new $.p(sample.text()),
				new $.p(sample.text()),
			]);
		},
	},
];
