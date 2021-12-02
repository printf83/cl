"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
export default class div extends tag {
	constructor(opt) {
		super(core.extend({}, { tag: "div" }, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, { tag: "div" }, opt);
	}
}
