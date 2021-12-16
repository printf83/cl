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
	item: null,
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

export default class listgroup extends tag {
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

		opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];

		opt.elem = opt.item.map(function (i) {
			i = core.extend({}, defaultItemOption, i);

			if (i.type === "checkbox" || i.type === "radio" || i.type === "switch") {
				let ctl = core.extend({}, opt);
				ctl.tag = "input";

				ctl.class = core.merge.class(ctl.class, [
					"form-check-input",
					"me-2",
					i.type === "switch" ? "ms-0" : null,
				]);

				ctl.attr = core.merge.attr(ctl.attr, {
					type: i.type === "switch" ? "checkbox" : i.type,
					checked: i.checked,
				});

				delete i.type;
				delete ctl.checked;
				delete ctl.color;

				opt = {
					tag: "label",
					class: core.merge.class(i.class, [
						"list-group-item",
						i.type === "switch" ? "form-switch" : null,
						i.active ? "active" : null,
						i.disabled ? "disabled" : null,
						i.action ? "list-group-item-action" : null,
						i.color ? `list-group-item-${i.color}` : null,
					]),
					attr: core.merge.attr(i.attr, {
						disabled: !i.href && i.disabled ? "" : null,
						tabindex: i.href && i.disabled ? "-1" : null,
						"aria-disabled": i.href && i.disabled ? "true" : null,
						"aria-current": i.active ? "true" : null,
					}),
					elem: [new tag(ctl), i.label],
				};
			} else {
				i.tag = i.href ? "a" : i.onclick instanceof Function ? "button" : "li";

				i.class = core.merge.class(i.class, [
					"list-group-item",
					i.active ? "active" : null,
					i.disabled ? "disabled" : null,
					i.action || i.tag === "a" || i.tag === "button" ? "list-group-item-action" : null,
					i.color ? `list-group-item-${i.color}` : null,
				]);

				i.attr = core.merge.attr(i.attr, {
					disabled: !i.href && i.disabled ? "" : null,
					tabindex: i.href && i.disabled ? "-1" : null,
					"aria-disabled": i.href && i.disabled ? "true" : null,
					"aria-current": i.active ? "true" : null,
				});
			}

			delete i.type;
			delete i.active;
			delete i.disabled;
			delete i.action;
			delete i.value;
			delete i.checked;
			delete i.color;

			return new tag(i);
		});

		delete opt.item;
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
