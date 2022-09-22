"use strict";
import * as core from "./core.js";
import div from "./div.js";

const defaultOption = { label: null, weight: null, vertical: false };
export default class btngroup extends div {
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
				class: [
					opt.vertical ? "btn-group-vertical" : "btn-group",
					opt.weight ? `btn-group-${opt.weight}` : null,
				],
				role: "group",
				"aria-label": opt.label,
			});

			delete opt.label;
			delete opt.weight;
			delete opt.vertical;

			super.data = opt;
		}
	}
}
