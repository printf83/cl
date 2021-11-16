"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import icon from "./icon.js";
import div from "./div.js";
import h from "./h.js";

/**
 * weight,icon,label
 * icon,label
 * label
 * opt : {attr,class,icon,weight,elem}
 */
export default class msg extends tag {
	_d = null;

	constructor(...arg) {
		super();
		if (arg && arg.length > 0) {
			let t = {
				weight: null,
				icon: null, //sm|md|lg
				elem: null,
			};
			if (arg.length === 3) {
				t.weight = arg[0];
				t.icon = arg[1];
				t.elem = arg[2];
			} else if (arg.length === 2) {
				t.icon = arg[0];
				t.elem = arg[1];
			} else if (
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
					attr: null,
					class: null,
					icon: null,
					weight: null, //font size fs-1 to fs-6 or display-1 to display-6 (any class for i)
					elem: null,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d && (d.icon || d.elem)) {
			switch (d.weight) {
				case "sm":
				case "md":
					this._d = {
						tag: "div",
						attr: core.merge.attr(d.attr, {
							class: core.merge.class(d.class, ["d-flex", "align-items-stretch", "gap-2"]),
						}),
						elem: [
							d.icon
								? new div(
										"d-flex align-item-start",
										new div(d.weight === "sm" ? "fs-6" : "fs-1", new icon(d.icon))
								  )
								: null,
							new div("d-flex align-items-center", new div(d.elem)),
						],
					};

					break;
				case "lg":
					this._d = {
						tag: "div",
						attr: core.merge.attr(d.attr, {
							class: d.class,
						}),
						elem: [
							d.icon ? new h(1, "display-1 text-center mx-3", new icon(d.icon)) : null,
							new div("text-center", d.elem),
						],
					};

					break;
				default:
					console.error("Unsupported weight", d.weight);
			}
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
