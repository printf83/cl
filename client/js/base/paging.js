"use strict";
import * as core from "./core.js";
import * as cl from "./cl.js";
import div from "./div.js";
import li from "./li.js";
import a from "./a.js";
import ul from "./ul.js";
import icon from "./icon.js";

const defaultOption = {
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
};
/**
 * [item:{title,icon,divider,label,href,onclick}]
 * opt : {attr,id,class,style,item,divider}
 */

function pagingonchange(sender, data) {
	let container = sender.closest(".cl-paging");
	let ulcontainer = container.firstChild;
	var event = new CustomEvent("change", {
		currentTarget: sender,
		detail: {
			total: data.total,
			skip: data.skip,
			limit: data.limit,
			max: data.max,
		},
	});

	ulcontainer.dispatchEvent(event);

	cl.replaceWith(container, new paging(data));
}

export default class paging extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);
			let data = core.extend({}, opt);

			let curpage = opt.skip / opt.limit + 1;
			let btncount = parseInt(opt.total / opt.limit, 10) + (opt.total % opt.limit > 0 ? 1 : 0);

			if (opt.total > opt.limit) {
				let item = [];

				//first
				if (opt.firstlast) {
					item.push(
						new li({
							class: ["page-item", curpage > 1 ? null : "disabled"],
							elem: new a({
								class: "page-link",
								attr: {
									tabindex: curpage > 1 ? null : "-1",
									"aria-disabled": curpage > 1 ? null : true,
									"aria-label": "First Page",
								},
								href: "javascript:void(0)",
								onclick: function (sender) {
									data.skip = 0;
									pagingonchange(sender.currentTarget, data);
								},
								elem: opt.labelfirst
									? opt.labelfirst
									: new icon({ type: "fas", icon: "angle-double-left" }),
							}),
						})
					);
				}

				//prev
				if (opt.nextprev) {
					item.push(
						new li({
							class: ["page-item", curpage > 1 ? null : "disabled"],
							elem: new a({
								class: "page-link",
								attr: {
									tabindex: curpage > 1 ? null : "-1",
									"aria-disabled": curpage > 1 ? null : true,
									"aria-label": "Previous Page",
								},
								href: "javascript:void(0)",
								onclick: function (sender) {
									data.skip = (curpage - 2) * data.limit;
									pagingonchange(sender.currentTarget, data);
								},
								elem: opt.labelprev ? opt.labelprev : new icon({ type: "fas", icon: "angle-left" }),
							}),
						})
					);
				}

				//page
				var x = 1;
				var y = btncount;
				var c = curpage;
				if (opt.max > btncount) {
					opt.max = btncount;
				}

				if (opt.max < 3) {
					opt.max = 3;
				}

				if (opt.max % 2 === 0) {
					opt.max = opt.max + 1;
				}

				//limit button
				if (y > opt.max) {
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
					var md = parseInt(opt.max / 2, 10) + 1;

					x = c - md + 1;
					y = c + md - 1;

					if (x < 1) {
						x = 1;
						y = opt.max;
					}

					if (y > btncount) {
						y = btncount;
						x = y - opt.max + 1;
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
								},
								href: "javascript:void(0)",
								onclick: function (sender) {
									let xnum = parseInt(sender.currentTarget.innerText, 10);
									data.skip = (xnum - 1) * data.limit;
									pagingonchange(sender.currentTarget, data);
								},
								elem: x.toString(),
							}),
						})
					);
				}

				//next
				if (opt.nextprev) {
					item.push(
						new li({
							class: ["page-item", curpage < btncount ? null : "disabled"],
							elem: new a({
								class: "page-link",
								attr: {
									tabindex: curpage < btncount ? null : "-1",
									"aria-disabled": curpage > 1 ? null : true,
									"aria-label": "Next Page",
								},
								href: "javascript:void(0)",
								onclick: function (sender) {
									data.skip = curpage * data.limit;
									pagingonchange(sender.currentTarget, data);
								},
								elem: opt.labelnext ? opt.labelnext : new icon({ type: "fas", icon: "angle-right" }),
							}),
						})
					);
				}

				//last
				if (opt.firstlast) {
					item.push(
						new li({
							class: ["page-item", curpage < btncount ? null : "disabled"],
							elem: new a({
								class: "page-link",
								attr: {
									tabindex: curpage < btncount ? null : "-1",
									"aria-disabled": curpage > 1 ? null : true,
									"aria-label": "Last Page",
								},
								href: "javascript:void(0)",
								onclick: function (sender) {
									data.skip = (btncount - 1) * data.limit;
									pagingonchange(sender.currentTarget, data);
								},
								elem: opt.labellast
									? opt.labellast
									: new icon({ type: "fas", icon: "angle-double-right" }),
							}),
						})
					);
				}

				opt.class = core.merge.class(opt.class, ["pagination", opt.weight ? `pagination-${opt.weight}` : null]);
				opt.elem = item;

				delete opt.total;
				delete opt.skip;
				delete opt.limit;
				delete opt.max;
				delete opt.weight;
				delete opt.firstlast;
				delete opt.nextprev;
				delete opt.labelfirst;
				delete opt.labellast;
				delete opt.labelnext;
				delete opt.labelprev;

				super.data = {
					display: "flex",
					padding: 3,
					overflow: opt.overflow ? "auto" : null,
					justifyContent: opt.align ? opt.align : null,
					class: "cl-paging",
					elem: new ul(opt),
				};

				delete opt.align;
				delete opt.overflow;
			}
		}
	}
}
