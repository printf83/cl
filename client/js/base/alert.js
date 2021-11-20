"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import a from "./a.js";
import div from "./div.js";
import imgtag from "./img.js";

/**
 * color,textcolor,icon,msg
 * color,icon,msg
 * color,msg
 * color,[elem]
 * color,elem
 * elem
 * [elem]
 * msg
 * opt : {attr,id,class,animate,title,icon,elem,close,autohide,delay,color,textcolor,bordercolor,border,date,timer,position,debug}
 */
class container extends tag {
	_d = null;

	constructor(...arg) {
		if (arg && arg.length > 0) {
			let t = {
				icon: null,
				color: null,
				elem: null,
			};
			if (arg.length === 4) {
				t.color = arg[0];
				t.textcolor = arg[1];
				t.elem = new msg("sm", arg[2], arg[3]);
			} else if (arg.length === 3) {
				t.color = arg[0];
				t.elem = new msg("sm", arg[1], arg[2]);
			} else if (arg.length === 2) {
				let bI = core.getBaseIcon(arg[0]);
				if (bI) {
					t.color = bI.color;
					t.textcolor = bI.textcolor;

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

					if (typeof arg[1] === "string") {
						t.elem = new msg("sm", null, arg[1]);
					} else {
						t.elem = arg[1];
					}
				}
			} else if (arg.length === 1) {
				if (typeof arg[0] === "string") {
					t.elem = new msg("sm", null, arg[0]);
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
					animate: true,
					title: null,
					icon: null,
					elem: null,
					close: true,
					autohide: true,
					delay: 5000,
					color: null,
					textcolor: null,
					bordercolor: null,
					border: false,
					date: new Date(),
					timer: true,
					position: "top-0 end-0",

					debug: false,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get tag() {
		return this._t;
	}
	set tag(d) {
		this._t = d;
	}

	get className() {
		return this._c;
	}
	set className(d) {
		this._c = d;
	}
	get data() {
		return this._d;
	}
	set data(d) {
		if (d && this.tag) {
			this._d = {
				tag: this.tag,
				attr: core.merge.attr(d.attr, {
					class: core.merge.class(
						this.className,
						core.merge.class(d.class, [
							d.align ? `text-${d.align}` : null,
							d.color ? `bg-${d.color}` : null,
							d.textcolor ? `text-${d.textcolor}` : null,
							d.bordercolor ? `border-${d.bordercolor}` : null,
							!d.border ? "border-0" : null,
						])
					),
					style: d.style,
				}),
				elem: d.elem,
			};
		} else {
			this.tag = null;
			this.className = null;
			this._d = null;
		}

		super.data = this._d;
	}
}
