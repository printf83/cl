"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = { level: 1 };
/**
 * level, opt : {tagoption}
 */
export default class h extends tag {
	constructor(...opt) {
		super();
		if (opt && opt.length > 0) {
			if (opt.length === 3) {
				this.data = {
					level: opt[0],
					class: opt[1],
					elem: opt[2],
				};
			} else if (opt.length === 2) {
				if (typeof opt[0] === "number") {
					this.data = {
						level: opt[0],
						elem: opt[1],
					};
				} else {
					this.data = {
						level: 1,
						class: opt[0],
						elem: opt[1],
					};
				}
			} else if (opt.length === 1) {
				if (typeof opt[0] === "object") {
					if (opt[0].hasOwnProperty("cl")) {
						this.data = { elem: opt[0] };
					} else {
						this.data = opt[0];
					}
				} else {
					this.data = { elem: opt[0] };
				}
			}
		}
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);
		opt.tag = `h${opt.level}`;

		delete opt.level;

		super.data = opt;
	}
}
