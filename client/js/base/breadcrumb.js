"use strict";
import * as core from "./core.js";
import nav from "./nav.js";
import button from "./button.js";
import ol from "./ol.js";
import li from "./li.js";
import label from "./label.js";
import a from "./a.js";

/**
 * opt : {tagoption,label,divider,item:{label,icon,current,href,onclick,elem}}
 */
export default class breadcrumb extends nav {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					label: "Breadcrumb",
					divider: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E")`,
					item: null,
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
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
						class: "breadcrumb",
						elem: opt.item.map(function (i) {
							i = core.extend(
								{},
								{
									label: null,
									icon: null,
									current: false,
									href: null,
									onclick: null,
									elem: null,
								},
								i
							);

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
												  })
												: i.href
												? new a({
														href: i.href,
														elem: new label({
															icon: i.icon,
															label: i.label,
														}),
												  })
												: i.onclick
												? new button({ label: i.label, icon: i.icon, onclick: i.onclick })
												: new label({
														icon: i.icon,
														label: i.label,
												  }),
									  ],
							});
						}),
				  })
				: null;

			delete opt.label;
			delete opt.icon;
			delete opt.divider;

			super.data = opt;
		}
	}
}
