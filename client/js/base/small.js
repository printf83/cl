"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
const defaultOption = {
	tag: "small",
};

export default class small extends tag {
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
