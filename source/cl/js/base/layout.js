"use strict";
import * as core from "./core.js";
import div from "./div.js";
import button from "./button.js";

const l1Option = {
	topid: null,
	leftid: null,
	rightid: null,
	mainid: null,
	footerid: null,

	topelem: null,
	leftelem: null,
	rightelem: null,
	mainelem: null,
	footerelem: null,

	backtotop: true,
};
/**
 * opt : {tagoption,icon,color,elem,close}
 */
export class l1 extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, l1Option, opt);

			opt.elem = [
				new div({
					id: opt.topid,
					elem: opt.topelem,
				}),
				new div({
					class: "container-lg",
					paddingTop: 3,
					elem: new div({
						row: true,
						elem: [
							new div({
								col: [true, 12, "md-3", "xl-2"],
								elem: new div({
									id: opt.leftid,
									class: ["sticky-md-top"],
									display: "md-block",
									marginTop: 3,
									overflow: "auto",
									zIndex: 0,
									elem: opt.leftelem,
								}),
							}),
							new div({
								col: [true, 12, "md-9", "xl-10"],
								elem: new div({
									row: true,
									elem: [
										new div({
											col: [true, 12, "xl-10"],
											order: [2, "xl-1"],
											elem: [
												new div({
													id: opt.mainid,
													elem: opt.mainelem,
												}),
												new div({
													id: opt.footerid,
													elem: opt.footerelem,
												}),
											],
										}),

										new div({
											col: [true, 12, "xl-2"],
											order: [1, "xl-2"],
											elem: new div({
												id: opt.rightid,
												class: "sticky-lg-top",
												overflow: "auto",
												marginTop: 3,
												zIndex: 0,
												elem: opt.rightelem,
											}),
										}),
									],
								}),
							}),
						],
					}),
				}),
				opt.backtotop
					? new div({
							class: "fixed-bottom bottom-0 end-0 start-100",
							bottom: 0,
							end: 0,
							start: 100,
							elem: new div({
								class: "float-end",
								paddingBottom: 3,
								paddingEnd: 3,
								elem: new button({
									floating: true,
									color: "danger",
									weight: "lg",
									rounded: "circle",
									label: "Back to top",
									hidelabel: true,
									icon: { icon: "arrow-up", fixwidth: false },
									"data-mainid": opt.mainid,
									click: (event) => {
										let sender = event.currentTarget;
										document
											.getElementById(sender.getAttribute("data-mainid"))
											.scrollIntoView({ behavior: "smooth", block: "start" });
									},
								}),
							}),
					  })
					: null,
			];

			delete opt.topid;
			delete opt.leftid;
			delete opt.rightid;
			delete opt.mainid;
			delete opt.footerid;

			delete opt.topelem;
			delete opt.leftelem;
			delete opt.rightelem;
			delete opt.mainelem;
			delete opt.footerelem;

			delete opt.backtotop;

			super.data = opt;
		}
	}
}
