"use strict";
import cont from "./cont.js";

/**
 * level,class,style,elem
 * level,class,elem
 * level,[elem]
 * level,option
 */
export default class h extends cont {
	constructor(level, ...arg) {
		super(`h${level}`, ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
