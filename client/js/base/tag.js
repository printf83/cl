"use strict";
import * as core from "./core.js";

/**
 * opt : {tag,id,name,class,style,attr,href,onclick,onchange,onfocus,onblur,align,color,textcolor,bordercolor,border,elem}
 */
export default class tag {
	_d = null;
	cl = 1; //name tag "cl" so we can check hasOwnProperty("cl")

	constructor(opt) {
		if (opt) {
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
					position: null,
					overflow: null,
					opacity: null,

					color: null,
					gradient: false,
					coloropacity: null,

					textcolor: null,
					textopacity: null,

					shadow: null,

					border: null,
					bordercolor: null,
					borderweight: null,

					rounded: null,
					roundedtype: null,

					elem: null,
				},
				opt
			);
		}
	}

	get data() {
		return this._d;
	}
	set data(opt) {
		if (opt) {
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

						opt.shadow === false
							? "shadow-none"
							: opt.shadow === true
							? "shadow"
							: opt.shadow
							? `shadow-${opt.shadow}`
							: null,
						opt.border === false
							? "border-0"
							: opt.border === true || opt.borderweight || opt.bordercolor
							? opt.border === true
								? "border"
								: opt.border
								? `border-${opt.border}`
								: null
							: null,
						opt.borderweight ? `border-${opt.borderweight}` : null,
						opt.bordercolor ? `border-${opt.bordercolor}` : null,

						opt.rounded === false
							? "rounded-0"
							: opt.rounded === true
							? `rounded`
							: opt.rounded
							? `rounded-${opt.rounded}`
							: null,

						opt.roundedtype && opt.rounded !== false && opt.rounded !== true
							? `rounded-${opt.roundedtype}`
							: null,
					]),
					style: opt.style,
				}),
				elem: opt.elem,
			};
		}
	}
}
