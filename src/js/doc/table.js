"use strict";
import * as sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Table",
		anchor: false,
	},

	{
		title: "Example",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				item: sample.table(true, false),
			});
		},
	},

	{
		title: "Row number",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				rownumber: true,
				item: sample.table(true, false),
			});
		},
	},

	{
		title: "With footer",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				rownumber: true,
				footer: true,
				item: sample.table(true, true),
			});
		},
	},

	{
		title: "Without header",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				rownumber: true,
				header: false,
				item: sample.table(false, false),
			});
		},
	},

	{
		title: "Color",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				color: "primary",
				footer: true,
				item: sample.table(true, true),
			});
		},
	},

	{
		title: "Striped",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				color: "primary",
				striped: true,
				footer: true,
				item: sample.table(true, true),
			});
		},
	},

	{
		title: "Hover",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				color: "primary",
				striped: true,
				hover: true,
				footer: true,
				item: sample.table(true, true),
			});
		},
	},

	{
		title: "Caption",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				color: "primary",
				striped: true,
				hover: true,
				footer: true,
				caption: "Table caption",
				item: sample.table(true, true),
			});
		},
	},

	{
		title: "Caption on top",
		sample: {
			"sample.table": sample.table,
		},
		code: function () {
			return new $.table.container({
				color: "primary",
				striped: true,
				hover: true,
				footer: true,
				caption: "Table caption",
				captiontop: true,
				item: sample.table(true, true),
			});
		},
	},

	{
		title: "Kitchen sink",
		code: function () {
			return new $.table.container({
				color: "primary",
				striped: true,
				hover: true,
				footer: true,
				caption: "Table caption",
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
					[
						new $.table.td({ colspan: 5, elem: "" }),
						new $.table.td({ align: "end", elem: "Total" }),
						new $.table.td({
							color: "danger",
							textcolor: "light",
							elem: "2,524.01",
						}),
					],
				],
			});
		},
	},
];
