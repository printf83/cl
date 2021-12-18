"use strict";
import div from "../base/div.js";
import * as alert from "../base/alert.js";

function fnDiv(className, element) {
	return new div({ class: className, elem: element });
}

export default [
	{
		title: "Grid system",
		msg: "Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.",
		anchor: false,
	},

	{
		title: "Example",
		msg: [
			"Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive. Below is an example and an in-depth explanation for how the grid system comes together.",
			new alert.container({
				color: "primary",
				elem: "New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology, guidelines, and code snippets.",
			}),
		],
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv(
				"container",
				fnDiv("row", [fnDiv("col", "Column"), fnDiv("col", "Column"), fnDiv("col", "Column")])
			);
		},
	},

	{
		title: "Equal-width",
		msg: "For example, here are two grid layouts that apply to every device and viewport, from xs to xxl. Add any number of unit-less classes for each breakpoint you need and every column will be the same width.",
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row", [fnDiv("col", "1 of 2"), fnDiv("col", "2 of 2")]),
				fnDiv("row", [fnDiv("col", "1 of 3"), fnDiv("col", "2 of 3"), fnDiv("col", "3 of 3")]),
			]);
		},
	},

	{
		title: "Setting one column width",
		msg: "Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.",
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row", [fnDiv("col", "1 of 3"), fnDiv("col-6", "2 of 3 (wider)"), fnDiv("col", "3 of 3")]),
				fnDiv("row", [fnDiv("col", "1 of 3"), fnDiv("col-5", "2 of 3 (wider)"), fnDiv("col", "3 of 3")]),
			]);
		},
	},

	{
		title: "Variable width content",
		msg: "Use col-{breakpoint}-auto classes to size columns based on the natural width of their content.",
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row justify-content-md-center", [
					fnDiv("col col-lg-2", "1 of 3"),
					fnDiv("col-md-auto", "Variable width content"),
					fnDiv("col col-lg-2", "3 of 3"),
				]),
				fnDiv("row", [
					fnDiv("col", "1 of 3"),
					fnDiv("col-md-auto", "Variable width content"),
					fnDiv("col col-lg-2", "3 of 3"),
				]),
			]);
		},
	},

	{
		title: "All breakpoints",
		msg: "For grids that are the same from the smallest of devices to the largest, use the .col and .col-* classes. Specify a numbered class when you need a particularly sized column; otherwise, feel free to stick to .col.",
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row", [fnDiv("col", "col"), fnDiv("col", "col"), fnDiv("col", "col"), fnDiv("col", "col")]),
				fnDiv("row", [fnDiv("col-8", "col-8"), fnDiv("col-4", "col-4")]),
			]);
		},
	},

	{
		title: "Stacked to horizontal",
		msg: "Using a single set of .col-sm-* classes, you can create a basic grid system that starts out stacked and becomes horizontal at the small breakpoint (sm).",
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row", [fnDiv("col-sm-8", "col-sm-8"), fnDiv("col-sm-4", "col-sm-4")]),
				fnDiv("row", [
					fnDiv("col-sm", "col-sm"),
					fnDiv("col-sm", "col-sm"),
					fnDiv("col-sm", "col-sm"),
					fnDiv("col-sm", "col-sm"),
				]),
			]);
		},
	},

	{
		title: "Mix and match",
		msg: "Don’t want your columns to simply stack in some grid tiers? Use a combination of different classes for each tier as needed. See the example below for a better idea of how it all works.",
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				//Stack the columns on mobile by making one full-width and the other half-width
				fnDiv("row", [fnDiv("col-md-8", "col-md-8"), fnDiv("col-6 col-md-4", "col-6 col-md-4")]),
				//Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop
				fnDiv("row", [
					fnDiv("col-6 col-md-4", "col-6 col-md-4"),
					fnDiv("col-6 col-md-4", "col-6 col-md-4"),
					fnDiv("col-6 col-md-4", "col-6 col-md-4"),
				]),
				//Columns are always 50% wide, on mobile and desktop
				fnDiv("row", [fnDiv("col-6", "col-6"), fnDiv("col-6", "col-6")]),
			]);
		},
	},

	{
		title: "Row columns",
		msg: [
			"Use the responsive .row-cols-* classes to quickly set the number of columns that best render your content and layout. Whereas normal .col-* classes apply to the individual columns (e.g., .col-md-4), the row columns classes are set on the parent .row as a shortcut. With .row-cols-auto you can give the columns their natural width.",
			"Use these row columns classes to quickly create basic grid layouts or to control your card layouts.",
		],
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row row-cols-2", [
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
				]),
			]);
		},
	},

	{
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row row-cols-3", [
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
				]),
			]);
		},
	},

	{
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row row-cols-auto", [
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
				]),
			]);
		},
	},

	{
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row row-cols-4", [
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
				]),
			]);
		},
	},

	{
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row row-cols-4", [
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col-6", "Column"),
					fnDiv("col", "Column"),
				]),
			]);
		},
	},

	{
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row row-cols-1 row-cols-sm-2 row-cols-md-4", [
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
					fnDiv("col", "Column"),
				]),
			]);
		},
	},

	{
		title: "Nesting",
		msg: "To nest your content with the default grid, add a new .row and set of .col-sm-* columns within an existing .col-sm-* column. Nested rows should include a set of columns that add up to 12 or fewer (it is not required that you use all 12 available columns).",
		sample: { fnDiv: fnDiv },
		viewclass: "cl-highlight-col",
		code: function () {
			return fnDiv("container", [
				fnDiv("row", [
					fnDiv("col-sm-3", "Level 1: col-sm-3"),
					fnDiv(
						"col-sm-9",
						fnDiv("row", [
							fnDiv("col-8 col-sm-6", "Level 2: col-8 col-sm-6"),
							fnDiv("col-4 col-sm-6", "Level 2: col-4 col-sm-6"),
						])
					),
				]),
			]);
		},
	},
];
