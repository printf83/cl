"use strict";
// import $ from "./component.js";

// let query_setting = {
// 	field: [
// 		{ value: "name", label: "Name", type: "text" },
// 		{ value: "dob", label: "Date Of Birth", type: "date" },
// 		{ value: "phone", label: "Phone", type: "tel" },
// 		{ value: "picture", label: "Picture", type: "check" },
// 		{ value: "email", label: "Email", type: "email" },
// 		{
// 			value: "state",
// 			label: "State",
// 			type: "select",
// 			option: null,
// 			placeholder: "Please Choose One",
// 		},
// 	],
// 	limit: {
// 		min: 1,
// 		max: 100,
// 		step: 5,
// 	},
// 	skip: {
// 		min: 1,
// 		max: 100,
// 		step: 1,
// 	},
// 	useopricon: false,
// };

// let query_data = {
// 	filter: null,
// 	sort: { state: 1, name: 1 },
// 	field: { __v: 0 },
// 	limit: 10,
// 	skip: 0,
// };

// $.core.documentReady(() => {
// 	$.db.api.option(
// 		{
// 			name: "state",
// 		},
// 		function (dbstate) {
// 			if (dbstate) {
// 				query_setting.field[query_setting.field.length - 1].option = dbstate;

// 				$.core.replaceWith(
// 					document.getElementById("root"),
// 					new $.container.form([
// 						new $.container.stack([
// 							new $.button({
// 								label: "api.create",
// 								color: "primary",
// 								onclick: function () {
// 									$.list.container.item.add("main_list");
// 								},
// 							}),

// 							new $.button({
// 								label: "api.option",
// 								color: "primary",
// 								onclick: function () {
// 									$.db.api.option(
// 										{
// 											name: "customer",
// 											data: query_data,
// 										},
// 										function (result) {
// 											$.core.setValue(document.getElementById("output"), JSON.stringify(result));
// 										}
// 									);
// 								},
// 							}),
// 							new $.button({
// 								label: "api.excel",
// 								color: "primary",
// 								onclick: function () {
// 									$.list.container.excel("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Query",
// 								color: "primary",
// 								icon: "fire",
// 								onclick: function () {
// 									$.list.container.query.all("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Filter",
// 								color: "primary",
// 								icon: "fire",
// 								onclick: function () {
// 									$.list.container.query.filter("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Sort",
// 								color: "primary",
// 								icon: "fire",
// 								onclick: function () {
// 									$.list.container.query.sort("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Field",
// 								color: "primary",
// 								icon: "fire",
// 								onclick: function () {
// 									$.list.container.query.field("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Limit",
// 								color: "primary",
// 								icon: "fire",
// 								onclick: function () {
// 									$.list.container.query.limit("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Page",
// 								color: "primary",
// 								icon: "fire",
// 								onclick: function () {
// 									$.list.container.query.page("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Check Mode",
// 								color: "warning",
// 								onclick: function () {
// 									$.list.container.check.mode("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Check All",
// 								color: "warning",
// 								onclick: function () {
// 									$.list.container.check.all("main_list");
// 								},
// 							}),
// 							new $.button({
// 								label: "Delete checked",
// 								color: "danger",
// 								onclick: function () {
// 									$.list.container.check.delete("main_list");
// 								},
// 							}),
// 						]),
// 						new $.input({ type: "textarea", id: "output", rows: 10 }),
// 						new $.list.container({
// 							id: "main_list",
// 							setting: query_setting,
// 							query: query_data,
// 							name: "customer",
// 							paging: true,
// 							editor: function (data, readonly) {
// 								return [
// 									new $.input({
// 										type: "text",
// 										label: "Name",
// 										name: "name",
// 										value: data ? data.name : null,
// 										required: true,
// 									}),
// 									new $.input({
// 										type: "date",
// 										label: "Date of birth",
// 										name: "dob",
// 										value: data ? data.dob : null,
// 										required: true,
// 									}),
// 									new $.input({
// 										type: "text",
// 										label: "Phone",
// 										name: "phone",
// 										value: data ? data.phone : null,
// 										required: true,
// 									}),
// 									new $.file({
// 										label: "Picture",
// 										name: "picture",
// 										value: data ? data.picture : null,
// 									}),
// 									new $.input({
// 										type: "email",
// 										label: "Email",
// 										name: "email",
// 										value: data ? data.email : null,
// 									}),
// 									new $.input({
// 										type: "select",
// 										label: "State",
// 										name: "state",
// 										option: dbstate,
// 										value: data ? data.state : null,
// 										required: true,
// 									}),
// 								];
// 							},
// 							items: function (data) {
// 								let lastgroup = null;
// 								let result = [];
// 								data.forEach(function (i) {
// 									if (i.state && lastgroup !== i.state) {
// 										lastgroup = i.state;
// 										let iname = dbstate.filter(function (el) {
// 											return el.value === i.state;
// 										})[0]?.label;

// 										result.push(new $.list.group({ key: i.state, name: iname }));
// 									}

// 									result.push(
// 										new $.list.item({
// 											key: i._id,
// 											name: i.name,
// 											picture: i.picture,
// 											detail: new $.small([i.phone, i.dob, i.email].filter(Boolean).join(" | ")),
// 											allow_action: true,
// 											allow_copy: true,
// 											allow_delete: true,
// 											// detail: new $.div(
// 											// 	"container p-0",
// 											// 	new $.div("g-2 row row-cols-auto", [
// 											// 		data.phone
// 											// 			? new $.pill({
// 											// 					icon: "phone",
// 											// 					label: data.phone,
// 											// 			  })
// 											// 			: null,
// 											// 		data.email
// 											// 			? new $.pill({
// 											// 					icon: "at",
// 											// 					label: data.email,
// 											// 			  })
// 											// 			: null,
// 											// 	])
// 											// ),
// 										})
// 									);
// 								});

// 								return result;
// 							},
// 							// item: function (data) {
// 							// 	return new $.list.item({
// 							// 		key: data._id,
// 							// 		name: data.name,
// 							// 		picture: data.picture,
// 							// 		// detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
// 							// 		detail: new $.div(
// 							// 			"container p-0",
// 							// 			new $.div("g-2 row row-cols-auto", [
// 							// 				data.phone
// 							// 					? new $.pill({
// 							// 							icon: "phone",
// 							// 							label: data.phone,
// 							// 					  })
// 							// 					: null,
// 							// 				data.email
// 							// 					? new $.pill({
// 							// 							icon: "at",
// 							// 							label: data.email,
// 							// 					  })
// 							// 					: null,
// 							// 			])
// 							// 		),
// 							// 	});
// 							// },
// 						}),
// 					])
// 				);

// 				$.list.container.reload("main_list");
// 			}
// 		}
// 	);
// });

// import "../css/sample.css";
import sb_customer from "./sandbox/customer.js";
import sb_state from "./sandbox/state.js";
import $ from "./component.js";

const db_menu = [
	{
		type: "menu",
		title: "Main",
		item: [
			{ title: "Customer", source: sb_customer },
			{ title: "State", source: sb_state },
		],
	},
	{
		type: "navigate",
		title: "Others",
		item: [{ title: "Documentation", source: "index.html" }],
	},
	{
		type: "action",
		title: "User",
		item: [
			{
				title: "Update Profile",
				source: function (event) {
					let sender = event.currentTarget;
					$.user.info(sender, function (result) {
						if (result && result.email) {
							new $.user.updateinfo({
								data: result,
								sender: sender,
								callback: function (result) {
									if (result) {
										new $.toast("/", "Your information updated").show();
									}
								},
							}).show();
						}
					});
				},
			},
			{
				title: "Change Password",
				source: function (event) {
					new $.user.changepass({
						callback: function (result) {
							if (result) {
								new $.toast("/", "Password changed").show();
							}
						},
					}).show();
				},
			},
			{
				title: "Sign Out",
				source: function (event) {
					$.user.signout(event.currentTarget, function (result) {
						if (result) {
							new $.toast("/", "User successfuly sign out").show();
						} else {
							new $.toast("!!", "User failed sign out").show();
						}
					});
				},
			},
		],
	},
	{
		type: "theme",
		title: "Theme",
		item: [
			{ title: "Default", source: null },
			{ title: "Cerulean (L|G)", source: "cerulean" },
			{ title: "Cosmo (L|S)", source: "cosmo" },
			{ title: "Cyborg (D|S)", source: "cyborg" },
			{ title: "Darkly (D|S)", source: "darkly" },
			{ title: "Flatly (L|S)", source: "flatly" },
			{ title: "Journal (L|S)", source: "journal" },
			{ title: "Litera (L|S)", source: "litera" },
			{ title: "Lumen (L|S)", source: "lumen" },
			{ title: "Lux (L|S)", source: "lux" },
			{ title: "Materia (L|G)", source: "materia" },
			{ title: "Minty (L|S)", source: "minty" },
			{ title: "Morph (L|G)", source: "morph" },
			{ title: "Pulse (L|S)", source: "pulse" },
			{ title: "Quartz (D|G)", source: "quartz" },
			{ title: "Sandstone (L|S)", source: "sandstone" },
			{ title: "Simplex (L|G)", source: "simplex" },
			{ title: "Sketchy (L|S)", source: "sketchy" },
			{ title: "Slate (D|G)", source: "slate" },
			{ title: "Solar (D|S)", source: "solar" },
			{ title: "Spacelab (L|G)", source: "spacelab" },
			{ title: "Superhero (D|S)", source: "superhero" },
			{ title: "United (L|S)", source: "united" },
			{ title: "Vapor (D|G)", source: "vapor" },
			{ title: "Yeti (L|S)", source: "yeti" },
			{ title: "Zephyr (L|S)", source: "zephyr" },
		],
	},
];

let def_m1 = "Main";
let def_m2 = "Customer";
let def_theme = null;

function find_menu(m1, m2) {
	let m1_index = db_menu.findIndex((i) => i.title === m1);
	if (m1_index > -1) {
		let m2_index = db_menu[m1_index].item.findIndex((i) => i.title === m2);
		if (m2_index > -1) {
			return {
				type: db_menu[m1_index].type,
				source: db_menu[m1_index].item[m2_index].source,
			};
		}
	}

	return null;
}

function gen_content(m1, m2, callback) {
	let m = find_menu(m1, m2);
	if (m) {
		if (m.type === "menu") {
			if (m.source) {
				$.core.replaceChild(
					document.getElementById("root"),
					new $.div({
						elem: "",
					})
				);
				$.core.replaceChild(
					document.getElementById("nextbar"),
					new $.div({
						elem: "",
					})
				);

				setTimeout(
					function (m, callback) {
						let p = function (m) {
							return new Promise(function (res, rej) {
								try {
									m.source.main(function (elem) {
										$.core.replaceChild(
											document.getElementById("root"),
											new $.div({
												elem: elem,
											})
										);

										if (m.source.menu) {
											$.core.replaceChild(
												document.getElementById("nextbar"),
												new $.toc({
													label: m.source.name,
													item: m.source.menu,
												})
											);
										} else {
											$.core.removeChildElement(document.getElementById("nextbar"));
										}

										if (m.source.load) {
											m.source.load();
										}

										gen_url(m1, m2);

										res();
									});
								} catch (ex) {
									rej(ex);
								}
							});
						};
						p(m)
							.then(function () {
								if (callback instanceof Function) {
									callback();
								}
							})
							.catch(function (ex) {
								console.error(ex);
								if (callback instanceof Function) {
									callback();
								}
							});
					},
					0,
					m,
					callback
				);
			}
		} else if (m.type === "navigate") {
			window.location = m.source;
		} else if (m.type === "action") {
			m.source();
		} else if (m.type === "theme") {
			set_theme(m.source);
		} else {
			console.warn("Unsupported type", m);
		}
	}
}

function set_theme(theme) {
	let cltheme = document.getElementById("nstheme");
	if (theme) {
		cltheme.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.1.3/dist/${theme}/bootstrap.min.css`;
		cltheme.removeAttribute("disabled");
	} else {
		cltheme.setAttribute("disabled", "disabled");
	}
}

function gen_url(m1, m2) {
	let title = `BS5 JS Builder - ${m1} | ${m2}`;
	let path = `?m1=${encodeURIComponent(m1)}&m2=${encodeURIComponent(m2)}`;
	let data = `${m1}.${m2}`;

	window.history.pushState(data, title, path);
	document.title = title;
}

function get_url() {
	let p = new URLSearchParams(window.location.search);

	let m1 = p.get("m1");
	let m2 = p.get("m2");
	return m1 && m2
		? {
				m1: decodeURIComponent(m1),
				m2: decodeURIComponent(m2),
		  }
		: null;
}

function gen_menu(m1, m2, theme) {
	return db_menu.map(function (i) {
		return new $.menu({
			label: i.title,
			active: i.title === m1,
			item: i.item.map(function (j) {
				return {
					label: j.title,
					active: j.title === m2 || (i.type === "theme" && j.source === theme),
					attr: {
						"cl-m1": i.title,
						"cl-m2": j.title,
						"cl-m3": i.type,
					},
					onclick:
						i.type !== "action"
							? function (event) {
									let sender = event.currentTarget;

									let m1 = sender.getAttribute("cl-m1");
									let m2 = sender.getAttribute("cl-m2");
									let m3 = sender.getAttribute("cl-m3");

									let activeItem = [].slice.call(
										document.getElementById("sidebar").getElementsByClassName("active")
									);

									activeItem.forEach(function (i) {
										if (i.getAttribute("cl-m3") === m3) {
											i.classList.remove("active");
										}
									});

									sender.classList.add("active");

									if (i.type === "menu") {
										sender.innerText = "Loading...";
										gen_content(m1, m2, function () {
											$.core.init(document.getElementById("root"));
											sender.innerText = m2;
										});
									} else {
										gen_content(m1, m2);
									}
							  }
							: j.source,
				};
			}),
		});
	});
}

$.core.documentReady(() => {
	//set def_m1 and m2
	let m = get_url();
	if (m && m.m1 !== "undefined" && m.m2 !== "undefined") {
		def_m1 = m.m1;
		def_m2 = m.m2;
	}

	$.core.replaceWith(
		document.getElementById("main"),
		new $.layout.l1({
			topid: "navbar",
			leftid: "sidebar",
			rightid: "nextbar",
			mainid: "root",

			topelem: new $.navbar.container({
				dark: true,
				color: "primary",
				expand: "lg",
				body: { fluid: "lg" },
				elem: [
					new $.navbar.toggle({
						target: `#sidebar`,
						toggle: "collapse",
					}),
					new $.navbar.brand({ label: "cl", icon: "fire" }),
				],
			}),
			leftelem: new $.tag({
				class: ["sticky-md-top", "collapse", "navbar-collapse", "cl-vh-menu"],
				overflow: "auto",
				display: "md-block",
				margintop: 3,
				elem: gen_menu(def_m1, def_m2, def_theme),
			}),
			rightelem: new $.tag({
				class: ["sticky-lg-top", "cl-vh-menu"],
				overflow: "auto",
				margintop: 3,
				elem: "",
			}),
			footerelem: new $.div({
				display: "flex",
				flex: "wrap",
				justifycontent: "center",
				marginbottom: 5,
				gap: 2,
				elem: null,
			}),

			backtotop: false,
		})
	);

	gen_content(def_m1, def_m2, function () {
		$.core.init(document.getElementById("root"));
	});

	set_theme(def_theme);

	$.core.init(document.body);
});
