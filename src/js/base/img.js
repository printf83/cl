"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption,src,alt}
 */

const defaultOption = {
	tag: "img",
	src: null,
	alt: "Image",
};

export default class extends tag {
	constructor(...opt) {
		super();
		if (opt && opt.length > 0) {
			if (opt.length === 2) {
				this.data = {
					class: opt[0],
					src: opt[1],
				};
			} else if (opt.length === 1) {
				if (typeof opt[0] === "object") {
					this.data = opt[0];
				} else {
					this.data = { src: opt[0] };
				}
			}
		}
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.attr = core.merge.attr(opt.attr, {
				src: opt.src,
				alt: opt.alt,
			});

			delete opt.src;
			delete opt.alt;

			super.data = opt;
		}
	}
}
