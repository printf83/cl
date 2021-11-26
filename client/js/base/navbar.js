"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import a from "./a.js";
import span from "./span.js";
import div from "./div.js";

export class container extends tag {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {};

			this.data = core.extend(
				{},
				{
					id: null,
					attr: null,
					class: null,
					style: null,

					containerfluid: true,
					containerclass: null,
					containerattr: null,
					containerstyle: null,

					expand: null, //sm|md|lg|xl|xxl|null|''
					dark: false, //light|dark
					color: null, //danger|primary|dark|warning|...
					position: null, //fixed-top|fixed-bottom|sticky-top|null
					elem: null,
				},
				t
			);
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				tag: "nav",
				attr: core.merge.attr(d.attr, {
					class: core.merge.class(d.class, [
						"navbar",
						d.expand || d.expand === ""
							? d.expand === ""
								? "navbar-expand"
								: `navbar-expand-${d.expand}`
							: null,
						d.dark ? `navbar-${d.dark ? "dark" : "light"}` : null,
						d.color ? `bg-${d.color}` : null,
						d.position ? d.position : null,
					]),
					style: d.style,
					id: d.id,
				}),
				elem: new div({
					attr: core.merge.attr(d.attr, {
						class: core.merge.class(d.containerclass, [
							d.containerfluid === true
								? "container-fluid"
								: d.containerfluid === false
								? "container"
								: core.multiClass(d.containerfluid, "container-$1"),
						]),
						style: d.containerstyle,
					}),
					elem: d.elem,
				}),
			};
		} else {
			super.data = null;
		}
	}
}

export class brand extends tag {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {};

			this.data = core.extend(
				{},
				{
					id: null,
					attr: null,
					class: null,
					style: null,

					href: null,
					onclick: null,
					label: null,
					icon: null,
					img: null,
					elem: null,
				},
				t
			);
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				tag: d.href ? "a" : "h1",
				attr: {
					class: core.merge.class(d.class, ["navbar-brand", !d.href ? "mb-0" : null]),
					id: d.id,
					href: d.href,
					onclick: d.onclick,
				},
				elem: d.elem
					? d.elem
					: new label({
							icon: d.icon,
							label: d.label,
					  }),
			};
		} else {
			super.data = null;
		}
	}
}
