"use strict";
import * as core from "./core.js";
import { mergeAttr } from "./cl.js";
import tag from "./tag.js";
import label from "./label.js";
import badge from "./badge.js";

/**
 * label
 * label, color
 * label, onclick
 * label, color, onclick
 * option : {attr,id,name,class,style,type,label,icon,badge,value,checked,color,textcolor,weight,disabled,outline,hidelabel,nowarp,onclick,href}
 */
export default class button extends tag {
	_d = null;

	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				label: null,
				color: null,
				onclick: null,
			};
			if (arg.length === 3) {
				t.label = arg[0];
				t.color = arg[1];
				t.onclick = arg[2];
			} else if (arg.length === 2 && arg[1] instanceof Function) {
				t.label = arg[0];
				t.onclick = arg[1];
			} else if (arg.length === 2 && typeof arg[1] === "string") {
				t.label = arg[0];
				t.color = arg[1];
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
		return this._d;
	}
	set data(d) {
		if (d) {
			this._d = {
				tag: d.href ? "a" : "button",
				attr: mergeAttr(d.attr, {
					id: d.id,
					name: d.name,
					value: d.value,
					checked: d.checked,
					role: "button",
					type: d.type !== "button" ? d.type : null,
					disabled: d.disabled,
					onclick: d.onclick,
					href: d.href,
					"aria-label": d.hidelabel && d.label ? d.label : null,
					"aria-disabled": d.href && d.disabled ? "true" : null,
					class: core.merge.class(d.class, [
						d.type === "a" ? null : "btn",
						d.nowarp ? "text-nowarp" : null,
						d.weight ? `btn-${d.weight}` : null,
						d.color ? (d.outline ? `btn-outline-${d.color}` : `btn-${d.color}`) : null,
						d.textcolor ? `text-${d.textcolor}` : null,
						d.badge && typeof d.badge === "object" && d.badge.notification ? "position-relative" : null,
					]),
					style: d.style,
				}),
				elem: [
					d.label || d.icon ? new label({ icon: d.icon, label: d.label, hidelabel: d.hidelabel }) : null,
					d.badge ? new badge(d.badge) : null,
				],
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
