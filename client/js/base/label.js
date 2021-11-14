"use strict";
import * as core from "./core.js";
import { mergeAttr } from "./cl.js";
import tag from "./tag.js";
import span from "./span.js";
import icon from "./icon.js";

/**
 * for,icon,label
 * icon,label
 * label
 * opt : {attr,for,icon,label}
 */
export default class label extends tag {
	_d = null;

	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				for: null,
				icon: null,
				label: null,
			};

			if (arg.length === 3) {
				t.for = arg[0];
				t.icon = arg[1];
				t.label = arg[2];
			} else if (arg.length === 2) {
				t.icon = arg[0];
				t.label = arg[1];
			} else if (arg.length === 1 && typeof arg[0] === "string") {
				t.label = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					attr: null,
					for: null,
					icon: null,
					label: null,
					hidelabel: false,
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
		if (d && (d.icon || d.label)) {
			if (d.hidelabel) {
				if (d.icon) {
					this._d = {
						elem: [new icon(d.icon), d.label ? new span("visually-hidden", d.label) : null],
					};
				} else {
					this._d = {
						elem: new span("visually-hidden", d.label),
					};
				}
			} else {
				this._d = {
					tag: "label",
					attr: mergeAttr(d.attr, {
						for: d.for,
					}),
					elem: [
						d.icon ? new span(d.label && !d.hidelabel ? "me-2" : null, new icon(d.icon)) : null,
						d.label,
					],
				};
			}
		} else {
			this._d = null;
				}

		super.data = this._d;
	}

}
