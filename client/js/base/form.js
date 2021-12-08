"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = { tag: "form" };
/**
 * opt : {tagoption}
 */
export default class form extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		super.data = core.extend({}, defaultOption, opt);
	}
}
