"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import span from "./span.js";
import icon from "./icon.js";

/**
 * for,icon,label
 * icon,label
 * label
 * opt : {attr,for,icon,label}
 */
export default class label extends tag {
	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				for: null,
				icon: null,
				label: null,
			};

			if (arg.length === 3) {
				t.for = arg[0];
				t.icon = arg[1];
				t.label = arg[2];
			} else if (arg.length === 2) {
				t.icon = arg[0];
				t.label = arg[1];
			} else if (arg.length === 1 && typeof arg[0] === "string") {
				t.label = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					attr: null,
					for: null,
					icon: null,
					label: null,
					hidelabel: false,
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
		if (d && (d.icon || d.label)) {
			if (d.hidelabel) {
				if (d.icon) {
					super.data = {
						id: d.id,
						name: d.name,
						style: d.style,
						class: d.class,
						attr: d.attr,

						align: d.align,
						color: d.color,
						textcolor: d.textcolor,
						bordercolor: d.bordercolor,
						border: d.border,

						onchange: d.onchange,
						onclick: d.onclick,
						onfocus: d.onfocus,
						onblur: d.onblur,

						elem: [new icon(d.icon), d.label ? new span("visually-hidden", d.label) : null],
					};
				} else {
					super.data = {
						id: d.id,
						name: d.name,
						style: d.style,
						class: d.class,
						attr: d.attr,

						align: d.align,
						color: d.color,
						textcolor: d.textcolor,
						bordercolor: d.bordercolor,
						border: d.border,

						onchange: d.onchange,
						onclick: d.onclick,
						onfocus: d.onfocus,
						onblur: d.onblur,

						elem: new span("visually-hidden", d.label),
					};
				}
			} else {
				super.data = {
					tag: "label",

					id: d.id,
					name: d.name,
					style: d.style,
					class: d.class,

					align: d.align,
					color: d.color,
					textcolor: d.textcolor,
					bordercolor: d.bordercolor,
					border: d.border,

					onchange: d.onchange,
					onclick: d.onclick,
					onfocus: d.onfocus,
					onblur: d.onblur,

					attr: core.merge.attr(d.attr, {
						for: d.for,
					}),
					elem: [
						d.icon ? new span(d.label && !d.hidelabel ? "me-2" : null, new icon(d.icon)) : null,
						d.label,
					],
				};
			}
		} else {
			super.data = null;
		}
	}
}
