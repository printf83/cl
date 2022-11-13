"use strict";
// import "../../css/codepreview.css";
// import "../../css/prettify.css";

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

const LIBNAME = /component.Z./g;
const LIBNAME2 = /_component_js__WEBPACK_IMPORTED_MODULE_0__.Z./g;
const SAMPLELIBNAME = /doc_sample.Z./g;
const FNNAME = /list_fn./g;

function beautifyjs(str) {
	let opt = {
		preserve_newlines: true,
		end_with_newline: true,
		brace_style: "collapse",
	};

	str = str.replace(LIBNAME2, "$.");
	str = str.replace(LIBNAME, "$.");
	str = str.replace(SAMPLELIBNAME, "sample.");
	str = str.replace(FNNAME, "fn.");

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

function codecontainer(type, strcode, maxHeight, linenums) {
	return [
		new div({
			position: "relative",
			float: "end",
			class: "cl-codepreview-copy",
			elem: new button({
				icon: { type: "far", icon: "clipboard" },
				label: "Copy",
				hidelabel: true,
				textColor: "primary",
				align: "end",
				position: "absolute",
				end: 0,
				click: (event) => {
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
						elem: new card.body({ elem: codecontainer(opt.type, opt.code, opt.maxHeight, opt.linenums) }),
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
							new card.body({ elem: codecontainer(opt.type, opt.code, opt.maxHeight, opt.linenums) }),
						].filter(Boolean),
					}),
				],
			};
		} else {
			super.data = {
				elem: codecontainer(opt.type, opt.code, opt.maxHeight, opt.linenums),
			};
		}
	}
}
