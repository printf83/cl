"use strict";
import div from "./div.js";
import cl_form from "./form.js";

/**
 * icon, msg, callback
 * icon, msg, button : {label,color,click}
 * msg, callback
 * msg, button : {label,color,click}
 * opt : {modal option}
 */
export class form extends cl_form {
	constructor(elem, gap = 2, col = 1) {
		super({
			padding: 0,
			gap: gap,
			row: true,
			rowCol: col,
			elem: Array.isArray(elem)
				? elem.map((i) => {
						return new div({ col: true, elem: i });
				  })
				: new div({ col: true, elem: elem }),
		});
	}
}

export class stackform extends cl_form {
	constructor(elem, gap = 2, col = "auto") {
		super({
			padding: 0,
			gap: gap,
			row: true,
			elem: Array.isArray(elem)
				? elem.map((i) => {
						return new div({ col: col, elem: i });
				  })
				: new div({ col: col, elem: elem }),
		});
	}
}

export class vstack extends div {
	constructor(elem, gap = 2, col = 1) {
		super({
			gap: gap,
			row: true,
			rowCol: col,
			elem: Array.isArray(elem)
				? elem.map((i) => {
						return new div({ col: true, elem: i });
				  })
				: new div({ col: true, elem: elem }),
		});
	}
}

export class stack extends div {
	constructor(elem, gap = 2, col = "auto") {
		super({
			row: true,
			gap: gap,
			elem: Array.isArray(elem)
				? elem.map((i) => {
						return new div({ col: col, elem: i });
				  })
				: new div({ col: col, elem: elem }),
		});
	}
}

export class grid extends div {
	constructor(elem, gutter = 2, col = true) {
		super({
			padding: 0,
			display: "grid",
			gutter: gutter,
			col: col,
			elem: elem,
		});
	}
}
