"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
const defaultOption = {
	tag: "span",
};

export default class span extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, defaultOption, opt);
	}
}
