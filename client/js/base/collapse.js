import * as core from "./core.js";
import tag from "./tag.js";
import div from "./div.js";

/**
 * elem, target
 * elem, opt : {attr,target,show}
 * target example : "#id", ".class"
 */
export class toggle extends tag {
	constructor(elem, ...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				target: null,
			};

			if (arg.length === 1 && typeof arg[0] === "string") {
				t = {
					target: arg[0],
				};
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					_target: elem,

					attr: null,
					target: null,
					show: false,
				},
				t
			);
		} else {
			this.data = { _target: elem };
		}
	}

	get data() {
		return super.data;
	}
	set data(d) {
		if (d && d._target) {
			super.data = d._target.data;

			super.data.attr = core.merge.attr(super.data.attr, {
				"aria-controls": d.target,
				"aria-expanded": d.show ? "true" : "false",
				"data-bs-target": d.target,
				"data-bs-toggle": "collapse",
			});
		} else {
			super.data = null;
		}
	}
}

/**
 * elem, id
 * elem, opt : {attr,id,show}
 *
 * target example : "#id", ".class"
 */
export class container extends tag {
	constructor(elem, ...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {
				id: null,
			};

			if (arg.length === 1 && typeof arg[0] === "string") {
				t = {
					id: arg[0],
				};
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
			}

			this.data = core.extend(
				{},
				{
					_target: elem,

					attr: null,
					id: null,
					class: null,
					show: false,
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
		if (d && d._target) {
			super.data = {
				elem: new div({
					attr: core.merge.attr(d.attr, {
						id: d.id,
						class: core.merge.class(d.class, ["collapse", d.show ? "show" : null]),
					}),
					elem: d._target,
				}),
			};
		} else {
			super.data = null;
		}
	}
}
