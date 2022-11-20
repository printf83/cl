"use strict";
import sample from "./sample.js";
import input from "../dist/cl/base/input.js";
import * as inputgroup from "../dist/cl/base/inputgroup.js";
import button from "../dist/cl/base/button.js";
import dropdown from "../dist/cl/base/dropdown.js";

export default [
	{
		title: "Input group",
		msg: "Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs.",
		anchor: false,
	},

	{
		title: "Basic example",
		container: sample.formcontainer,
		import: ["input", "inputgroup"],
		code: () => {
			return [
				new input({
					type: "text",
					placeholder: "Username",

					//marker
					before: "@",
				}),

				new input({
					type: "text",
					placeholder: "Recipient's username",

					//marker
					after: "@example.com",
				}),

				new input({
					label: "Your vanity URL",
					type: "text",

					//marker
					before: "https://example.com/users/",
				}),

				new input({
					label: "Amount (to the nearest dollar)",
					hidelabel: true,
					type: "number",

					//marker
					before: "$",
					after: ".00",
					//-
				}),

				//important if you create inputgroup manually,
				//please set container to false
				//using inputgroup.container
				new inputgroup.container([
					new input({
						label: "Username",
						hidelabel: true,
						type: "text",
						placeholder: "Username",

						//marker
						container: false, //<-- set container false
					}),
					new inputgroup.text("@"),
					new input({
						label: "Server",
						hidelabel: true,
						type: "text",
						placeholder: "Server",

						//marker
						container: false, //<-- set container false
					}),
				]),

				new input({
					label: "With textarea",
					hidelabel: true,
					type: "textarea",

					//marker
					before: "With textarea",
				}),
			];
		},
	},

	{
		title: "Wrapping",
		container: sample.formcontainer,
		import: ["input", "inputgroup"],
		code: () => {
			return [
				new input({
					textWarp: true,
					placeholder: "Username",
					type: "text",

					//marker
					before: "@",
				}),

				//using inputgroup.container
				new inputgroup.container({
					class: "flex-nowrap",
					elem: [
						new inputgroup.text("@"),
						new input({
							placeholder: "Username",
							type: "text",

							//marker
							container: false,
						}),
					],
				}),
			];
		},
	},

	{
		title: "Sizing",
		container: sample.formcontainer,
		import: ["input"],
		code: () => {
			return [
				new input({
					type: "text",

					//marker
					before: "Small",
					weight: "sm",
					//-
				}),

				new input({
					type: "text",

					//marker
					before: "Default",
				}),

				new input({
					type: "text",

					//marker
					before: "Large",
					weight: "lg",
					//-
				}),
			];
		},
	},

	{
		title: "Checkboxes and radios",
		container: sample.vstackcontainer,
		import: ["input", "inputgroup"],
		code: () => {
			return [
				//using inputgroup.container
				new inputgroup.container({
					elem: [
						new inputgroup.text({
							elem: new input({
								type: "checkbox",

								//marker
								flex: true,
								class: "mt-0",
								//-
							}),
						}),
						new input({
							type: "text",

							//marker
							container: false,
						}),
					],
				}),

				//using inputgroup.container
				new inputgroup.container({
					elem: [
						new inputgroup.text({
							elem: new input({
								type: "radio",

								//marker
								flex: true,
								class: "mt-0",
								//-
							}),
						}),
						new input({
							type: "text",

							//marker
							container: false,
						}),
					],
				}),
			];
		},
	},

	{
		title: "Multiple inputs",
		container: sample.formcontainer,
		import: ["input", "inputgroup"],
		code: () => {
			return [
				//using inputgroup.container
				new inputgroup.container({
					elem: [
						new inputgroup.text("First and last name"),
						new input({
							label: "First name",
							hidelabel: true,
							type: "text",

							//marker
							container: false,
						}),
						new input({
							label: "Last name",
							hidelabel: true,
							type: "text",

							//marker
							container: false,
						}),
					],
				}),
			];
		},
	},

	{
		title: "Multiple addons",
		container: sample.formcontainer,
		import: ["input", "inputgroup"],
		code: () => {
			return [
				//using inputgroup.container
				new inputgroup.container({
					elem: [
						new inputgroup.text("$"),
						new inputgroup.text("0.00"),
						new input({
							label: "Dollar amount (with dot and two decimal places)",
							hidelabel: true,
							type: "number",

							//marker
							container: false,
						}),
					],
				}),

				//using inputgroup.container
				new inputgroup.container({
					elem: [
						new input({
							label: "Dollar amount (with dot and two decimal places)",
							hidelabel: true,
							type: "number",

							//marker
							container: false,
						}),
						new inputgroup.text("$"),
						new inputgroup.text("0.00"),
					],
				}),
			];
		},
	},

	{
		title: "Button addons",
		container: sample.formcontainer,
		import: ["input", "button", "inputgroup"],
		code: () => {
			return [
				new input({
					label: "Example text with button addon",
					hidelabel: true,
					type: "text",

					//marker
					before: new button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					//-
				}),

				new input({
					placeholder: "Recipient's username",
					type: "text",

					//marker
					after: new button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					//-
				}),

				//using inputgroup.container
				new inputgroup.container({
					elem: [
						new button({
							outline: true,
							color: "secondary",
							label: "Button",
						}),
						new button({
							outline: true,
							color: "secondary",
							label: "Button",
						}),
						new input({
							label: "Example text with button addon",
							hidelabel: true,
							type: "text",

							//marker
							container: false,
						}),
					],
				}),

				//using inputgroup.container
				new inputgroup.container({
					elem: [
						new input({
							placeholder: "Recipient's username",
							type: "text",

							//marker
							container: false,
						}),
						new button({
							outline: true,
							color: "secondary",
							label: "Button",
						}),
						new button({
							outline: true,
							color: "secondary",
							label: "Button",
						}),
					],
				}),
			];
		},
	},

	{
		title: "Buttons with dropdowns",
		container: sample.formcontainer,
		import: ["input", "dropdown"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",

					//marker
					before: new dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						option: dditem,

						//marker
						container: null,
					}),
					//-
				}),

				new input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",

					//marker
					after: new dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						option: dditem,

						//marker
						container: null,
					}),
					//-
				}),

				new input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",

					//marker
					before: new dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						option: dditem,

						//marker
						container: null,
					}),
					after: new dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						option: dditem,

						//marker
						container: null,
					}),
					//-
				}),
			];
		},
	},

	{
		title: "Segmented buttons",
		container: sample.formcontainer,
		import: ["input", "dropdown"],
		code: () => {
			const dditem = [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ href: "#", label: "Something else here" },
				{ value: "-" },
				{ href: "#", label: "Separated link" },
			];

			return [
				new input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",

					//marker
					before: new dropdown({
						outline: true,
						color: "secondary",
						label: "Action",
						splittoggle: true,
						option: dditem,

						//marker
						container: null,
					}),
					//-
				}),

				new input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",

					//marker
					after: new dropdown({
						outline: true,
						color: "secondary",
						label: "Action",
						splittoggle: true,
						option: dditem,

						//marker
						container: null,
					}),
					//-
				}),
			];
		},
	},

	{
		title: "Segmented buttons",
		container: sample.formcontainer,
		import: ["input", "button"],
		code: () => {
			const optitem = [
				{ value: "", label: "Open this select menu", selected: true },
				{ value: "1", label: "One" },
				{ value: "2", label: "Two" },
				{ value: "3", label: "Three" },
			];

			return [
				new input({
					type: "select",
					option: optitem,

					//marker
					before: "Options",
				}),

				new input({
					type: "select",
					option: optitem,

					//marker
					after: "Options",
				}),

				new input({
					type: "select",
					option: optitem,

					//marker
					before: new button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					//-
				}),

				new input({
					type: "select",
					option: optitem,

					//marker
					after: new button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					//-
				}),
			];
		},
	},

	{
		title: "Custom file input",
		container: sample.formcontainer,
		import: ["input", "button"],
		code: () => {
			return [
				new input({
					type: "file",

					//marker
					before: "Upload",
				}),

				new input({
					type: "file",

					//marker
					after: "Upload",
				}),

				new input({
					type: "file",

					//marker
					before: new button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					//-
				}),

				new input({
					type: "file",

					//marker
					after: new button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					//-
				}),
			];
		},
	},
];
