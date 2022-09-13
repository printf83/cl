"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = { tag: "form", onsubmit: null, novalidate: null, gap: 3, row: true };
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

		opt.attr = core.merge.attr(opt.attr, {
			onsubmit: opt.onsubmit,
			noValidate: opt.novalidate, //warning:only noValidate with V uppercase is working
		});

		delete opt.novalidate;
		delete opt.onsubmit;

		super.data = opt;
	}
}
