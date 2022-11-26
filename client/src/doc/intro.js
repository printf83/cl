"use strict";
import * as alert from "../dist/cl/base/alert.js";
import div from "../dist/cl/base/div.js";
import pill from "../dist/cl/base/pill.js";
import codepreview from "../dist/cl/base/codepreview.js";
import a from "../dist/cl/base/a.js";
import msg from "../dist/cl/base/msg.js";
import * as core from "../dist/cl/base/core.js";

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
						elem: new pill({ icon: { icon: "bootstrap", type: "fab" }, label: "Bootstrap V5.2.3" }),
					}),
					new a({
						textDecoration: "none",
						href: "https://bootswatch.com/",
						elem: new pill({ icon: { icon: "swatchbook" }, label: "Bootswatch V5.2.2" }),
					}),
					new a({
						textDecoration: "none",
						href: "https://fontawesome.com/",
						elem: new pill({
							icon: { icon: "font-awesome-flag", type: "fab" },
							label: "Fontawesome V6.2.1",
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

							<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />

							<link
								rel="stylesheet"
								href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css"
								id="css_bootstrap"
							/>

							<link
								rel="stylesheet"
								href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.2.2/cerulean/bootstrap.min.css"
								disabled="disabled"
								id="css_bootswatch"
							/>

							<title>${core.setting.title()}</title>
						</head>
						<body>
							<div id="root">
								<noscript>
									<p class="text-danger">Your browser does not support JavaScript!</p>
								</noscript>
							</div>

							<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.6/umd/popper.min.js"></script>
							<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
							<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js"></script>
							<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js"></script>

							<script type="module" src="./src/index.bundle.js"></script>
						</body>
					</html>

				`,
			}),

			new codepreview({
				title: "Example index.js",
				container: "card",
				code: `
					"use strict";
					
					import * as core from "./dist/cl/base/core.js";
					import button from "./dist/cl/base/button.js";
					import p from "./dist/cl/base/p.js";

					let code = () => {
						return [
							new button({label:'Hello World!', color:'primary'}),
							new p('Hello World!')
						];
					};

					core.documentReady(() => {
						core.replaceChild(document.getElementById("root"), code());
					});
			`,
			}),

			`Alternatively, if you prefer the simpler method, use {{import $ from "./dist/cl/all.js";}} to import all components.`,

			new codepreview({
				title: "Example index.js using only one component",
				container: "card",
				code: `
					"use strict";
					
					import $ from "./dist/cl/all.js"; //marker

					let code = () => {
						return [
							new $.button({label:'Hello World!', color:'primary'}),
							new $.p('Hello World!')
						];
					};

					$.core.documentReady(() => {
						$.core.replaceChild(document.getElementById("root"), code());
					});
			`,
			}),

			new codepreview({
				title: "Rename one component to something you like",
				container: "card",
				code: `
					"use strict";
					
					import WOW from "./dist/cl/all.js"; //marker

					let code = () => {
						return [
							new WOW.button({label:'Hello World!', color:'primary'}),
							new WOW.p('Hello World!')
						];
					};

					WOW.core.documentReady(() => {
						WOW.core.replaceChild(document.getElementById("root"), code());
					});
			`,
			}),

			`If you want to test the code, you can copy the code into {{./client/src/test.js}}, run {{npm run build}} in the terminal to build the code, run {{npm start}} in the terminal to start the server then go to <a href="test.html">test.html</a> to check the output.`,

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
