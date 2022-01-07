"use strict";
import * as core from "./core.js";
import div from "./div.js";

const defaultOption = { label: null, elem: null };
/**
 * opt : {tagoption,label,elem}
 */
export default class btntoolbar extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.attr = core.merge.attr(opt.attr, {
				role: "toolbar",
				"aria-label": opt.label,
			});

			opt.class = core.merge.class(opt.class, "btn-toolbar");

			delete opt.label;

			super.data = opt;
		}
	}
}
