"use strict";

//disable this if you not using webpack
import css from "./css/codepreview.css";
import css2 from "./css/prettify.css";
//-------------------------------------

import * as core from "./core.js";
import * as card from "./card.js";
import tag from "./tag.js";
import div from "./div.js";
import code from "./code.js";
import pre from "./pre.js";
import button from "./button.js";
import toast from "./toast.js";
import small from "./small.js";
import b from "./b.js";
import modal from "./modal.js";

// const LIBNAME = /component.Z./g;
// const LIBNAME2 = /_component_js__WEBPACK_IMPORTED_MODULE_0__.Z./g;
// const SAMPLELIBNAME = /doc_sample.Z./g;
// const FNNAME = /list_fn./g;

function beautifyjs(str) {
	let opt = {
		preserve_newlines: true,
		end_with_newline: true,
		brace_style: "collapse",
	};

	// str = str.replace(LIBNAME2, "$.");
	// str = str.replace(LIBNAME, "$.");
	// str = str.replace(SAMPLELIBNAME, "sample.");
	// str = str.replace(FNNAME, "fn.");

	return js_beautify(str, opt);
}

function beautifyhtml(str) {
	let opt = {
		indent_inner_html: true,
		preserve_newlines: false,
		end_with_newline: true,
		indent_size: 4,
	};

	str = str.replace(/\>/g, ">\n");
	str = str.replace(/\</g, "\n<");
	return html_beautify(str, opt);
}

function beautifycss(str) {
	return beautifyhtml(str);
}

function codecontainer(type, strcode, maxHeight, linenums, allowrun, allowcopy) {
	let btn = [
		allowrun
			? new button({
					icon: { type: "fas", icon: "bolt" },
					label: "Run",
					hidelabel: true,
					textColor: "warning",
					display: "inline-block",
					click: (event) => {
						let id = core.UUID();
						let str = event.currentTarget.closest(".cl-codepreview-ctl").nextSibling.firstChild.innerText;

						// str = str.replace(/\.\/dist/g, "http://localhost:8081/src/dist");
						str = str.replace(/\.\/dist/g, "./src/dist");

						new modal({
							icon: null,
							title: null,
							button: null,
							static: false,
							size: "lg",
							bodyclass: "p-1",
							elem: new div({
								class: "ratio ratio-16x9",
								rounded: true,
								border: true,
								overflow: "hidden",
								elem: new tag({
									tag: "iframe",
									id: id,
									sandbox: "allow-forms allow-popups allow-scripts allow-same-origin",
									src: `run?q=${encodeURIComponent(str)}`,
								}),
							}),
						}).show();
					},
			  })
			: null,
		allowcopy
			? new button({
					icon: { type: "far", icon: "clipboard" },
					label: "Copy",
					hidelabel: true,
					textColor: "primary",
					display: "inline-block",
					click: (event) => {
						let str = event.currentTarget.closest(".cl-codepreview-ctl").nextSibling.firstChild.innerText;

						try {
							navigator.clipboard.writeText(str);
							new toast("/", "Copied to clipboard").show();
						} catch (ex) {
							new toast("!!", `Error when copy code to clipboard. ${ex}`).show();
						}
					},
			  })
			: null,
	];

	return [
		allowrun || allowcopy
			? new div({
					position: "relative",
					float: "end",
					class: "cl-codepreview-ctl",
					elem: new div({ align: "end", position: "absolute", end: 0, display: "flex", gap: 2, elem: btn }),
			  })
			: null,
		new code({
			overflow: "auto",
			display: "block",
			maxHeight: maxHeight,
			elem: new pre({
				class: [
					"prettyprint",
					`lang-${type}`,
					linenums ? `${"linenums:" + (linenums === true ? 1 : linenums)}` : null,
				],
				margin: 0,
				lang: type,
				elem:
					type === "js"
						? beautifyjs(strcode)
						: type === "html"
						? beautifyhtml(strcode)
						: type === "css"
						? beautifycss(strcode)
						: null,
			}),
		}),
	];
}

const defaultOption = {
	code: null,
	type: "js",
	linenums: null,
	container: "div",
	title: null,
	maxHeight: null,
	marginY: 3,
	allowrun: false,
	allowcopy: true,
};
/**
 * opt : {tagoption,icon,label}
 */
export default class codepreview extends tag {
	constructor(...opt) {
		super(...opt);
	}

	get data() {
		return super.data;
	}
	set data(opt) {
		opt = core.extend({}, defaultOption, opt);

		if (opt.title) {
			opt.container = "card";
		}

		if (opt.container === "div") {
			super.data = {
				elem: [
					new div({
						marginY: opt.marginY,
						elem: new card.body({
							elem: codecontainer(
								opt.type,
								opt.code,
								opt.maxHeight,
								opt.linenums,
								opt.allowrun,
								opt.allowcopy
							),
						}),
					}),
				],
			};
		} else if (opt.container === "card") {
			super.data = {
				elem: [
					new card.container({
						marginY: opt.marginY,
						elem: [
							opt.title ? new card.header(new small(new b(opt.title))) : null,
							new card.body({
								elem: codecontainer(
									opt.type,
									opt.code,
									opt.maxHeight,
									opt.linenums,
									opt.allowrun,
									opt.allowcopy
								),
							}),
						].filter(Boolean),
					}),
				],
			};
		} else {
			super.data = {
				elem: codecontainer(opt.type, opt.code, opt.maxHeight, opt.linenums, opt.allowrun, opt.allowcopy),
			};
		}
	}
}
