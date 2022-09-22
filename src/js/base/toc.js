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

const defaultOption = { label: "Table of content", icon: null, type: "link", item: null };
const defaultItemOption = { level: 1 };
/**
 * opt : {tagoption,type,icon,label,item:{itemOption}}
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

		opt = core.merge(opt, {
			class: "cl-toc",
			elem: [
				new h({ level: 6, elem: new label({ icon: opt.icon, label: opt.label }) }),
				new hr({ marginY: 2 }),
				new ul({
					id: opt.id,
					class: ["list-unstyled", opt.type === "menu" ? null : "small"],
					elem: opt.item.map((i) => {
						i = core.extend({}, defaultItemOption, i);

						i = core.merge(i, {
							class: "cl-toc-item",
						});

						let level = i.level;

						delete i.level;

						if (opt.type === "menu") {
							return new li({
								class: [level === 1 ? null : "fw-bold"],
								marginY: 1,
								elem: new button(i),
							});
						} else {
							return new li({
								class: [level === 1 ? null : "fw-bold"],
								elem: new button(i),
							});
						}
					}),
				}),
			],
		});

		// delete opt.id;
		delete opt.icon;
		delete opt.label;
		delete opt.item;

		super.data = opt;
	}
}
