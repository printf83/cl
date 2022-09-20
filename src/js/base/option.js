"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import li from "./li.js";
import span from "./span.js";
import hr from "./hr.js";
import h from "./h.js";
import button from "./button.js";

const defaultOption = {
	item: null,
	selected: null,
};
const defaultSelectItemOption = {
	tag: "option",
	value: null,
	label: null,
	selected: false,
};
const defaultSelectGroupOption = {
	tag: "optgroup",
	label: null,
};
export class select extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.selected = Array.isArray(opt.selected) ? opt.selected : [opt.selected];
			opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];

			let gitem = null;
			let item = {};
			let items = [];
			for (let i = 0; i < opt.item.length; i++) {
				if (opt.item[i] === null || typeof opt.item[i] === "string") {
					item = {
						tag: "option",
						value: opt.item[i],
						selected: opt.selected?.includes(opt.item[i]),
						elem: opt.item[i],
					};

					if (gitem !== null) {
						gitem.elem.push(new tag(item));
					} else {
						items.push(new tag(item));
					}
				} else {
					if (opt.item[i].value === "-" && opt.item[i].label) {
						if (gitem !== null) {
							items.push(new tag(gitem));
							gitem = {};
						}

						gitem = core.extend({}, defaultSelectGroupOption, opt.item[i]);
						gitem.elem = [];

						delete gitem.value;
						delete gitem.label;
						delete gitem.selected;
					} else {
						item = core.extend({}, defaultSelectItemOption, opt.item[i]);

						item = core.merge(item, {
							value: item.value,
							selected: opt.selected?.includes(item.value),
						});
						item.elem = item.label;

						delete item.value;
						delete item.label;
						delete item.selected;

						if (gitem !== null) {
							gitem.elem.push(new tag(item));
						} else {
							items.push(new tag(item));
						}
					}
				}
			}

			if (gitem !== null) {
				items.push(new tag(gitem));
			}

			opt.elem = items;

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
	iconafter: false,
	showlabel: null,
	hidelabel: null,

	active: false,
	interactive: true,
};
/**
 * opt : {tagoption,item : dropdownitem,selected}
 * dropdownitem : [string]|[{tagoption,elem,value,label,icon,active,disabled,interactive}]
 */
export class dropdown extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.selected = Array.isArray(opt.selected) ? opt.selected : [opt.selected];
			opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];
			opt.elem = opt.item.map((i) => {
				if (typeof i === "string") {
					return new li({
						elem: new span({
							class: ["dropdown-item", opt.selected?.includes(i) ? "active" : null],
							elem: new label({
								label: i,
							}),
						}),
					});
				} else if (i.hasOwnProperty("cl")) {
					return new li({ elem: i });
				} else {
					i = core.extend({}, defaultDropdownItemOption, i);
					let item = {};

					if (i.value === "-") {
						if (i.label) {
							item = new h({
								level: 6,
								class: "dropdown-header",
								elem: new label({
									label: i.label,
									icon: i.icon,
									iconafter: i.iconafter,
									showlabel: i.showlabel,
									hidelabel: i.hidelabel,
								}),
							});
						} else {
							item = new hr({ class: "dropdown-divider" });
						}
					} else {
						if (i.elem) {
							item = i.elem;
						} else {
							item = new tag({
								tag: i.href ? "a" : i.interactive ? "button" : "span",
								class: [
									i.interactive ? "dropdown-item" : "dropdown-item-text",
									i.disabled ? "disabled" : null,
									i.active === true || (i.value && opt.selected?.includes(i.value)) ? "active" : null,
								],
								disabled: i.disabled,
								href: i.href,
								type: !i.href && i.interactive ? "button" : null,
								elem: new label({
									label: i.label,
									icon: i.icon,
									iconafter: i.iconafter,
									showlabel: i.showlabel,
									hidelabel: i.hidelabel,
								}),
							});
						}
					}

					return new li(item);
				}
			});

			delete opt.item;
			delete opt.selected;

			super.data = opt;
		}
	}
}
