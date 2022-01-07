"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = { tag: "hr" };

/**
 * opt : {tagoption}
 */
export default class extends tag {
	constructor(opt) {
		super(core.extend({}, defaultOption, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		delete opt.elem;
		super.data = opt;
	}
}
