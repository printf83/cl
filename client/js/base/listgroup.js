"use strict";
import * as core from "./core.js";
import label from "./label.js";
import tag from "./tag.js";

/**
 * opt : {tagoption}
 */
const defaultContainerOption = {
	type: "ul",
	flush: false,
	horizontal: null,
	label: null,
	icon: null,
};

const defaultItemOption = {
	type: null, //null|checkbox|radio|switch
	disabled: false,
	action: false,
	value: null,
	active: false,
	checked: null, //if check
	color: null,
};

export class container extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultContainerOption, opt);

		let ctllabel = null;

		if (opt.label) {
			opt.id = opt.id || core.UUID();

			ctllabel = new label({
				class: "form-label",
				for: opt.id,
				label: opt.label,
				icon: opt.icon,
			});
		}

		delete opt.label;
		delete opt.icon;

		if (opt.horizontal === true) {
			opt.horizontal = "horizontal";
		}

		opt.tag = opt.type;

		opt.class = core.merge.class(opt.class, [
			"list-group",
			opt.flush ? "list-group-flush" : null,
			opt.type === "ol" ? "list-group-numbered" : null,
			opt.horizontal === true
				? "horizontal"
				: opt.horizontal === false
				? null
				: core.multiClass(opt.horizontal, "list-group-horizontal-$1"),
		]);

		delete opt.type;
		delete opt.flush;
		delete opt.horizontal;

		if (ctllabel) {
			super.data = {
				elem: [ctllabel, new tag(opt)],
			};
		} else {
			super.data = opt;
		}
	}
}

export class item extends tag {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultItemOption, opt);

		if (opt.type === "checkbox" || opt.type === "radio" || opt.type === "switch") {
			let ctl = core.extend({}, opt);
			ctl.tag = "input";

			ctl.class = core.merge.class(ctl.class, [
				"form-check-input",
				"me-2",
				opt.type === "switch" ? "ms-0" : null,
			]);

			ctl.attr = core.merge.attr(ctl.attr, {
				type: opt.type === "switch" ? "checkbox" : opt.type,
				checked: opt.checked,
			});

			delete opt.type;
			delete ctl.checked;
			delete ctl.color;

			opt = {
				tag: "label",
				class: core.merge.class(opt.class, [
					"list-group-item",
					opt.type === "switch" ? "form-switch" : null,
					opt.active ? "active" : null,
					opt.disabled ? "disabled" : null,
					opt.action ? "list-group-item-action" : null,
					opt.color ? `list-group-item-${opt.color}` : null,
				]),
				attr: core.merge.attr(opt.attr, {
					disabled: !opt.href && opt.disabled ? "" : null,
					tabindex: opt.href && opt.disabled ? "-1" : null,
					"aria-disabled": opt.href && opt.disabled ? "true" : null,
					"aria-current": opt.active ? "true" : null,
				}),
				elem: [new tag(ctl), opt.label],
			};
		} else {
			opt.tag = opt.href ? "a" : opt.onclick instanceof Function ? "button" : "li";

			opt.class = core.merge.class(opt.class, [
				"list-group-item",
				opt.active ? "active" : null,
				opt.disabled ? "disabled" : null,
				opt.action || opt.tag === "a" || opt.tag === "button" ? "list-group-item-action" : null,
				opt.color ? `list-group-item-${opt.color}` : null,
			]);

			opt.attr = core.merge.attr(opt.attr, {
				disabled: !opt.href && opt.disabled ? "" : null,
				tabindex: opt.href && opt.disabled ? "-1" : null,
				"aria-disabled": opt.href && opt.disabled ? "true" : null,
				"aria-current": opt.active ? "true" : null,
			});
		}

		delete opt.type;
		delete opt.active;
		delete opt.disabled;
		delete opt.action;
		delete opt.value;
		delete opt.checked;
		delete opt.color;

		super.data = opt;
	}
}
