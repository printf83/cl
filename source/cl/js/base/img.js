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
	fluid: false,
	thumbnail: false,
	caption: null,
	captionalign: null,
};

export default class img extends tag {
	constructor(...opt) {
		super();

		this.data = core.args(
			[
				{
					rule: ["string|string[]", "string|string[]"],
					fn: () => {
						return {
							class: opt[0],
							src: opt[1],
						};
					},
				},
				{
					rule: ["string|string[]"],
					fn: () => {
						return {
							src: opt[0],
						};
					},
				},
				{
					rule: ["object"],
					fn: () => {
						return opt[0];
					},
				},
			],
			"img",
			opt
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt = core.merge(opt, {
				class: [opt.fluid ? "img-fluid" : null, opt.thumbnail ? "img-thumbnail" : null],
			});

			delete opt.fluid;
			delete opt.thumbnail;

			let f = null;
			if (opt.caption) {
				f = {
					tag: "figure",
					class: "figure",
					elem: [
						new tag(opt),
						new tag({
							tag: "figcaption",
							class: "figure-caption",
							align: opt.captionalign,
							elem: opt.caption,
						}),
					],
				};

				delete opt.captionalign;
				delete opt.caption;
			}

			super.data = f ? f : opt;
		}
	}
}
