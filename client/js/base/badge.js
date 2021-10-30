import * as core from "./core.js";
import label from "./label.js";
import span from "./span.js";

/**
 * label,color,pill
 * label,color
 * label
 * option
 */
export default class badge extends span {
	constructor(...arg) {
		super();

		if (arg && arg.length > 0) {
			let t = {};
			if (arg.length === 3) {
				t = {
					label: arg[0],
					color: arg[1],
					pill: arg[2],
				};
			} else if (arg.length === 2) {
				t = {
					label: arg[0],
					color: arg[1],
				};
			} else if (arg.length === 1 && typeof arg[0] === "string") {
				t = {
					label: arg[0],
				};
			} else {
				t = arg[0];
			}

			this.data = core.extend(
				{},
				{
					attr: null,

					label: null,
					asst: null,
					icon: null,

					notification: false,
					pill: false,
					color: "secondary",
					textcolor: null,
					bordercolor: null,
				},
				t
			);
		}
	}

	get data() {
		return this._d;
	}
	set data(d) {
		if (d) {
			this._d = {
				attr: d.attr,
				class: [
					"badge",
					d.color ? `bg-${d.color}` : null,
					d.textcolor ? `text-${d.textcolor}` : null,
					d.pill ? "rounded-pill" : null,
					d.notification ? "position-absolute top-0 start-100 translate-middle" : null,
					!d.label && !d.icon ? "rounded-circle p-2" : null,
					d.bordercolor ? `border border-${d.bordercolor}` : null,
				],
				elem: [
					d.label || d.icon
						? new label({
								label: d.label,
								icon: d.icon,
						  })
						: null,
					d.asst
						? new span("visually-hidden", d.asst)
						: !d.label && !d.icon
						? new span("Notification", d.asst)
						: null,
				],
			};
		} else {
			this._d = null;
		}

		super.data = this._d;
	}
}
