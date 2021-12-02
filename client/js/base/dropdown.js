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
	constructor(opt) {
		super(
			core.extend(
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
					container: "btn-group",
					arrow: "down",
					splittoggle: false,
					aligment: null,
					offset: null,
					reference: null,
					autoclose: true,
					dark: false,
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.id = opt.id || core.UUID();

			let menuctl = new ul({
				class: ["dropdown-menu", opt.dark ? "dropdown-menu-dark" : null],
				attr: { "aria-labelledby": opt.id },
				elem: new option({ type: "dropdown", item: opt.option, selected: opt.value }),
			});

			let btnctl = opt.splittoggle
				? new button({
						type: opt.type,
						label: opt.label,
						icon: opt.icon,
						value: opt.value,
						checked: opt.checked,

						color: opt.color,
						textcolor: opt.textcolor,
						weight: opt.weight,
						disabled: opt.disabled,
						outline: opt.outline,
						hidelabel: opt.hidelabel,
						nowarp: opt.nowarp,

						onclick: opt.onclick,
						href: opt.href,
				  })
				: new button({
						class: "dropdown-toggle",
						attr: {
							"aria-expanded": "false",
							"data-bs-auto-close": opt.autoclose,
							"data-bs-reference": opt.reference,
							"data-bs-offset": opt.offset,
							"data-bs-toggle": "dropdown",
						},
						id: opt.id,
						name: opt.name,

						type: opt.type,
						label: opt.label,
						icon: opt.icon,
						badge: opt.badge,
						value: opt.value,
						checked: opt.checked,

						color: opt.color,
						textcolor: opt.textcolor,
						weight: opt.weight,
						disabled: opt.disabled,
						outline: opt.outline,
						hidelabel: opt.hidelabel,
						nowarp: opt.nowarp,

						onclick: opt.onclick,
						href: opt.href,
				  });

			let splitctl = opt.splittoggle
				? new button({
						class: ["dropdown-toggle", "dropdown-toggle-split"],
						attr: {
							"aria-expanded": "false",
							"data-bs-auto-close": opt.autoclose,
							"data-bs-reference": opt.reference,
							"data-bs-offset": opt.offset,
							"data-bs-toggle": "dropdown",
						},
						id: opt.id,
						label: "Toggle Dropdown",
						badge: opt.badge,

						color: opt.color,
						textcolor: opt.textcolor,
						weight: opt.weight,
						disabled: opt.disabled,
						outline: opt.outline,
						hidelabel: true,
						nowarp: opt.nowarp,
				  })
				: null;

			if (opt.splittoggle && opt.arrow === "start") {
				super.data = {
					tag: opt.container ? "div" : null,
					class: opt.container ? ["btn-group", opt.container, opt.arrow ? `drop${opt.arrow}` : null] : null,
					elem: [
						new div({
							class: ["btn-group"],
							attr: { role: "group" },
							elem: [splitctl, menuctl],
						}),
						btnctl,
					],
				};
			} else {
				super.data = {
					tag: opt.container ? "div" : null,
					class: opt.container ? [opt.container, opt.arrow ? `drop${opt.arrow}` : null] : null,
					elem: opt.splittoggle
						? new div({
								class: ["btn-group"],
								attr: { role: "group" },
								elem: [btnctl, splitctl, menuctl],
						  })
						: [btnctl, menuctl],
				};
			}
		} else {
			super.data = null;
		}
	}
}
