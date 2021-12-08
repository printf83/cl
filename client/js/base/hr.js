"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = { tag: "hr" };

/**
 * opt : {tagoption}
 */
export default class hr extends tag {
	constructor(opt) {
		super(core.extend({}, defaultOption, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, defaultOption, opt);
	}
}
