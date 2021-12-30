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

function c2(val, format, supported, unsupported) {
	if (val !== null && val !== undefined) {
		return core.multiClass(val, format, supported, unsupported);
	}
	return null;
}

function c3(val, iftrue, iffalse, format, supported, unsupported) {
	if (val !== null && val !== undefined) {
		if (val === true) {
			return iftrue;
		} else if (val === false) {
			return iffalse;
		} else {
			return core.multiClass(val, format, supported, unsupported);
		}
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
	warp: null,
	wordbreak: null,
	texttransform: null,

	fontsize: null,
	fontweight: null,
	fontitalic: null,
	lineheight: null,
	monospace: null,
	textdecoration: null,

	position: null,
	overflow: null,
	opacity: null,
	display: null,
	float: null,
	alignItem: null,
	justifyContent: null,
	shadow: null,

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

	border: null,
	bordercolor: null,
	borderweight: null,

	row: null,
	col: null,
	rowcol: null,
	gap: null,

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

	constructor(...opt) {
		if (opt && opt.length > 0) {
			if (opt.length === 2) {
				this.data = {
					class: opt[0],
					elem: opt[1],
				};
			} else if (opt.length === 1) {
				if (typeof opt[0] === "object") {
					if (opt[0].hasOwnProperty("cl")) {
						this.data = { elem: opt[0] };
					} else {
						this.data = opt[0];
					}
				} else {
					this.data = { elem: opt[0] };
				}
			}
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
					c2(opt.align, "text-$1"),
					opt.position ? `position-${opt.position}` : null,
					opt.overflow ? `overflow-${opt.overflow}` : null,
					opt.opacity ? `opacity-${opt.opacity}` : null,

					opt.color ? `bg-${opt.color}` : null,
					opt.gradient ? "bg-gradient" : null,
					opt.coloropacity ? `bg-opacity-${opt.coloropacity}` : null,

					opt.textcolor ? `text-${opt.textcolor}` : null,
					opt.textopacity ? `text-opacity-${opt.textopacity}` : null,

					opt.warp !== null ? (opt.warp === true ? "text-warp" : "text-nowarp") : null,
					opt.wordbreak ? "text-break" : null,
					opt.texttransform ? `text-${opt.texttransform}` : null,
					opt.fontsize ? `fs-${opt.fontsize}` : null,
					opt.fontweight ? `fw-${opt.fontweight}` : null,
					opt.fontitalic !== null ? (opt.fontitalic === true ? "fst-italic" : "fst-normal") : null,
					opt.textdecoration !== null
						? opt.textdecoration === true
							? "text-decoration-underline"
							: opt.textdecoration === "false"
							? "text-decoration-none"
							: `text-decoration-${opt.textdecoration}`
						: null,
					opt.lineheight ? `lh-${opt.lineheight}` : null,
					opt.monospace ? "font-monospace" : null,

					c3(opt.shadow, "shadow", "shadow-none", "shadow-$1", null, "shadow"),
					c3(opt.border, "border", "border-0", "border-$1", null, "border"),
					c3(opt.rounded, "rounded", "rounded-0", "rounded-$1", null, "rounded"),

					c1(opt.borderweight, null, null, `border border-${opt.borderweight}`),
					c1(opt.bordercolor, null, null, `border border-${opt.bordercolor}`),
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

					opt.display !== "grid" && opt?.attr?.role !== "toolbar" ? c2(opt.gap, "g-$1") : null,
					opt.display === "grid" || opt?.attr?.role === "toolbar" ? c2(opt.gap, "gap-$1") : null,

					opt.row ? "row" : null,

					c2(opt.rowcol, "row-cols-$1"),
					c3(opt.col, "col", null, "col-$1", null, "col"),

					opt.float ? core.multiClass(opt.float, "float-$1") : null,
					opt.alignItem ? core.multiClass(opt.alignItem, "align-items-$1") : null,
					opt.justifyContent ? core.multiClass(opt.justifyContent, "justify-content-$1") : null,
				]),
			}),
			elem: opt.elem,
		};
	}
}
