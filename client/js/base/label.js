"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import span from "./span.js";
import icon from "./icon.js";
import attr from "./attr.js";

/**
 * for,icon,label
 * icon,label
 * label
 * option
 */
export default class label extends tag {
	constructor(...arg) {
		super();

		let t = {};

		if (arg && arg.length === 3) {
			t.for = arg[0];
			t.icon = arg[1];
			t.label = arg[2];
		} else if (arg && arg.length === 2) {
			t.icon = arg[0];
			t.label = arg[1];
		} else if (arg && arg.length === 1 && typeof arg[0] === "string") {
			t.label = arg[0];
		} else {
			t = arg[0];
		}

		this.data = core.extend(
			{},
			{
				attr: null,
				for: null,
				icon: null,
				label: null,
			},
			t
		);
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			this._d = {
				tag: "label",
				attr: attr.merge(d.attr, {
					for: d.for,
				}),
				elem: [d.icon ? new span(d.label ? "me-2" : null, new icon(d.icon)) : null, d.label],
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
