"use strict";
import "../../css/anchor.css";

import * as core from "./core.js";
import * as card from "./card.js";
import accordion from "./accordion.js";
import tag from "./tag.js";
import div from "./div.js";
import label from "./label.js";
import a from "./a.js";
import p from "./p.js";
import codepreview from "./codepreview.js";

const defaultOption = {
	title: null,
	msg: null,
	label: null,
	anchor: true,
	code: null,
	dark: false,
	sample: null,
	view: true,
	viewclass: null,
	container: function (elem) {
		return elem;
	},

	debug: false,
};
/**
 * opt : {tagoption,icon,label}
 */
export default class example extends div {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		if (opt.title && !opt.code) {
			opt.anchor = opt.anchor === null ? false : opt.anchor;
		}

		let ctltitle = null;
		if (opt.title) {
			ctltitle = new tag({
				tag:
					opt.code || (opt.msg && Array.isArray(opt.msg) && opt.msg.length >= 3)
						? "h3"
						: opt.anchor
						? "h2"
						: "h1",
				class: !opt.anchor ? "fs-1" : null,
				paddingtop: 3,
				id: opt.id,
				elem: [
					new label({ label: opt.title.replace(/\{\{/g, "<code>").replace(/\}\}/g, "</code>") }),
					opt.anchor
						? new a({
								class: ["anchorjs-link", opt.debug ? "anchorjs-link-debug" : null],
								paddingstart: 2,
								attr: {
									"aria-label": "Anchor",
									"data-anchorjs-icon": "#",
									onclick: opt.debug
										? null
										: function (event) {
												core.focusElement(event.currentTarget.parentNode);
										  },
								},
						  })
						: null,
				],
			});
		}

		let ctlmsg = null;
		if (opt.msg) {
			ctlmsg = [];

			opt.msg = Array.isArray(opt.msg) ? opt.msg : [opt.msg];

			ctlmsg = opt.msg.map(function (i) {
				if (typeof i === "string") {
					return new p({
						class: opt.anchor || opt.msg.length >= 3 ? null : "fw-lighter fs-5",
						elem: i.replace(/\{\{/g, "<code>").replace(/\}\}/g, "</code>"),
					});
				} else {
					return i;
				}
			});
		}

		let item = [];

		if (opt.code && opt.view) {
			item.push({
				label: "html",
				icon: "code",
				elem: new codepreview({ type: "html", code: core.html(opt.code()), container: null }),
			});
		}

		if (opt.sample) {
			Object.keys(opt.sample).forEach((sampleKey) => {
				item.push({
					label: sampleKey,
					// label: opt.sample[sampleKey].name(),
					icon: "link",
					elem: new codepreview({ type: "js", code: opt.sample[sampleKey].toString(), container: null }),
				});
			});
		}

		if (opt.code) {
			item.push({
				label: "code",
				icon: "fire",
				active: true,
				elem: new codepreview({ type: "js", code: opt.code.toString(), container: null }),
			});
		}

		super.data = {
			marginbottom: 5,
			elem: [
				ctltitle,
				ctlmsg ? new div({ elem: ctlmsg }) : null,
				opt.code && opt.view
					? new card.container({
							// rounded: ["top", "0"],
							marginbottom: 3,
							color: opt.dark ? "dark" : null,
							class: opt.viewclass,
							elem: new card.body({ elem: opt.container(opt.code()) }),
					  })
					: null,
				opt.code
					? new accordion({
							// border: opt.view ? ["top-0", "border"] : false,
							// flush: opt.view ? true : false,
							autoclose: false,
							item: item,
					  })
					: null,
			],
		};
	}
}
