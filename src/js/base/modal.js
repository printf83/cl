"use strict";
import * as core from "./core.js";
import h from "./h.js";
import label from "./label.js";
import button from "./button.js";
import div from "./div.js";
import btnclose from "./btnclose.js";
import * as container from "./container.js";

const fnInputOnEnter = (event) => {
	if (event && event.keyCode === 13) {
		let sender = event.currentTarget;

		event.preventDefault();
		event.stopPropagation();
		let nextEl = sender.closest("div.col")?.nextSibling?.getElementsByTagName("INPUT")[0];
		if (nextEl && nextEl.nodeName === "INPUT") {
			nextEl.focus();
		} else {
			let mdl = sender.closest("div.modal");
			let modalId = mdl.getAttribute("id");
			let firstBtn = document.getElementById(`${modalId}_btn_0`);
			firstBtn?.dispatchEvent(new Event("click"));
		}
	}
};
const defaultOption = {
	id: null,
	class: null,
	static: true,

	title: undefined,
	icon: undefined,

	footer: null,
	button: null,
	animate: true,
	scrollable: true,
	center: true,
	size: null,
	maxWidth: null,
	fullscreen: false,
	focus: true,

	align: null, //left,right,center
	color: null,
	textColor: null,
	borderColor: null,
	border: true,
	bgcolor: null,
	dark: null,

	bodyclass: null,
	bodyminheight: null,
	backdropcolor: null,
	defautlbtncolor: "primary",
	divider: true,
	centerbutton: false,

	elem: null,

	onshow: null,
	onshown: null,
	onhide: null,
	onhidden: null,
	onhideprevented: null,

	debug: false,
};

/**
 * option : {attr,id,class,static,title,icon,footer,button,animated,debug,scrollable,center,size,fullscreen,focus,align,color,textColor,borderColor,border,divider,centerbutton,elem}
 */
export default class modal extends div {
	_bs = null;

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
				minHeight: opt.bodyminheight,
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
				let btn = opt.button.map((j, ix) => {
					if (j.hasOwnProperty("cl")) {
						return j;
					} else {
						let i = {
							id: null,
							label: null,
							icon: null,
							color: null,
							class: null,
							click: null,
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
								click: i.click,

								color: i.color,
								label: i.label,
								icon: i.icon,
							},
							i
						);

						i = core.merge(i, {
							class: "btn-modal",
						});

						return new button({
							id: i.id ? i.id : `${opt.id}_btn_${ix}`,
							label: i.label,
							icon: i.icon,
							class: i.class,
							color: ix === 0 ? (i.color ? i.color : defButtonColor) : i.color ? i.color : "transparent",
							"data-bs-dismiss": i.click instanceof Function ? null : "modal",
							tabindex: ix + 1,
							click: (event) => {
								event.stopPropagation();

								//validate for first button only
								let mdl = event.currentTarget.closest(".modal");
								let sender = event.currentTarget;
								if (sender.getAttribute("tabindex") === "1") {
									core.validate(mdl, (isvalid) => {
										if (isvalid) {
											let formdata = core.getValue(mdl);
											let result =
												i.click instanceof Function
													? i.click(event.currentTarget, formdata)
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
										i.click instanceof Function ? i.click(event.currentTarget, formdata) : true;
									if (result !== false) {
										//find parent and close
										modal.hide(mdl);
									}
								}
							},
						});
					}
				});

				//reverse button in not centerbutton
				if (btn && !opt.centerbutton) {
					btn = btn.reverse();

					//container for button
					ctlButton = opt.centerbutton
						? new div({ display: "grid", gutter: 2, col: [12, "md-6"], marginX: "auto", elem: btn })
						: new div({ justifyContent: "end", elem: new container.stack(btn) });
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
								container: "fluid",
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
								container: "fluid",
								elem: new div({
									row: true,
									alignItem: "center",
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
				opt = core.merge(opt, {
					class: ["modal", opt.animate && !opt.debug && "fade", !opt.debug ? "show" : "cl-debug"],
					display: opt.debug ? "block" : null,
					position: opt.debug ? "static" : null,
					tabindex: -1,
					"data-bs-backdrop": opt.static ? "static" : null,
					"data-bs-keyboard": opt.static ? "false" : "true",
					"data-bs-focus": opt.focus ? "true" : null,
					"data-bs-backdropcolor": opt.backdropcolor ? opt.backdropcolor : null,
					"aria-hidden": opt.debug ? "false" : "true",

					"show.bs.modal": opt.onshow,
					"shown.bs.modal": opt.onshown,
					"hide.bs.modal": opt.onhide,
					"hidden.bs.modal": opt.onhidden,
					"hidePrevented.bs.modal": opt.onhideprevented,
					elem: new div({
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
							textColor: opt.textColor,
							borderColor: opt.borderColor,
							border: opt.border,
							class: ["modal-content"],
							elem: [ctlHeader, ctlBody, ctlFooter],
						}),
					}),
				});

				delete opt.static;
				delete opt.title;
				delete opt.icon;

				delete opt.footer;
				delete opt.button;
				delete opt.animate;
				delete opt.scrollable;
				delete opt.center;
				delete opt.size;
				delete opt.fullscreen;
				delete opt.focus;

				delete opt.align; //left,right,center
				delete opt.color;
				delete opt.dark;

				delete opt.bodyclass;
				delete opt.bodyminheight;
				delete opt.backdropcolor;
				delete opt.defautlbtncolor;
				delete opt.divider;
				delete opt.centerbutton;

				delete opt.elem;

				delete opt.onshow;
				delete opt.onshown;
				delete opt.onhide;
				delete opt.onhidden;
				delete opt.onhideprevented;

				delete opt.debug;

				super.data = opt;
			}
		}
	}

	get bs() {
		return this._bs;
	}
	set bs(d) {
		this._bs = d;
	}

	show = () => {
		//looks like memory leak

		//add into document
		core.appendChild(document.body, this);
		this.bs = new bootstrap.Modal(this.dom);

		// hide previous modal
		let tbs = [...document.getElementsByClassName("modal")];
		if (tbs && tbs.length > 0) {
			//remove d-block modal
			let abs = [];
			tbs.forEach((i) => {
				if (!i.classList.contains("cl-debug")) abs.push(i);
			});

			//remove show class
			if (abs && abs.length > 1) {
				abs[abs.length - 2].classList.remove("show");

				//remove show from backdrop
				if (abs[abs.length - 2].dataset.bsBackdrop === "static") {
					abs[abs.length - 2].nextSibling?.classList.remove("show");
				}
			}
		}

		let fn_shown = (event) => {
			//set background
			let bs_backdrop = document.getElementsByClassName("modal-backdrop");
			if (bs_backdrop) {
				let backdropcolor = event.currentTarget.getAttribute("data-bs-backdropcolor");
				if (backdropcolor) {
					bs_backdrop[0].classList.add(`bg-${backdropcolor}`);
					bs_backdrop[0].classList.add("opacity-100");
				}
			}

			//init
			let sender = event.currentTarget;
			core.init(sender);

			//focus first elem
			let all_input = [].slice.call(sender.getElementsByTagName("INPUT"), 0);
			let first_input = all_input ? all_input[0] : null;
			if (first_input) {
				first_input.focus();

				//gotrue all input and add enter key
				all_input.forEach((elem) => {
					//add keydown event
					elem.addEventListener("keydown", fnInputOnEnter);

					//remove event
					core.setupEventListenerRemover("keydown", elem, () => {
						core.deleteEventListener("keydown", elem, () => {
							elem.removeEventListener("keydown", fnInputOnEnter, false);
						});
					});
				});
			}
		};

		let fn_hidden = (event) => {
			//show back previous modal
			let tbs = [...document.getElementsByClassName("modal")];
			if (tbs && tbs.length > 0) {
				//remove d-block modal
				let abs = [];
				tbs.forEach((i) => {
					if (!i.classList.contains("cl-block")) abs.push(i);
				});

				//add show class
				if (abs && abs.length > 1) {
					abs[abs.length - 2].classList.add("show");

					//add show backdrop
					if (abs[abs.length - 2].dataset.bsBackdrop === "static") {
						abs[abs.length - 2].nextSibling?.classList.add("show");
					}
				}
			}

			let dom = event.currentTarget;
			core.removeElement(dom);
		};

		this.dom.addEventListener("shown.bs.modal", fn_shown, false);

		//set destroy after hide
		this.dom.addEventListener("hidden.bs.modal", fn_hidden, false);

		//setup eventlistenerremover
		core.setupEventListenerRemover("modal", this.dom, () => {
			core.deleteEventListener("modal", this.dom, () => {
				this.dom.removeEventListener("shown.bs.modal", fn_shown, false);
				this.dom.removeEventListener("hidden.bs.modal", fn_hidden, false);
				this.bs.dispose();
				this.bs = null;
				this.dom = null;
			});
		});

		this.bs.show();
	};

	static hide(element) {
		let bs = bootstrap.Modal.getInstance(element);
		bs?.hide();
	}
}
