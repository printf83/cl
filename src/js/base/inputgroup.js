"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import div from "./div.js";

const defaultOption = {
	for: null,
	label: null,
	elem: null,
	nowrap: true,
	weight: null,
};
/**
 * opt : {tagoption}
 */
export class container extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			let ctllabel = opt.label ? new label({ for: opt.for, class: "form-label", label: opt.label }) : null;

			delete opt.label;
			delete opt.for;

			let ctlmain = new div(opt);
			let t = core.merge(ctlmain.data, {
				class: [
					"input-group",
					opt.weight ? `input-group-${opt.weight}` : null,
					opt.nowrap ? "flex-nowrap" : null,
				],
			});

			delete t.weight;
			delete t.nowrap;

			ctlmain.data = t;

			super.data = {
				elem: [ctllabel, ctlmain],
			};
		}
	}
}

/**
 * opt : {tagoption}
 */
export class text extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.merge(opt, {
				class: "input-group-text",
			});
			super.data = opt;
		}
	}
}
