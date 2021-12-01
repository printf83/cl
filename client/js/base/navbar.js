"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
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
import option from "./option.js";

export class container extends tag {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = arg[0];

			this.data = core.extend(
				{},
				{
					id: null,
					attr: null,
					class: null,
					style: null,

					containerfluid: true,
					containerclass: null,
					containerattr: null,
					containerstyle: null,

					expand: null, //sm|md|lg|xl|xxl|null|''
					dark: false, //light|dark
					color: null, //danger|primary|dark|warning|...
					position: null, //fixed-top|fixed-bottom|sticky-top|null
					elem: null,
				},
				t
			);
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				tag: "nav",

				id: d.id,
				name: d.name,
				attr: d.attr,
				style: d.style,

				align: d.align,
				color: d.color,
				textcolor: d.textcolor,
				bordercolor: d.bordercolor,
				border: d.border,

				onchange: d.onchange,
				onclick: d.onclick,
				onfocus: d.onfocus,
				onblur: d.onblur,

				class: core.merge.class(d.class, [
					"navbar",
					d.expand || d.expand === ""
						? d.expand === ""
							? "navbar-expand"
							: `navbar-expand-${d.expand}`
						: null,
					d.dark ? `navbar-${d.dark ? "dark" : "light"}` : null,
					d.position ? d.position : null,
				]),
				elem: new div({
					attr: core.merge.attr(d.attr, {
						class: core.merge.class(d.containerclass, [
							d.containerfluid === true
								? "container-fluid"
								: d.containerfluid === false
								? "container"
								: core.multiClass(d.containerfluid, "container-$1"),
						]),
						style: d.containerstyle,
					}),
					elem: d.elem,
				}),
			};
		} else {
			super.data = null;
		}
	}
}

export class brand extends tag {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = arg[0];

			this.data = core.extend(
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
				t
			);
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				tag: d.href ? "a" : "h1",

				id: d.id,
				name: d.name,
				attr: d.attr,
				style: d.style,

				align: d.align,
				color: d.color,
				textcolor: d.textcolor,
				bordercolor: d.bordercolor,
				border: d.border,

				onchange: d.onchange,
				onclick: d.onclick,
				onfocus: d.onfocus,
				onblur: d.onblur,

				href: d.href,

				class: core.merge.class(d.class, ["navbar-brand", !d.href ? "mb-0" : null]),

				elem: d.elem
					? d.elem
					: new label({
							icon: d.icon,
							label: d.label,
					  }),
			};
		} else {
			super.data = null;
		}
	}
}

export class toggle extends tag {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				target: null,
			};

			if (arg.length === 1) {
				if (typeof arg[0] === "string") {
					t.target = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					target: null,
					toggle: "collapse", //collapse | offcanvas
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				elem: new collapse.toggle(
					new button({
						icon: "bars",
						label: "Toggle navigation",
						hidelabel: true,
						class: "navbar-toggler",
					}),
					{
						target: d.target,
						toggle: d.toggle,
					}
				),
			};
		} else {
			super.data = null;
		}
	}
}

export class formcontainer extends form {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				elem: null,
			};

			if (arg.length === 1) {
				if (Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl")) {
					t.elem = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					id: null,
					class: null,
					style: null,
					attr: null,
					elem: null,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				id: d.id,
				style: d.style,
				attr: d.attr,
				class: core.merge.class(d.class, "d-flex"),
				elem: d.elem,
			};
		} else {
			super.data = null;
		}
	}
}

export class collapsecontainer extends div {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				elem: null,
			};

			if (arg.length === 1) {
				if (Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl")) {
					t.elem = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					id: null,
					class: null,
					style: null,
					attr: null,
					elem: null,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				id: d.id,
				style: d.style,
				attr: d.attr,
				class: core.merge.class(d.class, ["collapse", "navbar-collapse"]),
				elem: d.elem,
			};
		} else {
			super.data = null;
		}
	}
}

export class offcanvascontainer extends div {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				icon: null,
				title: null,
				elem: null,
			};

			if (arg.length === 3) {
				t.icon = arg[0];
				t.title = arg[1];
				t.elem = arg[2];
			} else if (arg.length === 2) {
				t.title = arg[0];
				t.elem = arg[1];
			} else if (arg.length === 1) {
				if (Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl")) {
					t.elem = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					id: null,
					title: null,
					class: null,
					style: null,
					attr: null,
					elem: null,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			d.id = d.id || core.UUID();

			super.data = {
				id: d.id,
				style: d.style,
				attr: core.merge.attr(d.attr, {
					tabindex: "-1",
					"aria-labelledby": d.id ? `${d.id}-label` : null,
				}),
				class: core.merge.class(d.class, ["offcanvas", "offcanvas-end"]),
				elem: [
					new div("offcanvas-header", [
						new h(5, { class: "offcanvas-title", id: `${d.id}-label`, elem: new label(d.icon, d.title) }),
						new btnclose({ class: "text-reset", dismiss: "offcanvas", label: "Close" }),
					]),
					new div("offcanvas-body", d.elem),
				],
			};
		} else {
			super.data = null;
		}
	}
}

export class itemcontainer extends div {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				elem: null,
			};

			if (arg.length === 1) {
				if (Array.isArray(arg[0]) || arg[0].hasOwnProperty("cl")) {
					t.elem = arg[0];
				} else {
					t = arg[0];
				}
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					id: null,
					class: null,
					style: null,
					attr: null,
					elem: null,

					scroll: null,
					mxauto: true,
					parenttype: null, //collapse|offcanvas|null
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			super.data = {
				id: d.id,
				style: core.merge.style(d.style, { "--bs-scroll-height": d.scroll }),
				attr: d.attr,
				class: core.merge.class(d.class, [
					"navbar-nav",
					d.mxauto ? "me-auto" : null,
					d.scroll ? "navbar-nav-scroll" : null,
					d.parenttype === "collapse" ? "mb-2 mb-lg-0" : null,
					d.parenttype === "offcanvas" ? "justify-content-end flex-grow-1 pe-3" : null,
				]),
				elem: d.elem,
			};
		} else {
			super.data = null;
		}
	}
}

export class item extends div {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = arg[0];

			this.data = core.extend(
				{},
				{
					id: null,
					class: null,
					option: null,
					href: "javascript:void(0)",
					onclick: null,
					icon: null,
					label: null,
					active: false,
					disabled: false,
				},
				t
			);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d) {
			d.id = d.id || core.UUID();
			super.data = {
				tag: "div",
				attr: d.attr,
				style: d.style,
				onclick: d.onclick,
				class: core.merge.class(d.class, [
					"nav-item",
					"d-flex",
					"align-content-center",
					"flex-wrap",
					d.option ? "dropdown" : null,
				]),
				elem: [
					new a({
						id: d.id,
						href: d.href,
						class: [
							"nav-link",
							"text-md-center",
							d.active ? "active" : null,
							d.disabled ? "disabled" : null,
							d.option ? "dropdown-toggle" : null,
						],
						attr: {
							"aria-current": d.active ? "page" : null,
							role: "button",
							"data-bs-toggle": d.option ? "dropdown" : null,
							"aria-expanded": d.option ? "false" : null,
						},
						elem: new label(d.icon, d.label),
					}),
					d.option
						? new ul({
								class: ["dropdown-menu", "w-sm-100"],
								attr: { "aria-labelledby": d.id ? d.id : null },
								elem: new option({ type: "dropdown", item: d.option }),
						  })
						: null,
				],
			};
		} else {
			super.data = null;
		}
	}
}

export default class text extends span {
	constructor(...arg) {
		super(...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		let tmp = super.data;
		tmp.class = core.merge.class(tmp.class, "navbar-text");
		super.data = tmp;
	}
}
