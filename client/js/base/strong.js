"use strict";
import cont from "./cont.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt : {attr,class,style,id,name,onclick,elem}
 */
export default class strong extends cont {
	constructor(...arg) {
		super("strong", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
