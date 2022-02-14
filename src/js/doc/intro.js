"use strict";
import $ from "../component.js";

export default [
	{
		msg: [
			new $.div("text-center display-1", document.title),
			new $.div("text-center display-5 text-primary", [
				new $.icon({ type: "fab", icon: "bootstrap" }),
				new $.icon("swatchbook"),
				new $.icon({ type: "fab", icon: "font-awesome-flag" }),
				new $.icon({ type: "fab", icon: "node-js" }),
				new $.icon("leaf"),
			]),

			new $.alert.container({
				icon: "!",
				elem: "<b>Warning!</b> This framework create by <b>one developer</b> only for research on build full stack webapps only using super simple framework.",
				margintop: 5,
			}),

			new $.div(
				"text-center",
				"Build Full Stack Web Application using JS, Bootstrap, Fontawesome, NodeJS, And Mongodb using BS5 JS Builder"
			),
			new $.codepreview({
				container: "card",
				code: `
					$.core.appendChild(dom,cltag);
					$.core.prependChild(dom,cltag);
					$.core.replaceChild(dom,cltag);
					$.core.replaceWith(dom,cltag);
					let htmlOutput = $.core.html(cltag);
			`,
			}),

			new $.div({
				align: "center",
				margintop: 5,
				elem: "Example : ",
			}),

			new $.codepreview({
				container: "card",
				code: `
					"use strict";
					import $ from "./component.js";
					
					$.core.documentReady(() => {
						$.core.appendChild(document.body,new $.button({label:'Hello World!', color:'primary'}));
						$.core.appendChild(document.body,new $.p('Hello World!'));
					});
			`,
			}),

			new $.div({
				display: "flex",
				justifycontent: "center",
				marginbottom: 5,
				gap: 2,
				elem: [
					new $.a({
						class: "text-decoration-none",
						elem: new $.pill({ icon: { type: "fab", icon: "github" }, label: "Github" }),
						href: "https://github.com/printf83/cl",
					}),
					new $.a({
						class: "text-decoration-none",
						elem: new $.pill({ icon: { icon: "at" }, label: "Send email", color: "danger" }),
						href: "mailto:printf83@gmail.com?subject=bs5-js-builder&body=I%20have%20a%20question%20about%20...",
					}),
				],
			}),
		],
	},
];
