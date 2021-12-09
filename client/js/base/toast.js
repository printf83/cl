"use strict";
import * as core from "./core.js";
import * as cl from "./cl.js";
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
	date: new Date(),
	timer: true,
	position: "top-0 end-0",

	elem: null,

	debug: false,
};
/**
 * color,textcolor,icon,msg
 * color,icon,msg
 * color,msg
 * color,[elem]
 * color,elem
 * elem
 * [elem]
 * msg
 * opt : {attr,id,class,animate,title,icon,elem,close,autohide,delay,color,textcolor,bordercolor,border,date,timer,position,debug}
 */

export default class toast extends div {
	_n = null;
	_m = null;

	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				textcolor: null,
				color: null,
				elem: null,
			};
			if (arg.length === 4) {
				t.color = arg[0];
				t.textcolor = arg[1];
				t.elem = new msg({ weight: "sm", icon: arg[2], elem: arg[3] });
			} else if (arg.length === 3) {
				t.color = arg[0];
				t.elem = new msg({ weight: "sm", icon: arg[1], elem: arg[2] });
			} else if (arg.length === 2) {
				let bI = core.getBaseIcon(arg[0]);
				if (bI) {
					t.color = bI.color;
					t.textcolor = bI.textcolor;
					t.elem = new msg({
						weight: "sm",
						icon: {
							icon: bI.icon,
							type: bI.type,
						},
						elem: arg[1],
					});
				} else {
					t.color = arg[0];
					if (typeof arg[1] === "string") {
						t.elem = new msg({ weight: "sm", elem: arg[1] });
					} else {
						t.elem = arg[1];
					}
				}
			} else if (arg.length === 1) {
				if (typeof arg[0] === "string") {
					t.elem = new msg({ weight: "sm", elem: arg[0] });
				} else if (Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl")) {
					t.elem = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend({}, defaultOption, t);
		} else {
			this.data = null;
		}
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
				opt.textcolor = opt.textcolor || bI.textcolor;
			}

			//generate id
			opt.id = opt.id || core.UUID();

			//gen timer
			let tc = toast.timercounter(new Date(opt.date));

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
											attr: {
												"data-cl-time": opt.date,
											},
											elem: tc ? tc.msg : "Just now", //need to add timer here
									  })
									: null,
								opt.close ? new btnclose({ dismiss: "toast" }) : null,
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
						new div({ marginEnd: "auto", elem: opt.elem }),
						!(opt.icon || opt.title) && opt.close
							? new div({
									marginStart: 2,
									elem: new btnclose({
										dismiss: "toast",
										dark: opt.textcolor
											? !(opt.textcolor === "light" || opt.textcolor === "white")
											: true,
										marginY: 1,
									}),
							  })
							: null,
					],
				}),
			});

			opt.class = core.merge.class(opt.class, ["toast", opt.debug ? "show" : null]);
			opt.attr = core.merge.attr(opt.attr, {
				tabindex: -1,
				"data-bs-animation": opt.animate ? "true" : null,
				"data-bs-autohide": opt.autohide ? "true" : "false",
				"data-bs-delay": opt.delay,
				"data-cl-position": opt.position,
			});
			opt.elem = [ctlHeader, ctlBody];

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

	get dom() {
		return this._n;
	}
	set dom(d) {
		this._n = d;
	}

	get tst() {
		return this._m;
	}
	set tst(d) {
		this._m = d;
	}

	show = function () {
		//generate container
		let position = this.data.attr["data-cl-position"];
		let containerQuery = core.combineArray(["toast-container", position], " ");
		let container = document.body.getElementsByClassName(containerQuery)[0];
		if (!container || container.length === 0) {
			//build container
			cl.appendChild(
				document.body,
				new div({
					class: "position-absolute",
					attr: {
						"aria-live": "polite",
						"aria-atomic": "true",
					},
					style: { "z-index": 2 },
					elem: new div({ class: ["toast-container", "position-fixed", "p-3", position] }),
				})
			);

			//set container
			container = document.body.getElementsByClassName(containerQuery)[0];
		}

		//add into document
		this.dom = cl.appendChild(container, this);
		this.tst = new bootstrap.Toast(this.dom);

		toast.timer(this.dom.getElementsByClassName("timer")[0]);

		//set destroy after hide
		this.dom.addEventListener("hidden.bs.toast", function (event) {
			let dom = event.currentTarget;
			let tst = bootstrap.Toast.getInstance(dom);

			setTimeout(
				function (dom, tst) {
					//tst.destroy();
					cl.removeElement(dom);

					this.tst = null;
					this.dom = null;
				},
				300,
				dom,
				tst
			);
		});

		this.tst.show();
	};

	static timercounter(datevalue) {
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

	static timer(elem) {
		//set "justtime timer"
		if (elem) {
			let tc = toast.timercounter(new Date(elem.dataset.clTime));
			if (tc) {
				elem.innerHTML = tc.msg;
				if (tc.next > 0) {
					setTimeout(
						function (elem) {
							toast.timer(elem);
						},
						tc.next,
						elem
					);
				}
			}
		}
	}

	static hide(element) {
		let tst = bootstrap.Toast.getInstance(element);
		tst.hide();
	}
}
