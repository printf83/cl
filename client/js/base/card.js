"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";
import a from "./a.js";

class main extends tag {
	constructor(tag, className, ...arg) {
		super();
		if (arg && arg.length > 0) {
			this.tag = tag;
			this.className = className;

			let t = {
				elem: null,
			};

			if (
				arg &&
				arg.length === 1 &&
				(typeof arg[0] === "string" || Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl"))
			) {
				t.elem = arg[0];
			} else {
				t = arg[0];
			}

			this.data = core.extend(
				{},
				{
					attr: null,

					id: null,
					class: null,
					style: null,

					align: null, //left,right,center
					color: null,
					textcolor: null,
					bordercolor: null,
					border: true,

					elem: null,
				},
				t
			);
		} else {
			this.tag = null;
			this.className = null;
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
				attr: attr.merge(d.attr, {
					class: [
						this.className,
						d.class,
						d.align ? `text-${d.align}` : null,
						d.color ? `bg-${d.color}` : null,
						d.textcolor ? `text-${d.textcolor}` : null,
						d.bordercolor ? `border-${d.bordercolor}` : null,
						!d.border ? "border-0" : null,
					],
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

export class container extends main {
	constructor(...arg) {
		super("div", "card", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
export class header extends main {
	constructor(...arg) {
		super("div", "card-header", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}

/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
export class body extends main {
	constructor(...arg) {
		super("div", "card-body", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}

/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
export class footer extends main {
	constructor(...arg) {
		super("div", "card-footer", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}

/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
export class group extends main {
	constructor(...arg) {
		super("div", "card-group", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}

/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
export class title extends main {
	constructor(...arg) {
		super("h5", "card-title", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}

/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
export class subtitle extends main {
	constructor(...arg) {
		super("h6", "card-subtitle mb-2", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}

/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
export class text extends main {
	constructor(...arg) {
		super("p", "card-text", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}

/**
 * label, href
 * label, onclick
 * class, label, href
 * class, label, onclick
 * option : {attr,id,name,type,label,icon,badge,value,checked,color,textcolor,weight,disabled,outline,hidelabel,nowarp,onclick,href}
 */
export default class link extends a {
	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				label: null,
				class: null,
				href: null,
				onclick: null,
			};
			if (arg && arg.length === 3) {
				if (arg[2] instanceof Function) {
					t.class = arg[0];
					t.label = arg[1];
					t.onclick = arg[2];
				} else {
					t.class = arg[0];
					t.label = arg[1];
					t.href = arg[2];
				}
			} else if (arg && arg.length === 2) {
				if (arg[1] instanceof Function) {
					t.label = arg[0];
					t.onclick = arg[1];
				} else {
					t.label = arg[0];
					t.href = arg[1];
				}
			} else {
				t = arg[0];
			}

			this.data = core.extend(
				{},
				{
					attr: null,

					id: null,
					name: null,
					class: "card-link",
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
	set data(arg) {
		super.data = arg;
	}
}
