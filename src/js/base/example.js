"use strict";
import * as core from "./core.js";
import * as cl from "./cl.js";
import * as card from "./card.js";
import accordion from "./accordion.js";
import tag from "./tag.js";
import div from "./div.js";
import label from "./label.js";
import a from "./a.js";
import p from "./p.js";
import code from "./code.js";
import pre from "./pre.js";
import button from "./button.js";
import toast from "./toast.js";

function codecontainer(type, strcode, beautify) {
	return [
		new div({
			position: "relative",
			float: "right",
			elem: new button({
				icon: { type: "far", icon: "clipboard" },
				label: "Copy",
				hidelabel: true,
				textcolor: "primary",
				align: "end",
				padding: 1,
				class: "position-absolute end-0",
				onclick: function (event) {
					let str = event.currentTarget.parentElement.nextSibling.firstChild.innerText;

					try {
						navigator.clipboard.writeText(str);
						new toast("/", "Copied to clipboard").show();
					} catch (ex) {
						new toast("!!", `Error when copy code to clipboard. ${ex}`).show();
					}
				},
			}),
		}),
		new code({
			overflow: "auto",
			display: "block",
			elem: new pre({
				class: `prettyprint lang-${type}`,
				attr: { lang: type },
				elem: beautify(strcode),
			}),
		}),
	];
}

const defaultOption = {
	title: null,
	msg: null,
	label: null,
	anchor: true,
	code: null,
	dark: false,
	sample: null,

	viewclass: null,

	beautifyhtml: function (str) {
		return str;
	},
	beautifyjs: function (str) {
		return str;
	},

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
				tag: opt.code ? "h3" : opt.anchor ? "h2" : "h1",
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

		if (opt.code) {
			item.push({
				// color: "light",
				label: "html",
				icon: "code",
				elem: codecontainer("html", cl.html(opt.code()), opt.beautifyhtml),
			});
		}

		if (opt.sample) {
			Object.keys(opt.sample).forEach((sampleKey) => {
				item.push({
					// color: "light",
					label: sampleKey,
					icon: "link",
					elem: codecontainer("js", opt.sample[sampleKey].toString(), opt.beautifyjs),
				});
			});
		}

		if (opt.code) {
			item.push({
				// color: "light",
				label: "code",
				icon: "fire",
				active: true,
				elem: codecontainer("js", opt.code.toString(), opt.beautifyjs),
			});
		}

		super.data = {
			marginbottom: 5,
			elem: [
				ctltitle,
				ctlmsg ? new div({ elem: ctlmsg }) : null,
				opt.code
					? new card.container({
							rounded: ["top", "0"],
							border: "bottom-0",
							color: opt.dark ? "dark" : null,
							class: opt.viewclass,
							elem: new card.body({ elem: opt.container(opt.code()) }),
					  })
					: null,
				opt.code
					? new accordion({
							border: true,
							flush: true,
							autoclose: false,
							item: item,
					  })
					: null,
			],
		};
	}
}
