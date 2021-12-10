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

function codecontainer(type, code, beautify) {
	return new tag({
		tag: "code",
		overflow: "auto",
		display: "block",
		elem: new tag({
			tag: "pre",
			class: `prettyprint lang-${type}`,
			attr: { lang: type },
			elem: beautify(code),
		}),
	});
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
};
/**
 * opt : {tagoption,icon,label}
 */
export default class example extends div {
	constructor(opt) {
		super(opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		let ctltitle = null;
		if (opt.title) {
			ctltitle = new tag({
				tag: opt.code ? "h3" : opt.anchor ? "h2" : "h1",
				class: !opt.anchor ? "fs-1" : null,
				paddingTop: 3,
				id: opt.id,
				elem: [
					new label({ label: opt.title }),
					opt.anchor
						? new a({
								class: "anchorjs-link",
								paddingStart: 2,
								attr: {
									"aria-label": "Anchor",
									"data-anchorjs-icon": "#",
									onclick: function (event) {
										core.focus(event.currentTarget.parent());
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
					return new p({ class: opt.anchor ? null : "fw-lighter fs-5", elem: i });
				} else {
					return i;
				}
			});
		}

		let item = [];

		if (opt.code) {
			item.push({
				color: "light",
				label: "html",
				elem: codecontainer("html", cl.html(opt.code()), opt.beautifyhtml),
			});
		}

		if (opt.sample) {
			Object.keys(opt.sample).forEach((sampleKey) => {
				item.push({
					color: "light",
					label: sampleKey,
					elem: codecontainer("js", opt.sample[sampleKey].toString(), opt.beautifyjs),
				});
			});
		}

		if (opt.code) {
			item.push({
				color: "light",
				label: "code",
				active: true,
				elem: codecontainer("js", opt.code.toString(), opt.beautifyjs),
			});
		}

		super.data = {
			elem: [
				ctltitle,
				ctlmsg ? new div({ elem: ctlmsg }) : null,
				opt.code
					? new card.container({
							rounded: "top",
							border: "bottom-0",
							class: "rounded-0",
							elem: new card.body({ elem: opt.code() }),
					  })
					: null,
				opt.code
					? new accordion({
							border: true,
							flush: true,
							item: item,
					  })
					: null,
			],
		};
	}
}
