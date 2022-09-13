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
	autohide: null, // BS5.2
	elem: null,
	color: null,

	onshow: null,
	onshown: null,
	onhide: null,
	onhidden: null,
};
/**
 * option : {attr,id,class,static,title,icon,footer,button,animated,debug,scrollable,center,size,fullscreen,focus,align,color,textcolor,bordercolor,border,divider,centerbutton,elem}
 */
export default class offcanvas extends div {
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

			opt.id = opt.id ? opt.id : core.UUID();

			//set default icon if not provided
			if (opt.icon === undefined) {
				opt.icon = core.setting.icon();
			}

			//set default title if not provided
			if (opt.title === undefined) {
				opt.title = core.setting.title();
			}

			//remove background and close button if autohide is set
			if (opt.autohide) {
				opt.close = false;
				opt.backdrop = false;
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
									// dark: opt.color ? opt.color : "body-bg",
							  })
							: null,
					],
				});
			}

			var body = null;

			if (opt.elem) {
				body = new div({ class: "offcanvas-body", elem: opt.elem });
			}

			opt.class = core.merge.class(opt.class, [
				opt.placement ? `offcanvas-${opt.placement}` : "offcanvas-start",
				opt.autohide ? `offcanvas-${opt.autohide}` : "offcanvas",
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

	get dom() {
		return this._n;
	}
	set dom(d) {
		this._n = d;
	}

	get ofc() {
		return this._m;
	}
	set ofc(d) {
		this._m = d;
	}

	show = () => {
		//add into document
		this.dom = core.appendChild(document.body, this);
		this.ofc = new bootstrap.Offcanvas(this.dom);

		//set init
		this.dom.addEventListener("shown.bs.offcanvas", (event) => {
			core.init(event.currentTarget);
		});

		//set destroy after hide
		this.dom.addEventListener("hidden.bs.offcanvas", (event) => {
			let dom = event.currentTarget;
			let ofc = bootstrap.Offcanvas.getInstance(dom);

			setTimeout(
				(dom, ofc) => {
					ofc.dispose();
					core.removeChildElement(dom);
					dom.remove();

					this.ofc = null;
					this.dom = null;
				},
				300,
				dom,
				ofc
			);
		});

		this.ofc.show();
	};

	static hide(element) {
		let ofc = bootstrap.Offcanvas.getInstance(element);
		ofc.hide();
	}
}
