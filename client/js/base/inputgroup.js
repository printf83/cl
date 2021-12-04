"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import div from "./div.js";

/**
 * opt : {tagoption}
 */
export class container extends tag {
	constructor(opt) {
		super();
		this.data = core.extend(
			{},
			{
				for: null,
				label: null,
				elem: null,
				nowarp: false,
			},
			opt
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			super.data = core.extend({}, super.data, opt);

			let ctllabel = opt.label ? new label({ for: opt.for, class: "form-label", label: opt.label }) : null;

			delete opt.label;
			delete opt.for;

			let ctlmain = new div(opt);
			let t = ctlmain.data;
			t.class = core.merge.class(t.class, ["input-group", opt.nowarp ? "flex-nowarp" : null]);

			delete t.nowarp;
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
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, "input-group-text");
			super.data = opt;
		}
	}
}
