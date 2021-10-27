"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import div from "./div.js";

/**
 * for,label,elem
 * label,elem
 * [elem],
 * option
 */
export class container extends tag {
	constructor(...arg) {
		super();
		this.data = arg;
	}

	get data() {
		return this._d;
	}
	set data(arg) {
		this._d = arg;
		if (arg) {
			let t = {
				for: null,
				label: null,
				elem: null,
			};

			if (arg && arg.length === 3) {
				t.for = arg[0];
				t.label = arg[1];
				t.elem = arg[2];
			} else if (arg && arg.length === 2) {
				t.label = arg[0];
				t.elem = arg[1];
			} else if (arg && arg.length === 1 && Array.isArray(arg[0])) {
				t.elem = arg[0];
			} else {
				t = arg[0];
			}

			let d = core.extend(
				{},
				{
					for: null,
					label: null,
					attr: null,
					elem: null,
					nowarp: false,
				},
				t
			);

			super.data = {
				elem: [
					d.label ? new label(d.for, "form-label", d.label) : null,
					new div({
						attr: d.attr,
						class: ["input-group", d.nowarp ? "flex-nowarp" : null],
						elem: d.elem,
					}),
				],
			};
		}
	}
}

/**
 * [elem]
 * option
 */
export class text extends div {
	constructor(...arg) {
		super();
		this.data = arg;
	}

	get data() {
		return this._d;
	}
	set data(arg) {
		this._d = arg;
		if (arg) {
			let t = {
				elem: null,
			};

			if (arg && arg.length === 1 && (typeof arg[0] === "string" || Array.isArray(arg[0]))) {
				t.elem = arg[0];
			} else {
				t = arg[0];
			}

			let d = core.extend(
				{},
				{
					attr: null,
					elem: null,
				},
				t
			);

			super.data = {
				attr: d.attr,
				class: ["input-group-text"],
				elem: d.elem,
			};
		}
	}
}
