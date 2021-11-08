"use strict";
import cont from "./cont.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt : {attr,class,style,elem}
 */
export default class ul extends cont {
	constructor(...arg) {
		super("ul", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
