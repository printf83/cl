"use strict";
import sample from "./sample.js";
import $ from "../component.js";

const fn = {
	setting: {
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
	},
	query: {
		filter: null,
		sort: { state: 1, name: 1 },
		field: { __v: 0 },
		limit: 10,
		skip: 0,
	},
};

export default [
	{
		title: "List",
		msg: "Provide access to easy access <b>cl generic database</b>.",
		anchor: false,
	},

	{
		msg: [
			"In this example we will use some outside variable that we declare as fn.",
			new $.codepreview({
				container: "card",
				code: `
					const fn = {
						setting: {
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
						},
						query: {
							filter: null,
							sort: { state: 1, name: 1 },
							field: { __v: 0 },
							limit: 10,
							skip: 0,
						},
					};
			`,
			}),
		],
	},

	{
		title: "Example",
		container: sample.formcontainer,
		code: function () {
			let resultOutputId = $.core.UUID();

			return [
				new $.button({
					label: "Generate",
					icon: "fire",
					color: "primary",
					onclick: function () {
						$.list.container.reload(resultOutputId);
					},
				}),

				new $.list.container({
					id: resultOutputId,
					setting: fn.setting,
					query: fn.query,
					name: "customer",
					paging: true,
				}),
			];
		},
	},
];
