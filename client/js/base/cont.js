"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";

/**
 * tag,class,style,elem
 * tag,class,elem
 * tag,elem
 * tag,[elem]
 * tag,opt : {attr,class,style,id,name,href(if tag a),onclick,elem}
 */
export default class cont extends tag {
	constructor(tag, ...arg) {
		super();

		if (tag) {
			this.tag = tag;
		} else {
			this.tag = null;
		}

		if (arg && arg.length > 0) {
			let t = {
				class: null,
				style: null,
				elem: null,
			};

			if (arg.length === 3) {
				t.class = arg[0];
				t.style = arg[1];
				t.elem = arg[2];
			} else if (arg.length === 2) {
				t.class = arg[0];
				t.elem = arg[1];
			} else if (
				arg &&
				arg.length === 1 &&
				(typeof arg[0] === "string" || Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl"))
			) {
				t.elem = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					id: null,
					name: null,
					onclick: null,
					href: null,

					attr: null,
					class: null,
					style: null,
					elem: null,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get tag() {
		return this._t;
	}
	set tag(d) {
		this._t = d;
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			this._d = {
				tag: this.tag,
				attr: attr.merge(d.attr, {
					class: d.class,
					style: d.style,

					id: d.id,
					name: d.name,
					href: d.href,
					onclick: d.onclick,
				}),
				elem: d.elem,
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
