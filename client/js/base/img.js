"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption,src,alt}
 */
export default class img extends tag {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					tag: "img",
					src: null,
					alt: "Image",
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {

			opt = core.extend(
				{},
				{
					tag: "img",
					src: null,
					alt: "Image",
				},
				opt
			);
			
			opt.attr = core.merge.attr(opt.attr, {
				src: opt.src,
				alt: opt.alt,
			});

			delete opt.src;
			delete opt.alt;

			super.data = opt;
		} else {
			super.data = null;
		}
	}
}
