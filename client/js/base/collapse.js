import * as core from "./core.js";
import attr from "./attr.js";
import tag from "./tag.js";
import div from "./div.js";

/**
 * elem, target
 * elem, opt : {attr,target,show}
 * target example : "#id", ".class"
 */
export class toggle extends tag {
	constructor(elem, ...arg) {
		super();

		if (elem) {
			this.elem = elem;
		} else {
			this.elem = null;
		}

		if (arg && arg.length > 0) {
			let t = {
				target: null,
			};

			if (arg.length === 1 && typeof arg[0] === "string") {
				t = {
					target: arg[0],
				};
			} else {
				t = arg[0];
			}

			this.data = core.extend(
				{},
				{
					attr: null,
					target: null,
					show: false,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get elem() {
		return this._e;
	}
	set elem(d) {
		this._e = d;
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d && this._e) {
			this._d = this._e.data;

			this._d.attr = attr.merge(this._d.attr, {
				"aria-controls": d.target,
				"aria-expanded": d.show ? "true" : "false",
				"data-bs-target": d.target,
				"data-bs-toggle": "collapse",
			});
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}

/**
 * elem, id
 * elem, opt : {attr,id,show}
 *
 * target example : "#id", ".class"
 */
export class container extends tag {
	constructor(elem, ...arg) {
		super();

		if (elem) {
			this.elem = elem;
		} else {
			this.elem = null;
		}

		if (arg && arg.length > 0) {
			let t = {
				id: null,
			};

			if (arg.length === 1 && typeof arg[0] === "string") {
				t = {
					id: arg[0],
				};
			} else {
				t = arg[0];
			}

			this.data = core.extend(
				{},
				{
					attr: null,
					id: null,
					class: null,
					show: false,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get elem() {
		return this._e;
	}
	set elem(d) {
		this._e = d;
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d && this._e) {
			this._d = {
				elem: new div({
					attr: attr.merge(d.attr, {
						id: d.id,
						class: ["collapse", d.show ? "show" : null, d.class],
					}),
					elem: this._e,
				}),
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
