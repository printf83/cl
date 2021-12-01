"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * class,style,elem,href
 * class,style,elem,onclick
 * class,elem,href
 * class,elem,onclick
 * elem,href
 * elem,onclick
 * [elem],href
 * [elem],onclick
 * elem
 * [elem]
 * opt : {attr,class,style,id,name,href,onclick,elem}
 */
export default class a extends tag {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				class: null,
				style: null,
				onclick: null,
				href: null,
				elem: null,
			};

			if (arg.length === 4) {
				t.class = arg[0];
				t.style = arg[1];
				t.elem = arg[2];

				if (arg[3] instanceof Function) {
					t.onclick = arg[3];
				} else {
					t.href = arg[3];
				}
			} else if (arg.length === 3) {
				t.class = arg[0];
				t.elem = arg[1];

				if (arg[2] instanceof Function) {
					t.onclick = arg[2];
				} else {
					t.href = arg[2];
				}
			} else if (arg.length === 2) {
				t.elem = arg[0];

				if (arg[1] instanceof Function) {
					t.onclick = arg[1];
				} else {
					t.href = arg[1];
				}
			} else if (
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

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			d.tag = "a";
			super.data = d;
		} else {
			super.data = null;
		}
	}
}
