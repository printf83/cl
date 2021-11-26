"use strict";
import * as core from "./core.js";
import cont from "./cont.js";

/**
 * level,class,style,elem
 * level,class,elem
 * level,[elem]
 * level,opt : {attr,class,style,id,name,onclick,elem}
 */
export default class h extends cont {
	constructor(level, ...arg) {
		if (level && typeof level === "number" && level >= 1 && level <= 6) {
			super(`h${level}`, ...arg);
		} else {
			console.warn("H tag level should be a number 1 to 6.", level);
			super(`h1`, ...arg);
		}
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = core.extend({}, { tag: "h1" }, arg);
	}
}
