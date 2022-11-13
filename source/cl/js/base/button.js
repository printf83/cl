"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
// import badge from "./badge.js";

const defaultOption = {
	tag: "button",
	type: "button",

	label: null,
	showlabel: null,
	hidelabel: false,
	iconafter: false,
	icon: null,

	// badge: null,

	weight: null,
	outline: false,
	color: null,

	toggle: false,
};

export default class button extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			let bI = core.getBaseIcon(opt.icon);
			if (bI) {
				opt.icon = {
					icon: bI.icon,
					type: bI.type,
				};

				opt.color = opt.color || bI.color;
			}

			if (opt.placeholder || opt.disabled) {
				opt.disabled = opt.disabled || true;
			}

			if (opt.type === "checkbox" || opt.type === "radio") {
				opt.outline = opt.outline || true;
			}

			if (opt.color === "transparent") {
				opt.border = opt.border || false;
				opt.shadow = opt.shadow || false;
				opt.textBgColor = opt.textBgColor || opt.color;
			}

			if (opt.href) {
				opt.tag = "a";
				opt.role = "button";
				opt.textDecoration = opt.textDecoration || "none";
			} else if (opt.color || opt.outline || opt.weight) {
				opt.tag = "button";
			} else {
				opt.tag = "div";
				opt.role = "button";
			}

			// if (opt.badge && typeof opt.badge === "object" && opt.badge.notification) {
			// 	opt.position = opt.position || "relative";
			// }

			if (opt.toggle) {
				opt["data-bs-toggle"] = opt["data-bs-toggle"] ? opt["data-bs-toggle"] : "button";
			}

			if (opt.href || opt.type === "checkbox" || opt.type === "radio") {
				opt.type = opt.type || null;
			}

			opt = core.merge(opt, {
				class: [
					opt.color || opt.outline || opt.weight ? "btn" : null,
					opt.weight ? `btn-${opt.weight}` : null,
					opt.color ? (opt.outline ? `btn-outline-${opt.color}` : `btn-${opt.color}`) : null,
					opt.toggle && opt.active ? "active" : null,
					opt.floating ? "btn-floating" : null,
				],
				autocomplete: opt.toggle ? "off" : null,
				"aria-pressed": opt.toggle && opt.active ? "true" : null,
				"aria-label": opt.hidelabel && opt.label ? opt.label : null,
			});

			//build checkbox or radio
			let toggle_label = null;
			if (opt.type === "checkbox" || opt.type === "radio") {
				//convert the opt to checkbox or radio and inherit
				//button class and style we edit before

				//id required
				opt.id = opt.id || core.UUID();

				//create label for input check or radio
				toggle_label = new label({
					//move badge, tooltip and popover into label
					badge: opt.badge,
					tooltip: opt.tooltip,
					popover: opt.popover,

					for: opt.id,
					class: opt.class,
					elem: [
						opt.label || opt.icon
							? new label({
									showlabel: opt.showlabel,
									hidelabel: opt.hidelabel,
									iconafter: opt.iconafter,
									label: opt.label,
									icon: opt.icon,
							  })
							: null,
						// opt.badge ? new badge(opt.badge) : null,
					],
				});

				//change the opt type to checkbox or radio
				opt.tag = "input";
				opt.class = "btn-check";
				opt.autocomplete = opt.autocomplete || "off";

				//delete badge,tooltip and popover
				delete opt.badge;
				delete opt.tooltip;
				delete opt.popover;
			} else {
				if (!opt.elem) {
					opt.elem = [
						opt.label || opt.icon
							? new label({
									showlabel: opt.showlabel,
									hidelabel: opt.hidelabel,
									iconafter: opt.iconafter,
									label: opt.label,
									icon: opt.icon,
							  })
							: null,
						// opt.badge ? new badge(opt.badge) : null,
					];
				}
			}

			delete opt.label;
			delete opt.showlabel;
			delete opt.hidelabel;
			delete opt.iconafter;
			delete opt.icon;

			delete opt.weight;
			delete opt.outline;
			delete opt.color;

			delete opt.toggle;

			if (toggle_label) {
				// toggle_label = core.attachBadge(toggle_label);
				// delete opt.badge;

				super.data = {
					elem: [new tag(opt), toggle_label],
				};
			} else {
				// opt = core.attachBadge(opt);
				// delete opt.badge;

				super.data = opt;
			}
		}
	}
}
