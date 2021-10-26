"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import attr from "./attr.js";
import div from "./div.js";

export class container extends tag {
	constructor(...arg) {
		let t = {};

		//id,label,elem
		//label,elem
		//elem (array)
		//option
		if (arg && arg.length === 2) {
			t.label = arg[0];
			t.elem = arg[1];
		} else if (arg && arg.length === 3) {
			t.id = arg[0];
			t.label = arg[1];
			t.elem = arg[2];
		} else if (arg && arg.length === 1 && Array.isArray(arg[0])) {
			t.elem = arg[0];
		} else {
			t = arg[0];
		}

		let d = core.extend(
			{},
			{
				id: null,
				label: null,
				attr: null,
				elem: null,
				nowarp: false,
			},
			t
		);

		super({
			elem: [
				d.label
					? new tag({
							tag: "label",
							attr: {
								for: d.id,
								class: "form-label",
							},
							elem: d.label,
					  })
					: null,
				new div({
					attr: d.attr,
					class: ["input-group", d.nowarp ? "flex-nowarp" : null],
					elem: d.elem,
				}),
			],
		});
	}
}

export class text extends div {
	constructor(...arg) {
		let t = {};

		//id,class,elem
		//class,elem
		//elem (array)
		//option
		if (arg && arg.length === 3) {
			t.id = arg[0];
			t.class = arg[1];
			t.elem = arg[2];
		} else if (arg && arg.length === 2) {
			t.class = arg[0];
			t.elem = arg[1];
		} else if (arg && arg.length === 1 && (typeof arg[0] === "string" || Array.isArray(arg[0]))) {
			t.elem = arg[0];
		} else {
			t = arg[0];
		}

		let d = core.extend(
			{},
			{
				id: null,
				class: null,
				attr: null,
				elem: null,
			},
			t
		);

		super({
			attr: attr.merge(d.attr, {
				id: d.id,
				class: d.class,
			}),
			class: ["input-group-text"],
			elem: d.elem,
		});
	}
}
