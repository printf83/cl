"use strict";
import * as core from "./core.js";
import attr from "./attr.js";
import div from "./div.js";

/**
 * label,elem
 * [elem],
 * option
 */
export default class btngroup extends div {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				for: null,
				label: null,
				elem: null,
			};

			if (arg && arg.length === 2) {
				t.label = arg[0];
				t.elem = arg[1];
			} else if (arg && arg.length === 1 && Array.isArray(arg[0])) {
				t.elem = arg[0];
			} else {
				t = arg[0];
			}

			this.data = core.extend(
				{},
				{
					attr: null,

					label: null,
					elem: null,
					weight: null,
					vertical: false,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			this._d = {
				attr: attr.merge(d.attr, {
					role: "group",
					"aria-label": d.label,
				}),
				class: [d.vertical ? "btn-group-vertical" : "btn-group", d.weight ? `btn-group-${d.weight}` : null],
				elem: d.elem,
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
