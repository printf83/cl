"use strict";
import * as core from "./core.js";
import button from "./button.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt : {attr,class,style,id,name,onclick,elem}
 */
export default class btnclose extends button {
	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				label: "Close",
				dismiss: null,
				dark: true,
			};
			if (arg.length === 3) {
				t.dismiss = arg[0];
				t.dark = arg[1];
				t.label = arg[2];
			} else if (arg.length === 2) {
				t.dismiss = arg[0];
				t.dark = arg[1];
			} else if (arg.length === 1) {
				if (typeof arg[0] === "string") {
					t.dismiss = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					label: "Close",
					dismiss: null,
					dark: true,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				id: d.id,
				name: d.name,
				style: d.style,

				align: d.align,
				color: d.color,
				textcolor: d.textcolor,
				bordercolor: d.bordercolor,
				border: d.border,

				onclick: d.onclick,
				onchange: d.onchange,
				onfocus: d.onfocus,
				onblur: d.onblur,

				type: "button",
				class: core.merge.class(d.class, ["btn-close", !d.dark ? "btn-close-white" : null]),
				attr: core.merge.attr(d.attr, {
					"data-bs-dismiss": d.dismiss,
					"aria-label": d.label,
				}),
			};
		} else {
			super.data = null;
		}
	}
}
