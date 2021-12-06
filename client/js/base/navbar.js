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

export class container extends nav {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					body: {
						fluid: true,
					},

					expand: null, //sm|md|lg|xl|xxl|null|''
					dark: false, //light|dark
					color: null, //danger|primary|dark|warning|...
					position: null, //fixed-top|fixed-bottom|sticky-top|null
					elem: null,
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.class = core.merge.class(opt.class, [
				"navbar",
				opt.expand || opt.expand === ""
					? opt.expand === ""
						? "navbar-expand"
						: `navbar-expand-${opt.expand}`
					: null,
				opt.dark ? `navbar-${opt.dark ? "dark" : "light"}` : null,
				opt.position ? opt.position : null,
			]);

			opt.body = core.extend(
				{},
				{
					fluid: true,
				},
				opt.body
			);

			opt.body.class = core.merge.attr(opt.body.class, [
				opt.body.fluid === true
					? "container-fluid"
					: opt.body.fluid === false
					? "container"
					: core.multiClass(opt.body.fluid, "container-$1"),
			]);

			opt.body.elem = opt.body.elem || opt.elem;

			delete opt.body.fluid;

			opt.elem = new div(opt.body);

			delete opt.body;
			delete opt.expand;
			delete opt.dark;
			delete opt.position;

			super.data = opt;
		}
	}
}

export class brand extends tag {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					id: null,
					attr: null,
					class: null,
					style: null,

					href: null,
					onclick: null,
					label: null,
					icon: null,
					img: null,
					elem: null,
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.tag = opt.href ? "a" : "h1";
			opt.marginBottom = !opt.href ? 0 : null;
			opt.class = core.merge.class(opt.class, "navbar-brand");
			opt.elem =
				opt.elem ||
				new label({
					icon: opt.icon,
					label: opt.label,
				});

			delete opt.icon;
			delete opt.label;

			super.data = opt;
		}
	}
}

export class toggle extends collapse.toggle {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					target: null,
					toggle: "collapse", //collapse | offcanvas
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.elem =
				opt.elem ||
				new button({
					icon: "bars",
					label: "Toggle navigation",
					hidelabel: true,
					class: "navbar-toggler",
				});
			super.data = opt;
		}
	}
}

export class formcontainer extends form {
	constructor(opt) {
		super(core.extend({}, { display: "flex", opt }));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt.display = "flex";
		super.data = opt;
	}
}

export class collapsecontainer extends div {
	constructor(opt) {
		super(core.extend({}, { class: ["collapse", "navbar-collapse"] }, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt.class = core.merge.class(opt.class, ["collapse", "navbar-collapse"]);
		super.data = opt;
	}
}

export class offcanvascontainer extends div {
	constructor(opt) {
		super(core.extend({}, { icon: null, title: null }, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt.id = opt.id || core.UUID();
		opt.attr = core.merge.attr(opt.attr, {
			tabindex: "-1",
			"aria-labelledby": opt.id ? `${opt.id}-label` : null,
		});

		opt.class = core.merge.class(opt.class, ["offcanvas", "offcanvas-end"]);

		opt.elem = [
			new div({
				class: "offcanvas-header",
				elem: [
					new h(5, {
						class: "offcanvas-title",
						id: `${opt.id}-label`,
						elem: new label({ icon: opt.icon, title: opt.title }),
					}),
					new btnclose({ class: "text-reset", dismiss: "offcanvas", label: "Close" }),
				],
			}),
			new div({ class: "offcanvas-body", elem: opt.elem }),
		];

		delete opt.icon;
		delete opt.title;

		super.data = opt;
	}
}

export class itemcontainer extends div {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					scroll: null,
					mxauto: true,
					parenttype: "collapse", //collapse|offcanvas|null
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt.style = core.merge.style(opt.style, { "--bs-scroll-height": opt.scroll });
		opt.marginEnd = opt.mxauto ? "auto" : null;

		if (opt.parenttype === "collapse") {
			opt.marginBottom = opt.parenttype === "collapse" ? [(2, "lg-0")] : null;
		} else if (opt.parenttype === "offcanvas") {
			opt.justifyContent = "end";
			opt.paddingEnd = 3;
		}
		opt.class = core.merge.class(opt.class, [
			"navbar-nav",
			opt.mxauto ? "me-auto" : null,
			opt.scroll ? "navbar-nav-scroll" : null,
			opt.parenttype === "offcanvas" ? "flex-grow-1" : null,
		]);

		delete opt.mxauto;
		delete opt.scroll;
		delete opt.parenttype;

		super.data = opt;
	}
}

export class item extends div {
	constructor(opt) {
		super(
			core.extend(
				{},
				{
					option: null,
					icon: null,
					label: null,
					active: false,
					disabled: false,
				},
				opt
			)
		);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt.id = opt.id || core.UUID();
			opt.class = core.merge.class(opt.class, ["nav-item", opt.option ? "dropdown" : null]);

			opt.elem = [
				new a({
					href: opt.href,
					class: [
						"nav-link",
						opt.active ? "active" : null,
						opt.disabled ? "disabled" : null,
						opt.option ? "dropdown-toggle" : null,
					],
					attr: {
						"aria-current": opt.active ? "page" : null,
						role: "button",
						"data-bs-toggle": opt.option ? "dropdown" : null,
						"aria-expanded": opt.option ? "false" : null,
					},
					elem: new label({ icon: opt.icon, label: opt.label }),
				}),
				opt.option
					? new ul({
							class: ["dropdown-menu"],
							attr: { "aria-labelledby": opt.id ? opt.id : null },
							elem: new option.dropdown({ item: opt.option }),
					  })
					: null,
			];

			delete opt.href;
			delete opt.active;
			delete opt.disabled;
			delete opt.option;
			delete opt.icon;
			delete opt.label;

			super.data = opt;
		}
	}
}

export default class text extends span {
	constructor(opt) {
		super(core.extend({}, { class: "navbar-text" }, opt));
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt.class = core.merge.class(opt.class, "navbar-text");
		super.data = opt;
	}
}
