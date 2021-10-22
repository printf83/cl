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

		for (var i = 1; i < arguments.length; i++) {
			if (!arguments[i]) continue;

			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
			}
		}

		return out;
	},
};

class attr {
	constructor(d) {
		d = core.extend(
			{},
			{
				class: null,
				style: null,
				data: null,
			},
			d
		);

		this.d = d;
	}

	attach = function (elems) {
		if (elems) {
			Object.keys(this.d).forEach((i) => {
				if ((this.d[i] || this.d[i] === "") && this.d[i] !== null) {
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
					} else if (i === "data") {
						Object.keys(this.d[i]).forEach((j) => {
							if (this.d[i][j]) elems.setAttribute(`data-${j}`, this.d[i][j]);
						});
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
				tag: "div",
				attr: null,
				elem: null,
			},
			d
		);
		this.d = d;
	}

	build = function (container) {
		let hasContainer = container ? true : false;
		container = container || document.createElement("div");

		let element = document.createElement(this.d.tag);
		if (this.d.attr) {
			element = new attr(this.d.attr).attach(element);
		}

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

		container.appendChild(element);

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

class button extends tag {
	constructor(d) {
		d = core.extend(
			{},
			{
				type: "button",
				label: "Button",
				icon: null,
				color: null,
				textcolor: null,
				outline: false,
				onclick: null,
			},
			d
		);

		let e = {
			tag: "button",
			attr: {
				role: "button",
				type: d.type,
				onclick: d.onclick,
				class: [
					"btn",
					d.color ? (d.outline ? `btn-outline-${d.color}` : `btn-${d.color}`) : null,
					d.textcolor ? `text-${d.textcolor}` : null,
				],
			},
			elem: d.icon
				? [new icon(d.icon), new tag({ tag: "label", attr: { class: "ms-2" }, elem: d.label })]
				: d.label,
		};

		super(e);
	}
}

class icon extends tag {
	constructor(d) {
		d = core.extend(
			{},
			{
				style: "fas",
				icon: null,
			},
			d
		);

		let e = {
			tag: "i",
			attr: {
				class: [d.style, `fa-${d.icon}`],
			},
		};

		super(e);
	}
}
