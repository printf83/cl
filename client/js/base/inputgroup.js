"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import div from "./div.js";

/**
 * for,label,elem
 * label,elem
 * [elem],
 * opt : {attr,for,label,elem,nowarp}
 */
export class container extends tag {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				for: null,
				label: null,
				elem: null,
			};

			if (arg.length === 3) {
				t.for = arg[0];
				t.label = arg[1];
				t.elem = arg[2];
			} else if (arg.length === 2) {
				t.label = arg[0];
				t.elem = arg[1];
			} else if (arg.length === 1 && (Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl"))) {
				t.elem = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					for: null,
					label: null,
					attr: null,
					elem: null,
					nowarp: false,
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
				class: d.class,

				onchange: d.onchange,
				onclick: d.onclick,
				onfocus: d.onfocus,
				onblur: d.onblur,

				elem: [
					d.label ? new label(d.for, "form-label", d.label) : null,
					new div({
						attr: d.attr,
						class: ["input-group", d.nowarp ? "flex-nowarp" : null],
						elem: d.elem,
					}),
				],
			};
		} else {
			super.data = null;
		}
	}
}

/**
 * [elem]
 * opt : {attr,elem}
 */
export class text extends div {
	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				elem: null,
			};

			if (
				arg.length === 1 &&
				(typeof arg[0] === "string" || Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl"))
			) {
				t.elem = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					attr: null,
					elem: null,
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
				attr: d.attr,

				onchange: d.onchange,
				onclick: d.onclick,
				onfocus: d.onfocus,
				onblur: d.onblur,

				class: ["input-group-text"],
				elem: d.elem,
			};
		} else {
			super.data = null;
		}
	}
}
