"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = { level: 1 };
/**
 * level, opt : {tagoption}
 */
export default class h extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);
		opt.tag = `h${opt.level}`;

		delete opt.level;

		super.data = opt;
	}
}
