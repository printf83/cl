"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import div from "./div.js";
import button from "./button.js";

const defaultToggleOption = {
	target: null,
	control: null,
	show: false,
	toggle: "collapse", //collapse | offcanvas
};

/**
 * opt: {tagoption,elem,target,show,toggle}
 */
export class toggle extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultToggleOption, opt);

			if (!opt.elem) {
				opt.elem = new button({
					icon: "bars",
				});
			}

			//no need to delete opt because we add the option into elem

			super.data = core.merge(opt.elem.data, {
				class: [!opt.show && opt.toggle === "collapse" ? "collapsed" : null],
				"aria-controls": opt.control,
				"aria-expanded": opt.show ? "true" : "false",
				"data-bs-target": opt.target,
				"data-bs-toggle": opt.toggle,
			});
		}
	}
}

const defaultContainerOption = {
	id: null,
	show: false,
	horizontal: null,

	show: null,
	shown: null,
	hide: null,
	hidden: null,
};

/**
 * opt: {tagoption,elem,id,show}
 */
export class container extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultContainerOption, opt);

			opt = core.merge(opt, {
				id: opt.id || core.UUID(),
				class: ["collapse", opt.horizontal ? "collapse-horizontal" : null, opt.show ? "show" : null],
				"show.bs.collapse": opt.show,
				"shown.bs.collapse": opt.shown,
				"hide.bs.collapse": opt.hide,
				"hidden.bs.collapse": opt.hidden,
			});

			delete opt.horizontal;
			delete opt.show;

			delete opt.show;
			delete opt.shown;
			delete opt.hide;
			delete opt.hidden;

			super.data = opt;
		}
	}
}
