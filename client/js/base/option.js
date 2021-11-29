"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import li from "./li.js";
import span from "./span.js";
import hr from "./hr.js";
import h from "./h.js";

/**
 * item, selected
 * item
 * opt : {type,item,selected}
 * option item : [string]|[{value,label,selected}]
 * dropdown item : [string]|[{attr,elem,value,label,icon,active,disabled,interactive,onclick,href}]
 */
export default class option extends tag {
	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				item: null,
				selected: null,
			};

			if (arg.length === 2) {
				t.item = arg[0];
				t.selected = arg[1];
			} else if (arg.length === 1 && Array.isArray(arg[0])) {
				t.item = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					type: "option",
					item: null,
					selected: null,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	#gen_option = function (item, selected) {
		return item.map(function (i) {
			if (typeof i === "string") {
				return new tag({
					tag: "option",
					attr: {
						value: i,
						selected: selected.includes(i),
					},
					elem: i,
				});
			} else {
				i = core.extend(
					{},
					{
						value: null,
						label: null,
						selected: false,
					},
					i
				);

				return new tag({
					tag: "option",
					attr: {
						value: i.value,
						selected: selected.includes(i.value),
					},
					elem: i.label,
				});
			}
		});
	};

	#gen_dropdown = function (item, selected) {
		return item.map(function (i) {
			if (typeof i === "string") {
				return new li({
					elem: new span({
						attr: {
							class: ["dropdown-item", selected.includes(i) ? "active" : null],
						},
						elem: new label({
							label: i,
						}),
					}),
				});
			} else {
				i = core.extend(
					{},
					{
						attr: null,
						elem: null,

						value: null,
						label: null,
						icon: null,

						active: false,
						disabled: false,
						interactive: true,

						onclick: null,
						href: null,
					},
					i
				);

				if (i.value === "-") {
					if (i.label) {
						return new li({
							attr: i.attr,
							elem: new h(6, {
								class: "dropdown-header",
								elem: new label({ icon: i.icon, label: i.label }),
							}),
						});
					} else {
						return new li({
							attr: i.attr,
							elem: new hr("dropdown-divider"),
						});
					}
				} else {
					if (item.elem) {
						return new li({
							attr: i.attr,
							elem: i.elem,
						});
					} else {
						return new li({
							attr: i.attr,
							elem: new tag({
								tag: i.href ? "a" : i.interactive ? "button" : "span",
								attr: {
									class: [
										i.interactive ? "dropdown-item" : "dropdown-item-text",
										i.disabled ? "disabled" : null,
										i.active || i.selected || selected.includes(i.value) ? "active" : null,
									],
									href: i.href,
									onclick: i.onclick,
									type: !i.href && i.interactive ? "button" : null,
								},
								elem: new label({
									label: i.label,
									icon: i.icon,
								}),
							}),
						});
					}
				}
			}
		});
	};

	get data() {
		return super.data;
	}
	set data(d) {
		if (d && d.item && d.item.length > 0) {
			if (d.type === "option") {
				super.data = {
					elem: this.#gen_option(
						d.item,
						d.selected ? (Array.isArray(d.selected) ? d.selected : [d.selected]) : []
					),
				};
			} else {
				super.data = {
					elem: this.#gen_dropdown(
						d.item,
						d.selected ? (Array.isArray(d.selected) ? d.selected : [d.selected]) : []
					),
				};
			}
		} else {
			super.data = null;
		}
	}
}
