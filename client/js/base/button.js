"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import badge from "./badge.js";

/**
 * label
 * label, onclick
 * color, label
 * color, label, onclick
 * option : {attr,id,name,class,style,type,label,icon,badge,value,checked,color,textcolor,weight,disabled,outline,hidelabel,nowarp,onclick,href}
 */
export default class button extends tag {
	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				label: null,
				color: null,
				onclick: null,
			};
			if (arg.length === 3) {
				t.color = arg[0];
				t.label = arg[1];
				t.onclick = arg[2];
			} else if (arg.length === 2 && arg[1] instanceof Function) {
				t.label = arg[0];
				t.onclick = arg[1];
			} else if (arg.length === 2 && typeof arg[1] === "string") {
				t.color = arg[0];
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

					id: null,
					name: null,
					class: null,
					style: null,

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
			let bI = core.getBaseIcon(d.icon);
			if (bI) {
				d.icon = {
					icon: bI.icon,
					style: bI.style,
				};

				d.color = d.color || bI.color;
				d.textcolor = d.textcolor || bI.textcolor;
			}

			super.data = {
				tag: d.href ? "a" : "button",

				id: d.id,
				name: d.name,
				style: d.style,

				onclick: d.onclick,
				onchange: d.onchange,
				onfocus: d.onfocus,
				onblur: d.onblur,

				href: d.href,

				class: core.merge.class(d.class, [
					d.type === "a" ? null : "btn",
					d.nowarp ? "text-nowarp" : null,
					d.weight ? `btn-${d.weight}` : null,
					d.color ? (d.outline ? `btn-outline-${d.color}` : `btn-${d.color}`) : null,
					d.textcolor ? `text-${d.textcolor}` : null,
					d.badge && typeof d.badge === "object" && d.badge.notification ? "position-relative" : null,
				]),

				attr: core.merge.attr(d.attr, {
					value: d.value,
					checked: d.checked,
					role: "button",
					type: d.type !== "button" ? d.type : null,
					disabled: d.disabled,
					"aria-label": d.hidelabel && d.label ? d.label : null,
					"aria-disabled": d.href && d.disabled ? "true" : null,
				}),
				elem: [
					d.label || d.icon ? new label({ icon: d.icon, label: d.label, hidelabel: d.hidelabel }) : null,
					d.badge ? new badge(d.badge) : null,
				],
			};
		} else {
			super.data = null;
		}
	}
}
