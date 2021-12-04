"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
export default class nav extends tag {
	constructor(opt) {
		super(core.extend({}, { tag: "nav" }, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = opt;
	}
}