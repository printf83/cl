"use strict";
import * as core from "./core.js";
import tag from "./tag.js";
import label from "./label.js";
import badge from "./badge.js";

const defaultOption = {
	tag: "button",
	type: "button",

	label: null,
	showlabel: null,
	hidelabel: false,
	iconafter: false,
	icon: null,

	badge: null,

	weight: null,
	outline: false,
	color: null,

	toggle: false,
};

/**
 * option : {tagoption,type,label,icon,badge,value,checked,color,weight,disabled,outline,hidelabel,nowrap,elem}
 */
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
				opt["aria-disabled"] = opt["aria-disabled"] || "true";
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

			if (opt.badge && typeof opt.badge === "object" && opt.badge.notification) {
				opt.position = opt.position || "relative";
			}

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
					opt.disabled ? "disabled" : null,
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

				//change the opt type to checkbox
				opt = core.merge(opt, {
					tag: "input",
					class: "btn-check",
					autocomplete: opt.autocomplete || "off",
				});

				//create label for input check or radio
				toggle_label = new label({
					for: opt.id,
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
						opt.badge ? new badge(opt.badeg) : null,
					],
				});
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
						opt.badge ? new badge(opt.badeg) : null,
					];
				}
			}

			delete opt.label;
			delete opt.showlabel;
			delete opt.hidelabel;
			delete opt.iconafter;
			delete opt.icon;

			delete opt.badge;

			delete opt.weight;
			delete opt.outline;
			delete opt.color;

			delete opt.toggle;

			if (toggle_label) {
				super.data = {
					elem: [toggle_label, new tag(opt)],
				};
			} else {
				super.data = opt;
			}
		}
	}
}

// "use strict";
// import * as core from "./core.js";
// import tag from "./tag.js";
// import label from "./label.js";
// import badge from "./badge.js";

// const defaultOption = {
// 	tag: "button",

// 	type: "button",
// 	label: null,
// 	icon: null,
// 	badge: null,
// 	value: null,

// 	toggle: false,
// 	checked: false,
// 	autofocus: null,

// 	color: null,
// 	textBgColor: null,
// 	weight: null,
// 	disabled: false,
// 	outline: false,
// 	hidelabel: false,
// 	showlabel: null,
// 	iconafter: false,
// 	textWarp: false,
// 	floating: false,

// 	placeholder: null,

// 	elem: null,
// };

// /**
//  * option : {tagoption,type,label,icon,badge,value,checked,color,weight,disabled,outline,hidelabel,nowrap,elem}
//  */
// export default class button extends tag {
// 	constructor(...opt) {
// 		super(...opt);
// 	}

// 	get data() {
// 		return super.data;
// 	}
// 	set data(opt) {
// 		if (opt) {
// 			opt = core.extend({}, defaultOption, opt);

// 			let bI = core.getBaseIcon(opt.icon);
// 			if (bI) {
// 				opt.icon = {
// 					icon: bI.icon,
// 					type: bI.type,
// 				};

// 				opt.color = opt.color || bI.color;
// 			}

// 			if (opt.placeholder) {
// 				opt.disabled = true;
// 			}

// 			if (opt.type === "checkbox" || opt.type === "radio") {
// 				opt.outline = true;
// 			}

// 			if (opt.color === "transparent") {
// 				if (!opt.border) opt.border = false;
// 				if (!opt.shadow) opt.shadow = false;
// 				if (!opt.textBgColor) opt.textBgColor = opt.color;
// 			}

// 			opt = core.merge(opt, {
// 				tag: opt.href ? "a" : opt.color || opt.outline || opt.weight ? "button" : "div",
// 				class: [
// 					opt.type === "a" ? "text-decoration-none" : opt.color || opt.outline || opt.weight ? "btn" : null,
// 					opt.weight ? `btn-${opt.weight}` : null,
// 					opt.toggle && opt.active ? "active" : null,
// 					opt.floating ? "btn-floating" : null,
// 				],

// 				position: opt.position
// 					? opt.position
// 					: opt.badge && typeof opt.badge === "object" && opt.badge.notification
// 					? "relative"
// 					: null,
// 				btnColor: !opt.outline ? opt.color : null,
// 				btnOutlineColor: opt.outline ? opt.color : null,
// 				value: opt.value,
// 				checked: opt.checked,
// 				role: opt.href || opt.type !== "button" ? "button" : null,
// 				disabled: opt.disabled,
// 				type: opt.href || opt.type === "checkbox" || opt.type === "radio" ? null : opt.type,
// 				"data-bs-toggle": opt.toggle ? "button" : null,
// 				autocomplete: opt.toggle ? "off" : null,
// 				autofocus: opt.autofocus,
// 				ariaPressed: opt.toggle && opt.active ? "true" : null,
// 				ariaLabel: opt.hidelabel && opt.label ? opt.label : null,
// 				ariaDisabled: opt.href && opt.disabled ? "true" : null,
// 			});

// 			// opt.class = core.merge.class(opt.class, [
// 			// 	opt.type === "a" ? "text-decoration-none" : opt.color || opt.outline || opt.weight ? "btn" : null,
// 			// 	opt.nowrap ? "text-nowrap" : null,
// 			// 	opt.weight ? `btn-${opt.weight}` : null,
// 			// 	opt.color ? (opt.outline ? `btn-outline-${opt.color}` : `btn-${opt.color}`) : null,
// 			// 	opt.toggle && opt.active ? "active" : null,
// 			// 	opt.floating ? "btn-floating" : null,
// 			// ]);

// 			// opt.position = opt.position
// 			// 	? opt.position
// 			// 	: opt.badge && typeof opt.badge === "object" && opt.badge.notification
// 			// 	? "relative"
// 			// 	: null;

// 			// opt.attr = core.merge.attr(opt.attr, {
// 			// 	value: opt.value,
// 			// 	checked: opt.checked,
// 			// 	role: opt.href || opt.type !== "button" ? "button" : null,
// 			// 	disabled: opt.disabled,
// 			// 	type: opt.href || opt.type === "checkbox" || opt.type === "radio" ? null : opt.type,
// 			// 	"data-bs-toggle": opt.toggle ? "button" : null,
// 			// 	autocomplete: opt.toggle ? "off" : null,
// 			// 	autofocus: opt.autofocus,
// 			// 	"aria-pressed": opt.toggle && opt.active ? "true" : null,
// 			// 	"aria-label": opt.hidelabel && opt.label ? opt.label : null,
// 			// 	"aria-disabled": opt.href && opt.disabled ? "true" : null,
// 			// });

// 			let m = null;
// 			if (opt.type === "checkbox" || opt.type === "radio") {
// 				m = core.extend({}, opt);

// 				m.id = m.id || core.UUID();
// 				opt.id = m.id;

// 				m.tag = "input";
// 				m.class = "btn-check";
// 				opt.autocomplete = "off";

// 				m = new tag(m);

// 				opt = core.merge(opt, {
// 					tag: "label",
// 					for: opt.id,
// 					elem: [
// 						new label({ icon: opt.icon, label: opt.label, hidelabel: opt.hidelabel }),
// 						opt.badge ? new badge(opt.badge) : null,
// 					],
// 				});
// 			} else {
// 				opt.elem = opt.elem
// 					? opt.elem
// 					: [
// 							opt.label || opt.icon
// 								? new label({
// 										icon: opt.icon,
// 										label: opt.label,
// 										hidelabel: opt.hidelabel,
// 										showlabel: opt.showlabel,
// 										iconafter: opt.iconafter,
// 								  })
// 								: null,
// 							opt.badge ? new badge(opt.badge) : null,
// 					  ];
// 			}

// 			// delete opt.type;
// 			delete opt.label;
// 			delete opt.icon;
// 			delete opt.badge;
// 			delete opt.value;
// 			delete opt.checked;

// 			delete opt.color;
// 			delete opt.weight;
// 			delete opt.disabled;
// 			delete opt.outline;
// 			delete opt.hidelabel;
// 			delete opt.showlabel;
// 			delete opt.iconafter;
// 			delete opt.textWarp;
// 			delete opt.floating;

// 			delete opt.toggle;

// 			if (m) {
// 				super.data = {
// 					elem: [m, new tag(opt)],
// 				};
// 			} else {
// 				super.data = opt;
// 			}
// 		}
// 	}
// }
