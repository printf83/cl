"use strict";
import * as core from "./core.js";

function c1(val, iftrue, iffalse, other) {
	if (val !== null && val !== undefined) {
		if (val === true) {
			return iftrue;
		} else if (val === false) {
			return iffalse;
		} else {
			return other;
		}
	}
	return null;
}

function c2(val, format) {
	if (val !== null && val !== undefined) {
		return core.multiClass(val, format);
	}
	return null;
}

const defaultOption = {
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
	position: null,
	overflow: null,
	opacity: null,

	color: null,
	gradient: false,
	coloropacity: null,

	textcolor: null,
	textopacity: null,

	padding: null,
	paddingX: null,
	paddingY: null,
	paddingTop: null,
	paddingBottom: null,
	paddingStart: null,
	paddingEnd: null,

	margin: null,
	marginX: null,
	marginY: null,
	marginTop: null,
	marginBottom: null,
	marginStart: null,
	marginEnd: null,

	display: null,

	shadow: null,

	border: null,
	bordercolor: null,
	borderweight: null,

	rounded: null,
	roundedtype: null,

	elem: null,
};

/**
 * opt : {tag,id,name,class,style,attr,href,onclick,onchange,onfocus,onblur,align,color,textcolor,bordercolor,border,elem}
 */
export default class tag {
	_d = null;
	cl = 1; //name tag "cl" so we can check hasOwnProperty("cl")

	constructor(opt) {
		if (opt) {
			this.data = opt;
		}
	}

	get data() {
		return this._d;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		this._d = {
			tag: opt.tag,
			attr: core.merge.attr(opt.attr, {
				id: opt.id,
				name: opt.name,

				href: opt.href,
				onclick: opt.onclick,
				onchange: opt.onchange,
				onfocus: opt.onfocus,
				onblur: opt.onblur,

				style: opt.style,

				class: core.merge.class(opt.class, [
					opt.align ? `text-${opt.align}` : null,
					opt.position ? `position-${opt.position}` : null,
					opt.overflow ? `overflow-${opt.overflow}` : null,
					opt.opacity ? `opacity-${opt.opacity}` : null,

					opt.color ? `bg-${opt.color}` : null,
					opt.gradient ? "bg-gradient" : null,
					opt.coloropacity ? `bg-opacity-${opt.coloropacity}` : null,

					opt.textcolor ? `text-${opt.textcolor}` : null,
					opt.textopacity ? `text-opacity-${opt.textopacity}` : null,

					c1(opt.shadow, "shadow", "shadow-none", `shadow-${opt.shadow}`),
					c1(opt.border, "border", "border-0", `border-${opt.border}`),
					c1(opt.borderweight, null, null, `border border-${opt.borderweight}`),
					c1(opt.bordercolor, null, null, `border border-${opt.bordercolor}`),
					c1(opt.rounded, "rounded", "rounded-0", `rounded-${opt.rounded}`),
					c1(opt.roundedtype, null, null, `rounded-${opt.roundedtype}`),

					c2(opt.padding, "p-$1"),
					c2(opt.paddingX, "px-$1"),
					c2(opt.paddingY, "py-$1"),
					c2(opt.paddingTop, "pt-$1"),
					c2(opt.paddingBottom, "pb-$1"),
					c2(opt.paddingStart, "ps-$1"),
					c2(opt.paddingEnd, "pe-$1"),

					c2(opt.margin, "m-$1"),
					c2(opt.marginX, "mx-$1"),
					c2(opt.marginY, "my-$1"),
					c2(opt.marginTop, "mt-$1"),
					c2(opt.marginBottom, "mb-$1"),
					c2(opt.marginStart, "ms-$1"),
					c2(opt.marginEnd, "me-$1"),

					c2(opt.display, "d-$1"),
					c2(opt.gap, "g-$1"),
					// c2(opt.gap, "gap-$1"),

					opt.row ? "row" : null,

					opt.col && opt.col !== undefined
						? opt.col === true
							? "col"
							: core.multiClass(opt.col, "col-$1")
						: null,

					opt.float ? core.multiClass(opt.float, "float-$1") : null,
					opt.alignItem ? core.multiClass(opt.alignItem, "align-items-$1") : null,
					opt.justifyContent ? core.multiClass(opt.justifyContent, "justify-content-$1") : null,
				]),
			}),
			elem: opt.elem,
		};
	}
}
