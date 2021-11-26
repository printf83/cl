"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt : {attr,class,style,id,name,onclick,elem}
 */
export default class hr extends tag {
	constructor(...arg) {
		if (arg && arg.length > 0) {
			if (arg.length === 1) {
				if (typeof arg[0] === "string" || Array.isArray(arg[0])) {
					super({ tag: "hr", attr: { class: arg[0] } });
				} else {
					super({ tag: "hr", attr: arg[0] });
				}
			} else {
				console.error("Unsupported argument", arg);
			}
		} else {
			super({ tag: "hr" });
		}
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = core.extend({}, { tag: "hr" }, arg);
	}
}
