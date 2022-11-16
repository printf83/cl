"use strict";
import * as core from "./core.js";
import nav from "./nav.js";
import button from "./button.js";
import ol from "./ol.js";
import li from "./li.js";
import label from "./label.js";
import a from "./a.js";

const defaultOption = {
	label: "Breadcrumb",
	divider: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
	item: null,
};

const defaultItemOption = {
	label: null,
	showlabel: null,
	hidelabel: null,
	iconafter: null,
	icon: null,

	current: false,
};
export default class breadcrumb extends nav {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			//check if item isnot array
			opt.item = opt.item ? (Array.isArray(opt.item) ? opt.item : [opt.item]) : null;

			//check if any item current
			let currentitem = opt.item.find((i) => {
				return i.current === true;
			});

			//no current, select last item as current
			if (!currentitem && typeof opt.item[opt.item.length - 1] === "object") {
				opt.item[opt.item.length - 1].current = true;
			}

			opt = core.merge(opt, {
				"aria-label": opt.label,
				style: {
					"--bs-breadcrumb-divider": opt.divider ? opt.divider : null,
				},
				elem: opt.item
					? new ol({
							margin: 0,
							class: ["breadcrumb"],
							elem: opt.item.map((i) => {
								i = core.extend({}, defaultItemOption, i);

								let i_current = i.current;
								delete i.current;

								//gen item elem
								let elem = null;
								if (i.elem) {
									elem = i.elem;
								} else {
									if (i_current) {
										elem = new label(i);
									} else {
										if (i.href) {
											let t_href = i.href;
											delete i.href;

											elem = new a({
												href: t_href,
												elem: new label(i),
											});
										} else if (i.click) {
											elem = new button(i);
										} else {
											elem = new label(i);
										}
									}
								}

								return new li({
									class: ["breadcrumb-item", i_current ? "active" : null],
									"aria-current": i_current ? "page" : null,
									elem: elem,
								});
							}),
					  })
					: null,
			});

			delete opt.label;
			delete opt.divider;
			delete opt.item;

			super.data = opt;
		}
	}
}
