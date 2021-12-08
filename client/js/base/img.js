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

export default class img extends tag {
	constructor(opt) {
		super(core.extend({}, defaultOption, opt));
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
