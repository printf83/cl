"use strict";
import * as core from "./core.js";
import tag from "./tag.js";

/**
 * class,src,alt
 * class,src
 * src
 * opt : {attr,class,style,id,onclick,src,alt}
 */
export default class img extends tag {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				class: null,
				src: null,
				alt: null,
			};

			if (arg.length === 3) {
				t.class = arg[0];
				t.src = arg[1];
				t.alt = arg[2];
			} else if (arg.length === 2) {
				t.class = arg[0];
				t.src = arg[1];
			} else if (arg.length === 1 && typeof arg[0] === "string") {
				t.src = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					id: null,
					onclick: null,

					attr: null,
					class: null,
					style: null,
					src: null,
					alt: "Image",
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
				tag: "img",
				attr: core.merge.attr(d.attr, {
					class: d.class,
					style: d.style,

					id: d.id,
					src: d.src,
					alt: d.alt,
					onclick: d.onclick,
				}),
			};
		} else {
			super.data = null;
		}
	}
}
