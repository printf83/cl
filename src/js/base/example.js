"use strict";
// import "../../css/anchor.css";

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
	codecollapse: true,
	dark: false,
	sample: null,
	source: null,
	view: true,
	viewclass: null,
	container: (elem) => {
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
										: (event) => {
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

			ctlmsg = opt.msg.map((i) => {
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
				label: "Generated HTML",
				icon: "code",
				// elem: new codepreview({ type: "html", code: html, container: null }),
				onshow: (sender) => {
					if (!sender.getAttribute("data-loaded")) {
						core.replaceChild(
							sender.firstChild,
							new codepreview({ type: "html", code: core.html(opt.code()), container: null })
						);
						PR.prettyPrint();
						sender.setAttribute("data-loaded", "true");
					}
				},
			});
		}

		if (opt.sample) {
			Object.keys(opt.sample).forEach((sampleKey) => {
				item.push({
					label: sampleKey,
					icon: "link",
					//elem: new codepreview({ type: "js", code: opt.sample[sampleKey].toString(), container: null }),
					onshow: (sender) => {
						if (!sender.getAttribute("data-loaded")) {
							core.replaceChild(
								sender.firstChild,
								new codepreview({
									type: "js",
									code: opt.sample[sampleKey].toString(),
									container: null,
								})
							);
							PR.prettyPrint();
							sender.setAttribute("data-loaded", "true");
						}
					},
				});
			});
		}

		if (opt.source) {
			item.push({
				label: "Source Code",
				icon: "fire",
				active: !opt.codecollapse,
				// elem: new codepreview({ type: "js", code: opt.source.join(`\n`), container: null }),
				onshow: (sender) => {
					if (!sender.getAttribute("data-loaded")) {
						core.replaceChild(
							sender.firstChild,
							new codepreview({ type: "js", code: opt.source.join(`\n`), container: null })
						);
						PR.prettyPrint();
						sender.setAttribute("data-loaded", "true");
					}
				},
			});
		}

		// if (opt.code) {
		// 	item.push({
		// 		label: "code",
		// 		icon: "fire",
		// 		active: !opt.codecollapse,
		// 		elem: new codepreview({ type: "js", code: `let code = ${opt.code.toString()}`, container: null }),
		// 	});
		// }

		super.data = {
			marginbottom: 5,
			elem: [
				ctltitle,
				ctlmsg ? new div({ elem: ctlmsg }) : null,
				opt.code && opt.view
					? new card.container({
							marginbottom: 3,
							color: opt.dark ? "dark" : null,
							class: opt.viewclass,
							elem: new card.body({ elem: opt.container(opt.code()) }),
					  })
					: null,
				opt.code
					? new accordion({
							autoclose: false,
							autoopen: false,
							item: item,
					  })
					: null,
			],
		};
	}
}
