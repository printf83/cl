"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
export default class li extends tag {
	constructor(opt) {
		super(core.extend({}, { tag: "li" }, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, super.data, opt);
	}
}
