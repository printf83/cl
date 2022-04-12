"use strict";
import * as core from "./core.js";
import h from "./h.js";
import label from "./label.js";
import button from "./button.js";
import div from "./div.js";
import btnclose from "./btnclose.js";
import * as container from "./container.js";

const defaultOption = {
	attr: null, //combine to container

	id: null,
	class: null,
	static: true,
	title: null,
	icon: null,
	footer: null,
	button: null,
	animate: true,
	scrollable: true,
	center: true,
	size: null,
	maxwidth: null,
	fullscreen: false,
	focus: true,

	align: null, //left,right,center
	color: null,
	textcolor: null,
	bordercolor: null,
	border: true,
	bgcolor: null,
	dark: null,

	bodyclass: null,
	bodyminheight: null,

	defautlbtncolor: "primary",
	divider: true,
	centerbutton: false,

	elem: null,

	debug: false,
};

/**
 * option : {attr,id,class,static,title,icon,footer,button,animated,debug,scrollable,center,size,fullscreen,focus,align,color,textcolor,bordercolor,border,divider,centerbutton,elem}
 */
export default class modal extends div {
	_n = null;
	_m = null;

	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			let bI = core.getBaseIcon(opt.icon);
			let defButtonColor = opt.defautlbtncolor;
			if (bI) {
				opt.icon = {
					icon: bI.icon,
					type: bI.type,
					color: bI.color,
				};

				defButtonColor = bI.color;
			}

			//generate id
			opt.id = opt.id || core.UUID();

			//generate header
			let ctlHeader =
				opt.icon || opt.title
					? new div({
							border: !opt.divider ? "bottom-0" : null,
							class: ["modal-header"],
							elem: [
								new h({
									level: 5,
									class: "modal-title",
									elem: new label({ icon: opt.icon, label: opt.title }),
								}),
								new btnclose({
									dismiss: "modal",
									dark: opt.textcolor
										? !(opt.textcolor === "light" || opt.textcolor === "white")
										: true,
								}),
							],
					  })
					: null;

			//check if first elem is tab
			let hastab = opt.elem
				? Array.isArray(opt.elem)
					? opt.elem[0].hasOwnProperty("cltab")
					: opt.elem.hasOwnProperty("cltab")
				: false;

			//generate body
			let ctlBody = new div({
				class: ["modal-body", opt.bodyclass],
				style: opt.bodyminheight ? { "min-height": opt.bodyminheight } : null,
				padding: hastab ? 0 : null,
				elem: opt.elem,
			});

			//generate control
			let ctlControl = opt.footer ? new div({ float: "start", class: ["footer-ctl"], elem: opt.footer }) : null;

			//generate button
			let ctlButton = null;
			if (opt.button) {
				if (!Array.isArray(opt.button)) {
					opt.button = [opt.button];
				}

				//standby button
				let btn = opt.button.map(function (j, ix) {
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
								id: i.id,
								class: i.class,
								onclick: i.onclick,

								color: i.color,
								label: i.label,
								icon: i.icon,
							},
							i
						);

						return new button({
							id: i.id ? i.id : `${opt.id}-btn-${ix}`,
							label: i.label,
							icon: i.icon,
							class: core.merge.class(i.class, "btn-modal"),
							color:
								ix === 0 ? (i.color ? i.color : defButtonColor) : i.color ? i.color : "text-secondary", //i.color ? i.color : ix === 0 ? defButtonColor : "text-secondary",
							onclick: function (event) {
								event.stopPropagation();

								//validate for first button only
								let mdl = event.currentTarget.closest(".modal");
								let sender = event.currentTarget;
								if (sender.getAttribute("tab-index") === "1") {
									core.validate(mdl, function (isvalid) {
										if (isvalid) {
											let formdata = core.getValue(mdl);
											let result =
												i.onclick instanceof Function
													? i.onclick(event.currentTarget, formdata)
													: true;
											if (result !== false) {
												//find parent and close
												modal.hide(mdl);
											}
										}
									});
								} else {
									//no need to validate for second button
									let formdata = core.getValue(mdl);
									let result =
										i.onclick instanceof Function ? i.onclick(event.currentTarget, formdata) : true;
									if (result !== false) {
										//find parent and close
										modal.hide(mdl);
									}
								}
							},
							attr: {
								"data-bs-dismiss": i.onclick instanceof Function ? null : "modal",
								"tab-index": ix + 1,
							},
						});
					}
				});

				//reverse button in not centerbutton
				if (btn && !opt.centerbutton) {
					btn = btn.reverse();
				}

				//container for button
				ctlButton = opt.centerbutton
					? new div({ display: "grid", gap: 2, col: [12, "md-6"], marginx: "auto", elem: btn })
					: new div({ justifycontent: "end", elem: new container.stack(btn) });
			}

			//mix footer and button
			let ctlFooter = null;
			if (ctlButton || ctlControl) {
				if (opt.centerbutton) {
					ctlFooter = new div({
						border: !opt.divider ? "top-0" : null,
						class: ["modal-footer"],
						elem: new div({
							gap: 2,
							padding: 0,
							class: "container-fluid",
							elem: [
								new div({ row: true, elem: new div({ col: true, elem: ctlButton }) }),
								new div({ row: true, elem: new div({ col: true, elem: ctlControl }) }),
							],
						}),
					});
				} else {
					ctlFooter = new div({
						border: !opt.divider ? "top-0" : null,
						class: ["modal-footer"],
						elem: new div({
							gap: 0,
							padding: 0,
							class: "container-fluid",
							elem: new div({
								row: true,
								alignitem: "center",
								elem: [
									new div({ col: true, elem: ctlControl }),
									new div({ col: "auto", elem: ctlButton }),
								],
							}),
						}),
					});
				}
			}

			//combine header,body,footer to div.modal > div.modal-dialog > div.content
			super.data = {
				id: opt.id,
				name: opt.name,
				class: core.merge.class(opt.class, [
					"modal",
					opt.animate && !opt.debug && "fade",
					!opt.debug ? "show" : "cl-debug",
				]),
				style: core.merge.style(opt.style, opt.debug ? { display: "block", position: "static" } : null),
				attr: core.merge.attr(opt.attr, {
					tabindex: -1,
					"data-bs-backdrop": opt.static ? "static" : null,
					"data-bs-keyboard": opt.static ? "false" : "true",
					"data-bs-focus": opt.focus ? "true" : null,
					"aria-hidden": opt.debug ? "false" : "true",
				}),
				color: opt.bgcolor ? opt.bgcolor : null,
				elem: new div({
					style: { "max-width": opt.maxwidth },
					class: [
						"modal-dialog",
						opt.scrollable ? "modal-dialog-scrollable" : null,
						opt.center ? "modal-dialog-centered" : null,
						opt.size ? core.multiClass(opt.size, "modal-$1") : null,
						opt.fullscreen
							? typeof opt.fullscreen === "string" || Array.isArray(opt.fullscreen)
								? core.multiClass(opt.fullscreen, "modal-fullscreen-$1")
								: "modal-fullscreen"
							: null,
					],
					elem: new div({
						align: opt.align,
						color: opt.color,
						textcolor: opt.textcolor,
						bordercolor: opt.bordercolor,
						border: opt.border,
						class: ["modal-content"],
						elem: [ctlHeader, ctlBody, ctlFooter],
					}),
				}),
			};
		}
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

	show = function () {
		//add into document
		this.dom = core.appendChild(document.body, this);
		this.mdl = new bootstrap.Modal(this.dom);

		// hide previous modal
		let tmdl = [...document.getElementsByClassName("modal")];
		if (tmdl && tmdl.length > 0) {
			//remove d-block modal
			let amdl = [];
			tmdl.forEach(function (i) {
				if (!i.classList.contains("cl-debug")) amdl.push(i);
			});

			//remove show class
			if (amdl && amdl.length > 1) {
				amdl[amdl.length - 2].classList.remove("show");

				//remove show from backdrop
				if (amdl[amdl.length - 2].dataset.bsBackdrop === "static") {
					amdl[amdl.length - 2].nextSibling?.classList.remove("show");
				}
			}
		}

		//set init
		this.dom.addEventListener("shown.bs.modal", function (event) {
			core.init(event.currentTarget);
		});

		//set destroy after hide
		this.dom.addEventListener("hidden.bs.modal", function (event) {
			//show back previous modal
			let tmdl = [...document.getElementsByClassName("modal")];
			if (tmdl && tmdl.length > 0) {
				//remove d-block modal
				let amdl = [];
				tmdl.forEach(function (i) {
					if (!i.classList.contains("cl-block")) amdl.push(i);
				});

				//add show class
				if (amdl && amdl.length > 1) {
					amdl[amdl.length - 2].classList.add("show");

					//add show backdrop
					if (amdl[amdl.length - 2].dataset.bsBackdrop === "static") {
						amdl[amdl.length - 2].nextSibling?.classList.add("show");
					}
				}
			}

			let dom = event.currentTarget;
			let mdl = bootstrap.Modal.getInstance(dom);

			setTimeout(
				function (dom, mdl) {
					mdl.dispose();
					core.removeElement(dom);

					this.mdl = null;
					this.dom = null;
				},
				300,
				dom,
				mdl
			);
		});

		this.mdl.show();
	};

	static hide(element) {
		let mdl = bootstrap.Modal.getInstance(element);
		mdl?.hide();
	}
}
