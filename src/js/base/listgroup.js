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
	constructor(...opt) {
		super(...opt);
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

		opt = core.merge(opt, {
			tag: opt.type,
			class: [
				"list-group",
				opt.flush ? "list-group-flush" : null,
				opt.type === "ol" ? "list-group-numbered" : null,
				opt.horizontal === true
					? "horizontal"
					: opt.horizontal === false
					? null
					: core.multiClass(opt.horizontal, "list-group-horizontal-$1"),
			],
			item: Array.isArray(opt.item) ? opt.item : [opt.item],
			elem: opt.elem
				? opt.elem
				: opt.item.map((i) => {
						i = core.extend({}, defaultItemOption, i);

						if (i.type === "checkbox" || i.type === "radio" || i.type === "switch") {
							let ctl = core.merge(i, {
								tag: "input",
								marginEnd: 2,
								marginStart: i.type === "switch" ? 0 : null,
								class: "form-check-input",
								type: i.type === "switch" ? "checkbox" : i.type,
								checked: i.checked,
								value: i.value,
							});

							// delete ctl.type;
							// delete ctl.value;
							// delete ctl.checked;
							delete ctl.color;

							i = core.merge(i, {
								tag: "label",
								class: [
									"list-group-item",
									i.type === "switch" ? "form-switch" : null,
									i.active ? "active" : null,
									i.disabled ? "disabled" : null,
									i.action ? "list-group-item-action" : null,
									i.color ? `list-group-item-${i.color}` : null,
								],
								disabled: !i.href && i.disabled ? "" : null,
								tabindex: i.href && i.disabled ? -1 : null,
								"aria-disabled": i.href && i.disabled ? "true" : null,
								"aria-current": i.active ? "true" : null,
								elem: [new tag(ctl), i.label],
							});
						} else {
							i = core.merge(i, {
								tag: i.href ? "a" : i.onclick instanceof Function ? "button" : "li",
								class: [
									"list-group-item",
									i.active ? "active" : null,
									i.disabled ? "disabled" : null,
									i.action || i.tag === "a" || i.tag === "button" ? "list-group-item-action" : null,
									i.color ? `list-group-item-${i.color}` : null,
								],
								disabled: !i.href && i.disabled ? "" : null,
								tabindex: i.href && i.disabled ? "-1" : null,
								"aria-disabled": i.href && i.disabled ? "true" : null,
								"aria-current": i.active ? "true" : null,
							});
						}

						delete i.type;
						delete i.active;
						delete i.action;
						delete i.value;
						delete i.checked;
						delete i.color;

						return new tag(i);
				  }),
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
