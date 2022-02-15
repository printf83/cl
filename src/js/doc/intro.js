"use strict";
import $ from "../component.js";

export default [
	{
		msg: [
			new $.div("text-center display-1", document.title),
			// new $.div("text-center display-5 text-primary", [
			// 	new $.icon({ type: "fab", icon: "bootstrap" }),
			// 	new $.icon("swatchbook"),
			// 	new $.icon({ type: "fab", icon: "font-awesome-flag" }),
			// 	new $.icon({ type: "fab", icon: "node-js" }),
			// 	new $.icon("leaf"),
			// ]),

			new $.alert.container({
				icon: "!",
				elem: "<b>Warning!</b> This framework create by <b>one developer</b> only for research on build full stack webapps only using super simple framework.",
				margintop: 5,
			}),

			new $.div({
				align: "center",
				marginbottom: 3,
				elem: "Build Full Stack Web Application using ",
			}),

			new $.div({
				display: "flex",
				flex: "wrap",
				justifycontent: "center",
				marginbottom: 4,
				gap: 1,
				elem: [
					new $.a({
						textdecoration: "none",
						href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
						elem: new $.pill({ icon: { icon: "js-square", type: "fab" }, label: "Javascript" }),
					}),
					new $.a({
						textdecoration: "none",
						href: "https://getbootstrap.com/",
						elem: new $.pill({ icon: { icon: "bootstrap", type: "fab" }, label: "Bootstrap" }),
					}),
					new $.a({
						textdecoration: "none",
						href: "https://bootswatch.com/",
						elem: new $.pill({ icon: { icon: "swatchbook" }, label: "Bootswatch" }),
					}),
					new $.a({
						textdecoration: "none",
						href: "https://fontawesome.com/",
						elem: new $.pill({ icon: { icon: "font-awesome-flag", type: "fab" }, label: "Fontawesome" }),
					}),
					new $.a({
						textdecoration: "none",
						href: "https://nodejs.org/en/",
						elem: new $.pill({ icon: { icon: "node-js", type: "fab" }, label: "NodeJS" }),
					}),
					new $.a({
						textdecoration: "none",
						href: "https://www.mongodb.com/",
						elem: new $.pill({ icon: { icon: "envira", type: "fab" }, label: "MongoDB" }),
					}),
					new $.a({
						textdecoration: "none",
						href: "http://bs5-js-builder.herokuapp.com/",
						elem: new $.pill({ icon: { icon: "fire" }, label: "CL" }),
					}),
				],
			}),
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
				marginbottom: 3,
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
