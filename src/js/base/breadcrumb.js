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
	icon: null,
	showlabel: null,
	iconafter: false,
	current: false,
	href: null,
	onclick: null,
	elem: null,
};

/**
 * opt : {tagoption,label,divider,item:{label,icon,current,href,onclick,elem}}
 */
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

			if (!currentitem && typeof opt.item[opt.item.length - 1] === "object") {
				opt.item[opt.item.length - 1].current = true;
			}

			opt.style = core.merge.style(opt.style, {
				"--bs-breadcrumb-divider": opt.divider ? opt.divider : null,
			});

			opt.attr = core.merge.attr(opt.attr, {
				"aria-label": opt.label,
			});

			opt.elem = opt.item
				? new ol({
						margin: "0",
						class: ["breadcrumb"],
						elem: opt.item.map((i) => {
							i = core.extend({}, defaultItemOption, i);

							return new li({
								class: ["breadcrumb-item", i.current ? "active" : null],
								attr: { "aria-current": i.current ? "page" : null },
								elem: i.elem
									? i.elem
									: [
											i.current
												? new label({
														icon: i.icon,
														label: i.label,
														showlabel: i.showlabel,
														iconafter: i.iconafter,
												  })
												: i.href
												? new a({
														href: i.href,
														elem: new label({
															icon: i.icon,
															label: i.label,
															showlabel: i.showlabel,
															iconafter: i.iconafter,
														}),
												  })
												: i.onclick
												? new button({
														label: i.label,
														icon: i.icon,
														showlabel: i.showlabel,
														iconafter: i.iconafter,
														onclick: i.onclick,
												  })
												: new label({
														icon: i.icon,
														label: i.label,
														showlabel: i.showlabel,
														iconafter: i.iconafter,
												  }),
									  ],
							});
						}),
				  })
				: null;

			delete opt.label;
			delete opt.icon;
			delete opt.showlabel;
			delete opt.iconafter;
			delete opt.divider;

			super.data = opt;
		}
	}
}
