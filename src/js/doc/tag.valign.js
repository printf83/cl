"use strict";
import tag from "../base/tag.js";
import * as table from "../base/table.js";

export default [
	{
		title: "Vertical alignment",
		msg: "Easily change the vertical alignment of inline, inline-block, inline-table, and table cell elements.",
		anchor: false,
	},

	{
		msg: [
			"Change the alignment of elements with the {{verticalAlign}} property. Please note that vertical-align only affects {{inline}}, {{inline-block}}, {{inline-table}}, and {{table cell}} elements.",
			"Choose from {{baseline}}, {{top}}, {{middle}}, {{bottom}}, {{text-bottom}}, and {{text-top}} as needed.",
			"To vertically center non-inline content (like {{div}} and more), use Bootstrap <b>flex box utilities</b>.",
			"With inline elements:",
		],
		import: ["tag"],
		code: () => {
			return ["baseline", "top", "middle", "bottom", "text-top", "text-bottom"].map((i) => {
				return new tag({
					tag: "span",
					verticalAlign: i, //marker
					elem: ` ${i} `,
				});
			});
		},
	},

	{
		msg: "With table cell",
		import: ["table"],
		code: () => {
			return new table.container({
				height: "8rem",
				border: false,
				elem: new table.tbody({
					elem: new table.tr({
						elem: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom"].map((i) => {
							return new table.td({
								verticalAlign: i, //marker
								elem: i,
							});
						}),
					}),
				}),
			});
		},
	},
];
