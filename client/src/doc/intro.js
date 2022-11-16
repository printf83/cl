"use strict";
import * as alert from "../cl/base/alert.js";
import div from "../cl/base/div.js";
import pill from "../cl/base/pill.js";
import codepreview from "../cl/base/codepreview.js";
import a from "../cl/base/a.js";
import msg from "../cl/base/msg.js";
import * as core from "../cl/base/core.js";

export default [
	{
		msg: [
			new div("text-center display-1", core.setting.title()),

			new alert.container({
				color: "warning",
				elem: new msg({
					icon: "exclamation-triangle",
					weight: "md",
					elem: "<b>Warning!</b> This framework created by <b>one developer</b> for research only!<br/>", //<b>Help!</b> I lost my job 😢. Anyone can help me? Please drop me <a class='alert-link' href='mailto:printf83@gmail.com?subject=bs5-js-builder-job-offer'>an email</a> if you think I am usefull in your company especially company in <b>Kota Kinabalu, Malaysia</b> - 28/08/2022
				}),
				marginTop: 5,
			}),

			new div({
				align: "center",
				marginBottom: 3,
				elem: "Build a Full Stack Web Application using ",
			}),

			new div({
				display: "flex",
				flex: "wrap",
				justifyContent: "center",
				marginBottom: 4,
				gap: 2,
				elem: [
					new a({
						textDecoration: "none",
						href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
						elem: new pill({ icon: { icon: "js-square", type: "fab" }, label: "Javascript" }),
					}),
					new a({
						textDecoration: "none",
						href: "https://getbootstrap.com/",
						elem: new pill({ icon: { icon: "bootstrap", type: "fab" }, label: "Bootstrap V5.2.1" }),
					}),
					new a({
						textDecoration: "none",
						href: "https://bootswatch.com/",
						elem: new pill({ icon: { icon: "swatchbook" }, label: "Bootswatch V5.2.0" }),
					}),
					new a({
						textDecoration: "none",
						href: "https://fontawesome.com/",
						elem: new pill({
							icon: { icon: "font-awesome-flag", type: "fab" },
							label: "Fontawesome V6.2.0",
						}),
					}),
					new a({
						textDecoration: "none",
						href: "https://nodejs.org/en/",
						elem: new pill({ icon: { icon: "node-js", type: "fab" }, label: "NodeJS" }),
					}),
					new a({
						textDecoration: "none",
						href: "https://www.mongodb.com/",
						elem: new pill({ icon: { icon: "envira", type: "fab" }, label: "MongoDB" }),
					}),
					new a({
						textDecoration: "none",
						href: "http://bs5-js-builder.herokuapp.com/",
						elem: new pill({ icon: core.setting.icon(), label: "CL" }),
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
								href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/css/all.min.css"
							/>
							<link
								rel="stylesheet"
								href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
								id="css_bootstrap"
							/>
							<link
								rel="stylesheet"
								href="https://cdn.jsdelivr.net/npm/bootswatch@5.2.0/dist/cerulean/bootstrap.min.css"
								disabled="disabled"
								id="css_bootswatch"
							/>
							<link rel="stylesheet" href="./cl/css/style.css" />

							<title>${core.setting.title()}</title>
						</head>
						<body>
							<div id="root">
								<noscript>
									<p class="text-danger">Your browser does not support JavaScript!</p>
								</noscript>
							</div>

							<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"></script>
							<script src="https://cdn.jsdelivr.net/npm/moment@2.29.4"></script>
							<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
							<script src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0"></script>

							<script type="module" src="./js/index.js"></script>
						</body>
					</html>

				`,
			}),

			new codepreview({
				title: "Example index.js",
				container: "card",
				code: `
					"use strict";
					
					import * as core from "../cl/base/core.js";
					import button from "../cl/base/button.js";
					import p from "../cl/base/p.js";

					core.documentReady(() => {
						core.appendChild(document.getElementById("root"), new button({label:'Hello World!', color:'primary'}));
						core.appendChild(document.getElementById("root"), new p('Hello World!'));
					});
			`,
			}),

			`Alternatively, if you prefer the simpler method, use {{import $ from "./all.js";}} to import all components.`,

			new codepreview({
				title: "Example index.js using only one component",
				container: "card",
				code: `
					"use strict";
					
					import $ from "../../cl/js/all.js"; //marker

					$.core.documentReady(() => {
						$.core.appendChild(document.getElementById("root"), new $.button({label:'Hello World!', color:'primary'}));
						$.core.appendChild(document.getElementById("root"), new $.p('Hello World!'));
					});
			`,
			}),

			new codepreview({
				title: "Rename one component to something you like",
				container: "card",
				code: `
					"use strict";
					
					import WOW from "../../cl/js/all.js"; //marker

					WOW.core.documentReady(() => {
						WOW.core.appendChild(document.getElementById("root"), new WOW.button({label:'Hello World!', color:'primary'}));
						WOW.core.appendChild(document.getElementById("root"), new WOW.p('Hello World!'));
					});
			`,
			}),

			`If you want to test the code, you can copy the code into <b>./client/js/test.js</b> and go to <a href="test.html">test.html</a> to check the output.`,

			new div({
				display: "flex",
				justifyContent: "center",
				marginBottom: 3,
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
					new pill({ icon: { icon: "code-branch" }, label: "0.0.2", color: "success" }),
				],
			}),
		],
	},
];
