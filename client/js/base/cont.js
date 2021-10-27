"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";

/**
 * tag,class,style,elem
 * tag,class,elem
 * tag,[elem]
 * tag,option
 */
export default class cont extends tag {
	constructor(tag, ...arg) {
		super();

		let t = {
			class: null,
			style: null,
			elem: null,
		};

		if (arg && arg.length === 3) {
			t.class = arg[0];
			t.style = arg[1];
			t.elem = arg[2];
		} else if (arg && arg.length === 2) {
			t.class = arg[0];
			t.elem = arg[1];
		} else if ((arg && arg.length === 1 && typeof arg[0] === "string") || Array.isArray(arg[0])) {
			t.elem = arg[0];
		} else {
			t = arg[0];
		}

		this.data = {
			tag: tag,
			arg: t,
		};
	}

	get data() {
		return this._d;
	}
	set data(value) {
		this._d = value;

		if (value && value.tag && value.arg) {
			let d = core.extend(
				{},
				{
					attr: null,
					class: null,
					style: null,
					elem: null,
				},
				value.arg
			);

			super.data = {
				tag: value.tag,
				attr: attr.merge(d.attr, {
					class: d.class,
					style: d.style,
				}),
				elem: d.elem,
			};
		}
	}
}
