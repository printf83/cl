"use strict";
import * as core from "./core.js";
import div from "./div.js";
import h from "./h.js";
import span from "./span.js";
import button from "./button.js";
import img from "./img.js";

/**
 * opt : {tagoption,control,touch,slide,fade,indicators,dark,item : {imgitem}}
 * imgitem : {tagoption,src,alt,caption,text,interval}
 */
export default class carousel extends div {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					control: true,
					touch: true,
					slide: true,
					fade: false,
					indicators: true,
					dark: false,
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
			const itemOption = {
				src: null,
				alt: null,
				caption: null,
				text: null,
				interval: 0,
			};

			opt.item = Array.isArray(opt.item) ? opt.item : [opt.item];

			opt.class = core.merge.class(opt.class, [
				"carousel",
				opt.slide ? "slide" : null,
				opt.fade ? "carousel-fade" : null,
				opt.dark ? "carousel-dark" : null,
			]);

			opt.attr = core.merge.attr(opt.attr, {
				"data-bs-ride": "carousel",
				"data-bs-touch": !opt.touch ? "false" : null,
				"data-bs-interval": !opt.touch ? "false" : null,
			});

			opt.elem = [
				opt.indicators
					? new div({
							class: "carousel-indicators",
							elem: opt.item.map(function (i, ix) {
								if (typeof i === "string") {
									i = {
										src: i,
									};
								}

								i = core.extend({}, itemOption, i);

								return new button({
									class: ix === 0 ? "active" : null,
									attr: {
										"aria-current": ix === 0 ? "true" : null,
										"aria-label": i.caption ? i.caption : i.alt ? i.alt : `Slide ${ix + 1}`,
										"data-bs-slide-to": `${ix}`,
										"data-bs-target": `${opt.id}`,
									},
								});
							}),
					  })
					: null,
				new div({
					class: "carousel-inner",
					elem: opt.item.map(function (i, ix) {
						if (typeof i === "string") {
							i = {
								src: i,
							};
						}

						i = core.extend({}, itemOption, i);

						return new div({
							class: ["carousel-item", ix === 0 ? "active" : null],
							attr: {
								"data-bs-interval": i.interval && opt.touch ? i.interval : null,
							},
							elem: [
								new img({
									class: "w-100",
									display: "block",
									alt: i.alt ? i.alt : i.caption ? i.caption : null,
									src: i.src,
								}),
								i.caption || i.text
									? new div({
											display: ["none", "md-block"],
											class: "carousel-caption",
											elem: [
												i.caption ? new h(5, { elem: i.caption }) : null,
												i.text ? new p({ elem: i.text }) : null,
											],
									  })
									: null,
							],
						});
					}),
				}),

				opt.control
					? new button({
							class: "carousel-control-prev",
							attr: {
								"data-bs-target": `#${opt.id}`,
								"data-bs-slide": "prev",
							},
							elem: [
								new span({ class: "carousel-control-prev-icon", attr: { "aria-hidden": "true" } }),
								new span({ class: "visually-hidden", elem: "Previous" }),
							],
					  })
					: null,
				opt.control
					? new button({
							class: "carousel-control-next",
							attr: {
								"data-bs-target": `#${opt.id}`,
								"data-bs-slide": "next",
							},
							elem: [
								new span({ class: "carousel-control-next-icon", attr: { "aria-hidden": "true" } }),
								new span({ class: "visually-hidden", elem: "Next" }),
							],
					  })
					: null,
			];

			delete opt.control;
			delete opt.touch;
			delete opt.slide;
			delete opt.fade;
			delete opt.indicators;
			delete opt.dark;
			delete opt.item;

			super.data = opt;
		}
	}
}
