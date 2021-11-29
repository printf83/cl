import * as core from "./core.js";
import label from "./label.js";
import span from "./span.js";

/**
 * label,color,pill
 * label,color
 * label
 * opt : {attr,label,asst,icon,notification,pill,color,textcolor,bordercolor}
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
			} else if (arg.length === 1) {
				t = arg[0];
			} else {
				console.error("Unsupported argument", arg);
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
				name: d.name,
				attr: d.attr,
				style: d.style,

				align: d.align,
				color: d.color,
				textcolor: d.textcolor,
				bordercolor: d.bordercolor,
				border: d.border,

				onclick: d.onclick,
				onchange: d.onchange,
				onfocus: d.onfocus,
				onblur: d.onblur,

				class: [
					"badge",
					d.pill ? "rounded-pill" : null,
					d.notification ? "position-absolute top-0 start-100 translate-middle" : null,
					!d.label && !d.icon ? "rounded-circle p-2" : null,
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
			super.data = null;
		}
	}
}
