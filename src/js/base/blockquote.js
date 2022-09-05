"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
const defaultOption = {
	tag: "blockquote",
	cite: null,
};

export default class div extends tag {
	constructor(...opt) {
		super();

		this.data = core.args(
			[
				{
					rule: ["any", "string", "any"],
					fn: (opt) => {
						return {
							class: opt[0],
							cite: opt[1],
							elem: opt[2],
						};
					},
				},
				{
					rule: ["string", "any"],
					fn: (opt) => {
						return {
							cite: opt[0],
							elem: opt[1],
						};
					},
				},
				{
					rule: ["object"],
					fn: (opt) => {
						return opt[0];
					},
				},
				{
					rule: ["object"],
					fn(opt) {
						return {
							cite: opt[0],
							elem: opt[0],
						};
					},
				},
			],
			opt
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		opt.attr = core.merge.attr(opt.attr, {
			cite: opt.cite,
		});

		delete opt.cite;

		super.data = opt;
	}
}
