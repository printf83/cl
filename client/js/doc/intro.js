"use strict";
import div from "../base/div.js";
import a from "../base/a.js";
import icon from "../base/icon.js";

function fnDiv(className, element) {
	return new div({ class: className, elem: element });
}

export default [
	{
		msg: [
			fnDiv("text-center display-1", document.title),
			fnDiv("text-center display-5 text-primary", [
				new icon({ type: "fab", icon: "bootstrap" }),
				new icon("swatchbook"),
				new icon({ type: "fab", icon: "font-awesome-flag" }),
				new icon({ type: "fab", icon: "node-js" }),
				new icon("leaf"),
			]),
			fnDiv("text-center mt-5", "This is an alpha version. Don't used it on production."),
			fnDiv(
				"text-center",
				"Build Full Stack Web Application using JS, Bootstrap, Fontawesome, NodeJS, And Mongodb using NS"
			),
			fnDiv("text-center", "For Pro JS Developer only"),
			fnDiv("text-center mt-5", "<code>ns.build.append(container,nshelper|nstag)</code>"),
			fnDiv("text-center", "<code>ns.build.prepend(container,nshelper|nstag)</code>"),
			fnDiv("text-center", "<code>ns.build.replace(container,nshelper|nstag)</code>"),
			fnDiv("text-center", "<code>ns.build.html(container,nshelper|nstag)</code>"),
			fnDiv("text-center mt-5", "Example : "),
			fnDiv(
				"text-center",
				"<code>ns.build.append(document.body,ns.button({label:'Hello World', color:'primary'}))</code>"
			),
			fnDiv("text-center", "<code>ns.build.append(document.body,{tag:'p',elems:'Hello World'})</code>"),

			fnDiv("text-center mt-5", [new a({ label: "Github", href: "https://github.com/printf83/cl" })]),
		],
	},
];
