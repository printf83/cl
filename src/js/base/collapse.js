"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import div from "./div.js";
import button from "./button.js";

const defaultToggleOption = {
	elem: null,

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

			let t = opt.elem.data;
			t.class = core.merge.class(t.class, [!opt.show && opt.toggle === "collapse" ? "collapsed" : null]);
			t.attr = core.merge.attr(t.attr, {
				"aria-controls": opt.control,
				"aria-expanded": opt.show ? "true" : "false",
				"data-bs-target": opt.target,
				"data-bs-toggle": opt.toggle,
			});

			super.data = t;
		}
	}
}

const defaultContainerOption = {
	id: null,
	show: false,
	horizontal: null,

	onshow: null,
	onshown: null,
	onhide: null,
	onhidden: null,
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

			opt.id = opt.id || core.UUID();
			opt.class = core.merge.class(opt.class, [
				"collapse",
				opt.horizontal ? "collapse-horizontal" : null,
				opt.show ? "show" : null,
			]);
			opt.attr = core.merge.attr(opt.attr, {
				"show.bs.collapse": opt.onshow,
				"shown.bs.collapse": opt.onshown,
				"hide.bs.collapse": opt.onhide,
				"hidden.bs.collapse": opt.onhidden,
			});

			delete opt.horizontal;

			delete opt.show;
			delete opt.onshow;
			delete opt.onshown;
			delete opt.onhide;
			delete opt.onhidden;

			super.data = opt;
		}
	}
}
