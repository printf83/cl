"use strict";
import $ from "./component.js";

$.core.documentReady(() => {
	$.core.replaceChild(
		document.getElementById("root"),
		new $.button({
			label: "Show Query Dialog",
			color: "primary",
			icon: "fire",
			onclick: function () {
				new $.query(
					{
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
						data: {
							filter: null,
							sort: { state: -1, name: 1 },
							field: { __v: 0 },
							limit: 10,
							skip: 0,
						},
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
					},
					[
						function (event, data) {
							new $.toast("/", JSON.stringify(data)).show();
						},
					]
				).show();
			},
		})
	);
});
