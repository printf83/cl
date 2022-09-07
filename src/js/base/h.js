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

		this.data = core.args(
			[
				{
					rule: ["number", "string|string[]", "cl|cl[]|string|string[]"],
					fn: (opt) => {
						return {
							level: opt[0],
							class: opt[1],
							elem: opt[2],
						};
					},
				},
				{
					rule: ["number", "cl|cl[]|string|string[]"],
					fn: (opt) => {
						return {
							level: opt[0],
							elem: opt[1],
						};
					},
				},
				{
					rule: ["string|string[]", "cl|cl[]|string|string[]"],
					fn: (opt) => {
						return {
							level: 5,
							class: opt[0],
							elem: opt[1],
						};
					},
				},
				{
					rule: ["string"],
					fn: (opt) => {
						return { elem: opt[0] };
					},
				},
				{
					rule: ["object"],
					fn: (opt) => opt[0],
				},
				// {
				// 	rule: null,
				// 	fn: (opt) => null,
				// },
			],
			"h",
			opt
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);
		opt.level = opt.level || 5;
		opt.tag = `h${opt.level}`;

		delete opt.level;

		super.data = opt;
	}
}
