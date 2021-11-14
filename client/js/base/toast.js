"use strict";
import * as core from "./core.js";
import * as cl from "./cl.js";
import tag from "./tag.js";
import h from "./h.js";
import label from "./label.js";
import button from "./button.js";
import div from "./div.js";
import strong from "./strong.js";
import small from "./small.js";

export default class toast extends tag {
	_d = null;
	_n = null;
	_m = null;
	_s = null;

	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			if (arg.length === 1) {
				let t = arg[0];

				this.data = core.extend(
					{},
					{
						attr: null, //combine to container

						id: null,
						class: null,
						animate: true,
						title: null,
						icon: null,
						elem: null,
						close: true,
						autohide: true,
						delay: 5000,
						color: null,
						textcolor: null,
						date: new Date(),
						timer: true,
						position: "top-0 end-0",

						show: true, //preview only
					},
					t
				);
			} else {
				console.error("Unsupported argument", arg);
			}
		} else {
			this.data = null;
		}
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			//generate id
			d.id = d.id || core.UUID();

			//gen timer
			let tc = toast.timercounter(new Date(d.date));

			//generate header
			let ctlHeader = new div("toast-header", [
				new strong("me-auto", d.icon || d.title ? new label(d.icon, d.title) : " "),
				!d.autohide
					? new small({
							class: ["text-muted", "timer"],
							attr: {
								"data-cl-time": d.date,
								id: `${d.id}-timer`,
							},
							elem: tc ? tc.msg : "Just now", //need to add timer here
					  })
					: null,
				d.close
					? new button({
							class: "btn-close",
							attr: { "data-bs-dismiss": "modal", "aria-label": "Close" },
					  })
					: null,
			]);

			//generate body
			let ctlBody = new div("toast-body", d.elem);

			//combine header,body to div.toast
			this._d = {
				elem: new div({
					attr: {
						class: [
							"toast",
							!d.show ? "show" : null, //for preview perpose only
							d.color ? `bg-${d.color}` : null,
							d.textcolor ? `text-${d.textcolor}` : null,
						],
						id: d.id,
						tabindex: -1,
						"data-bs-animation": d.animate ? "true" : null,
						"data-bs-autohide": d.autohide ? "true" : "false",
						"data-bs-delay": d.delay,
						"data-cl-position": d.position
					},
					elem: [ctlHeader, ctlBody],
				}),
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
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
		let containerQuery = ["toast-container", this.data.dataset.clPosition].combine(" ");
		let container = document.body.getElementsByClassName(containerQuery)[0];
		if (!container || container.length === 0) {
			//build container
			cl.appendChild(
				document.body,
				new div({
					class: "position-relative",
					attr: {
						"aria-live": "polite",
						"aria-atomic": "true",
						zIndex: 1031,
					},
					elem: new div(["toast-container", "position-fixed", "p-3", this.data.dataset.clPosition], null),
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
					dom.remove();
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
}
