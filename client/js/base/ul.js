"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
export default class ul extends tag {
	constructor(opt) {
		super(core.extend({}, { tag: "ul" }, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = opt;
	}
}
