"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import a from "./a.js";
import div from "./div.js";
import imgtag from "./img.js";

class main extends tag {
	constructor(tagName, className, ...arg) {
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
					tn: tagName,
					cn: className,

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
			this.data = null;
		}
	}
	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				tag: d.tn,
				attr: core.merge.attr(d.attr, {
					class: core.merge.class(
						d.cn,
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
			super.data = null;
		}
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
		super.data = core.extend({}, { tag: "div", cn: "card" }, arg);
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
		super.data = core.extend({}, { tag: "div", cn: "card-header" }, arg);
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
		super.data = core.extend({}, { tag: "div", cn: "card-body" }, arg);
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
		super.data = core.extend({}, { tag: "div", cn: "card-footer" }, arg);
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
		super.data = core.extend({}, { tag: "div", cn: "card-group" }, arg);
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
		super.data = core.extend({}, { tag: "h5", cn: "card-title" }, arg);
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
		super.data = core.extend({}, { tag: "h6", cn: "card-subtitle mb-2" }, arg);
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
		super.data = core.extend({}, { tag: "p", cn: "card-text" }, arg);
	}
}

/**
 * string
 * [elem]
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,elem}
 */
export class imgoverlay extends main {
	constructor(...arg) {
		super("div", "card-img-overlay", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = core.extend({}, { tag: "div", cn: "card-img-overlay" }, arg);
	}
}

/**
 * size,leftelement(string|elem|[elem]),rightelement(string|elem|[elem])
 * leftelement(string|elem|[elem]),rightelement(string|elem|[elem])
 * opt : {attr,id,class,style,align,color,textcolor,bordercolor,border,left,right,size,gap}
 */
export class horizontal extends tag {
	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				left: null,
				right: null,
				size: "md-4",
			};

			if (arg.length === 3) {
				t = {
					size: arg[0],
					left: arg[1],
					right: arg[2],
				};
			} else if (arg.length === 2) {
				t = {
					left: arg[0],
					right: arg[1],
				};
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
					class: null,
					style: null,

					align: null, //left,right,center
					color: null,
					textcolor: null,
					bordercolor: null,
					border: true,

					left: null,
					right: null,
					size: "md-4",
					gap: 0,
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
				tag: "div",
				attr: core.merge.attr(d.attr, {
					class: [
						"row",
						d.class,
						d.align ? `text-${d.align}` : null,
						d.color ? `bg-${d.color}` : null,
						d.textcolor ? `text-${d.textcolor}` : null,
						d.bordercolor ? `border-${d.bordercolor}` : null,
						!d.border ? "border-0" : null,
						d.gap !== null ? `g-${d.gap}` : null,
					],
					style: d.style,
				}),
				elem: [new div(core.multiClass(d.size, "col-$1", null, "col"), d.left), new div("col", d.right)],
			};
		} else {
			super.data = null;
		}
	}
}

/**
 * class,style,elem,href
 * class,style,elem,onclick
 * class,elem,href
 * class,elem,onclick
 * elem,href
 * elem,onclick
 * [elem],href
 * [elem],onclick
 * elem
 * [elem]
 * opt : {attr,class,style,id,name,href,onclick,elem}
 */
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
			super.data.attr = core.merge.attr(super.data.attr, { class: "card-link" });
		}
	}
}

export class img extends imgtag {
	constructor(...arg) {
		super(...arg);
	}

	get data() {
		return super.data;
	}
	set data(d) {
		super.data = d;

		if (super.data) {
			d = core.extend({}, { placement: "top" }, d);

			super.data.attr = core.merge.attr(super.data.attr, {
				class: [
					d.placement === "full" ? "card-img" : null,
					d.placement === "top" ? "card-img-top" : null,
					d.placement === "bottom" ? "card-img-bottom" : null,
					d.placement === "left" ? "img-fluid rounded-start" : null,
					d.placement === "right" ? "img-fluid rounded-end" : null,
				],
			});
		}
	}
}
