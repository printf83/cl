"use strict";
import cont from "./cont.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * option
 */
export default class p extends cont {
	constructor(...arg) {
		super("p", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
