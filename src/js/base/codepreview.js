"use strict";
import "../../css/codepreview.css";
import "../../css/prettify.css";

import * as core from "./core.js";
import * as card from "./card.js";
import tag from "./tag.js";
import div from "./div.js";
import code from "./code.js";
import pre from "./pre.js";
import button from "./button.js";
import toast from "./toast.js";

const LIBNAME = /component.Z./g;
const SAMPLELIBNAME = /doc_sample.Z./g;

function beautifyjs(str) {
	let opt = {
		preserve_newlines: false,
		max_preserve_newlines: 50,
		end_with_newline: true,
		brace_style: "collapse",
	};

	str = str.replace(LIBNAME, "$.");
	str = str.replace(SAMPLELIBNAME, "sample.");
	str = str.replace(/\[/g, "[\n");
	str = str.replace(/\]/g, "\n]");

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
	str = str.replace(/\n\n/g, "\n");
	return html_beautify(str, opt);
}

function beautifycss(str) {
	return beautifyhtml(str);
}

function codecontainer(type, strcode) {
	return [
		new div({
			position: "relative",
			float: "right",
			class: "cl-codepreview-copy",
			elem: new button({
				icon: { type: "far", icon: "clipboard" },
				label: "Copy",
				hidelabel: true,
				textcolor: "primary",
				align: "end",
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
				margin: 0,
				attr: { lang: type },
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
	container: "div",
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

		if (opt.container === "div") {
			super.data = {
				elem: [
					new div({
						elem: new card.body({ elem: codecontainer(opt.type, opt.code) }),
					}),
				],
			};
		} else if (opt.container === "card") {
			super.data = {
				elem: [
					new card.container({
						marginy: 3,
						elem: new card.body({ elem: codecontainer(opt.type, opt.code) }),
					}),
				],
			};
		} else {
			super.data = {
				elem: codecontainer(opt.type, opt.code),
			};
		}
	}
}
