"use strict";
import * as core from "./core.js";

/**
 * opt : {tag,attr,elem}
 */
export default class tag {
	//_d = null;
	cl = 1; //name tag "cl" so we can check hasOwnProperty("cl")

	constructor(arg) {
		this._d = null;

		if (arg) {
			this.data = core.extend(
				{},
				{
					tag: null,
					attr: null,

					id: null,
					name: null,
					class: null,
					style: null,

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
				arg
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			this._d = {
				tag: d.tag,
				attr: core.merge.attr(d.attr, {
					id: d.id,
					name: d.name,
					href: d.href, //d.tag === "a" ? (d.href ? d.href : "javascript:void(0)") : null,
					onclick: d.onclick,
					onchange: d.onchange,
					onfocus: d.onfocus,
					onblur: d.onblur,
					class: core.merge.class(d.class, [
						d.align ? `text-${d.align}` : null,
						d.color ? `bg-${d.color}` : null,
						d.textcolor ? `text-${d.textcolor}` : null,
						d.bordercolor ? `border border-${d.bordercolor}` : null,
						d.border === false ? "border-0" : null,
					]),
					style: d.style,
				}),
				elem: d.elem,
			};
		} else {
			this._d = null;
		}
	}
}
