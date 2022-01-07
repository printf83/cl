"use strict";
import * as core from "./core.js";
import div from "./div.js";

const defaultOption = { label: null, weight: null, vertical: false, elem: null };
/**
 * opt : {tagoption,label,weight,vertical,elem}
 */
export default class extends div {
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
				role: "group",
				"aria-label": opt.label,
			});

			opt.class = core.merge.class(opt.class, [
				opt.vertical ? "btn-group-vertical" : "btn-group",
				opt.weight ? `btn-group-${opt.weight}` : null,
			]);

			delete opt.label;
			delete opt.weight;
			delete opt.vertical;

			super.data = opt;
		}
	}
}
