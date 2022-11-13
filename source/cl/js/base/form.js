"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = { tag: "form", gap: 3, row: true };
/**
 * opt : {tagoption}
 */
export default class form extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		super.data = opt;
	}
}
