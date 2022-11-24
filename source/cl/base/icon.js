"use strict";

//disable this if you not using webpack
import css from "./css/icon.css";
//-------------------------------------

import * as core from "./core.js";
import tag from "./tag.js";

const defaultOption = {
	tag: "i",
	type: "fas", //"fas",
	icon: null,
	weight: null,
	fixwidth: true,
	beat: false,
	fade: false,
	bounce: false,
	flip: false,
	shake: false,
	spin: false,
	rotate: null,
	color: null,
	inverse: false,
	elem: null,
	stack: 0,
};
/**
 * opt : {tagoption,type,icon,weight,fixwidth,spin,rotate,color,inverse,elem,stack}
 */

const isImage = (str) => {
	if (str) {
		if (
			str.startsWith("/") ||
			str.startsWith("./") ||
			str.startsWith("../") ||
			str.startsWith("http://") ||
			str.startsWith("https://")
		) {
			return true;
		}
	}

	return false;
};

const isSVG = (str) => {
	try {
		if (str) {
			if (str.startsWith("<svg")) {
				return true;
			}
		}

		return false;
	} catch (ex) {
		console.error(ex.message);
		console.log("str", str);
		return false;
	}
};

const editSVG = (color, str) => {
	//default color
	color = color || `body-color`;

	//find color
	let varcolor = getComputedStyle(document.body).getPropertyValue(`--bs-${color}`);

	//find fill in path
	//then replace it
	str = str.replace(/fill\=\"\S+\"/g, `fill="${varcolor.trim()}"`);

	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(str)}`;
};

export default class icon extends tag {
	clicon = 1;

	constructor(...opt) {
		super();
		if (opt && opt.length > 0) {
			let t = {
				type: null,
				icon: null,
			};

			t = core.args(
				[
					{
						rule: ["string", "string"],
						fn: () => {
							return {
								type: opt[0],
								icon: opt[1],
							};
						},
					},
					{
						rule: ["string"],
						fn: () => {
							return {
								type: "fas",
								icon: opt[0],
							};
						},
					},
					{
						rule: ["object"],
						fn: () => {
							return opt[0];
						},
					},
				],
				"icon",
				opt
			);

			this.data = core.extend({}, defaultOption, t);
		} else {
			this.data = null;
		}
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		if (opt) {
			opt = core.extend({}, defaultOption, opt);

			//baseicon
			let bI = core.getBaseIcon(opt.icon);
			if (bI) {
				opt.icon = bI.icon;
				opt.color = opt.color || bI.color;
				opt.type = bI.type ? bI.type : opt.type;
			}

			let rotate = null;
			switch (opt.rotate) {
				case 90:
				case 180:
				case 270:
					rotate = `fa-rotate-${opt.rotate}`;
					break;
				case "horizontal":
				case "vertical":
				case "both":
					rotate = `fa-flip-${opt.rotate}`;
					break;
			}

			opt = core.merge(opt, {
				class: [
					opt.weight ? `fa-${opt.weight}` : null,
					opt.fixwidth ? "fa-fw" : null,
					opt.spin ? "fa-spin" : null,
					!opt.beat && opt.fade ? "fa-fade" : null,
					opt.beat && !opt.fade ? "fa-beat" : null,
					opt.beat && opt.fade ? "fa-beat-fade" : null,
					opt.bounce ? "fa-bounce" : null,
					opt.flip ? "fa-flip" : null,
					opt.shake ? "fa-shake" : null,
					opt.elem ? "fa-stack" : null,
					opt.stack > 0 ? `fa-stack-${opt.stack}x` : null,
					opt.inverse ? "fa-inverse" : null,
					rotate,
				],
			});

			if (isSVG(opt.icon)) {
				opt = core.merge(opt, {
					tag: "img",
					class: "fa-cl-svg",
					src: editSVG(opt.color, opt.icon),
				});
			} else if (isImage(opt.icon)) {
				opt = core.merge(opt, {
					tag: "img",
					class: "fa-cl-image",
					src: opt.icon,
				});
			} else {
				opt = core.merge(opt, {
					textColor: opt.color,
					class: [opt.type ? opt.type : null, opt.icon ? `fa-${opt.icon}` : null],
				});
			}

			delete opt.type;
			delete opt.icon;
			delete opt.weight;
			delete opt.fixwidth;
			delete opt.beat;
			delete opt.fade;
			delete opt.bounce;
			delete opt.flip;
			delete opt.shake;
			delete opt.spin;
			delete opt.rotate;
			delete opt.color;
			delete opt.inverse;
			delete opt.stack;

			super.data = {
				tag: "span",
				class: "cl-icon-container",
				elem: new tag(opt),
			};

			// super.data = opt;
		}
	}
}
