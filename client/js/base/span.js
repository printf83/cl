"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
export default class span extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, { tag: "span" }, opt);
	}
}
