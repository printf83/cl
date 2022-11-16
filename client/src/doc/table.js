"use strict";
import * as core from "../cl/base/core.js";
import b from "../cl/base/b.js";
import * as table from "../cl/base/table.js";

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
				//marker
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
				//marker
				footer: true,

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

					//marker
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
				//marker
				header: false,

				rownumber: true,
				item: [
					//marker
					//["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"],

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
				//marker
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
				//marker
				striped: true,

				color: "primary",
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
				//marker
				stripedcolumn: true,

				color: "primary",
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
				//marker
				hover: true,

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
		title: "Caption",
		import: ["table"],
		code: () => {
			return new table.container({
				//marker
				caption: "Table caption",

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
		title: "Caption on top",
		import: ["table"],
		code: () => {
			return new table.container({
				//marker
				caption: "Table caption",
				captiontop: true,
				//-

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

	{
		title: "Using cl component",
		msg: `Using {{table.container}} with {{table.thead}}, {{table.tbody}}, {{table.tr}}, {{table.td}} and , {{table.th}}`,
		import: ["table", "b"],
		code: () => {
			let fn = (d) => {
				return new table.tr({
					class: `table-${d}`,
					elem: [
						new table.td({ elem: new b({ elem: d ? core.capitalize(d) : "Default" }) }),
						new table.td({ elem: "Column content" }),
						new table.td({ elem: "Column content" }),
						new table.td({ elem: "Column content", color: d, bgtextColor: d }),
					],
				});
			};

			return new table.container({
				hover: true,
				elem: [
					new table.thead({
						elem: new table.tr({
							elem: [
								new table.th({ elem: "Type" }),
								new table.th({ elem: "Column heading" }),
								new table.th({ elem: "Column heading" }),
								new table.th({ elem: "Column heading" }),
							],
						}),
					}),
					new table.tbody({
						elem: [
							fn("active"),
							fn(null),
							fn("primary"),
							fn("secondary"),
							fn("success"),
							fn("danger"),
							fn("warning"),
							fn("info"),
							fn("light"),
							fn("dark"),
						],
					}),
				],
			});
		},
	},
];
