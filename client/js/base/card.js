"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";
import div from "./div.js";

/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
class main extends div {
	constructor(main, ...arg) {
		super();
		if (arg && arg.length > 0) {
			this.main = main;

			let t = {
				elem: null,
			};

			if (arg && arg.length === 1 && (typeof arg[0] === "string" || Array.isArray(arg[0]))) {
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
			this.main = null;
			this.data = null;
		}
	}

	get main() {
		return this._m;
	}
	set main(d) {
		this._m = d;
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d && this.main) {
			this._d = {
				attr: d.attr,
				class: [
					this.main,
					d.class,
					d.align ? `text-${d.align}` : null,
					d.color ? `bg-${d.color}` : null,
					d.textcolor ? `text-${d.textcolor}` : null,
					d.bordercolor ? `border-${d.bordercolor}` : null,
					!d.border ? "border-0" : null,
				],
				style: d.style,
				elem: d.elem,
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}

export class container extends main {
	constructor(...arg) {
		super("card", ...arg);
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
		super("card-header", ...arg);
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
		super("card-body", ...arg);
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
		super("card-footer", ...arg);
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
		super("card-group", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
