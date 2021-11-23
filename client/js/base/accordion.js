"use strict";
import * as core from "./core.js";
import h from "./h.js";
import div from "./div.js";
import button from "./button.js";

/**
 * [item:{title,icon,active,elem}]
 * opt : {attr,id,class,style,item,flush,autoclose}
 */
export default class accordion extends div {
	_d = null;

	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				item: null,
			};

			if (arg.length === 1) {
				if (Array.isArray(arg[0])) {
					t.item = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					attr: null,

					id: null,
					class: null,
					style: null,
					item: null,

					flush: false,
					autoclose: true,
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
		if (d) {
			//check if item isnot array
			d.item = d.item ? (Array.isArray(d.item) ? d.item : [d.item]) : null;

			//id require if autoclose
			d.id = d.id || d.autoclose ? core.UUID() : null;

			//check if any item active
			let activeitem = d.item.find((i) => {
				return i.active === true;
			});

			if (!activeitem) {
				d.item[0].active = true;
			}

			this._d = {
				attr: core.merge.attr(d.attr, {
					id: d.id,
					class: core.merge.class(d.class, ["accordion", d.flush ? "accordion-flush" : null]),
					style: d.style,
				}),
				elem:
					d.item && d.item.length > 0
						? d.item.map(function (i) {
								i = core.extend(
									{},
									{
										id: null,
										title: null,
										icon: null,
										active: false,
										elem: null,
									},
									i
								);

								let id = i.id || core.UUID();
								return new div("accordion-item", [
									new h(2, {
										id: `${id}-head`,
										class: "accordion-header",
										elem: new button({
											label: i.title,
											icon: i.icon,
											class: ["accordion-button", !i.active ? "collapsed" : null],
											attr: {
												"data-bs-toggle": "collapse",
												"data-bs-target": `#${id}-body`,
												"aria-controls": `${id}-body`,
												"aria-expanded": i.active ? "true" : "false",
											},
										}),
										//create button from tag to prevent btn class on accordion-button
										// elem: new tag({
										// 	tag: "button",
										// 	attr: {
										// 		type: "button",
										// 		class: ["accordion-button", !i.active ? "collapsed" : null],
										// 		"data-bs-toggle": "collapse",
										// 		"data-bs-target": `#${id}-body`,
										// 		"aria-controls": `${id}-body`,
										// 		"aria-expanded": i.active ? "true" : "false",
										// 	},
										// 	elem: new label(i.icon, i.title),
										// }),
									}),
									new div({
										id: `${id}-body`,
										class: ["accordion-collapse", "collapse", i.active ? "show" : null],
										attr: {
											"aria-labelledby": `${id}-head`,
											"data-bs-parent": d.autoclose ? `#${d.id}` : null,
										},
										elem: new div("accordion-body", i.elem),
									}),
								]);
						  })
						: null,
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
