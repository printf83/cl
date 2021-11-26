"use strict";
import * as core from "./core.js";
import cont from "./cont.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt :{attr,class,style,id,name,onclick,elem}
 */
export default class p extends cont {
	constructor(...arg) {
		super("p", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = core.extend({}, { tag: "p" }, arg);
	}
}
