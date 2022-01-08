"use strict";
import * as core from "./core.js";
import li from "./li.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
const defaultOption = {
	tag: "ol",
};

export default class ol extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		if (opt.item && !opt.elem) {
			opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];
			opt.elem = opt.item.map(function (i) {
				return new li(i);
			});
		}

		delete opt.item;

		super.data = opt;
	}
}
