"use strict";
import div from "../base/div.js";
import a from "../base/a.js";
import icon from "../base/icon.js";

export default [
	{
		msg: [
			new div("text-center display-1", document.title),
			new div("text-center display-5 text-primary", [
				new icon({ type: "fab", icon: "bootstrap" }),
				new icon("swatchbook"),
				new icon({ type: "fab", icon: "font-awesome-flag" }),
				new icon({ type: "fab", icon: "node-js" }),
				new icon("leaf"),
			]),
			new div("text-center mt-5", "This is an alpha version. Don't used it on production."),
			new div(
				"text-center",
				"Build Full Stack Web Application using JS, Bootstrap, Fontawesome, NodeJS, And Mongodb using NS"
			),
			new div("text-center", "For Pro JS Developer only"),
			new div("text-center mt-5", "<code>ns.build.append(container,nshelper|nstag)</code>"),
			new div("text-center", "<code>ns.build.prepend(container,nshelper|nstag)</code>"),
			new div("text-center", "<code>ns.build.replace(container,nshelper|nstag)</code>"),
			new div("text-center", "<code>ns.build.html(container,nshelper|nstag)</code>"),
			new div("text-center mt-5", "Example : "),
			new div(
				"text-center",
				"<code>ns.build.append(document.body,ns.button({label:'Hello World', color:'primary'}))</code>"
			),
			new div("text-center", "<code>ns.build.append(document.body,{tag:'p',elems:'Hello World'})</code>"),

			new div("text-center mt-5", [new a({ label: "Github", href: "https://github.com/printf83/cl" })]),
		],
	},
];
