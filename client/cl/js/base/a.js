"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";

const defaultOption = { tag: "a", icon: null, label: null, color: null };
/**
 * opt : {tagoption,icon,label}
 */
export default class a extends tag {
	constructor(...opt) {
		super();
		this.data = core.args(
			[
				{
					rule: ["string", "cl|cl[]|string|string[]"],
					fn: (opt) => {
						return {
							href: opt[0],
							elem: opt[1],
						};
					},
				},
				{
					rule: ["cl|cl[]|string|string[]"],
					fn: (opt) => {
						return { href: "#", elem: opt[0] };
					},
				},
				{
					rule: ["object"],
					fn: (opt) => opt[0],
				},
			],
			"a",
			opt
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		opt.elem = opt.elem || (opt.label || opt.icon ? new label({ icon: opt.icon, label: opt.label }) : opt.href);

		opt.linkColor = opt.linkColor || opt.color;

		delete opt.color;
		delete opt.icon;
		delete opt.label;

		super.data = opt;
	}
}
