"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import li from "./li.js";
import span from "./span.js";
import hr from "./hr.js";
import h from "./h.js";

const defaultOption = {
	item: null,
	selected: null,
};
const defaultSelectItemOption = {
	value: null,
	label: null,
	selected: false,
};
/**
 * opt : {tagoption,item : {selectitem},selected}
 * selectitem : [string]|[{tagoption,elem,value,label,icon,active,disabled,interactive}]
 */
export class select extends tag {
	constructor(opt) {
		super(core.extend({}, defaultOption, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.selected = Array.isArray(opt.selected) ? opt.selected : [opt.selected];
			opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];
			opt.elem = opt.item.map(function (i) {
				if (typeof i === "string") {
					return new tag({
						tag: "option",
						attr: {
							value: i,
							selected: opt.selected?.includes(i),
						},
						elem: i,
					});
				} else {
					i = core.extend({}, defaultSelectItemOption, i);

					i.tag = "option";
					i.attr = core.merge.attr(i.attr, {
						value: i.value,
						selected: opt.selected?.includes(i.value),
					});
					i.elem = i.label;

					delete i.value;
					delete i.label;
					delete i.selected;

					return new tag(i);
				}
			});

			delete opt.item;
			delete opt.selected;

			super.data = opt;
		}
	}
}

const defaultDropdownItemOption = {
	value: null,
	label: null,
	icon: null,

	active: false,
	disabled: false,
	interactive: true,
};
/**
 * opt : {tagoption,item : dropdownitem,selected}
 * dropdownitem : [string]|[{tagoption,elem,value,label,icon,active,disabled,interactive}]
 */
export class dropdown extends tag {
	constructor(opt) {
		super(core.extend({}, defaultOption, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.selected = Array.isArray(opt.selected) ? opt.selected : [opt.selected];
			opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];
			opt.elem = opt.item.map(function (i) {
				if (typeof i === "string") {
					return new li({
						elem: new span({
							attr: {
								class: ["dropdown-item", opt.selected?.includes(i) ? "active" : null],
							},
							elem: new label({
								label: i,
							}),
						}),
					});
				} else {
					i = core.extend({}, defaultDropdownItemOption, i);

					if (i.value === "-") {
						if (i.label) {
							i.elem = new h({
								level: 6,
								class: "dropdown-header",
								elem: new label({ icon: i.icon, label: i.label }),
							});
						} else {
							i.elem = new hr({ class: "dropdown-divider" });
						}
					} else {
						if (!i.elem) {
							i.elem = new tag({
								tag: i.href ? "a" : i.interactive ? "button" : "span",
								class: [
									i.interactive ? "dropdown-item" : "dropdown-item-text",
									i.disabled ? "disabled" : null,
									i.active === true || (i.value && opt.selected?.includes(i.value)) ? "active" : null,
								],
								href: i.href,
								onclick: i.onclick,
								attr: {
									type: !i.href && i.interactive ? "button" : null,
								},
								elem: new label({
									label: i.label,
									icon: i.icon,
								}),
							});
						}
					}

					delete i.value;
					delete i.label;
					delete i.icon;
					delete i.active;
					delete i.disabled;
					delete i.interactive;

					return new li(i);
				}
			});

			delete opt.selected;

			super.data = opt;
		}
	}
}
