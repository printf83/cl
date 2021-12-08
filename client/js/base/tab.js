"use strict";
import * as core from "./core.js";
import * as option from "./option.js";
import div from "./div.js";
import ul from "./ul.js";
import li from "./li.js";
import a from "./a.js";
import label from "./label.js";

const defaultOption = {
	type: "tab", //null|tab|pill
	headalign: null, //tab align
	size: null, //need to set for vertical. only used if has body
	animated: true,
	flush: false,

	item: [],
};
/**
 * opt:{tagoption,type,headalign,size,animated,flush,item:{tabitem}}
 * tabitem : {id,label,icon,hidelabel,disable,active,option,elem}
 */

export default class tab extends div {
	cltab = 1;

	constructor(opt) {
		super(core.extend({}, defaultOption, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			//check if item isnot array
			opt.item = opt.item ? (Array.isArray(opt.item) ? opt.item : [opt.item]) : null;

			//check if any item active
			let activeitem = opt.item.find((i) => {
				return i.active === true;
			});

			if (!activeitem && typeof opt.item[0] === "object") {
				opt.item[0].active = true;
			}

			//auto size if vertical headalign
			if (!opt.size && (opt.headalign === "vertical" || opt.headalign === "vertical-right")) {
				opt.size = "col-sm-12 col-md-6 col-lg-4";
			}

			//start make item
			var headerItem = [];
			var bodyItem = [];

			opt.item.forEach((i, x) => {
				if (typeof i === "string") {
					if (x === 0) {
						i = { label: i, active: true };
					} else {
						i = { label: i };
					}
				}

				i = core.extend(
					{},
					{
						id: null,
						label: null,
						icon: null,
						hidelabel: false,
						disable: false,
						active: false,
						option: null,
						elem: null,
					},
					i
				);

				//create id for tab elem
				i.id = i.id ? i.id : i.elem ? core.UUID() : null;

				//make header
				headerItem.push(
					new li({
						class: ["nav-item", i.option ? "dropdown" : null],
						attr: {
							role: "tab",
						},
						elem: [
							new a({
								class: [
									"nav-link",
									i.option ? "dropdown-toggle" : null,
									i.active ? "active" : null,
									i.disabled ? "disabled" : null,
								],
								href: `#${i.id}-body`,
								id: `${i.id}-head`,
								attr: {
									"data-bs-toggle": i.option
										? "dropdown"
										: opt.type === "tab"
										? "tab"
										: opt.type === "pill"
										? "pill"
										: "tab",
									"aria-controls": `${i.id}-body`,
									role: i.option ? "button" : null,
								},
								elem: new label({
									label: i.label,
									icon: i.icon,
									hidelabel: i.hidelabel,
								}),
							}),
							i.option
								? new ul({
										class: "dropdown-menu",
										elem: new option.dropdown({
											item: i.option,
										}),
								  })
								: null,
						],
					})
				);

				//make body
				if (i.elem) {
					bodyItem.push(
						new div({
							class: ["tab-pane", opt.animated ? "fade" : null, i.active ? "active show" : null],
							id: `${i.id}-body`,
							attr: {
								role: "tabpanel",
								"aria-labelledby": `${i.id}-head`,
							},
							elem: i.elem,
						})
					);
				}
			});

			//wrap headerItem in ul.nav
			let headerCtl = new ul({
				class: [
					"nav",
					//card-header-tabs if has body (will wrap in card)
					bodyItem && bodyItem.length > 0
						? opt.type === "tab"
							? "card-" + (opt.headalign === "vertical-right" ? "footer" : "header") + "-tabs"
							: opt.type === "pill"
							? "card-" + (opt.headalign === "vertical-right" ? "footer" : "header") + "-pills"
							: "card-" + (opt.headalign === "vertical-right" ? "footer" : "header") + "-tabs"
						: null,
					opt.column ? "flex-column mb-auto" : null,
					opt.flush ? "nav-flush" : null,
					opt.type === "tab" ? "nav-tabs" : opt.type === "pill" ? "nav-pills" : null,
					opt.headalign === "right"
						? "justify-content-end"
						: opt.headalign === "center"
						? "justify-content-center"
						: opt.headalign === "vertical" || opt.headalign === "vertical-right"
						? "flex-column mb-auto"
						: opt.headalign === "fill"
						? "nav-fill"
						: null,
				],
				id: opt.id ? `${opt.id}-head` : null,
				attr: {
					role: "tablist",
				},
				elem: headerItem,
			});

			let bodyCtl =
				bodyItem && bodyItem.length > 0
					? new div({
							class: "tab-content",
							id: opt.id ? `${opt.id}-body` : null,
							elem: bodyItem,
					  })
					: null;

			if (bodyCtl) {
				opt.class = core.merge.class(opt.class, "card");
				opt.padding = 0;
				opt.elem = opt.size
					? opt.headalign === "vertical-right"
						? [
								new div({
									row: true,
									gap: 0,
									elem: [
										new div({
											col: true,
											elem: new div({ class: "card-body", elem: bodyCtl }),
										}),
										new div({
											class: [opt.size, "card-footer"],
											border: false,
											padding: 2,
											elem: headerCtl,
										}),
									],
								}),
						  ]
						: [
								new div({
									class: "row g-0",
									elem: [
										new div({ class: [opt.size, "card-header"], border: false, elem: headerCtl }),
										new div({
											col: true,
											elem: new div({ class: "card-body", elem: bodyCtl }),
										}),
									],
								}),
						  ]
					: [
							new div({ class: "card-header", elem: headerCtl }),
							new div({ class: "card-body", elem: bodyCtl }),
					  ];
			} else {
				opt.elem = headerCtl.data;
			}

			delete opt.item;
			delete opt.type;
			delete opt.headalign;
			delete opt.size;
			delete opt.animated;
			delete opt.flush;

			super.data = opt;
		}
	}
}
