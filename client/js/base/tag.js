"use strict";
import * as core from "./core.js";

/**
 * opt : {tag,id,name,class,style,attr,href,onclick,onchange,onfocus,onblur,align,color,textcolor,bordercolor,border,elem}
 */
export default class tag {
	_d = null;
	cl = 1; //name tag "cl" so we can check hasOwnProperty("cl")

	constructor(opt) {
		this.data = core.extend(
			{},
			{
				tag: null,

				id: null,
				name: null,

				class: null,
				style: null,
				attr: null,

				href: null,
				onclick: null,
				onchange: null,
				onfocus: null,
				onblur: null,

				align: null,
				color: null,
				textcolor: null,
				bordercolor: null,
				border: null,

				elem: null,
			},
			opt
		);
	}

	get data() {
		return this._d;
	}
	set data(opt) {
		this._d = {
			tag: opt.tag,
			attr: core.merge.attr(opt.attr, {
				id: opt.id,
				name: opt.name,
				href: opt.href, //d.tag === "a" ? (d.href ? d.href : "javascript:void(0)") : null,
				onclick: opt.onclick,
				onchange: opt.onchange,
				onfocus: opt.onfocus,
				onblur: opt.onblur,
				class: core.merge.class(opt.class, [
					opt.align ? `text-${opt.align}` : null,
					opt.color ? `bg-${opt.color}` : null,
					opt.textcolor ? `text-${opt.textcolor}` : null,
					opt.bordercolor ? `border border-${opt.bordercolor}` : null,
					opt.border === false ? "border-0" : null,
				]),
				style: opt.style,
			}),
			elem: opt.elem,
		};
	}
}
