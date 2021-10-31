"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";

/**
 * item, selected
 * item
 * option
 */
export default class option extends tag {
	constructor(...arg) {
		super();

		let t = {
			item: null,
			selected: null,
		};

		if (arg && arg.length === 2) {
			t.item = arg[0];
			t.selected = arg[1];
		} else if (arg && arg.length === 1 && Array.isArray(arg[0])) {
			t.item = arg[0];
		} else {
			t = arg[0];
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

	#gen_ddoption = function (item, selected) {
		return item.map(function (i) {
			if (typeof i === "string") {
				return new tag({
					tag: "li",
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
						return new tag({
							tag: "li",
							attr: i.attr,
							elem: new tag({
								tag: "h6",
								attr: { class: "dropdown-header" },
								elem: new label({
									icon: i.icon,
									label: i.label,
								}),
							}),
						});
					} else {
						return new tag({
							tag: "li",
							attr: i.attr,
							elem: new tag({
								tag: "hr",
								attr: { class: "dropdown-divider" },
							}),
						});
					}
				} else {
					if (item.elem) {
						return new tag({
							tag: "li",
							attr: i.attr,
							elem: i.elem,
						});
					} else {
						return new tag({
							tag: "li",
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
		return this._d;
	}
	set data(d) {
		if (d && d.item && d.item.length > 0) {
			if (d.type === "option") {
				this._d = {
					elem: this.#gen_option(
						d.item,
						d.selected ? (Array.isArray(d.selected) ? d.selected : [d.selected]) : []
					),
				};
			} else {
				this._d = {
					elem: this.#gen_ddoption(
						d.item,
						d.selected ? (Array.isArray(d.selected) ? d.selected : [d.selected]) : []
					),
				};
			}
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
