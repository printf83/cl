"use strict";
import * as core from "./core.js";
import label from "./label.js";
import msg from "./msg.js";
import div from "./div.js";
import strong from "./strong.js";
import small from "./small.js";
import btnclose from "./btnclose.js";

const defaultOption = {
	animate: true,

	title: null,
	icon: null,

	close: true,
	autohide: true,
	delay: 5000,
	date: null,
	timer: true,
	position: "top-0 end-0",

	elem: null,

	debug: false,
};
/**g
 * icon,msg
 * opt : {attr,id,class,animate,title,icon,elem,close,autohide,delay,color,textColor,borderColor,border,date,timer,position,debug}
 */

export default class toast extends div {
	_bs = null;
	_tmr = null;

	constructor(...opt) {
		super();

		this.data = core.args(
			[
				{
					rule: ["string", "string|string[]|cl|cl[]", "debug"],
					fn: () => {
						let bI = core.getBaseIcon(opt[0]);

						if (bI) {
							return {
								color: bI.color,
								elem: new msg({
									weight: "sm",
									icon: {
										icon: bI.icon,
										type: bI.type,
									},
									elem: opt[1],
								}),
								debug: true,
							};
						} else {
							return {
								color: opt[0],
								elem: typeof opt[1] === "string" ? new msg({ weight: "sm", elem: opt[1] }) : opt[1],
								debug: true,
							};
						}
					},
				},
				{
					rule: ["string", "string|string[]|cl|cl[]"],
					fn: () => {
						let bI = core.getBaseIcon(opt[0]);

						if (bI) {
							return {
								color: bI.color,
								elem: new msg({
									weight: "sm",
									icon: {
										icon: bI.icon,
										type: bI.type,
									},
									elem: opt[1],
								}),
							};
						} else {
							return {
								color: opt[0],
								elem: typeof opt[1] === "string" ? new msg({ weight: "sm", elem: opt[1] }) : opt[1],
							};
						}
					},
				},
				{
					rule: ["string|string[]"],
					fn: () => {
						return {
							elem: new msg({ weight: "sm", elem: opt[0] }),
						};
					},
				},
				{
					rule: ["cl|cl[]"],
					fn: () => {
						return {
							elem: opt[0],
						};
					},
				},
				{
					rule: ["object|debug"],
					fn: () => {
						return opt[0];
					},
				},
			],
			"toast",
			opt
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			let bI = core.getBaseIcon(opt.icon);
			if (bI) {
				opt.icon = bI.icon;
				opt.color = opt.color || bI.color;
			}

			//generate date
			opt.date = opt.date || new Date();

			//generate id
			opt.id = opt.id || core.UUID();

			//gen timer
			let tc = this.timercounter(new Date(opt.date));

			//set default icon if not provided
			if (opt.icon === undefined) {
				opt.icon = core.setting.icon();
			}

			//set default title if not provided
			if (opt.title === undefined) {
				opt.title = core.setting.title();
			}

			//generate header
			let ctlHeader =
				opt.icon || opt.title
					? new div({
							class: "toast-header",
							elem: [
								new strong({ class: "me-auto", elem: new label({ icon: opt.icon, label: opt.title }) }),
								!opt.autohide
									? new small({
											id: `${opt.id}-timer`,
											class: ["text-muted", "timer"],
											"data-cl-time": opt.date,
											elem: tc ? tc.msg : "Just now", //need to add timer here
									  })
									: null,
								opt.close
									? new btnclose({
											dismiss: "toast",
									  })
									: null,
							],
					  })
					: null;

			//generate body
			let ctlBody = new div({
				class: "toast-body",
				elem: new div({
					display: "flex",
					alignItem: "stretch",
					elem: [
						new div({
							marginEnd: "auto",
							display: "flex",
							alignItem: "center",
							elem: opt.elem,
						}),
						!(opt.icon || opt.title) && opt.close
							? new div({
									marginStart: 2,
									elem: new btnclose({
										dismiss: "toast",
										// marginY: 1,
									}),
							  })
							: null,
					],
				}),
			});

			opt = core.merge(opt, {
				class: ["toast", opt.debug ? "show" : null],
				tabindex: -1,
				bgColor: opt.color,
				textBgColor: opt.color,
				"data-bs-animation": opt.animate ? "true" : null,
				"data-bs-autohide": opt.autohide ? "true" : "false",
				"data-bs-delay": opt.delay,
				"data-cl-position": opt.position,
				elem: [ctlHeader, ctlBody],
			});

			delete opt.animate;
			delete opt.title;
			delete opt.icon;
			delete opt.close;
			delete opt.autohide;
			delete opt.delay;
			delete opt.date;
			delete opt.timer;
			delete opt.position;
			delete opt.debug;

			super.data = opt;
		}
	}

	get bs() {
		return this._bs;
	}
	set bs(d) {
		this._bs = d;
	}

	get tmr() {
		return this._tmr;
	}

	set tmr(elem) {
		this._tmr = elem;
	}

	show = () => {
		//generate container
		let position = this.data["data-cl-position"];
		let containerQuery = core.combineArray(["toast-container", position], " ");
		let container = document.body.getElementsByClassName(containerQuery)[0];
		if (!container || container.length === 0) {
			//build container
			core.appendChild(
				document.body,
				new div({
					position: "absolute",
					"aria-live": "polite",
					"aria-atomic": "true",
					zIndex: 3,
					elem: new div({ class: ["toast-container", position], position: "fixed", padding: 3 }),
				})
			);

			//set container
			container = document.body.getElementsByClassName(containerQuery)[0];
		}

		//add into document
		core.appendChild(container, this);
		this.bs = new bootstrap.Toast(this.dom);

		this.tmr = this.dom.getElementsByClassName("timer")[0];
		if (this.tmr) this.timer();

		let fn_shown = (event) => {
			core.init(event.currentTarget);
		};

		let fn_hidden = (event) => {
			let dom = event.currentTarget;
			core.removeElement(dom);
		};

		//set init
		this.dom.addEventListener("shown.bs.toast", fn_shown, false);

		//set destroy after hide
		this.dom.addEventListener("hidden.bs.toast", fn_hidden, false);

		//setup eventlistenerremover
		core.setupEventListenerRemover("toast", this.dom, () => {
			core.deleteEventListener("toast", this.dom, () => {
				this.dom.removeEventListener("shown.bs.toast", fn_shown, false);
				this.dom.removeEventListener("hidden.bs.toast", fn_hidden, false);
				this.bs.dispose();
				this.tmr = null;
				this.bs = null;
				this.dom = null;
			});
		});

		this.bs.show();
	};

	timercounter(datevalue) {
		var t1 = new Date();
		var t2 = datevalue;
		var next = -1;
		var msg = `Just now`;

		if (t1 > t2) {
			var diff = t1.getTime() - t2.getTime();
			var sec = parseInt(diff / 1000, 10);

			if (sec < 1) {
				next = 1000;
				msg = `Just now`;
			} else if (sec >= 1 && sec < 60) {
				//second
				next = 1000;
				msg = `${sec} second${sec > 1 ? "s" : ""} ago`;
			} else if (sec >= 60 && sec < 3600) {
				//minute
				next = 60000;
				let t = parseInt(sec / 60, 10);
				msg = `${t} minute${t > 1 ? "s" : ""} ago`;
			} else if (sec >= 3600 && sec < 86400) {
				//hour
				next = 3600000;
				let t = parseInt(sec / 3600, 10);
				msg = `${t} hour${t > 1 ? "s" : ""} ago`;
			} else {
				//do not on timer
				next = -1;
				let t = parseInt(sec / 86400, 10);
				msg = `${t} day${t > 1 ? "s" : ""} ago`;
			}
		}

		return {
			next: next,
			msg: msg,
		};
	}

	timer() {
		//set "justtime timer"

		if (this.tmr) {
			let tc = this.timercounter(new Date(this.tmr.dataset.clTime));
			if (tc) {
				this.tmr.innerHTML = tc.msg;
				if (tc.next > 0) {
					setTimeout(() => {
						this.timer();
					}, tc.next);
				}
			}
		} else {
			if (core.setting.DEBUG) console.log(`Toast timer stop`);
		}
	}

	static hide(element) {
		let bs = bootstrap.Toast.getInstance(element);
		bs?.hide();
	}
}
