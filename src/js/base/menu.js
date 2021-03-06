"use strict";
// import "../../css/menu.css";

import * as core from "./core.js";
import * as collapse from "./collapse.js";
import button from "./button.js";
import ul from "./ul.js";
import li from "./li.js";
import div from "./div.js";

/**
 * opt : {tagoption,icon,label,active,item:{itemOption}}
 * itemOption{tagoption,buttonoption,active}
 */
const defaultOption = {
	icon: null,
	label: null,
	active: false,
	item: null,
};

const defaultItemOption = {
	active: false,
};

export default class menu extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];

		opt.id = opt.id ? opt.id : core.UUID();

		opt.elem = [
			new collapse.toggle({
				target: `#${opt.id}`,
				toggle: "collapse",
				show: opt.active,
				elem: new button({
					class: "cl-menu-toggle",
					label: opt.label,
					icon: opt.icon,
				}),
			}),
			new collapse.container({
				id: opt.id,
				show: opt.active,
				elem: new ul({
					class: "cl-menu-container",
					elem: opt.item.map(function (i) {
						if (typeof i === "string") {
							i = {
								label: i,
							};
						}

						i = core.extend({}, defaultItemOption, i);

						i.class = core.merge.class([, i.active ? "active" : null], i.class);

						delete i.active;

						return new li({
							elem: new button(i),
						});
					}),
				}),
			}),
		];

		delete opt.id;
		delete opt.icon;
		delete opt.label;
		delete opt.active;
		delete opt.item;

		super.data = opt;
	}
}
