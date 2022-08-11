"use strict";
import sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Input group",
		msg: "Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs.",
		anchor: false,
	},

	{
		title: "Basic example",
		container: sample.formcontainer,
		code: () => {
			return [
				new $.input({
					type: "text",
					placeholder: "Username",
					before: "@",
				}),

				new $.input({
					type: "text",
					placeholder: "Recipient's username",
					after: "@example.com",
				}),

				new $.input({
					label: "Your vanity URL",
					type: "text",
					before: "https://example.com/users/",
				}),

				new $.input({
					label: "Amount (to the nearest dollar)",
					hidelabel: true,
					type: "number",
					before: "$",
					after: ".00",
				}),

				new $.inputgroup.container([
					new $.input({
						label: "Username",
						hidelabel: true,
						type: "text",
						placeholder: "Username",
					}),
					new $.inputgroup.text("@"),
					new $.input({
						label: "Server",
						hidelabel: true,
						type: "text",
						placeholder: "Server",
					}),
				]),

				new $.input({
					label: "With textarea",
					hidelabel: true,
					type: "textarea",
					before: "With textarea",
				}),
			];
		},
	},

	{
		title: "Wrapping",
		container: sample.formcontainer,
		code: () => {
			return [
				new $.input({
					nowrap: true,
					placeholder: "Username",
					type: "text",
					before: "@",
				}),

				new $.inputgroup.container({
					class: "flex-nowrap",
					elem: [
						new $.inputgroup.text("@"),
						new $.input({
							placeholder: "Username",
							type: "text",
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
		code: () => {
			return [
				new $.input({
					type: "text",
					before: "Small",
					weight: "sm",
				}),

				new $.input({
					type: "text",
					before: "Default",
				}),

				new $.input({
					type: "text",
					before: "Large",
					weight: "lg",
				}),
			];
		},
	},

	{
		title: "Checkboxes and radios",
		container: sample.formcontainer,
		code: () => {
			return [
				new $.inputgroup.container({
					elem: [
						new $.inputgroup.text({
							elem: new $.input({ type: "checkbox", flex: true, class: "mt-0" }),
						}),
						new $.input({
							type: "text",
							container: false,
						}),
					],
				}),
				new $.inputgroup.container({
					elem: [
						new $.inputgroup.text({
							elem: new $.input({ type: "radio", flex: true, class: "mt-0" }),
						}),
						new $.input({
							type: "text",
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
		code: () => {
			return [
				new $.inputgroup.container({
					elem: [
						new $.inputgroup.text("First and last name"),
						new $.input({
							label: "First name",
							hidelabel: true,
							type: "text",
							container: false,
						}),
						new $.input({
							label: "Last name",
							hidelabel: true,
							type: "text",
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
		code: () => {
			return [
				new $.inputgroup.container({
					elem: [
						new $.inputgroup.text("$"),
						new $.inputgroup.text("0.00"),
						new $.input({
							label: "Dollar amount (with dot and two decimal places)",
							hidelabel: true,
							type: "number",
							container: false,
						}),
					],
				}),

				new $.inputgroup.container({
					elem: [
						new $.input({
							label: "Dollar amount (with dot and two decimal places)",
							hidelabel: true,
							type: "number",
							container: false,
						}),
						new $.inputgroup.text("$"),
						new $.inputgroup.text("0.00"),
					],
				}),
			];
		},
	},

	{
		title: "Button addons",
		container: sample.formcontainer,
		code: () => {
			return [
				new $.input({
					label: "Example text with button addon",
					hidelabel: true,
					type: "text",
					before: new $.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				}),

				new $.input({
					placeholder: "Recipient's username",
					type: "text",
					after: new $.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				}),

				new $.inputgroup.container({
					elem: [
						new $.button({
							outline: true,
							color: "secondary",
							label: "Button",
						}),
						new $.button({
							outline: true,
							color: "secondary",
							label: "Button",
						}),
						new $.input({
							label: "Example text with button addon",
							hidelabel: true,
							type: "text",
							container: false,
						}),
					],
				}),

				new $.inputgroup.container({
					elem: [
						new $.input({
							placeholder: "Recipient's username",
							type: "text",
							container: false,
						}),
						new $.button({
							outline: true,
							color: "secondary",
							label: "Button",
						}),
						new $.button({
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
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: () => {
			return [
				new $.input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",
					before: new $.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						option: sample.dropdownitem(),
						container: null,
					}),
				}),

				new $.input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",
					after: new $.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						option: sample.dropdownitem(),
						container: null,
					}),
				}),

				new $.input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",
					before: new $.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						option: sample.dropdownitem(),
						container: null,
					}),
					after: new $.dropdown({
						outline: true,
						color: "secondary",
						label: "Dropdown",
						option: sample.dropdownitem(),
						container: null,
					}),
				}),
			];
		},
	},

	{
		title: "Segmented buttons",
		container: sample.formcontainer,
		sample: { "sample.dropdownitem": sample.dropdownitem },
		code: () => {
			return [
				new $.input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",
					before: new $.dropdown({
						outline: true,
						color: "secondary",
						label: "Action",
						splittoggle: true,
						option: sample.dropdownitem(),
						container: null,
					}),
				}),

				new $.input({
					label: "Text input with dropdown button",
					hidelabel: true,
					type: "text",
					after: new $.dropdown({
						outline: true,
						color: "secondary",
						label: "Action",
						splittoggle: true,
						option: sample.dropdownitem(),
						container: null,
					}),
				}),
			];
		},
	},

	{
		title: "Segmented buttons",
		container: sample.formcontainer,
		sample: { "sample.optionitem": sample.optionitem },
		code: () => {
			return [
				new $.input({
					type: "select",
					before: "Options",
					option: sample.optionitem(),
				}),

				new $.input({
					type: "select",
					after: "Options",
					option: sample.optionitem(),
				}),

				new $.input({
					type: "select",
					before: new $.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					option: sample.optionitem(),
				}),

				new $.input({
					type: "select",
					after: new $.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
					option: sample.optionitem(),
				}),
			];
		},
	},

	{
		title: "Custom file input",
		container: sample.formcontainer,
		code: () => {
			return [
				new $.input({
					type: "file",
					before: "Upload",
				}),

				new $.input({
					type: "file",
					after: "Upload",
				}),

				new $.input({
					type: "file",
					before: new $.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				}),

				new $.input({
					type: "file",
					after: new $.button({
						outline: true,
						color: "secondary",
						label: "Button",
					}),
				}),
			];
		},
	},
];
