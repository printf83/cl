"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import li from "./li.js";
import a from "./a.js";
import ul from "./ul.js";
import icon from "./icon.js";
/**
 * [item:{title,icon,divider,label,href,onclick}]
 * opt : {attr,id,class,style,item,divider}
 */

function pagingonchange(sender, page) {
	console.log(page);
}

export default class paging extends tag {
	_d = null;

	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			this.data = core.extend(
				{},
				{
					attr: null,

					id: null,
					class: null,
					style: null,

					total: 0,
					skip: 0,
					limit: 0,
					max: 5,
					weight: null,
					align: "center", //start|end|center(default)
					overflow: true,
					onchange: null,
					firstlast: true,
					nextprev: true,
					labelfirst: null,
					labellast: null,
					labelnext: null,
					labelprev: null,
				},
				arg[0]
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
			let curpage = d.skip / d.limit + 1;
			let btncount = parseInt(d.total / d.limit, 10) + (d.total % d.limit > 0 ? 1 : 0);

			//generate id
			// d.id = d.id ? d.id : ns.core.UUID();

			if (d.total > d.limit) {
				let item = [];

				//first
				if (d.firstlast) {
					item.push(
						new li({
							class: ["page-item", curpage > 1 ? null : "disabled"],
							elem: new a({
								class: "page-link",
								attr: {
									tabindex: curpage > 1 ? null : "-1",
									"aria-disabled": curpage > 1 ? null : true,
									"aria-label": "First Page",
									onclick: function (sender) {
										pagingonchange(sender.currentTarget, 0);
									},
								},
								elem: d.labelfirst ? d.labelfirst : new icon("angle-double-left"),
							}),
						})
					);
				}

				//prev
				if (d.nextprev) {
					item.push(
						new li({
							class: ["page-item", curpage > 1 ? null : "disabled"],
							elem: new a({
								class: "page-link",
								attr: {
									tabindex: curpage > 1 ? null : "-1",
									"aria-disabled": curpage > 1 ? null : true,
									"aria-label": "Previous Page",
									onclick: function (sender) {
										pagingonchange(sender.currentTarget, (curpage - 2) * d.limit);
									},
								},
								elem: d.labelprev ? d.labelprev : new icon("angle-left"),
							}),
						})
					);
				}

				//page
				var x = 1;
				var y = btncount;
				var c = curpage;
				if (d.max > btncount) {
					d.max = btncount;
				}

				if (d.max < 3) {
					d.max = 3;
				}

				if (d.max % 2 === 0) {
					d.max = d.max + 1;
				}

				//limit button
				if (y > d.max) {
					//example for 10

					//x,2,3,4,5
					//1,x,3,4,5
					//1,2,x,4,5

					//2,3,x,5,6
					//3,4,x,6,7
					//4,5,x,7,8
					//5,6,x,8,9
					//6,7,x,9,10

					//6,7,8,x,10
					//6,7,8,9,x
					var md = parseInt(d.max / 2, 10) + 1;

					x = c - md + 1;
					y = c + md - 1;

					if (x < 1) {
						x = 1;
						y = d.max;
					}

					if (y > btncount) {
						y = btncount;
						x = y - d.max + 1;
					}

					if (x < 1) {
						x = 1;
					}
				}

				//build middle button
				for (x; x <= y; x++) {
					item.push(
						new li({
							class: ["page-item", x === c ? "active" : null],
							elem: new a({
								class: "page-link",
								attr: {
									"aria-label": `Page ${x.toString()}`,
									onclick: function (sender) {
										let xnum = parseInt(sender.currentTarget.innerText, 10);
										pagingonchange(sender.currentTarget, (xnum - 1) * d.limit);
									},
								},
								elem: x.toString(),
							}),
						})
					);
				}

				//next
				if (d.nextprev) {
					item.push(
						new li({
							class: ["page-item", curpage < btncount ? null : "disabled"],
							elem: new a({
								class: "page-link",
								attr: {
									tabindex: curpage < btncount ? null : "-1",
									"aria-disabled": curpage > 1 ? null : true,
									"aria-label": "Next Page",
									onclick: function (sender) {
										pagingonchange(sender.currentTarget, curpage * d.limit);
									},
								},
								elem: d.labelnext ? d.labelnext : new icon("angle-right"),
							}),
						})
					);
				}

				//last
				if (d.firstlast) {
					item.push(
						new li({
							class: ["page-item", curpage < btncount ? null : "disabled"],
							elem: new a({
								class: "page-link",
								attr: {
									tabindex: curpage < btncount ? null : "-1",
									"aria-disabled": curpage > 1 ? null : true,
									"aria-label": "Last Page",
									onclick: function (sender) {
										pagingonchange(sender.currentTarget, (btncount - 1) * d.limit);
									},
								},
								elem: d.labellast ? d.labellast : new icon("angle-double-right"),
							}),
						})
					);
				}

				//save in memory
				//ns.data.set(d.id, d);
				this._d = {
					tag: "div",
					attr: {
						id: d.id,
						class: [
							"d-flex",
							"p-1",
							"ns-list-page",
							d.align ? "justify-content-" + d.align : null,
							d.overflow ? "overflow-auto" : null,
						],
					},
					elem: new ul(
						["pagination", d.weight ? `pagination-${d.weight}` : null, d.overflow ? "mx-5" : null],
						item
					),
				};
			}
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
