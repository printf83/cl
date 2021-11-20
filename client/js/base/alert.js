"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import a from "./a.js";
import h from "./h.js";
import msg from "./msg.js";
import div from "./div.js";
import btnclose from "./btnclose.js";

/**
 * color,icon,elem
 * color,icon,[elem]
 * color,elem
 * color,[elem]
 * elem
 * [elem]
 * opt : {attr,id,class,animate,title,icon,elem,close,autohide,delay,color,textcolor,bordercolor,border,date,timer,position,debug}
 */
export class container extends tag {
	_d = null;

	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				icon: null,
				color: null,
				elem: null,
			};

			if (arg.length === 3) {
				t.color = arg[0];
				t.icon = arg[1];
				t.elem = arg[2];
			} else if (arg.length === 2) {
				let bI = core.getBaseIcon(arg[0]);
				if (bI) {
					t.color = bI.color;
					t.elem = new msg(
						"sm",
						{
							icon: bI.icon,
							style: bI.style,
						},
						arg[1]
					);
				} else {
					t.color = arg[0];
					t.elem = arg[1];
				}
			} else if (arg.length === 1) {
				if (typeof arg[0] === "string") {
					t.elem = arg[0];
				} else if (Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl")) {
					t.elem = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					attr: null,

					id: null,
					class: null,
					style: null,
					icon: null,
					elem: null,
					close: false,
					color: null,
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
			let bI = core.getBaseIcon(d.icon);
			if (bI) {
				d.color = d.color || bI.color;
				d.elem = new msg(
					"sm",
					{
						icon: bI.icon,
						style: bI.style,
					},
					d.elem
				);
			}

			this._d = {
				tag: "div",
				attr: core.merge.attr(d.attr, {
					id: d.id,
					class: core.merge.class(d.class, ["alert", d.color ? `alert-${d.color}` : null]),
					style: d.style,
					role: "alert",
				}),
				elem: new div("d-flex align-items-stretch", [
					new div("me-auto", d.elem),
					d.close
						? new btnclose({
								dismiss: "alert",
								class: "my-1",
						  })
						: null,
				]),
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}

export class link extends a {
	constructor(...arg) {
		super(...arg);
	}

	get data() {
		return super.data;
	}
	set data(d) {
		super.data = d;

		if (super.data) {
			super.data.attr = core.merge.attr(super.data.attr, { class: "alert-link" });
		}
	}
}

export class heading extends h {
	constructor(...arg) {
		super(4, ...arg);
	}

	get data() {
		return super.data;
	}
	set data(d) {
		super.data = d;

		if (super.data) {
			super.data.attr = core.merge.attr(super.data.attr, { class: "heading" });
		}
	}
}