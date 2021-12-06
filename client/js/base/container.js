"use strict";
import tag from "./tag.js";
import div from "./div.js";

/**
 * icon, msg, callback
 * icon, msg, button : {label,color,onclick}
 * msg, callback
 * msg, button : {label,color,onclick}
 * opt : {modal option}
 */
export class form extends div {
	constructor(elem, gap = 2, col = 1) {
		super({
			padding: 0,
			class: "container",
			elem: new div({
				gap: gap,
				row: true,
				class: `row-cols-${col}`,
				elem: Array.isArray(elem)
					? elem.map(function (i) {
							return new div({ col: true, elem: i });
					  })
					: new div({ col: true, elem: elem }),
			}),
		});
	}
}

export class stack extends tag {
	constructor(elem, gap = 2, col = "auto") {
		super({
			padding: 0,
			class: "container",
			elem: new div({
				row: true,
				gap: gap,
				class: `row-cols-${col}`,
				elem: Array.isArray(elem)
					? elem.map(function (i) {
							return new div({ col: true, elem: i });
					  })
					: new div({ col: true, elem: elem }),
			}),
		});
	}
}
