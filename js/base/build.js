"use strict";

Array.prototype.removeEmpty = function () {
	return this.filter(Boolean);
};

Array.prototype.combine = function (delimeter) {
	return this.removeEmpty().join(delimeter);
};

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

const cl = {};

const core = {
	extend: function (out) {
		out = out || {};

		for (let i = 1; i < arguments.length; i++) {
			if (!arguments[i]) continue;

			for (let key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
			}
		}

		return out;
	},
	merge: {
		class: function (a, b) {
			if (a && b) {
				let aT = typeof a;
				let bT = typeof a;
				let aR = Array.isArray(a);
				let bR = Array.isArray(b);

				if (!aR && !bR && aT === "string" && bT === "string") {
					return [a, b];
				} else if (!aR && bR && aT === "string") {
					b.push(a);
					return b;
				} else if (aR && !bR && bT === "string") {
					a.push(b);
					return a;
				} else if (aR && bR) {
					return [...a, ...b];
				} else {
					console.error("Unhandle #r class rules");
				}
			} else if (a && !b) {
				return a;
			} else if (!a && b) {
				return b;
			} else {
				return null;
			}
		},
		style: function (a, b) {
			if (a && b) {
				let c = {};
				Object.keys(a).forEach((i) => {
					if (b.hasOwnProperty(i)) {
						console.warn(`Same property ${i} provided in 'a' and 'b'. Using style from 'a' insted.`);
						c[i] = a[i]; //used a insted
					} else {
						c[i] = a[i];
					}
				});

				Object.keys(b).forEach((i) => {
					if (!a.hasOwnProperty(i)) {
						c[i] = b[i];
					}
				});

				return c;
			} else if (a && !b) {
				return a;
			} else if (!a && b) {
				return b;
			} else {
				return null;
			}
		},
	},
	UUID: function () {
		return "el-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
			var r = (Math.random() * 16) | 0,
				v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	},
	multiClass: function (val, format) {
		//core.multiClass(["lg-12","xl-3","md-2","2"],"col-$1")
		return val
			? Array.isArray(val)
				? val
						.map(function (i) {
							return format.replace("$1", i);
						})
						.join(" ")
				: format.replace("$1", val)
			: null;
	},
};

class attr {
	constructor(d) {
		d = core.extend(
			{},
			{
				class: null,
				style: null,
			},
			d
		);

		this.d = d;
	}

	attach = function (elems) {
		if (elems) {
			Object.keys(this.d).forEach((i) => {
				if (i !== "tag" && i !== "elem" && (this.d[i] || this.d[i] === "") && this.d[i] !== null) {
					if (i === "class") {
						if (Array.isArray(this.d[i])) {
							let k = this.d[i].combine(" ");
							if (k) elems.classList = k;
						} else {
							elems.classList = this.d[i];
						}
					} else if (i === "style") {
						Object.keys(this.d[i]).forEach((j) => {
							if (this.d[i][j] && this.d[i][j] !== null) {
								elems.style[j] = this.d[i][j];
							}
						});
					} else if (
						[
							"allowfullscreen",
							"allowpaymentrequest",
							"async",
							"autofocus",
							"autoplay",
							"checked",
							"controls",
							"default",
							"defer",
							"disabled",
							"formnovalidate",
							"hidden",
							"ismap",
							"itemscope",
							"loop",
							"multiple",
							"muted",
							"nomodule",
							"novalidate",
							"open",
							"playsinline",
							"readonly",
							"required",
							"reversed",
							"selected",
							"truespeed",
						].includes(i) &&
						this.d[i]
					) {
						elems[i] = true;
					} else {
						if (this.d[i] instanceof Function) {
							if (i.startsWith("on")) {
								elems.addEventListener(i.startsWith("on") ? i.substr(2) : i, function (event) {
									this.d[i](event.currentTarget, event);
								});
							} else {
								elems.setAttribute(i, this.d[i]);
							}
						} else {
							elems.setAttribute(i, this.d[i]);
						}
					}
				}
			});
		}

		return elems;
	};
}

class tag {
	constructor(d) {
		d = core.extend(
			{},
			{
				tag: null,
				elem: null,
			},
			d
		);
		this.d = d;
	}

	build = function (container) {
		let hasContainer = container ? true : false;
		container = container || document.createElement("div");

		let element = this.d.tag ? document.createElement(this.d.tag) : container;
		element = new attr(this.d).attach(element);

		if (this.d.elem) {
			if (typeof this.d.elem === "string") {
				element.appendChild(document.createTextNode(this.d.elem));
			} else {
				if (Array.isArray(this.d.elem)) {
					this.d.elem.forEach(function (i) {
						if (typeof i === "string") {
							element.appendChild(document.createTextNode(i));
						} else {
							element = i.build(element);
						}
					});
				} else {
					element = this.d.elem.build(element);
				}
			}
		}

		if (this.d.tag) container.appendChild(element);

		if (hasContainer) {
			return container;
		} else {
			return container.childNodes;
		}
	};

	html = function () {
		let container = document.createElement("div");
		container = build(container);
		return container.innerHTML;
	};
}

class label extends tag {
	constructor(...arg) {
		let t = {};

		if (arg && arg.length === 1 && typeof arg[0] === "string") {
			t.label = arg[0];
		} else if (arg && arg.length === 2) {
			t.icon = arg[0];
			t.label = arg[1];
		} else {
			t = arg[0];
		}

		let d = core.extend(
			{},
			{
				id: null,
				class: null,
				style: null,

				icon: null,
				label: null,
			},
			t
		);

		super({
			id: d.id,
			class: d.class,
			style: d.style,

			elem: d.icon
				? [new icon(d.icon), new tag({ tag: "label", class: "ms-2", elem: d.label })]
				: new tag({ tag: "label", elem: d.label }),
		});
	}
}

class button extends tag {
	constructor(...arg) {
		let t = {};

		if (arg && arg.length === 1 && typeof arg[0] === "string") {
			t.label = arg[0];
		} else if (arg && arg.length === 2) {
			t.label = arg[0];
			t.color = arg[1];
		} else {
			t = arg[0];
		}

		let d = core.extend(
			{},
			{
				id: null,
				class: null,
				style: null,

				type: "button",
				label: "Button",
				hidelabel: false,
				icon: null,
				color: null,
				textcolor: null,
				disabled: false,
				outline: false,
				onclick: null,
			},
			t
		);

		super({
			id: d.id,
			style: d.style,
			tag: "button",
			role: "button",
			type: d.type,
			disabled: d.disabled,
			onclick: d.onclick,
			"aria-label": d.hidelabel && d.label ? d.label : null,
			class: core.merge.class(d.class, [
				"btn",
				d.color ? (d.outline ? `btn-outline-${d.color}` : `btn-${d.color}`) : null,
				d.textcolor ? `text-${d.textcolor}` : null,
			]),
			elem: d.hidelabel ? (d.icon ? new icon(d.icon) : null) : new label(d.icon, d.label),
		});
	}
}

class icon extends tag {
	constructor(...arg) {
		let t = {};
		if (arg && arg.length === 1) {
			if (typeof arg[0] === "string") {
				t = {
					icon: `fas fa-${arg[0]}`,
				};
			} else if (typeof arg[0] === "object" && Array.isArray(arg[0]) && arg[0].length === 2) {
				t = {
					icon: `${arg[0][0]} fa-${arg[0][1]}`,
				};
			} else {
				t = arg[0];
			}
		}

		let d = core.extend(
			{},
			{
				id: null,
				class: null,
				style: null,

				icon: null,
				fixwidth: true,
			},
			t
		);

		super({
			id: d.id,
			style: d.style,
			tag: "i",
			class: core.merge.class(d.class, [d.icon, d.fixwidth ? "fa-fw" : null]),
		});
	}
}
