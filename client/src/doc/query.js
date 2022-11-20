"use strict";
import sample from "./sample.js";
import codepreview from "../dist/cl/base/codepreview.js";
import button from "../dist/cl/base/button.js";
import * as query from "../dist/cl/base/query.js";
import div from "../dist/cl/base/div.js";
import * as core from "../dist/cl/base/core.js";
import * as db from "../dist/cl/base/api.js";

export default [
	{
		title: "Query",
		msg: "Provide access to make simpel query for <b>cl generic database</b>.",
		anchor: false,
	},

	{
		title: "Query dialog",
		msg: [
			"Using {{query.dialog}} to edit query for <b>cl generic database</b>.",
			new codepreview({
				container: "card",
				code: `
					new query.dialog(
						{
							field: setting_fileld,
							limit: setting_limit,
							skip: setting_skip,
							useopricon: setting_use_operation_icon,
							data: query_data,
						},
						[
							(event, query_result) => {
								//callback if user press okay
							},
							(event) => {
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		import: ["query", "sample"],
		code: () => {
			let dbstate = [
				{ value: "value1", label: "Label 1" },
				{ value: "value2", label: "Label 2" },
				{ value: "value3", label: "Label 3" },
				{ value: "value4", label: "Label 4" },
				{ value: "value5", label: "Label 5" },
			];

			return [
				new query.dialog(
					{
						field: sample.query_setting(dbstate).field,
						limit: sample.query_setting(dbstate).limit,
						skip: sample.query_setting(dbstate).skip,
						useopricon: sample.query_setting(dbstate).useopricon,
						data: sample.query_data,
					},
					[
						(_event, data) => {
							sample.query_data = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		msg: "Live preview",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_state": sample.list_state,
		},

		import: ["input", "button", "db", "query", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let queryOutputId = core.UUID();

			return [
				new button({
					label: "Query Dialog",
					icon: "fire",
					color: "primary",
					click: (event) => {
						let sender = event.currentTarget;

						sample.list_state((dbstate) => {
							//edit query
							new query.dialog(
								{
									field: sample.query_setting(dbstate).field,
									limit: sample.query_setting(dbstate).limit,
									skip: sample.query_setting(dbstate).skip,
									useopricon: sample.query_setting(dbstate).useopricon,
									data: sample.query_data,
								},
								[
									(_event, data) => {
										core.replaceWith(
											document.getElementById(queryOutputId),
											new div({
												id: queryOutputId,
												elem: new codepreview({
													title: "query.dialog result",
													container: "card",

													maxHeight: "10rem",
													code: JSON.stringify(data),
												}),
											})
										);
										PR.prettyPrint();

										sample.query_data = data;

										//get record
										db.api.list(
											{
												name: "customer",
												data: sample.query_data,
												sender: sender,
											},
											(result) => {
												//result
												core.replaceWith(
													document.getElementById(resultOutputId),
													new div({
														id: resultOutputId,
														elem: new codepreview({
															title: "db.api.list result",
															container: "card",

															maxHeight: "10rem",
															code: JSON.stringify(result),
														}),
													})
												);
												PR.prettyPrint();
											}
										);
									},
								]
							).show();
						}, sender);
					},
				}),

				new div({
					id: queryOutputId,
					elem: new codepreview({
						title: "query.dialog result",
						container: "card",

						code: `//result`,
					}),
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "db.api.list result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},

	{
		title: "Filter dialog",
		msg: [
			"Using {{query.filter}} to edit query filter only for <b>cl generic database</b>.",
			new codepreview({
				container: "card",
				code: `
					new query.filter(
						{
							field: setting_fileld,
							useopricon: setting_use_operation_icon,
							data: query_filter_data,
						},
						[
							(event, query_filter_result) => {
								//callback if user press okay
							},
							(event) => {
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		import: ["query", "sample"],
		code: () => {
			let dbstate = [
				{ value: "value1", label: "Label 1" },
				{ value: "value2", label: "Label 2" },
				{ value: "value3", label: "Label 3" },
				{ value: "value4", label: "Label 4" },
				{ value: "value5", label: "Label 5" },
			];

			return [
				new query.filter(
					{
						field: sample.query_setting(dbstate).field,
						useopricon: sample.query_setting(dbstate).useopricon,
						data: sample.query_data.filter,
					},
					[
						(_event, data) => {
							sample.query_data.filter = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		msg: "Live preview",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
			"sample.list_state": sample.list_state,
		},

		import: ["input", "button", "db", "query", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let queryOutputId = core.UUID();

			return [
				new button({
					label: "Filter Dialog",
					icon: "filter",
					color: "primary",
					click: (event) => {
						let sender = event.currentTarget;

						sample.list_state((dbstate) => {
							//edit query
							new query.filter(
								{
									field: sample.query_setting(dbstate).field,
									useopricon: sample.query_setting(dbstate).useopricon,
									data: sample.query_data.filter,
								},
								[
									(_event, data) => {
										core.replaceWith(
											document.getElementById(queryOutputId),
											new div({
												id: queryOutputId,
												elem: new codepreview({
													title: "query.filter result",
													container: "card",

													maxHeight: "10rem",
													code: JSON.stringify(data),
												}),
											})
										);
										PR.prettyPrint();

										sample.query_data.filter = data;

										//get record
										db.api.list(
											{
												name: "customer",
												data: sample.query_data,
												sender: sender,
											},
											(result) => {
												//result
												core.replaceWith(
													document.getElementById(resultOutputId),
													new div({
														id: resultOutputId,
														elem: new codepreview({
															title: "db.api.list result",
															container: "card",

															maxHeight: "10rem",
															code: JSON.stringify(result),
														}),
													})
												);
												PR.prettyPrint();
											}
										);
									},
								]
							).show();
						}, sender);
					},
				}),

				new div({
					id: queryOutputId,
					elem: new codepreview({
						title: "query.filter result",
						container: "card",

						code: `//result`,
					}),
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "db.api.list result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},

	{
		title: "Sort dialog",
		msg: [
			"Using {{query.sort}} to edit query sort only for <b>cl generic database</b>.",
			new codepreview({
				container: "card",
				code: `
					new query.sort(
						{
							field: setting_fileld,
							useopricon: setting_use_operation_icon,
							data: query_sort_data,
						},
						[
							(event, query_sort_result) => {
								//callback if user press okay
							},
							(event) => {
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		import: ["query", "sample"],
		code: () => {
			return [
				new query.sort(
					{
						field: sample.query_setting().field,
						useopricon: sample.query_setting().useopricon,
						data: sample.query_data.sort,
					},
					[
						(_event, data) => {
							sample.query_data.sort = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		msg: "Live preview",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},

		import: ["input", "button", "db", "query", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let queryOutputId = core.UUID();

			return [
				new button({
					label: "Sort Dialog",
					icon: "sort",
					color: "primary",
					click: (event) => {
						let sender = event.currentTarget;

						//edit query
						new query.sort(
							{
								field: sample.query_setting().field,
								useopricon: sample.query_setting().useopricon,
								data: sample.query_data.sort,
							},
							[
								(_event, data) => {
									core.replaceWith(
										document.getElementById(queryOutputId),
										new div({
											id: queryOutputId,
											elem: new codepreview({
												title: "query.sort result",
												container: "card",

												maxHeight: "10rem",
												code: JSON.stringify(data),
											}),
										})
									);
									PR.prettyPrint();

									sample.query_data.sort = data;

									//get record
									db.api.list(
										{
											name: "customer",
											data: sample.query_data,
											sender: sender,
										},
										(result) => {
											//result
											core.replaceWith(
												document.getElementById(resultOutputId),
												new div({
													id: resultOutputId,
													elem: new codepreview({
														title: "db.api.list result",
														container: "card",

														maxHeight: "10rem",
														code: JSON.stringify(result),
													}),
												})
											);
											PR.prettyPrint();
										}
									);
								},
							]
						).show();
					},
				}),

				new div({
					id: queryOutputId,
					elem: new codepreview({
						title: "query.sort result",
						container: "card",

						code: `//result`,
					}),
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "db.api.list result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},

	{
		title: "Field dialog",
		msg: [
			"Using {{query.field}} to edit query field only for <b>cl generic database</b>.",
			new codepreview({
				container: "card",
				code: `
					new query.field(
						{
							field: setting_fileld,
							data: query_field_data,
						},
						[
							(event, query_field_result) => {
								//callback if user press okay
							},
							(event) => {
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		import: ["query", "sample"],
		code: () => {
			return [
				new query.field(
					{
						field: sample.query_setting().field,
						data: sample.query_data.field,
					},
					[
						(_event, data) => {
							sample.query_data.field = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		msg: "Live preview",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},

		import: ["input", "button", "db", "query", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let queryOutputId = core.UUID();

			return [
				new button({
					label: "Field Dialog",
					icon: "tasks",
					color: "primary",
					click: (event) => {
						let sender = event.currentTarget;

						//edit query
						new query.field(
							{
								field: sample.query_setting().field,
								data: sample.query_data.field,
							},
							[
								(_event, data) => {
									core.replaceWith(
										document.getElementById(queryOutputId),
										new div({
											id: queryOutputId,
											elem: new codepreview({
												title: "query.field result",
												container: "card",

												maxHeight: "10rem",
												code: JSON.stringify(data),
											}),
										})
									);
									PR.prettyPrint();

									sample.query_data.field = data;

									//get record
									db.api.list(
										{
											name: "customer",
											data: sample.query_data,
											sender: sender,
										},
										(result) => {
											//result
											core.replaceWith(
												document.getElementById(resultOutputId),
												new div({
													id: resultOutputId,
													elem: new codepreview({
														title: "db.api.list result",
														container: "card",

														maxHeight: "10rem",
														code: JSON.stringify(result),
													}),
												})
											);
											PR.prettyPrint();
										}
									);
								},
							]
						).show();
					},
				}),

				new div({
					id: queryOutputId,
					elem: new codepreview({
						title: "query.field result",
						container: "card",

						code: `//result`,
					}),
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "db.api.list result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},

	{
		title: "Limit dialog",
		msg: [
			"Using {{query.limit}} to edit query limit only for <b>cl generic database</b>.",
			new codepreview({
				container: "card",
				code: `
					new query.limit(
						{
							min: setting_limit_min,
							max: setting_limit_max,
							step: setting_limit_step,
							data: limit_data,
						},
						[
							(event, limit_result) => {
								//callback if user press okay
							},
							(event) => {
								//callback if user press cancel
							}
							
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		import: ["query", "sample"],
		code: () => {
			return [
				new query.limit(
					{
						min: sample.query_setting().limit.min,
						max: sample.query_setting().limit.max,
						step: sample.query_setting().limit.step,
						data: sample.query_data.limit,
					},
					[
						(_event, data) => {
							let skip = sample.query_data.skip / sample.query_data.limit;
							sample.query_data.limit = data;
							sample.query_data.skip = skip * sample.query_data.limit;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		msg: "Live preview",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},

		import: ["input", "button", "db", "query", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let queryOutputId = core.UUID();

			return [
				new button({
					label: "Limit Dialog",
					icon: "list-ol",
					color: "primary",
					click: (event) => {
						let sender = event.currentTarget;

						//edit query
						new query.limit(
							{
								min: sample.query_setting().limit.min,
								max: sample.query_setting().limit.max,
								step: sample.query_setting().limit.step,
								data: sample.query_data.limit,
							},
							[
								(_event, data) => {
									core.replaceWith(
										document.getElementById(queryOutputId),
										new div({
											id: queryOutputId,
											elem: new codepreview({
												title: "query.limit result",
												container: "card",

												maxHeight: "10rem",
												code: JSON.stringify(data),
											}),
										})
									);
									PR.prettyPrint();

									//need to recalculate "skip" base on limit
									let skip = sample.query_data.skip / sample.query_data.limit;
									sample.query_data.limit = data;
									sample.query_data.skip = skip * sample.query_data.limit;

									//get record
									db.api.list(
										{
											name: "customer",
											data: sample.query_data,
											sender: sender,
										},
										(result) => {
											//result
											core.replaceWith(
												document.getElementById(resultOutputId),
												new div({
													id: resultOutputId,
													elem: new codepreview({
														title: "db.api.list result",
														container: "card",
														maxHeight: "10rem",
														code: JSON.stringify(result),
													}),
												})
											);
											PR.prettyPrint();
										}
									);
								},
							]
						).show();
					},
				}),

				new div({
					id: queryOutputId,
					elem: new codepreview({
						title: "query.limit result",
						container: "card",

						code: `//result`,
					}),
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "db.api.list result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},

	{
		title: "Page dialog",
		msg: [
			"Using {{query.page}} to edit query page only for <b>cl generic database</b>.",
			new codepreview({
				container: "card",
				code: `
					new query.page(
						{
							min: setting_page_min,
							max: setting_page_max,
							step: setting_page_step,
							limit: limit_data,
							data: page_data,
						},
						[
							(event, page_result) => {
								//callback if user press okay
							},
							(event) => {
								//callback if user press cancel
							}
						]
					).show();
			`,
			}),
		],
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},
		viewclass: "cl-modal-preview",
		import: ["query", "sample"],
		code: () => {
			return [
				new query.page(
					{
						min: sample.query_setting().skip.min,
						max: sample.query_setting().skip.max,
						step: sample.query_setting().skip.step,
						limit: sample.query_data.limit,
						data: sample.query_data.skip,
					},
					[
						(_event, data) => {
							sample.query_data.skip = data;
						},
					],
					{ debug: true }
				),
			];
		},
	},

	{
		msg: "Live preview",
		sample: {
			"sample.query_setting": sample.query_setting,
			"sample.query_data": sample.query_data_view,
		},

		import: ["input", "button", "db", "query", "sample"],
		code: () => {
			let resultOutputId = core.UUID();
			let queryOutputId = core.UUID();

			return [
				new button({
					label: "Page Dialog",
					icon: { icon: "sort", rotate: 90 },
					color: "primary",
					click: (event) => {
						let sender = event.currentTarget;

						//edit query
						new query.page(
							{
								min: sample.query_setting().skip.min,
								max: sample.query_setting().skip.max,
								step: sample.query_setting().skip.step,
								limit: sample.query_data.limit,
								data: sample.query_data.skip,
							},
							[
								(_event, data) => {
									core.replaceWith(
										document.getElementById(queryOutputId),
										new div({
											id: queryOutputId,
											elem: new codepreview({
												title: "query.page result",
												container: "card",

												maxHeight: "10rem",
												code: JSON.stringify(data),
											}),
										})
									);
									PR.prettyPrint();

									sample.query_data.skip = data;

									//get record
									db.api.list(
										{
											name: "customer",
											data: sample.query_data,
											sender: sender,
										},
										(result) => {
											//result
											core.replaceWith(
												document.getElementById(resultOutputId),
												new div({
													id: resultOutputId,
													elem: new codepreview({
														title: "db.api.list result",
														container: "card",

														maxHeight: "10rem",
														code: JSON.stringify(result),
													}),
												})
											);
											PR.prettyPrint();
										}
									);
								},
							]
						).show();
					},
				}),

				new div({
					id: queryOutputId,
					elem: new codepreview({
						title: "query.page result",
						container: "card",

						code: `//result`,
					}),
				}),
				new div({
					id: resultOutputId,
					elem: new codepreview({
						title: "db.api.list result",
						container: "card",

						code: `//result`,
					}),
				}),
			];
		},
	},
];
