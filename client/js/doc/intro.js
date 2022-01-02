"use strict";
import div from "../base/div.js";
import a from "../base/a.js";
import icon from "../base/icon.js";
import * as alert from "../base/alert.js";
import * as card from "../base/card.js";
import code from "../base/code.js";
import pre from "../base/pre.js";
import pill from "../base/pill.js";
import msg from "../base/msg.js";

// import small from "../base/small.js";

function beautifyjs(str) {
	return js_beautify(str, {
		preserve_newlines: true,
		max_preserve_newlines: 100,
		keep_array_indentation: false,
		brace_style: "collapse,preserve-inline",
	});
}

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

			new alert.container({
				elem: new msg({
					weight: "md",
					icon: "!",
					elem: "<b>Warning!</b> This framework create by <b>one developer</b> only for research on build full stack webapps only using simple framework.",
				}),
				color: "warning",
				margintop: 5,
			}),

			new div(
				"text-center",
				"Build Full Stack Web Application using JS, Bootstrap, Fontawesome, NodeJS, And Mongodb using BS5 JS Builder"
			),

			new card.container({
				marginy: 3,
				elem: new card.body(
					new code(
						new pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
								cl.appendChild(dom,cltag);
								cl.prependChild(dom,cltag);
								cl.replaceChild(dom,cltag);
								cl.replaceWith(dom,cltag);
								let htmlOutput = cl.html(cltag);
							`),
						})
					)
				),
			}),

			new div("text-center mt-5", "Example : "),

			new card.container({
				marginy: 3,
				elem: new card.body(
					new code(
						new pre({
							class: "prettyprint lang-js",
							marginbottom: 0,
							elem: beautifyjs(`
								"use strict";
								import * as core from "./base/core.js";
								import * as cl from "./base/cl.js";
								import button from "./base/button.js";
								import p from "./base/p.js";

								core.documentReady(() => {
									cl.appendChild(document.body,new button({label:'Hello World!', color:'primary'}));
									cl.appendChild(document.body,new p('Hello World!'));
								});
							`),
						})
					)
				),
			}),

			new div(
				"d-flex justify-content-center mb-5 gap-2",
				new a({
					class: "text-decoration-none",
					elem: new pill({ icon: { type: "fab", icon: "github" }, label: "Github" }),
					href: "https://github.com/printf83/cl",
				})
			),

			// new div("d-flex justify-content-center mb-5 gap-2", [
			// 	new pill({ title: "Title", label: "Label" }),
			// 	new pill({ title: "Title", label: "Label", color: "secondary" }),
			// 	new pill({ title: "Title", label: "Label", color: "success" }),
			// 	new pill({ title: "Title", label: "Label", color: "danger" }),
			// 	new pill({ title: "Title", label: "Label", color: "warning" }),
			// ]),

			// new div("d-flex justify-content-center mb-5 gap-2", [
			// 	new pill({ icon: "i", label: "Info" }),
			// 	new pill({ icon: "!", label: "Warning" }),
			// 	new pill({ icon: "x", label: "Critical" }),
			// 	new pill({ icon: "-", label: "Stop" }),
			// 	new pill({ icon: "/", label: "Success" }),
			// ]),

			// new div("d-flex justify-content-center mb-5 gap-2", [
			// 	new pill({ title: "Viewport", icon: "eye", label: "Info" }),
			// 	new pill({ title: "Build speed", icon: "stopwatch", label: "Warning" }),
			// 	new pill({ title: "Page weight", icon: "balance-scale", label: "Critical" }),
			// ]),
		],
	},
];
