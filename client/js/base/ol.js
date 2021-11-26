"use strict";
import * as core from "./core.js";
import cont from "./cont.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt : {attr,class,style,elem}
 */
export default class ol extends cont {
	constructor(...arg) {
		super("ol", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = core.extend({}, { tag: "ol" }, arg);
	}
}
