"use strict";
import * as core from "./core.js";
import h from "./h.js";
import label from "./label.js";
import div from "./div.js";
import btnclose from "./btnclose.js";

const defaultOption = {
	title: undefined,
	icon: undefined,

	placement: "start",
	close: true,
	showtitle: null,
	iconafter: false,
	scroll: true,
	backdrop: false,
	autoclose: null, // BS5.2
	elem: null,
	color: null,
	bodyoverflow: null,

	onshow: null,
	onshown: null,
	onhide: null,
	onhidden: null,
};
/**
 * option : {attr,id,class,static,title,icon,footer,button,animated,debug,scrollable,center,size,fullscreen,focus,align,color,textcolor,bordercolor,border,divider,centerbutton,elem}
 */
export default class offcanvas extends div {
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

			opt.id = opt.id ? opt.id : core.UUID();

			//set default icon if not provided
			if (opt.icon === undefined) {
				opt.icon = core.setting.icon();
			}

			//set default title if not provided
			if (opt.title === undefined) {
				opt.title = core.setting.title();
			}

			var header = null;
			if (opt.close || opt.title) {
				header = new div({
					class: "offcanvas-header",
					elem: [
						opt.title || opt.icon
							? new h({
									level: 5,
									class: "offcanvas-title",
									id: `${opt.id}-label`,
									elem: new label({
										icon: opt.icon,
										label: opt.title,
										showlabel: opt.showtitle,
										iconafter: opt.iconafter,
									}),
							  })
							: null,
						opt.close
							? new btnclose({
									class: "text-reset",
									dismiss: "offcanvas",
									attr: {
										"data-bs-target": opt.autoclose ? `#${opt.id}` : null,
									},
									// dark: opt.color ? opt.color : "body-bg",
							  })
							: null,
					],
				});
			}

			var body = null;

			if (opt.elem) {
				body = new div({
					class: ["offcanvas-body", opt.bodyoverflow ? `overflow-${opt.bodyoverflow}` : null].filter(Boolean),
					elem: opt.elem,
				});
			}

			opt.class = core.merge.class(opt.class, [
				opt.placement ? `offcanvas-${opt.placement}` : "offcanvas-start",
				opt.autoclose ? `offcanvas-${opt.autoclose}` : "offcanvas",
			]);

			opt.attr = core.merge.attr(opt.attr, {
				"aria-labelledby": `${opt.id}-label`,
				"data-bs-scroll": opt.scroll ? "true" : "false",
				"data-bs-backdrop": opt.backdrop ? "true" : "false",
				tabindex: "-1",

				"show.bs.offcanvas": opt.onshow,
				"shown.bs.offcanvas": opt.onshown,
				"hide.bs.offcanvas": opt.onhide,
				"hidden.bs.offcanvas": opt.onhidden,
			});

			opt.elem = [header, body];

			delete opt.placement;
			delete opt.close;
			delete opt.title;
			delete opt.icon;
			delete opt.scroll;
			delete opt.backdrop;
			delete opt.showtitle;
			delete opt.iconafter;

			delete opt.onshow;
			delete opt.onshown;
			delete opt.onhide;
			delete opt.onhidden;

			super.data = opt;
		}
	}

	get bs() {
		return this._bs;
	}
	set bs(d) {
		this._bs = d;
	}

	show = () => {
		//add into document
		core.appendChild(document.body, this);
		this.bs = new bootstrap.Offcanvas(this.dom);

		let fn_shown = (event) => {
			core.init(event.currentTarget);
		};

		let fn_hidden = (event) => {
			let dom = event.currentTarget;
			core.removeElement(dom);
		};

		//set init
		this.dom.addEventListener("shown.bs.offcanvas", fn_shown, false);

		//set destroy after hide
		this.dom.addEventListener("hidden.bs.offcanvas", fn_hidden, false);

		//setup eventlistenerremover
		core.setupEventListenerRemover("offcanvas", this.dom, () => {
			core.deleteEventListener("offcanvas", this.dom, () => {
				this.dom.removeEventListener("shown.bs.offcanvas", fn_shown, false);
				this.dom.removeEventListener("hidden.bs.offcanvas", fn_hidden, false);
				this.bs.dispose();
				this.bs = null;
				this.dom = null;
			});
		});

		this.bs.show();
	};

	static hide(element) {
		let bs = bootstrap.Offcanvas.getInstance(element);
		bs?.hide();
	}
}
