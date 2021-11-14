"use strict";
import * as core from "./core.js";
import { mergeAttr } from "./cl.js";
import div from "./div.js";

/**
 * label,elem
 * [elem],
 * opt : {attr,label,elem,weight,vertical}
 */
export default class btngroup extends div {
	_d = null;

	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				for: null,
				label: null,
				elem: null,
			};

			if (arg.length === 2) {
				t.label = arg[0];
				t.elem = arg[1];
			} else if (arg.length === 1 && Array.isArray(arg[0])) {
				t.elem = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
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
				attr: mergeAttr(d.attr, {
					role: "group",
					"aria-label": d.label,
				}),
				class: [d.vertical ? "btn-group-vertical" : "btn-group", d.weight ? `btn-group-${d.weight}` : null],
				elem: d.elem,
			};
		} else {
			this._d = null;
		}

		this.setting = d;
		super.data = this._d;
	}

	get setting() {
		return this._s;
	}
	set setting(d) {
		this._s = d;
	}
}
