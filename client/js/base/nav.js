"use strict";
import * as core from "./core.js";
import cont from "./cont.js";

/**
 * opt : {tag option}
 */
export default class nav extends cont {
	constructor(opt) {
		super("nav", opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, { tag: "nav" }, opt);
	}
}
