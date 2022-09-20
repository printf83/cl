"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import nav from "./nav.js";
import * as collapse from "./collapse.js";
import button from "./button.js";
import div from "./div.js";
import form from "./form.js";
import h from "./h.js";
import label from "./label.js";
import btnclose from "./btnclose.js";
import ul from "./ul.js";
import span from "./span.js";
import a from "./a.js";
import * as option from "./option.js";

const defaultContainerOption = {
	body: {
		container: "fluid",
	},

	expand: null, //sm|md|lg|xl|xxl|null|''
	dark: false, //light|dark
	color: null, //danger|primary|dark|warning|...
	position: null, //fixed-top|fixed-bottom|sticky-top|null
	elem: null,
};

export class container extends nav {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultContainerOption, opt);

			opt = core.merge(opt, {
				class: [
					"navbar",
					opt.expand || opt.expand === ""
						? opt.expand === ""
							? "navbar-expand"
							: `navbar-expand-${opt.expand}`
						: null,
					opt.dark ? `navbar-${opt.dark ? "dark" : "light"}` : null,
					opt.position ? opt.position : null,
				],
				bgColor: opt.color,
				textBgColor: opt.color,
			});

			opt.body = core.merge(opt.body, {
				elem: opt.body.elem || opt.elem,
				container: opt.expand,
			});

			delete opt.body.fluid;

			opt.elem = new div(opt.body);

			delete opt.color;
			delete opt.body;
			delete opt.expand;
			delete opt.dark;
			delete opt.position;

			super.data = opt;
		}
	}
}

const defaultBrandOption = {
	href: null,
	click: null,
	label: null,
	icon: null,

	showlabel: null,
	iconafter: false,

	img: null,
	elem: null,
};

export class brand extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultBrandOption, opt);

			opt = core.merge(opt, {
				tag: opt.href ? "a" : "h1",
				marginBottom: !opt.href ? 0 : null,
				class: "navbar-brand",
				elem:
					opt.elem ||
					new label({
						icon: opt.icon,
						label: opt.label,
						showlabel: opt.showlabel,
						iconafter: opt.iconafter,
					}),
			});

			delete opt.icon;
			delete opt.label;
			delete opt.showlabel;
			delete opt.iconafter;
			delete opt.img;

			super.data = opt;
		}
	}
}

const defaultToggleOption = {
	target: null,
	toggle: "collapse", //collapse | offcanvas
};
export class toggle extends collapse.toggle {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultToggleOption, opt);

			opt = core.merge(opt, {
				elem: new button({
					icon: "bars",
					label: "Toggle navigation",
					hidelabel: true,
					class: "navbar-toggler",
				}),
			});

			super.data = opt;
		}
	}
}

const defaultFormContainerOption = {
	display: "flex",
	row: false,
	rowCol: null,
};
export class formcontainer extends form {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultFormContainerOption, opt);
		super.data = opt;
	}
}

const defaultCollapseContainerOption = {
	onshow: null,
	onshown: null,
	onhide: null,
	onhidden: null,
};
export class collapsecontainer extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultCollapseContainerOption, opt);

		opt = core.merge(opt, {
			class: ["collapse", "navbar-collapse"],

			"show.bs.collapse": opt.onshow,
			"shown.bs.collapse": opt.onshown,
			"hide.bs.collapse": opt.onhide,
			"hidden.bs.collapse": opt.onhidden,
		});

		delete opt.onshow;
		delete opt.onshown;
		delete opt.onhide;
		delete opt.onhidden;

		super.data = opt;
	}
}

const defaultOffcanvasContainerOption = {
	icon: null,
	title: null,
	placement: "start",
	weight: null,

	onshow: null,
	onshown: null,
	onhide: null,
	onhidden: null,
};

export class offcanvascontainer extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}

	set data(opt) {
		opt = core.extend({}, defaultOffcanvasContainerOption, opt);

		opt.id = opt.id || core.UUID();

		opt = core.merge(opt, {
			class: [
				opt.weight ? `offcanvas-${opt.weight}` : "offcanvas",
				opt.placement ? `offcanvas-${opt.placement}` : "offcanvas-start",
			],
			tabindex: "-1",
			"aria-labelledby": opt.id ? `${opt.id}-label` : null,

			"show.bs.offcanvas": opt.onshow,
			"shown.bs.offcanvas": opt.onshown,
			"hide.bs.offcanvas": opt.onhide,
			"hidden.bs.offcanvas": opt.onhidden,

			elem: [
				new div({
					class: "offcanvas-header",
					elem: [
						new h({
							level: 5,
							class: "offcanvas-title",
							id: `${opt.id}-label`,
							elem: new label({ icon: opt.icon, title: opt.title }),
						}),
						new btnclose({ class: "text-reset", dismiss: "offcanvas", label: "Close" }),
					],
				}),
				new div({ class: "offcanvas-body", elem: opt.elem }),
			],
		});

		delete opt.icon;
		delete opt.title;
		delete opt.placement;
		delete opt.weight;

		delete opt.onshow;
		delete opt.onshown;
		delete opt.onhide;
		delete opt.onhidden;

		super.data = opt;
	}
}

const defaultItemContainerOption = {
	scroll: null,
	mxauto: true,
	parenttype: "collapse", //collapse|offcanvas|null
};

export class itemcontainer extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultItemContainerOption, opt);

		if (opt.parenttype === "collapse") {
			opt.marginBottom = opt.parenttype === "collapse" ? [2, "lg-0"] : null;
		} else if (opt.parenttype === "offcanvas") {
			opt.justifyContent = "end";
			opt.paddingEnd = 3;
		}

		opt = core.merge(opt, {
			style: { "--bs-scroll-height": opt.scroll },
			marginEnd: opt.mxauto ? "auto" : null,
			class: ["navbar-nav", opt.scroll ? "navbar-nav-scroll" : null],
			flexGrow1: opt.parenttype ? true : null,
		});

		delete opt.mxauto;
		delete opt.scroll;
		delete opt.parenttype;

		super.data = opt;
	}
}

const defaultItemOption = {
	option: null,
	icon: null,
	label: null,
	showlabel: null,
	iconafter: false,
	active: false,
	disabled: false,
};
export class item extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultItemOption, opt);

			opt.id = opt.id || core.UUID();

			opt = core.merge(opt, {
				class: ["nav-item", opt.option ? "dropdown" : null],
				elem: [
					new a({
						href: opt.href,
						class: [
							"nav-link",
							opt.active ? "active" : null,
							opt.disabled ? "disabled" : null,
							opt.option ? "dropdown-toggle" : null,
						],
						"aria-current": opt.active ? "page" : null,
						role: "button",
						"data-bs-toggle": opt.option ? "dropdown" : null,
						"aria-expanded": opt.option ? "false" : null,
						elem: new label({
							icon: opt.icon,
							label: opt.label,
							showlabel: opt.showlabel,
							iconafter: opt.iconafter,
						}),
					}),
					opt.option
						? new ul({
								class: ["dropdown-menu"],
								"aria-labelledby": opt.id ? opt.id : null,
								elem: new option.dropdown({ item: opt.option }),
						  })
						: null,
				],
			});

			delete opt.href;
			delete opt.active;
			delete opt.disabled;
			delete opt.option;
			delete opt.icon;
			delete opt.label;
			delete opt.iconafter;
			delete opt.showlabel;

			super.data = opt;
		}
	}
}

export class text extends span {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.merge(opt, { class: "navbar-text" });
		super.data = opt;
	}
}
