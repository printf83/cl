"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
/**
 * opt : {tagoption,icon,label}
 */
export default class a extends tag {
	constructor(opt) {
		super(core.extend({}, { tag: "a", icon: null, label: null }, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, super.data, opt);
			opt.elem = opt.elem || (opt.label || opt.icon ? new label({ icon: opt.icon, label: opt.label }) : opt.href);

			delete opt.icon;
			delete opt.label;

			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
