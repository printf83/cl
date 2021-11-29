"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * tag,class,style,elem
 * tag,class,elem
 * tag,elem
 * tag,[elem]
 * tag,opt : {attr,class,style,id,name,href(if tag a),onclick,elem}
 */
export default class cont extends tag {
	constructor(tagName, ...arg) {
		super();

		if (tagName && arg && arg.length > 0) {
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
					tag: tagName,
					// id: null,
					// name: null,
					// onclick: null,
					// href: null,

					// attr: null,
					// class: null,
					// style: null,

					// elem: null,
				},
				t
			);
		} else {
			this.data = { tag: tagName };
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = d;
			// super.data = {
			// 	tag: d.tag,
			// 	attr: core.merge.attr(d.attr, {
			// 		class: d.class,
			// 		style: d.style,

			// 		id: d.id,
			// 		name: d.name,
			// 		href: d.href,
			// 		onclick: d.onclick,
			// 	}),
			// 	elem: d.elem,
			// };
		} else {
			super.data = null;
		}
	}
}
