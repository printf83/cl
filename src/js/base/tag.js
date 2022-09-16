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
			return core.multiClass(val, format, supported, unsupported, iftrue, iffalse);
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

	zindex: null,

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
	offset: null,

	container: null,

	row: null,
	col: null,
	rowcol: null,
	gap: null,
	gapx: null,
	gapy: null,

	rounded: null,
	roundedtype: null,

	placeholder: null,
	placeholderanimation: null,
	placeholderweight: null,
	ariahidden: null,

	tmiddle: null,
	top: null,
	bottom: null,
	start: null,
	end: null,

	height: null,
	width: null,
	maxheight: null,
	maxwidth: null,
	minheight: null,
	minwidth: null,
	viewheight: null,
	viewwidth: null,
	minviewheight: null,
	minviewwidth: null,

	elem: null,
};

let gapManager = (opt) => {
	if (opt.row === true) {
		return "g";
	} else {
		return "gap";
	}
};

let fnWH = {
	main: (opt) => {
		opt = fnWH.heightManager(opt);
		opt = fnWH.widthManager(opt);
		opt = fnWH.maxHeightManager(opt);
		opt = fnWH.maxWidthManager(opt);
		opt = fnWH.minHeightManager(opt);
		opt = fnWH.minWidthManager(opt);
		opt = fnWH.minViewHeightManager(opt);
		opt = fnWH.minViewWidthManager(opt);
		opt = fnWH.viewHeightManager(opt);
		opt = fnWH.viewWidthManager(opt);

		return opt;
	},

	heightManager: (opt) => {
		if (opt.height || opt.height === 0) {
			switch (true) {
				case opt.height === "auto":
				case opt.height === 25:
				case opt.height === 50:
				case opt.height === 75:
				case opt.height === 100:
					break;
				default:
					opt.style = core.merge.style(opt.style, {
						height: typeof opt.height === "number" ? `${opt.height}%` : `${opt.height}`,
					});

					delete opt.height;
					break;
			}
		}

		return opt;
	},
	widthManager: (opt) => {
		if (opt.width || opt.width === 0) {
			switch (true) {
				case opt.width === "auto":
				case opt.width === 25:
				case opt.width === 50:
				case opt.width === 75:
				case opt.width === 100:
					break;
				default:
					opt.style = core.merge.style(opt.style, {
						width: typeof opt.width === "number" ? `${opt.width}%` : `${opt.width}`,
					});

					delete opt.width;
					break;
			}
		}

		return opt;
	},
	maxHeightManager: (opt) => {
		if (opt.maxheight || opt.maxheight === 0) {
			if (opt.maxheight !== 100) {
				opt.style = core.merge.style(opt.style, {
					"max-height": typeof opt.maxheight === "number" ? `${opt.maxheight}%` : `${opt.maxheight}`,
				});

				delete opt.maxheight;
			}
		}

		return opt;
	},
	maxWidthManager: (opt) => {
		if (opt.maxwidth || opt.maxwidth === 0) {
			if (opt.maxwidth !== 100) {
				opt.style = core.merge.style(opt.style, {
					"max-width": typeof opt.maxwidth === "number" ? `${opt.maxwidth}%` : `${opt.maxwidth}`,
				});

				delete opt.maxwidth;
			}
		}

		return opt;
	},
	minHeightManager: (opt) => {
		if (opt.minheight || opt.minheight === 0) {
			opt.style = core.merge.style(opt.style, {
				"min-height": typeof opt.minheight === "number" ? `${opt.minheight}%` : `${opt.minheight}`,
			});

			delete opt.minheight;
		}

		return opt;
	},
	minWidthManager: (opt) => {
		if (opt.minwidth || opt.minwidth === 0) {
			opt.style = core.merge.style(opt.style, {
				"min-width": typeof opt.minwidth === "number" ? `${opt.minwidth}%` : `${opt.minwidth}`,
			});

			delete opt.minwidth;
		}

		return opt;
	},
	minViewHeightManager: (opt) => {
		if (opt.minviewheight || opt.minviewheight === 0) {
			if (opt.minviewheight !== 100) {
				if (typeof opt.minviewheight === "number") {
					opt.style = core.merge.style(opt.style, {
						"min-height": `${opt.minviewheight}vh`,
					});
				}

				delete opt.minviewheight;
			}
		}

		return opt;
	},
	minViewWidthManager: (opt) => {
		if (opt.minviewwidth || opt.minviewwidth === 0) {
			if (opt.minviewwidth !== 100) {
				if (typeof opt.minviewwidth === "number") {
					opt.style = core.merge.style(opt.style, {
						"min-width": `${opt.minviewwidth}vw`,
					});
				}

				delete opt.minviewwidth;
			}
		}

		return opt;
	},
	viewHeightManager: (opt) => {
		if (opt.viewheight || opt.viewheight === 0) {
			if (opt.viewheight !== 100) {
				if (typeof opt.viewheight === "number") {
					opt.style = core.merge.style(opt.style, {
						height: `${opt.viewheight}vh`,
					});
				}

				delete opt.viewheight;
			}
		}

		return opt;
	},
	viewWidthManager: (opt) => {
		if (opt.viewwidth || opt.viewwidth === 0) {
			if (opt.viewwidth !== 100) {
				if (typeof opt.viewwidth === "number") {
					opt.style = core.merge.style(opt.style, {
						width: `${opt.viewwidth}vw`,
					});
				}

				delete opt.viewwidth;
			}
		}

		return opt;
	},
};

/**
 * opt : {tag,id,name,class,style,attr,href,onclick,onchange,onfocus,onblur,align,color,textcolor,bordercolor,border,elem}
 */
export default class tag {
	_dom = null;
	_d = null;
	cl = 1; //name tag "cl" so we can check hasOwnProperty("cl")

	constructor(...opt) {
		this.data = core.args(
			[
				{
					rule: ["string|string[]", "cl|cl[]|string|string[]"],
					fn: () => {
						return {
							class: opt[0],
							elem: opt[1],
						};
					},
				},
				{
					rule: ["cl|cl[]|string|string[]|object[]"],
					fn: () => {
						return {
							elem: opt[0],
						};
					},
				},

				{
					rule: ["object"],
					fn: () => {
						return opt[0];
					},
				},

				{
					rule: null,
					fn: () => {
						return null;
					},
				},
			],
			"tag",
			opt
		);
	}

	get dom() {
		return this._dom;
	}
	set dom(element) {
		this._dom = element;
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

		//height and width
		opt = fnWH.main(opt);

		if (opt.zindex !== null) {
			opt.style = core.merge.style(opt.style, {
				"z-index": opt.zindex,
			});
		}

		this._d = {
			tag: opt.tag,
			attr: core.merge.attr(opt.attr, {
				id: opt.id,
				name: opt.name,

				href: opt.href ? (opt.href === "#" ? "javascript:void(0)" : opt.href) : null,
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

				"aria-hidden": opt.ariahidden ? "true" : null,

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

					opt.height ? `h-${opt.height}` : null,
					opt.width ? `w-${opt.width}` : null,
					opt.maxheight ? `mh-${opt.maxheight}` : null,
					opt.maxwidth ? `mw-${opt.maxwidth}` : null,
					opt.viewheight ? `vh-${opt.viewheight}` : null,
					opt.viewwidth ? `vw-${opt.viewwidth}` : null,
					opt.minviewheight ? `min-vh-${opt.minviewheight}` : null,
					opt.minviewwidth ? `min-vw-${opt.minviewwidth}` : null,

					opt.placeholder || opt.placeholderweight ? `placeholder` : null,
					opt.placeholderanimation ? `placeholder-${opt.placeholderanimation}` : null,
					opt.placeholderweight ? `placeholder-${opt.placeholderweight}` : null,

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

					c2(opt.gap, `${gapManager(opt)}-$1`),
					c2(opt.gapx, `gx-$1`),
					c2(opt.gapy, `gy-$1`),

					c3(opt.container, "container", null, "container-$1", null, null),

					opt.row ? "row" : null,

					c2(opt.flex, "flex-$1"),
					c2(opt.order, "order-$1"),
					c2(opt.offset, "offset-$1"),

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
