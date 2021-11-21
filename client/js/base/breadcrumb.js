"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import button from "./button.js";
import ol from "./ol.js";
import li from "./li.js";
import label from "./label.js";
import a from "./a.js";

/**
 * [item:{title,icon,divider,label,href,onclick}]
 * opt : {attr,id,class,style,item,divider}
 */
export default class breadcrumb extends tag {
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

					label: "Breadcrumb",
					divider:
						"url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;)",
					//";",
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

			//check if any item current
			let currentitem = d.item.find((i) => {
				return i.current === true;
			});

			if (!currentitem) {
				d.item[d.item.length - 1].current = true;
			}

			this._d = {
				tag: "nav",
				attr: core.merge.attr(d.attr, {
					id: d.id,
					"aria-label": d.label,
					class: d.class,
					style: core.merge.style(d.style, {
						"--bs-breadcrumb-divider": d.divider ? d.divider : null, //`${d.divider};`
						height: "150px",
						width: "100%",
					}),
				}),
				elem: new ol(
					"breadcrumb",
					d.item && d.item.length > 0
						? d.item.map(function (i) {
								i = core.extend(
									{},
									{
										label: null,
										icon: null,
										current: false,
										href: null,
										onclick: null,
									},
									i
								);

								return new li({
									class: ["breadcrumb-item", i.current ? "active" : null],
									attr: { "aria-current": i.current ? "page" : null },
									elem: [
										i.current
											? new label(i.icon, i.label)
											: i.href
											? new a(new label(i.icon, i.label), i.href)
											: i.onclick
											? new button({ label: i.label, icon: i.icon, onclick: i.onclick })
											: new label(i.icon, i.label),
									],
								});
						  })
						: null
				),
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
