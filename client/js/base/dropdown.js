"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import button from "./button.js";
import option from "./option.js";
import div from "./div.js";
import ul from "./ul.js";

/**
 * label, option
 * label, color, option
 * label, onclick, option
 * label, color, onclick, option
 * opt {...buttonopt,option,container,arrow,splittoggle,aligment,offset,autoclose}
 */

export default class dropdown extends tag {
	_d = null;

	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				label: null,
				color: null,
				onclick: null,
				option: null,
			};
			if (arg.length === 4) {
				t.label = arg[0];
				t.color = arg[1];
				t.onclick = arg[2];
				t.option = arg[3];
			} else if (arg.length === 3 && arg[1] instanceof Function) {
				t.label = arg[0];
				t.onclick = arg[1];
				t.option = arg[2];
			} else if (arg.length === 3 && typeof arg[1] === "string") {
				t.label = arg[0];
				t.color = arg[1];
				t.option = arg[2];
			} else if (arg.length === 2 && typeof arg[0] === "string") {
				t.label = arg[0];
				t.option = arg[1];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					attr: null, //combine to container

					id: null,
					name: null,

					type: "button",
					label: null,
					icon: null,
					badge: null,
					value: null,
					checked: false,

					color: null,
					textcolor: null,
					weight: null,
					disabled: false,
					outline: false,
					hidelabel: false,
					nowarp: false,

					onclick: null,
					href: null,

					option: null,
					// container: null,
					container: "btn-group",
					arrow: "down",
					splittoggle: false,
					aligment: null,
					offset: null,
					reference: null,
					autoclose: true,
					dark: false,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			d.id = d.id || core.UUID();

			let menuctl = new ul({
				attr: { "aria-labelledby": d.id, class: ["dropdown-menu", d.dark ? "dropdown-menu-dark" : null] },
				elem: new option({ type: "dropdown", item: d.option, selected: d.value }),
			});

			let btnctl = d.splittoggle
				? new button({
						type: d.type,
						label: d.label,
						icon: d.icon,
						value: d.value,
						checked: d.checked,

						color: d.color,
						textcolor: d.textcolor,
						weight: d.weight,
						disabled: d.disabled,
						outline: d.outline,
						hidelabel: d.hidelabel,
						nowarp: d.nowarp,

						onclick: d.onclick,
						href: d.href,
				  })
				: new button({
						attr: {
							class: "dropdown-toggle",
							"aria-expanded": "false",
							"data-bs-auto-close": d.autoclose,
							"data-bs-reference": d.reference,
							"data-bs-offset": d.offset,
							"data-bs-toggle": "dropdown",
						},
						id: d.id,
						name: d.name,

						type: d.type,
						label: d.label,
						icon: d.icon,
						badge: d.badge,
						value: d.value,
						checked: d.checked,

						color: d.color,
						textcolor: d.textcolor,
						weight: d.weight,
						disabled: d.disabled,
						outline: d.outline,
						hidelabel: d.hidelabel,
						nowarp: d.nowarp,

						onclick: d.onclick,
						href: d.href,
				  });

			let splitctl = d.splittoggle
				? new button({
						attr: {
							class: ["dropdown-toggle", "dropdown-toggle-split"],
							"aria-expanded": "false",
							"data-bs-auto-close": d.autoclose,
							"data-bs-reference": d.reference,
							"data-bs-offset": d.offset,
							"data-bs-toggle": "dropdown",
						},
						id: d.id,
						label: "Toggle Dropdown",
						badge: d.badge,

						color: d.color,
						textcolor: d.textcolor,
						weight: d.weight,
						disabled: d.disabled,
						outline: d.outline,
						hidelabel: true,
						nowarp: d.nowarp,
				  })
				: null;

			// if (d.splittoggle && d.container === null) {
			// 	d.container = "btn-group";
			// }

			if (d.splittoggle && d.arrow === "start") {
				this._d = {
					tag: d.container ? "div" : null,
					attr: d.container ? { class: ["btn-group", d.container, d.arrow ? `drop${d.arrow}` : null] } : null,
					elem: [
						new div({
							attr: { class: ["btn-group"], role: "group" },
							elem: [splitctl, menuctl],
						}),
						btnctl,
					],
				};
			} else {
				this._d = {
					tag: d.container ? "div" : null,
					attr: d.container ? { class: [d.container, d.arrow ? `drop${d.arrow}` : null] } : null,
					elem: d.splittoggle
						? new div({
								attr: { class: ["btn-group"], role: "group" },
								elem: [btnctl, splitctl, menuctl],
						  })
						: [btnctl, menuctl],
				};
			}
		} else {
			this._d = null;
		}

		this.setting = d;
		super.data = this._d;
	}

	get setting() {
		return this._s;
	}
	set setting(d) {
		this._s = d;
	}
}
