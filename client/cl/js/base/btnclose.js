"use strict";
import * as core from "./core.js";
import button from "./button.js";

const defaultOption = { label: "Close", dismiss: null, dark: true, disabled: false };

export default class btnclose extends button {
	constructor(opt) {
		super(core.extend({}, defaultOption, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt = core.merge(opt, {
				class: ["btn-close", !opt.dark ? "btn-close-white" : null],
				"data-bs-dismiss": opt.dismiss,
				"aria-label": opt.label,
			});

			delete opt.dismiss;
			delete opt.label;
			delete opt.dark;

			super.data = opt;
		}
	}
}
