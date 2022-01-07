"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";

const defaultOption = { tag: "a", icon: null, label: null, color: null };
/**
 * opt : {tagoption,icon,label}
 */
export default class extends tag {
	constructor(...opt) {
		super();
		if (opt && opt.length > 0) {
			if (opt.length === 2) {
				this.data = {
					href: opt[0],
					elem: opt[1],
				};
			} else if (opt.length === 1) {
				if (typeof opt[0] === "object") {
					this.data = opt[0];
				} else {
					this.data = { href: opt[0], elem: opt[0] };
				}
			}
		}
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		opt.elem = opt.elem || (opt.label || opt.icon ? new label({ icon: opt.icon, label: opt.label }) : opt.href);

		opt.linkcolor = opt.linkcolor || opt.color;

		delete opt.color;
		delete opt.icon;
		delete opt.label;

		super.data = opt;
	}
}
