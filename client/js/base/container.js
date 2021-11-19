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
export class form extends tag {
	constructor(elem, gap = 2, col = 1) {
		if (elem) {
			super({
				elem: new div(
					"container p-0",
					new div(
						`row row-cols-${col} g-${gap}`,
						Array.isArray(elem)
							? elem.map(function (i) {
									return new div("col", i);
							  })
							: new div("col", elem)
					)
				),
			});
		} else {
			super();
		}
	}
}

export class stack extends tag {
	constructor(elem, gap = 2, col = "auto") {
		if (elem) {
			super({
				elem: new div(
					"container p-0",
					new div(
						`row row-cols-${col} g-${gap}`,
						Array.isArray(elem)
							? elem.map(function (i) {
									return new div("col", i);
							  })
							: new div("col", elem)
					)
				),
			});
		} else {
			super();
		}
	}
}
