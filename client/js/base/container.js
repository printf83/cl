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
			class: "container p-0",
			elem: new div({
				class: `row row-cols-${col} g-${gap}`,
				elem: Array.isArray(elem)
					? elem.map(function (i) {
							return new div({ class: "col", elem: i });
					  })
					: new div({ class: "col", elem: elem }),
			}),
		});
	}
}

export class stack extends tag {
	constructor(elem, gap = 2, col = "auto") {
		super({
			class: "container p-0",
			elem: new div({
				class: `row row-cols-${col} g-${gap}`,
				elem: Array.isArray(elem)
					? elem.map(function (i) {
							return new div({ class: "col", elem: i });
					  })
					: new div({ class: "col", elem: elem }),
			}),
		});
	}
}
