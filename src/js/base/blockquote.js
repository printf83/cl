"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
const defaultOption = {
	tag: "blockquote",
	cite: null,
};

export default class div extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		opt.attr = core.merge.attr(opt.attr, {
			cite: opt.cite,
		});

		delete opt.cite;

		super.data = opt;
	}
}
