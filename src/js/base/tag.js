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

	accesskey: null, //ascii
	contenteditable: null, //"true|false
	dir: null, //"ltr|rtl|auto"
	draggable: null, //"true|false|auto"
	hidden: null, //one attr
	lang: null, //string
	spellcheck: null, //textarea, input "true|false"
	tabindex: null, //number
	title: null, //text

	href: null,
	onclick: null,
	// onchange: null,
	// onfocus: null,
	// onblur: null,

	userselect: null,
	pointerevent: null,

	visible: null,
	align: null,
	valign: null,
	wrap: null,
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
	alignitem: null,
	alignself: null,
	aligncontent: null,
	justifycontent: null,
	shadow: null,

	textbg: null, //BS5.2

	color: null,
	gradient: false,
	coloropacity: null,

	linkcolor: null,
	textcolor: null,
	textopacity: null,

	padding: null,
	paddingx: null,
	paddingy: null,
	paddingtop: null,
	paddingbottom: null,
	paddingstart: null,
	paddingend: null,

	margin: null,
	marginx: null,
	marginy: null,
	margintop: null,
	marginbottom: null,
	marginstart: null,
	marginend: null,

	border: null,
	bordercolor: null,
	borderweight: null,

	flex: null,
	order: null,

	row: null,
	col: null,
	rowcol: null,
	gap: null,

	rounded: null,
	roundedtype: null,

	tmiddle: null,
	top: null,
	bottom: null,
	start: null,
	end: null,

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
				if (typeof opt[0] === "object" && !Array.isArray(opt[0])) {
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

		//BS5.2
		if (!opt.textcolor && !opt.textbg && opt.color) {
			opt.textbg = opt.color;
		}

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

				accesskey: opt.accesskey,
				contenteditable: opt.contenteditable,
				dir: opt.dir,
				draggable: opt.draggable,
				hidden: opt.hidden,
				lang: opt.lang,
				spellcheck: opt.spellcheck,
				tabindex: opt.tabindex,
				title: opt.title,

				style: opt.style,

				class: core.merge.class(opt.class, [
					opt.userselect ? `user-select-${opt.userselect}` : null,
					opt.pointerevent ? `pe-${opt.pointerevent}` : null,

					opt.visible !== null ? (opt.visible === true ? "visible" : "invisible") : null,

					c2(opt.align, "text-$1"),
					c2(opt.valign, "align-$1"),

					opt.position ? `position-${opt.position}` : null,
					opt.overflow ? `overflow-${opt.overflow}` : null,
					opt.opacity ? `opacity-${opt.opacity}` : null,

					opt.textbg ? `text-bg-${opt.textbg}` : null,
					opt.color ? `bg-${opt.color}` : null,
					opt.gradient ? "bg-gradient" : null,
					opt.coloropacity ? `bg-opacity-${opt.coloropacity}` : null,

					opt.linkcolor ? `link-${opt.linkcolor}` : null,
					opt.textcolor ? `text-${opt.textcolor}` : null,
					opt.textopacity ? `text-opacity-${opt.textopacity}` : null,

					opt.wrap !== null ? (opt.wrap === true ? "text-wrap" : "text-nowrap") : null,
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
					c2(opt.paddingx, "px-$1"),
					c2(opt.paddingy, "py-$1"),
					c2(opt.paddingtop, "pt-$1"),
					c2(opt.paddingbottom, "pb-$1"),
					c2(opt.paddingstart, "ps-$1"),
					c2(opt.paddingend, "pe-$1"),

					c2(opt.margin, "m-$1"),
					c2(opt.marginx, "mx-$1"),
					c2(opt.marginy, "my-$1"),
					c2(opt.margintop, "mt-$1"),
					c2(opt.marginbottom, "mb-$1"),
					c2(opt.marginstart, "ms-$1"),
					c2(opt.marginend, "me-$1"),

					c2(opt.display, "d-$1"),

					opt.display !== "grid" && opt.display !== "flex" && opt?.attr?.role !== "toolbar"
						? c2(opt.gap, "g-$1")
						: null,
					opt.display === "grid" || opt.display === "flex" || opt?.attr?.role === "toolbar"
						? c2(opt.gap, "gap-$1")
						: null,

					// opt.gap ? c2(opt.gap, "g-$1") : null,
					// opt.gap ? c2(opt.gap, "gap-$1") : null,

					opt.row ? "row" : null,

					c2(opt.flex, "flex-$1"),
					c2(opt.order, "order-$1"),

					c2(opt.rowcol, "row-cols-$1"),
					c3(opt.col, "col", null, "col-$1", null, "col"),

					opt.float ? core.multiClass(opt.float, "float-$1") : null,
					opt.alignitem ? core.multiClass(opt.alignitem, "align-items-$1") : null,
					opt.alignself ? core.multiClass(opt.alignself, "align-self-$1") : null,
					opt.aligncontent ? core.multiClass(opt.aligncontent, "align-content-$1") : null,
					opt.justifycontent ? core.multiClass(opt.justifycontent, "justify-content-$1") : null,

					c1(opt.tmiddle, "translate-middle", null, `translate-middle-${opt.tmiddle}`),
					c1(opt.top, null, null, `top-${opt.top}`),
					c1(opt.bottom, null, null, `bottom-${opt.bottom}`),
					c1(opt.start, null, null, `start-${opt.start}`),
					c1(opt.end, null, null, `end-${opt.end}`),
				]),
			}),
			elem: opt.elem,
		};
	}
}
