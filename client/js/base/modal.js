"use strict";
import * as core from "./core.js";
import * as cl from "./cl.js";
import tag from "./tag.js";
import h from "./h.js";
import label from "./label.js";
import button from "./button.js";
import div from "./div.js";

export default class modal extends tag {
	_d = null;
	_n = null;
	_m = null;

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
						static: true,
						title: null,
						icon: null,
						footer: null,
						button: null,
						animate: true,
						show: false,
						scrollable: true,
						center: true,
						size: null,
						fullscreen: false,
						focus: true,

						elem: null,
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

			//generate header
			let ctlHeader = new div("modal-header", [
				new h(5, "modal-title", new label(d.icon, d.title)),
				new button({ class: "btn-close", attr: { "data-bs-dismiss": "modal", "aria-label": "Close" } }),
			]);

			//check if first elem is tab
			let hastab = d.elem
				? Array.isArray(d.elem)
					? d.elem[0].hasOwnProperty("cltab")
					: d.elem.hasOwnProperty("cltab")
				: false;

			//generate body
			let ctlBody = new div(["modal-body", hastab ? "p-0" : null], d.elem);

			//generate control
			let ctlControl = new div(["footer-ctl", "float-start"], d.footer);

			//generate button
			let ctlButton = null;
			if (d.button) {
				if (!Array.isArray(d.button)) {
					d.button = [d.button];
				}

				ctlButton = new div(
					"justify-content-end",
					d.button
						.map(function (j, ix) {
							if (j.hasOwnProperty("cl")) {
								return j;
							} else {
								let i = {
									id: null,
									label: null,
									icon: null,
									color: null,
									class: null,
									onclick: null,
								};

								//support string and object
								if (typeof j === "string") {
									i.label = j;
								} else {
									i = j;
								}

								i = core.extend(
									{},
									{
										id: i.id ? i.id : `${d.id}-btn-${ix}`,
										class: i.class,
										onclick: i.onclick,

										color: i.color,
										label: i.label,
										icon: i.icon,
									},
									i
								);

								return new button({
									id: i.id,
									label: i.label,
									icon: i.icon,
									class: core.merge.class(i.class, ["ms-2", "btn-modal"]),
									color: i.color ? i.color : ix === 0 ? "primary" : "text-secondary",
									onclick: function (event) {
										let result =
											i.onclick instanceof Function ? i.onclick(event.currentTarget) : true;
										if (result !== false) {
											//find parent and close
											modal.hide(event.currentTarget.closest(".modal"));
											// let dom = event.currentTarget.closest(".modal");
											// let mdl = bootstrap.Modal.getInstance(dom);
											// mdl.hide();
										}
									},
									attr: { "data-bs-dismiss": i.onclick instanceof Function ? null : "modal" },
								});
							}
						})
						?.reverse()
				);
			}

			//mix footer and button
			let ctlFooter = new div(
				"modal-footer",
				new div(
					"container-fluid g-0 p-0",
					new div("row align-items-center", [new div("col", ctlControl), new div("col-auto", ctlButton)])
				)
			);

			//combine header,body,footer to div.modal > div.modal-dialog > div.content
			this._d = {
				elem: new div({
					attr: {
						class: ["modal", d.animate && !d.show && "fade", d.show ? "show" : null],
						id: d.id,
						tabindex: -1,
						"data-bs-backdrop": d.static ? "static" : null,
						"data-bs-keyboard": d.static ? "false" : "true",
						"data-bs-focus": d.focus ? "true" : null,
						"aria-hidden": d.show ? "false" : "true",
					},
					elem: new div(
						[
							"modal-dialog",
							d.scrollable ? "modal-dialog-scrollable" : null,
							d.center ? "modal-dialog-centered" : null,
							d.size ? core.multiClass(d.size, "modal-$1") : null,
							d.fullscreen
								? typeof d.fullscreen === "string" || Array.isArray(d.fullscreen)
									? core.multiClass(d.fullscreen, "modal-fullscreen-$1")
									: "modal-fullscreen"
								: null,
						],
						new div("modal-content", [ctlHeader, ctlBody, ctlFooter])
					),
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

	get mdl() {
		return this._m;
	}
	set mdl(d) {
		this._m = d;
	}

	show = function (...arg) {
		//add into document
		this.dom = cl.appendChild(document.body, this);
		this.mdl = new bootstrap.Modal(this.dom);

		// hide previous modal
		let tmdl = [...document.getElementsByClassName("modal")];
		if (tmdl && tmdl.length > 0) {
			//remove d-block modal
			let amdl = [];
			tmdl.forEach(function (i) {
				if (!i.classList.contains("d-block")) amdl.push(i);
			});

			//remove show class
			if (amdl && amdl.length > 1) {
				amdl[amdl.length - 2].classList.remove("show");

				//remove show from backdrop
				if (amdl[amdl.length - 2].dataset.bsBackdrop === "static") {
					amdl[amdl.length - 2].nextSibling.classList.remove("show");
				}
			}
		}

		//set destroy after hide
		this.dom.addEventListener("hidden.bs.modal", function (event) {
			//show back previous modal
			let tmdl = [...document.getElementsByClassName("modal")];
			if (tmdl && tmdl.length > 0) {
				//remove d-block modal
				let amdl = [];
				tmdl.forEach(function (i) {
					if (!i.classList.contains("d-block")) amdl.push(i);
				});

				//add show class
				if (amdl && amdl.length > 1) {
					amdl[amdl.length - 2].classList.add("show");

					//add show backdrop
					if (amdl[amdl.length - 2].dataset.bsBackdrop === "static") {
						amdl[amdl.length - 2].nextSibling.classList.add("show");
					}
				}
			}

			let dom = event.currentTarget;
			let mdl = bootstrap.Modal.getInstance(dom);

			setTimeout(
				function (dom, mdl) {
					mdl.dispose();
					dom.remove();
				},
				300,
				dom,
				mdl
			);
		});

		this.mdl.show();
	};

	static hide(element) {
		let mdl = new bootstrap.Modal(element);
		mdl.hide();
	}
}
