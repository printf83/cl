"use strict";
import * as core from "./core.js";
import div from "./div.js";

const defaultOption = { label: null };
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

			opt = core.merge(opt, {
				class: "btn-toolbar",
				role: "toolbar",
				"aria-label": opt.label,
			});

			delete opt.label;

			super.data = opt;
		}
	}
}
