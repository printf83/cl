"use strict";
import $ from "./component.js";

let query_setting = {
	field: [
		{ value: "name", label: "Name", type: "text" },
		{ value: "dob", label: "Date Of Birth", type: "date" },
		{ value: "phone", label: "Phone", type: "tel" },
		{ value: "picture", label: "Picture", type: "check" },
		{ value: "email", label: "Email", type: "email" },
		{
			value: "state",
			label: "State",
			type: "select",
			option: null,
			placeholder: "Please Choose One",
		},
	],
	limit: {
		min: 1,
		max: 100,
		step: 5,
	},
	skip: {
		min: 1,
		max: 100,
		step: 1,
	},
	useopricon: false,
};

let query_data = {
	filter: null,
	sort: { state: 1, name: 1 },
	field: { __v: 0 },
	limit: 10,
	skip: 0,
};

$.core.documentReady(() => {
	$.db.api.option(
		{
			name: "state",
		},
		function (dbstate) {
			$.core.replaceChild(
				document.getElementById("root"),
				new $.container.form([
					new $.container.stack([
						new $.button({
							label: "api.create",
							color: "primary",
							onclick: function () {
								$.list.container.item.add("main_list");
							},
						}),

						new $.button({
							label: "api.option",
							color: "primary",
							onclick: function () {
								$.db.api.option(
									{
										name: "customer",
										data: query_data,
									},
									function (result) {
										$.core.setValue(document.getElementById("output"), JSON.stringify(result));
									}
								);
							},
						}),
						new $.button({
							label: "api.excel",
							color: "primary",
							onclick: function () {
								$.list.container.excel("main_list");
							},
						}),
						new $.button({
							label: "Query",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.all("main_list");
							},
						}),
						new $.button({
							label: "Filter",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.filter("main_list");
							},
						}),
						new $.button({
							label: "Sort",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.sort("main_list");
							},
						}),
						new $.button({
							label: "Field",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.field("main_list");
							},
						}),
						new $.button({
							label: "Limit",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.limit("main_list");
							},
						}),
						new $.button({
							label: "Page",
							color: "primary",
							icon: "fire",
							onclick: function () {
								$.list.container.query.page("main_list");
							},
						}),

						new $.button({
							label: "Check Mode",
							color: "warning",
							onclick: function () {
								$.list.container.check.mode("main_list");
							},
						}),
						new $.button({
							label: "Check All",
							color: "warning",
							onclick: function () {
								$.list.container.check.all("main_list");
							},
						}),
						new $.button({
							label: "Delete checked",
							color: "danger",
							onclick: function () {
								$.list.container.check.delete("main_list");
							},
						}),
					]),
					new $.input({ type: "textarea", id: "output", rows: 10 }),
					new $.list.container({
						id: "main_list",
						setting: query_setting,
						query: query_data,
						name: "customer",
						paging: true,
						editor: function (data, readonly) {
							return [
								new $.input({
									type: "text",
									label: "Name",
									name: "name",
									value: data ? data.name : null,
								}),
								new $.input({
									type: "date",
									label: "Date of birth",
									name: "dob",
									value: data ? data.dob : null,
								}),
								new $.input({
									type: "text",
									label: "Phone",
									name: "phone",
									value: data ? data.phone : null,
								}),
								new $.file({ label: "Picture", name: "picture", value: data ? data.picture : null }),
								new $.input({
									type: "email",
									label: "Email",
									name: "email",
									value: data ? data.email : null,
								}),
								new $.input({
									type: "select",
									label: "State",
									name: "state",
									option: dbstate,
									value: data ? data.state : null,
								}),
							];
						},
						items: function (data) {
							let lastgroup = null;
							let result = [];
							data.forEach(function (i) {
								if (i.state && lastgroup !== i.state) {
									lastgroup = i.state;
									let iname = dbstate.filter(function (el) {
										return el.value === i.state;
									})[0]?.label;

									result.push(new $.list.group({ key: i.state, name: iname }));
								}

								result.push(
									new $.list.item({
										key: i._id,
										name: i.name,
										picture: i.picture,
										detail: new $.small([i.phone, i.dob, i.email].filter(Boolean).join(" | ")),
										allow_action: true,
										allow_copy: true,
										allow_delete: true,
										// detail: new $.div(
										// 	"container p-0",
										// 	new $.div("g-2 row row-cols-auto", [
										// 		data.phone
										// 			? new $.pill({
										// 					icon: "phone",
										// 					label: data.phone,
										// 			  })
										// 			: null,
										// 		data.email
										// 			? new $.pill({
										// 					icon: "at",
										// 					label: data.email,
										// 			  })
										// 			: null,
										// 	])
										// ),
									})
								);
							});

							return result;
						},
						// item: function (data) {
						// 	return new $.list.item({
						// 		key: data._id,
						// 		name: data.name,
						// 		picture: data.picture,
						// 		// detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
						// 		detail: new $.div(
						// 			"container p-0",
						// 			new $.div("g-2 row row-cols-auto", [
						// 				data.phone
						// 					? new $.pill({
						// 							icon: "phone",
						// 							label: data.phone,
						// 					  })
						// 					: null,
						// 				data.email
						// 					? new $.pill({
						// 							icon: "at",
						// 							label: data.email,
						// 					  })
						// 					: null,
						// 			])
						// 		),
						// 	});
						// },
					}),
				])
			);

			$.list.container.reload("main_list");
		}
	);

	$.core.appendChild(document.body, new $.user.signin());
});
