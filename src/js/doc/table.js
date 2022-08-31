"use strict";
import sample from "./sample.js";
import * as table from "../base/table.js";

export default [
	{
		title: "Table",
		anchor: false,
	},

	{
		title: "Example",
		import: ["table"],
		code: () => {
			return new table.container({
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
				],
			});
		},
	},

	{
		title: "Row number",
		import: ["table"],
		code: () => {
			return new table.container({
				rownumber: true,
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
				],
			});
		},
	},

	{
		title: "With footer",
		import: ["table"],
		code: () => {
			return new table.container({
				rownumber: true,
				footer: true,
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
					["", "", "", "", "", "Total", "2,524.01"],
				],
			});
		},
	},

	{
		title: "Without header",
		import: ["table"],
		code: () => {
			return new table.container({
				rownumber: true,
				header: false,
				item: [
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
				],
			});
		},
	},

	{
		title: "Color",
		import: ["table"],
		code: () => {
			return new table.container({
				color: "dark",
				footer: true,
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
					["", "", "", "", "", "Total", "2,524.01"],
				],
			});
		},
	},

	{
		title: "Striped",
		import: ["table"],
		code: () => {
			return new table.container({
				color: "primary",
				striped: true,
				footer: true,
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
					["", "", "", "", "", "Total", "2,524.01"],
				],
			});
		},
	},

	{
		title: "Striped columns",
		import: ["table"],
		code: () => {
			return new table.container({
				color: "primary",
				stripedcolumn: true,
				footer: true,
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
					["", "", "", "", "", "Total", "2,524.01"],
				],
			});
		},
	},

	{
		title: "Hover",
		import: ["table"],
		code: () => {
			return new table.container({
				color: "primary",
				striped: true,
				hover: true,
				footer: true,
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
					["", "", "", "", "", "Total", "2,524.01"],
				],
			});
		},
	},

	{
		title: "Caption",
		import: ["table"],
		code: () => {
			return new table.container({
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
					["", "", "", "", "", "Total", "2,524.01"],
				],
			});
		},
	},

	{
		title: "Caption on top",
		import: ["table"],
		code: () => {
			return new table.container({
				color: "primary",
				striped: true,
				hover: true,
				footer: true,
				caption: "Table caption",
				captiontop: true,
				item: [
					["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],
					["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
					["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
					["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
					["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
					["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
					["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
					["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
					["", "", "", "", "", "Total", "2,524.01"],
				],
			});
		},
	},

	{
		title: "Kitchen sink",
		import: ["table"],
		code: () => {
			return new table.container({
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
						new table.td({ colspan: 5, elem: "" }),
						new table.td({ align: "end", elem: "Total" }),
						new table.td({
							color: "danger",
							elem: "2,524.01",
						}),
					],
				],
			});
		},
	},
];
