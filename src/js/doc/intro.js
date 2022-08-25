"use strict";
import * as alert from "../base/alert.js";
import div from "../base/div.js";
import pill from "../base/pill.js";
import codepreview from "../base/codepreview.js";
import a from "../base/a.js";
import msg from "../base/msg.js";

export default [
	{
		msg: [
			new div("text-center display-1", document.title),

			new alert.container({
				color: "warning",
				elem: new msg({
					icon: "exclamation-triangle",
					weight: "md",
					elem: "<b>Warning!</b> This framework create by <b>one developer</b> for research only!<br/>", //<b>Help!</b> I lost my job 😢. Anyone can help me? Please drop me <a class='alert-link' href='mailto:printf83@gmail.com?subject=bs5-js-builder-job-offer'>an email</a> if you think I am usefull in your company especially company in <b>Kota Kinabalu, Malaysia</b> - 21/02/2022
				}),
				margintop: 5,
			}),

			new div({
				align: "center",
				marginbottom: 3,
				elem: "Build Full Stack Web Application using ",
			}),

			new div({
				display: "flex",
				flex: "wrap",
				justifycontent: "center",
				marginbottom: 4,
				gap: 1,
				elem: [
					new a({
						textdecoration: "none",
						href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
						elem: new pill({ icon: { icon: "js-square", type: "fab" }, label: "Javascript" }),
					}),
					new a({
						textdecoration: "none",
						href: "https://getbootstrap.com/",
						elem: new pill({ icon: { icon: "bootstrap", type: "fab" }, label: "Bootstrap" }),
					}),
					new a({
						textdecoration: "none",
						href: "https://bootswatch.com/",
						elem: new pill({ icon: { icon: "swatchbook" }, label: "Bootswatch" }),
					}),
					new a({
						textdecoration: "none",
						href: "https://fontawesome.com/",
						elem: new pill({
							icon: { icon: "font-awesome-flag", type: "fab" },
							label: "Fontawesome",
						}),
					}),
					new a({
						textdecoration: "none",
						href: "https://nodejs.org/en/",
						elem: new pill({ icon: { icon: "node-js", type: "fab" }, label: "NodeJS" }),
					}),
					new a({
						textdecoration: "none",
						href: "https://www.mongodb.com/",
						elem: new pill({ icon: { icon: "envira", type: "fab" }, label: "MongoDB" }),
					}),
					new a({
						textdecoration: "none",
						href: "http://bs5-js-builder.herokuapp.com/",
						elem: new pill({ icon: { icon: "fire" }, label: "CL" }),
					}),
				],
			}),
			new codepreview({
				container: "card",
				code: `
					core.appendChild(dom,cltag);
					core.prependChild(dom,cltag);
					core.replaceChild(dom,cltag);
					core.replaceWith(dom,cltag);
					let htmlOutput = core.html(cltag);
			`,
			}),

			new codepreview({
				title: "Example index.html",
				container: "card",
				type: "html",
				code: `
					<!DOCTYPE html>
					<html lang="en">
						<head>
							<meta charset="utf-8" />
							<meta name="viewport" content="width=device-width, initial-scale=1" />
							<meta name="description" content="Testing website" />
							<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
							<link rel="icon" type="image/png" href="/favicon.png" />

							<link
								rel="stylesheet"
								href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.1.2/css/all.min.css"
							/>
							<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" />
							<link
								rel="stylesheet"
								href="https://cdn.jsdelivr.net/npm/bootswatch@5.2.0/dist/cerulean/bootstrap.min.css"
								id="nstheme"
								disabled="disabled"
							/>
							<link rel="stylesheet" href="./dist/style.css" />

							<title>BS5 JS Builder</title>
						</head>
						<body class="position-relative">
							<div class="position-fixed top-50 start-50 translate-middle" id="main">
								<div class="text-center">
									<i class="fas fa-circle-notch fa-fw fa-spin fa-5x"></i>
									<noscript>
										<p class="text-danger">Your browser does not support JavaScript!</p>
									</noscript>
								</div>
							</div>

							<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"></script>

							<script src="https://cdn.jsdelivr.net/npm/moment@2.29.4"></script>
							<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>
							<script src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.1.2"></script>

							<script type="module" src="/dist/js/index.js"></script>
						</body>
					</html>

				`,
			}),

			new codepreview({
				title: "Example index.js",
				container: "card",
				code: `
					"use strict";
					
					import * as core from "./base/core.js";
					import button from "./base/button.js";
					import p from "./base/p.js";

					core.documentReady(() => {
						core.appendChild(document.body,new button({label:'Hello World!', color:'primary'}));
						core.appendChild(document.body,new p('Hello World!'));
					});
			`,
			}),

			new div({
				display: "flex",
				justifycontent: "center",
				marginbottom: 3,
				gap: 2,
				elem: [
					new a({
						class: "text-decoration-none",
						elem: new pill({ icon: { type: "fab", icon: "github" }, label: "Github" }),
						href: "https://github.com/printf83/cl",
					}),
					new a({
						class: "text-decoration-none",
						elem: new pill({ icon: { icon: "at" }, label: "Send email", color: "danger" }),
						href: "mailto:printf83@gmail.com?subject=bs5-js-builder&body=I%20have%20a%20question%20about%20...",
					}),
				],
			}),
		],
	},
];
