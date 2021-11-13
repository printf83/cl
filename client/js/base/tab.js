"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import option from "./option.js";
import div from "./div.js";
import ul from "./ul.js";
import li from "./li.js";
import a from "./a.js";
import label from "./label.js";

/**
 * label, option
 * label, color, option
 * label, onclick, option
 * label, color, onclick, option
 * opt {...buttonopt,option,container,arrow,splittoggle,aligment,offset,autoclose}
 */

export default class tab extends tag {
	_d = null;

	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				item: null,
			};

			if (arg.length === 1 && Array.isArray(arg[0])) {
				t.item = arg[0];
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					attr: null, //combine to container

					id: null,
					style: "tab", //null|tab|pill
					align: null,
					size: null, //need to set for vertical. only used if has body
					animate: true,
					border: true,
					rounded: true,
					flush: false,

					item: [],
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
			if (!Array.isArray(d.item)) {
				console.error("Tab elem must be an Array");
			} else {
				//make sure one elem is active, if no active, set first as active
				let activeIndex = -1;
				d.item.forEach((i, x) => {
					if (activeIndex === -1) {
						if (i.active) {
							activeIndex = x;
						}
					}
				});

				if (activeIndex === -1 && typeof d.item[0] === "object") {
					d.item[0].active = true;
				}

				//auto size if vertical align
				if (!d.size && (d.align === "vertical" || d.align === "vertical-right")) {
					d.size = "col-sm-12 col-md-6 col-lg-4";
				}

				//start make item
				var headerItem = [];
				var bodyItem = [];

				var defOption = {
					id: null,
					label: null,
					icon: null,
					hidelabel: false,
					disable: false,
					active: false,
					option: null,
					item: null,
				};

				d.item.forEach((i, x) => {
					if (typeof i === "string") {
						if (x === 0) {
							i = { label: i, active: true };
						} else {
							i = { label: i };
						}
					}

					i = core.extend({}, defOption, i);

					//create id for tab elem
					i.id = i.id ? i.id : i.elem ? core.UUID() : null;

					//make header
					headerItem.push(
						new li({
							attr: {
								class: ["nav-item", i.option ? "dropdown" : null],
								role: "presentation",
							},
							elem: [
								new a({
									attr: {
										class: [
											"nav-link",
											i.option ? "dropdown-toggle" : null,
											i.active ? "active" : null,
											i.disabled ? "disabled" : null,
										],
										href: `#${i.id}-body`,
										id: `${i.id}-head`,
										"data-bs-toggle": i.option
											? "dropdown"
											: d.style === "tab"
											? "tab"
											: d.style === "pill"
											? "pill"
											: "tab",
										role: i.option ? "button" : null,
									},
									elem: new label({
										label: i.label,
										icon: i.icon,
										hidelabel: i.hidelabel,
									}),
								}),
								i.option
									? new ul(
											"dropdown-menu",
											new option({
												type: "dropdown",
												item: i.option,
											})
									  )
									: null,
							],
						})
					);

					//make body
					if (i.elem) {
						bodyItem.push(
							new div({
								attr: {
									class: ["tab-pane", d.animate ? "fade" : null, i.active ? "active show" : null],
									id: `${i.id}-body`,
									role: "tabpanel",
								},
								elem: i.elem,
							})
						);
					}
				});

				//wrap headerItem in ul.nav
				let headerCtl = new ul({
					attr: {
						class: [
							"nav",
							//card-header-tabs if has body (will wrap in card)
							bodyItem && bodyItem.length > 0
								? d.style === "tab"
									? "card-" + (d.align === "vertical-right" ? "footer" : "header") + "-tabs"
									: d.style === "pill"
									? "card-" + (d.align === "vertical-right" ? "footer" : "header") + "-pills"
									: "card-" + (d.align === "vertical-right" ? "footer" : "header") + "-tabs"
								: null,
							d.column ? "flex-column mb-auto" : null,
							d.flush ? "nav-flush" : null,
							d.style === "tab" ? "nav-tabs" : d.style === "pill" ? "nav-pills" : null,
							d.align === "right"
								? "justify-content-end"
								: d.align === "center"
								? "justify-content-center"
								: d.align === "vertical" || d.align === "vertical-right"
								? "flex-column mb-auto"
								: d.align === "fill"
								? "nav-fill"
								: null,
						],
						id: d.id ? `${d.id}-head` : null,
						role: "tablist",
					},
					elem: headerItem,
				});

				let bodyCtl =
					bodyItem && bodyItem.length > 0
						? new div({
								attr: {
									class: "tab-content",
									id: d.id ? `${d.id}-body` : null,
								},
								elem: bodyItem,
						  })
						: null;

				if (bodyCtl) {
					this._d = {
						elem: new div(
							[
								"card p-0", //need p-0 to make sure no one change this padding
								d.rounded ? null : "rounded-0",
								d.border ? null : "border-0",
							],
							d.size
								? d.align === "vertical-right"
									? [
											new div("row g-0", [
												new div("col", new div("card-body", bodyCtl)),
												new div([d.size, "card-footer border-0 p-2"], headerCtl),
											]),
									  ]
									: [
											new div("row g-0", [
												new div([d.size, "card-header border-0"], headerCtl),
												new div("col", new div("card-body", bodyCtl)),
											]),
									  ]
								: [new div("card-header", headerCtl), new div("card-body", bodyCtl)]
						),
					};
				} else {
					this._d = {
						elem: headerCtl,
					};
				}
			}
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
