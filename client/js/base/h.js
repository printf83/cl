"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * level, opt : {tagoption}
 */
export default class h extends tag {
	constructor(level = 1, opt) {
		opt = core.extend({}, { tag: `h${level}` }, opt);
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
