"use strict";
import * as core from "./core.js";
import cont from "./cont.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt : {attr,class,style,id,name,onclick,elem}
 */
export default class span extends cont {
	constructor(...arg) {
		super("span", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = core.extend({}, { tag: "span" }, arg);
	}
}
