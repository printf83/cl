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
					rule: ["string|string[]", "string", "cl|cl[]|string|string[]"],
					fn: (opt) => {
						return {
							class: opt[0],
							cite: opt[1],
							elem: opt[2],
						};
					},
				},
				{
					rule: ["string", "cl|cl[]|string|string[]"],
					fn: (opt) => {
						return {
							cite: opt[0],
							elem: opt[1],
						};
					},
				},
				{
					rule: ["string"],
					fn: (opt) => {
						return {
							cite: opt[0],
							elem: opt[0],
						};
					},
				},
				{
					rule: ["cl|cl[]|string|string[]"],
					fn: (opt) => {
						return { elem: opt[0] };
					},
				},
				{
					rule: ["object"],
					fn: (opt) => {
						return opt[0];
					},
				},
			],
			"blockquote",
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
