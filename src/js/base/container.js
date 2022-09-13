"use strict";
import div from "./div.js";
import cl_form from "./form.js";

/**
 * icon, msg, callback
 * icon, msg, button : {label,color,onclick}
 * msg, callback
 * msg, button : {label,color,onclick}
 * opt : {modal option}
 */
export class form extends cl_form {
	constructor(elem, gap = 3, col = 1) {
		super({
			padding: 0,
			gap: gap,
			row: true,
			rowcol: col,
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
			// col: col,
			// elem: elem,
			elem: Array.isArray(elem)
				? elem.map((i) => {
						return new div({ col: col, elem: i });
				  })
				: new div({ col: col, elem: elem }),
		});
	}
}

export class vstack extends div {
	constructor(elem, gap = 3, col = 1) {
		super({
			gap: gap,
			row: true,
			rowcol: col,
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
			// rowcol: col,
			elem: Array.isArray(elem)
				? elem.map((i) => {
						return new div({ col: col, elem: i });
				  })
				: new div({ col: col, elem: elem }),
		});
	}
}

export class grid extends div {
	constructor(elem, gap = 2, col = null) {
		super({
			padding: 0,
			display: "grid",
			gap: gap,
			col: col,
			elem: elem,
		});
	}
}
