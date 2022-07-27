"use strict";
import $ from "../component.js";

let dbstate = null;
const loadState = function (callback, sender) {
	if (!dbstate) {
		console.log("Init state database");
		//get record
		$.db.api.option(
			{
				name: "state",
				fieldkey: "_id",
				fieldname: "name",
				sender: sender,
			},
			function (result) {
				if (result) {
					dbstate = result;
					callback(dbstate);
				}
			}
		);
	} else {
		callback(dbstate);
	}
};
const query_setting = function (dbstate) {
	return {
		field: [
			{
				value: "name",
				label: "Name",
				type: "text",
			},
			{
				value: "dob",
				label: "Date Of Birth",
				type: "date",
			},
			{
				value: "phone",
				label: "Phone",
				type: "tel",
			},
			{
				value: "picture",
				label: "Picture",
				type: "check",
			},
			{
				value: "email",
				label: "Email",
				type: "email",
			},
			{
				value: "state",
				label: "State",
				type: "select",
				option: dbstate,
				placeholder: "Please Choose One",
			},
		],
		limit: {
			min: 1,
			max: 100,
			step: 1,
		},
		skip: {
			min: 1,
			max: 100,
			step: 1,
		},
		useopricon: false,
	};
};

let query_data = {
	filter: null,
	sort: {
		state: 1,
		name: 1,
	},
	field: {
		__v: 0,
	},
	limit: 10,
	skip: 0,
};

const editor = function (data) {
	return [
		new $.input({
			type: "text",
			label: "Name",
			name: "name",
			required: true,
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
		new $.file({
			label: "Picture",
			name: "picture",
			value: data ? data.picture : null,
		}),
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
			required: true,
			option: dbstate,
			value: data ? data.state : null,
		}),
	];
};

export default {
	load: function () {
		$.list.container.reload("main_list");
	},
	main: function (callback) {
		loadState(function (dbstate) {
			callback(
				new $.list.container({
					id: "main_list",
					setting: query_setting(dbstate),
					query: query_data,
					editor: editor,
					name: "customer",
					// items: sample.list_items,
					// item: sample.list_item,
					// group: sample.list_group,
					// more: sample.list_more,
				})
			);
		});
	},
	menu: [
		{
			label: "Filter",
			onclick: function () {
				$.list.container.query.filter("main_list");
			},
		},
		{
			label: "Sort",
			onclick: function () {
				$.list.container.query.sort("main_list");
			},
		},
		{
			label: "Field",
			onclick: function () {
				$.list.container.query.field("main_list");
			},
		},
		{
			label: "Limit",
			onclick: function () {
				$.list.container.query.limit("main_list");
			},
		},
		{
			label: "Page",
			onclick: function () {
				$.list.container.query.page("main_list");
			},
		},
	],
};
