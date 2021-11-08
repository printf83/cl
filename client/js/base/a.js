"use strict";
import cont from "./cont.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt : {attr,class,style,elem}
 */
export default class a extends cont {
	constructor(...arg) {
		super("a", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
