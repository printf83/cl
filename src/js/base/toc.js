"use strict";
// import "../../css/toc.css";

import button from "./button.js";
import * as core from "./core.js";
import div from "./div.js";
import label from "./label.js";
import ul from "./ul.js";
import li from "./li.js";
import h from "./h.js";
import hr from "./hr.js";

const defaultOption = { label: "Table of content", icon: null, item: null };
const defaultItemOption = { level: 1 };
/**
 * opt : {tagoption,icon,label,item:{itemOption}}
 * itemOpt:{tagoption,buttonOption,level}
 */
export default class toc extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);
		opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];

		opt.class = core.merge.class(opt.class, "cl-toc");
		opt.elem = [
			new h({ level: 6, elem: new label({ icon: opt.icon, label: opt.label }) }),
			new hr({ marginx: 1 }),
			new ul({
				class: ["list-unstyled", "small"],
				elem: opt.item.map(function (i) {
					i = core.extend({}, defaultItemOption, i);
					let level = i.level;

					delete i.level;

					return new li({
						class: [level === 1 ? null : "fw-bold", "mx-1", "text-truncate"],
						elem: new button(i),
					});
				}),
			}),
		];

		delete opt.icon;
		delete opt.label;
		delete opt.item;

		super.data = opt;
	}
}
