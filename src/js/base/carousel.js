"use strict";
import * as core from "./core.js";
import div from "./div.js";
import h from "./h.js";
import span from "./span.js";
import button from "./button.js";
import img from "./img.js";
import p from "./p.js";

const defaultOption = {
	control: false,
	touch: true,
	slide: true,
	fade: false,
	indicators: false,
	dark: false,

	item: null,

	slide: null,
	slid: null,
};

const defaultItemOption = {
	src: null,
	alt: null,
	caption: null,
	text: null,
	interval: 0,
};
/**
 * opt : {tagoption,control,touch,slide,fade,indicators,dark,item : {imgitem}}
 * imgitem : {tagoption,src,alt,caption,text,interval}
 */
export default class carousel extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			opt.id = opt.id || core.UUID();

			opt.item = opt.item ? (Array.isArray(opt.item) ? opt.item : [opt.item]) : null;

			let elem_indicator = null;
			if (opt.indicators) {
				elem_indicator = new div({
					class: "carousel-indicators",
					elem: opt.item?.map((i, ix) => {
						if (typeof i === "string") {
							i = {
								src: i,
							};
						}

						i = core.extend({}, defaultItemOption, i);

						return new button({
							class: ix === 0 ? "active" : null,
							"aria-current": ix === 0 ? "true" : null,
							"aria-label": i.caption ? i.caption : i.alt ? i.alt : `Slide ${ix + 1}`,
							"data-bs-slide-to": `${ix}`,
							"data-bs-target": `${opt.id}`,
						});
					}),
				});
			}

			let elem_prev_ctl = null;
			let elem_next_ctl = null;
			if (opt.control) {
				elem_prev_ctl = new button({
					class: "carousel-control-prev",
					"data-bs-target": `#${opt.id}`,
					"data-bs-slide": "prev",
					elem: [
						new span({ class: "carousel-control-prev-icon", "aria-hidden": "true" }),
						new span({ class: "visually-hidden", elem: "Previous" }),
					],
				});

				elem_next_ctl = new button({
					class: "carousel-control-next",
					"data-bs-target": `#${opt.id}`,
					"data-bs-slide": "next",
					elem: [
						new span({ class: "carousel-control-next-icon", "aria-hidden": "true" }),
						new span({ class: "visually-hidden", elem: "Next" }),
					],
				});
			}

			let elem_inner = new div({
				class: "carousel-inner",
				elem: opt.item?.map((i, ix) => {
					if (typeof i === "string") {
						i = {
							src: i,
						};
					}

					i = core.extend({}, defaultItemOption, i);

					i = core.merge(i, {
						class: ["carousel-item", ix === 0 ? "active" : null],
						"data-bs-interval": i.interval && opt.touch ? i.interval : null,
						elem: [
							new img({
								width: 100,
								display: "block",
								alt: i.alt ? i.alt : i.caption ? i.caption : null,
								src: i.src,
							}),
							i.caption || i.text
								? new div({
										display: ["none", "md-block"],
										class: "carousel-caption",
										elem: [
											i.caption ? new h({ level: 5, elem: i.caption }) : null,
											i.text ? new p(i.text) : null,
										],
								  })
								: null,
						],
					});

					delete i.src;
					delete i.alt;
					delete i.caption;
					delete i.text;
					delete i.interval;

					return new div(i);
				}),
			});

			opt = core.merge(opt, {
				class: [
					"carousel",
					opt.slide ? "slide" : null,
					opt.fade ? "carousel-fade" : null,
					opt.dark ? "carousel-dark" : null,
				],
				"data-bs-ride": "carousel",
				"data-bs-touch": !opt.touch ? "false" : null,
				"data-bs-interval": !opt.touch ? "false" : null,

				"slide.bs.carousel": opt.slide,
				"slid.bs.carousel": opt.slid,
				elem: [elem_indicator, elem_inner, elem_prev_ctl, elem_next_ctl],
			});

			delete opt.control;
			delete opt.touch;
			delete opt.slide;
			delete opt.fade;
			delete opt.indicators;
			delete opt.dark;

			delete opt.item;

			delete opt.slide;
			delete opt.slid;

			super.data = opt;
		}
	}
}
