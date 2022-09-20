"use strict";
import sample from "./sample.js";
import * as core from "../base/core.js";
import a from "../base/a.js";
import button from "../base/button.js";
import div from "../base/div.js";
import * as dlg from "../base/dlg.js";
import h from "../base/h.js";
import hr from "../base/hr.js";
import input from "../base/input.js";
import modal from "../base/modal.js";
import msg from "../base/msg.js";
import p from "../base/p.js";
import toast from "../base/toast.js";
import tooltip from "../base/tooltip.js";
import listgroup from "../base/listgroup.js";
import * as container from "../base/container.js";
import * as table from "../base/table.js";
import pill from "../base/pill.js";

export default [
	{
		title: "Modals",
		msg: "Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.",
		anchor: false,
	},

	{
		title: "Example",
	},

	{
		title: "Simple msgbox components",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		import: ["toast", "msg", "modal"],
		code: () => {
			return new modal({
				elem: new msg({
					weight: "md",
					icon: "i",
					elem: "This is example msgbox",
				}),
				button: {
					label: "Okay",
					click: () => {
						new toast("i", "Callback").show();
					},
				},
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Without icon and title header",
		viewclass: "cl-modal-preview",
		import: ["toast", "msg", "modal"],
		code: () => {
			return new modal({
				//marker
				title: null,
				icon: null,
				//-

				elem: new msg({
					weight: "md",
					icon: "i",
					elem: "This is example msgbox",
				}),
				button: {
					label: "Okay",
					click: () => {
						new toast("i", "Callback").show();
					},
				},
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Custom title & icon header",
		viewclass: "cl-modal-preview",
		import: ["toast", "msg", "modal"],
		code: () => {
			return new modal({
				//marker
				title: "Bootstrap",
				icon: {
					type: "fab",
					icon: "bootstrap",
				},
				//-

				elem: new msg({
					weight: "md",
					icon: "i",
					elem: "This is example msgbox",
				}),
				button: {
					label: "Okay",
					click: () => {
						new toast("i", "Callback").show();
					},
				},
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Simple msgbox live",
		container: sample.stackcontainer,
		import: ["toast", "button", "dlg"],
		code: () => {
			return [
				{ label: "Info", icon: "i" },
				{ label: "Question", icon: "?" },
				{ label: "Warning", icon: "!" },
				{ label: "Error", icon: "x" },
			].map((i) => {
				return new button({
					label: i.label,
					icon: i.icon,
					click: () => {
						new dlg.msgbox(/*marker*/ i.icon, `This is example msgbox with <b>${i.icon}</b> icon`, () => {
							new toast(i.icon, "After user click <b>Okay</b> button").show();
						}).show();
					},
				});
			});
		},
	},

	{
		title: "Simple inputbox components",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		import: ["toast", "dlg"],
		code: () => {
			return new dlg.inputbox(
				//marker
				"text",
				//-

				"This is example inputbox text",

				//marker
				(event, data) => {
					new toast("i", `Result from dlg.inputbox is : ${JSON.stringify(data)}`).show();
				},
				//-

				"Custom Dialog Title",
				{ debug: true } //this last argument is for this documentation preview only
			);
		},
	},

	{
		title: "Simple inputbox components with select",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		import: ["toast", "input", "dlg"],
		code: () => {
			return new dlg.inputbox(
				//marker
				new input({
					type: "select",
					option: [
						{ value: "", label: "Open this select menu", selected: true },
						{ value: "1", label: "One" },
						{ value: "2", label: "Two" },
						{ value: "3", label: "Three" },
					],
					name: "value",
				}),
				//-

				"This is example inputbox select",

				//marker
				(event, data) => {
					new toast("i", `Result from dlg.inputbox is : ${JSON.stringify(data)}`).show();
				},
				//-

				null,
				{ debug: true } //this last argument is for this documentation preview only
			);
		},
	},

	{
		title: "Simple inputbox live",
		container: sample.stackcontainer,
		import: ["toast", "button", "input", "dlg"],
		code: () => {
			return [
				{ label: "Text", type: "text" },
				{ label: "Number", type: "number" },
				{ label: "Date", type: "date" },
				{ label: "Range", type: "range" },
				{ label: "Textarea", type: "textarea" },
				{
					label: "Select",
					type: "select",
					option: [
						{ value: "", label: "Open this select menu", selected: true },
						{ value: "1", label: "One" },
						{ value: "2", label: "Two" },
						{ value: "3", label: "Three" },
					],
				},
			].map((i) => {
				return new button({
					label: i.label,
					color: "primary",
					click: () => {
						new dlg.inputbox(
							//marker
							i.hasOwnProperty("option")
								? new input({ type: "select", option: i.option, name: "value" })
								: i.type,
							//-

							`This is example inputbox with <b>${i.type}</b> input`,
							[
								//marker
								(event, data) => {
									new toast("/", `You give <b>${data.value}</b> in inputbox`).show();
								},
								//-

								(event) => {
									new toast("x", `You not give anything in inputbox`).show();
								},
							]
						).show();
					},
				});
			});
		},
	},

	{
		title: "Inputbox with multiple input",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		import: ["toast", "dlg", "container", "input", "listgroup"],
		code: () => {
			let el = [
				//marker
				new input({
					label: "Name",
					required: true,
					invalid: "Please provide name",
					name: "name",
					type: "text",
				}),
				new input({
					label: "Age",
					required: true,
					invalid: "Please provide age",
					name: "age",
					type: "number",
					min: 13,
					max: 100,
					after: "Years old",
				}),
				new listgroup({
					label: "Sex",
					type: "div",
					item: [
						{
							type: "radio",
							name: "sex",
							value: "s",
							label: "Secret",
							checked: true,
						},
						{
							type: "radio",
							name: "sex",
							value: "m",
							label: "Male",
						},
						{
							type: "radio",
							name: "sex",
							value: "f",
							label: "Female",
						},
					],
				}),
				new listgroup({
					label: "Interest",
					type: "div",
					item: [
						{
							type: "checkbox",
							name: "interest",
							value: "sports",
							label: "Sports",
						},
						{
							type: "checkbox",
							name: "interest",
							value: "business",
							label: "Business",
						},
						{
							type: "checkbox",
							name: "interest",
							value: "social",
							label: "Social",
						},
						{
							type: "checkbox",
							name: "interest",
							value: "internet",
							label: "Internet",
						},
					],
				}),
				new input({
					label: "Country",
					required: true,
					invalid: "Please choose country",
					name: "country",
					type: "select",
					option: [
						{ value: "", label: "" },
						{ value: "my", label: "Malaysia" },
						{ value: "in", label: "Indonesia" },
						{ value: "sg", label: "Singapore" },
					],
				}),
				//-
			];

			return new dlg.inputbox(
				el,
				null,

				//marker
				(event, data) => {
					new toast("/", `You give <b>${JSON.stringify(data)}</b> in inputbox`).show();
				},
				//-

				null,
				{ debug: true } //this last argument is for this documentation preview only
			);
		},
	},

	{
		title: "Inputbox with multiple input live",
		msg: "First agrument can handle type {{[new input()]}}.",
		import: ["toast", "button", "dlg"],
		code: () => {
			let el = [
				//marker
				new input({
					label: "Name",
					required: true,
					invalid: "Please provide name",
					name: "name",
					type: "text",
				}),
				new input({
					label: "Age",
					required: true,
					invalid: "Please provide age",
					name: "age",
					type: "number",
					min: 13,
					max: 100,
					after: "Years old",
				}),
				new listgroup({
					label: "Sex",
					type: "div",
					item: [
						{
							type: "radio",
							name: "sex",
							value: "s",
							label: "Secret",
							checked: true,
						},
						{
							type: "radio",
							name: "sex",
							value: "m",
							label: "Male",
						},
						{
							type: "radio",
							name: "sex",
							value: "f",
							label: "Female",
						},
					],
				}),
				new listgroup({
					label: "Interest",
					type: "div",
					item: [
						{
							type: "checkbox",
							name: "interest",
							value: "sports",
							label: "Sports",
						},
						{
							type: "checkbox",
							name: "interest",
							value: "business",
							label: "Business",
						},
						{
							type: "checkbox",
							name: "interest",
							value: "social",
							label: "Social",
						},
						{
							type: "checkbox",
							name: "interest",
							value: "internet",
							label: "Internet",
						},
					],
				}),
				new input({
					label: "Country",
					required: true,
					invalid: "Please choose country",
					name: "country",
					type: "select",
					option: [
						{ value: "", label: "" },
						{ value: "my", label: "Malaysia" },
						{ value: "in", label: "Indonesia" },
						{ value: "sg", label: "Singapore" },
					],
				}),
				//-
			];

			return new button({
				label: "Show inputbox with multiple input",
				color: "primary",
				click: () => {
					new dlg.inputbox(
						el,
						null,

						//marker
						(event, data) => {
							new toast({
								delay: 10000,
								color: "success",
								title: "Result",
								elem: `${JSON.stringify(data)}`,
							}).show();
						}
						//-
					).show();
				},
			});
		},
	},

	{
		title: "Confirmbox",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		import: ["toast", "dlg"],
		code: () => {
			return new dlg.confirmbox(
				//marker
				"?",
				//-

				"This is example msgbox with <b>Okay and Cancel</b> button",

				//marker
				() => {
					new toast("i", "Callback").show();
				},
				//-

				null,
				{ debug: true } //this last argument is for this documentation preview only
			);
		},
	},

	{
		title: "Simple confirmbox live",
		container: sample.stackcontainer,
		import: ["toast", "button", "dlg"],
		code: () => {
			return [
				{ label: "Info", icon: "i" },
				{ label: "Question", icon: "?" },
				{ label: "Warning", icon: "!" },
				{ label: "Error", icon: "x" },
			].map((i) => {
				return new button({
					label: i.label,
					icon: i.icon,
					click: () => {
						new dlg.confirmbox(
							//marker
							i.icon,
							//-

							`This is example confirmbox with <b>${i.icon}</b> icon`,

							//marker
							[
								{
									label: "Yes",
									click: () => {
										new toast("/", "After user click <b>Yes</b> button").show();
									},
								},
								{
									label: "No",
									click: () => {
										new toast("x", "After user not click <b>No</b> button").show();
									},
								},
							]
							//-
						).show();
					},
				});
			});
		},
	},

	{
		title: "Dialog box",
		msg: "Below is a static modal example (meaning its position and display have been overridden). Included are the modal header, modal body (required for padding), and modal footer (optional). We ask that you include modal headers with dismiss actions whenever possible, or provide another explicit dismiss action.",
		viewclass: "cl-modal-preview",
		import: ["modal"],
		code: () => {
			return new modal({
				elem: "Modal body text goes here.",
				button: ["Save changes", "Close"],
				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Live example",
		import: ["button", "modal"],
		code: () => {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						//marker
						dark: true,
						//-

						elem: "Modal body text goes here.",
						button: [
							//marker
							{
								label: "Save changes",
								click: () => {},
							},
							//-

							"Cancel",
						],
					}).show();
				},
			});
		},
	},

	{
		title: "Checkbox in footer",
		viewclass: "cl-modal-preview",
		import: ["toast", "input", "modal"],
		code: () => {
			return new modal({
				elem: "Modal body text goes here.",
				button: [
					{
						label: "Save changes",
						click: (event, data) => {
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
						},
					},
					"Close",
				],

				//marker
				footer: new input({ type: "switch", name: "showagain", label: "Show again" }),

				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Backdrop color",
		container: sample.stackcontainer,
		import: ["toast", "msg", "button", "modal"],
		code: () => {
			return [
				{ label: "Primary", icon: "i", backdropcolor: "primary" },
				{ label: "Success", icon: "?", backdropcolor: "success" },
				{ label: "Warning", icon: "!", backdropcolor: "warning" },
				{ label: "Danger", icon: "x", backdropcolor: "danger" },
			].map((i) => {
				return new button({
					label: i.label,
					icon: i.icon,
					click: (e) => {
						new modal({
							elem: new msg({
								weight: "md",
								icon: i.icon,
								elem: `This is example dialog with <b>${i.backdropcolor}</b> backdrop color`,
							}),
							button: [
								{
									label: "Understand",
									color: i.backdropcolor,
									click: (event, data) => {
										new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
									},
								},
								"Close",
							],

							//marker
							backdropcolor: i.backdropcolor,
						}).show();
					},
				});
			});
		},
	},

	{
		title: "Disable static backdrop",
		import: ["toast", "button", "modal"],
		code: () => {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						elem: "By default, modal dialog will not close if you click outside or press escape key. To allow modal dialog to close when click outside or press escape key, set <code>static: false</code> option",
						button: [
							{
								label: "Understand",
								click: (event, data) => {
									new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
								},
							},
							"Close",
						],

						//marker
						static: false,
					}).show();
				},
			});
		},
	},

	{
		title: "Disable scrolling long content",
		import: ["toast", "p", "button", "modal", "sample"],
		code: () => {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						elem: [
							new p({
								elem: "By default, modal dialog will activate scrolling inside modal dialog. To disabled it, set <code>scrollable: false</code> option.",
							}),
							new p(sample.text()),
							new p(sample.text()),
							new p(sample.text()),
							new p(sample.text()),
							new p(sample.text()),
							new p(sample.text()),
						],
						button: [
							{
								label: "Understand",
								click: (event, data) => {
									new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
								},
							},
							"Close",
						],

						//marker
						scrollable: false,
					}).show();
				},
			});
		},
	},

	{
		title: "Disable vertically centered",
		import: ["toast", "button", "modal"],
		code: () => {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						elem: "By default, modal dialog will vertically centered when shown. To disabled it, set <code>center: false</code> option.",
						button: [
							{
								label: "Save changes",
								click: (event, data) => {
									new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
								},
							},
							"Close",
						],

						//marker
						center: false,
					}).show();
				},
			});
		},
	},

	{
		title: "Custom button",
		viewclass: "cl-modal-preview",
		import: ["toast", "modal"],
		code: () => {
			return new modal({
				elem: "Custom button dialog",

				//marker
				button: [
					{
						label: "Yesss!",
						color: "primary",
						click: (event, data) => {
							new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
						},
					},
					{ label: "Noooo!", color: "danger" },
					{ label: "Cancel", color: "info" },
					{
						icon: "?",
						click: () => {
							new toast("?", "Question button pressed").show();
						},
					},
				],
				//-

				debug: true, // documentation purpose only
			});
		},
	},

	{
		title: "Tooltips and popovers",
		import: ["button", "tooltip", "hr", "h", "p", "a", "modal"],
		code: () => {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						elem: [
							new h({ level: 5, elem: "Popover in a modal" }),
							new p({
								elem: [
									"This ",

									//marker
									new tooltip({
										type: "popover",
										placement: "right",
										title: "Popover title",
										msg: "Popover body content is set in this attribute.",
										trigger: null,
										elem: new button({
											color: "secondary",
											label: "button",
										}),
									}),
									//-

									" triggers a popover on click.",
								],
							}),
							new hr(),
							new h({ level: 5, elem: "Tooltips in a modal" }),
							new p({
								elem: [
									//marker
									new tooltip({
										type: "tooltip",
										msg: "Tooltip for link 1",
										elem: new a({
											href: "#",
											label: "This link",
										}),
									}),
									//-

									" and ",

									//marker
									new tooltip({
										type: "tooltip",
										msg: "Tooltip for link 2",
										elem: new a({
											href: "#",
											label: "that link",
										}),
									}),
									//-

									" have tooltips on hover.",
								],
							}),
						],
						button: ["Save change", "Close"],
					}).show();
				},
			});
		},
	},

	{
		title: "Using the grid (Direct HTML)",
		import: ["button", "modal"],
		code: () => {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						title: "Grids in modal",
						elem: `<div class="container-fluid cl-highlight-col"><div class="row"><div class="col-md-4">.col-md-4</div><div class="col-md-4 ms-auto">.col-md-4 .ms-auto</div></div><div class="row"><div class="col-md-3 ms-auto">.col-md-3 .ms-auto</div><div class="col-md-2 ms-auto">.col-md-2 .ms-auto</div></div><div class="row"><div class="col-md-6 ms-auto">.col-md-6 .ms-auto</div></div><div class="row"><div class="col-sm-9">Level 1: .col-md-9<div class="row"><div class="col-8 col-sm-6">Level 2: .col-8 .col-sm-6</div><div class="col-4 col-sm-6">Level 2: .col-4 .col-sm-6</div></div></div></div></div>`,
						button: ["Save change", "Close"],
					}).show();
				},
			});
		},
	},

	{
		msg: "Using easy option",
		import: ["div", "button", "modal"],
		code: () => {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						title: "Grids in modal",
						elem: new div("container-fluid cl-highlight-col", [
							new div("row", [
								new div("col-md-4", ".col-md-4"),
								new div("col-md-4 ms-auto", ".col-md-4 .ms-auto"),
							]),
							new div("row", [
								new div("col-md-3 ms-auto", ".col-md-3 .ms-auto"),
								new div("col-md-2 ms-auto", ".col-md-2 .ms-auto"),
							]),
							new div("row", new div("col-md-6 ms-auto", ".col-md-6 .ms-auto")),
							new div("row", [
								new div("col-sm-9", [
									"Level 1: .col-md-9",
									new div("row", [
										new div("col-8 col-sm-6", "Level 2: .col-8 .col-sm-6"),
										new div("col-4 col-sm-6", "Level 2: .col-4 .col-sm-6"),
									]),
								]),
							]),
						]),
						button: ["Save change", "Close"],
					}).show();
				},
			});
		},
	},

	{
		title: "Varying modal content",
		container: sample.stackcontainer,
		import: ["button", "modal", "input", "toast", "container"],
		code: () => {
			//marker
			let fn = (recipient) => {
				new modal({
					elem: new container.form([
						new input({
							type: "text",
							name: "recipient",
							label: "Recipient:",
							value: recipient,
						}),
						new input({
							type: "textarea",
							name: "message",
							label: "Message:",
							value: "",
						}),
					]),
					button: [
						{
							label: "Send message",
							click: (event, data) => {
								new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
							},
						},
						"Close",
					],
				}).show();
			};
			//-

			return [
				new button({
					label: "Message for @mdo",
					color: "primary",
					click: () => {
						fn("@mdo");
					},
				}),
				new button({
					label: "Message for @fat",
					color: "primary",
					click: () => {
						fn("@fat");
					},
				}),
				new button({
					label: "Message for @getbootstrap",
					color: "primary",
					click: () => {
						fn("@getbootstrap");
					},
				}),
			];
		},
	},

	{
		title: "Toggle between modals",
		import: ["button", "modal"],
		code: () => {
			//marker
			var dlgFirstModal = () => {
				new modal({
					title: "Modal 1",
					elem: "Show a second modal and close this one with the button below.",
					button: {
						label: "Show second modal",
						click: () => {
							//marker
							dlgSecondModal();
						},
					},
				}).show();
			};

			var dlgSecondModal = () => {
				new modal({
					title: "Modal 2",
					elem: "Close this modal and show the first with the button below.",
					button: {
						label: "Show first modal",
						click: () => {
							//marker
							dlgFirstModal();
						},
					},
				}).show();
			};
			//-

			return new button({
				label: "Show first modal",
				color: "primary",
				click: () => {
					//marker
					dlgFirstModal();
				},
			});
		},
	},

	{
		title: "Remove animation",
		import: ["button", "modal"],
		code: () => {
			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						elem: "Dialog without fade effect",
						button: "Okay",

						//marker
						animate: false,
					}).show();
				},
			});
		},
	},

	{
		title: "Optional sizes",
		container: sample.stackcontainer,
		import: ["button", "modal"],
		code: () => {
			let fn = (size) => {
				new modal({
					elem: `Dialog with <code>size : <b>${size}</b></code> option`,
					button: ["Okay"],

					//marker
					size: size,
				}).show();
			};

			return [
				new button({
					label: "Extra large modal",
					color: "primary",
					click: () => {
						fn("xl");
					},
				}),
				new button({
					label: "Large modal",
					color: "primary",
					click: () => {
						fn("lg");
					},
				}),
				new button({
					label: "Small modal",
					color: "primary",
					click: () => {
						fn("sm");
					},
				}),
			];
		},
	},

	{
		title: "Fullscreen Modal",
		container: sample.stackcontainer,
		import: ["button", "modal"],
		code: () => {
			let fn = (fullscreen) => {
				new modal({
					elem: [
						new p(
							new pill({
								icon: "eye",
								title: "Viewport",
								color: "primary",
								viewport: true,
							})
						),
						new p(`Dialog with <code>fullscreen : <b>${fullscreen}</b></code> option`),
					],
					button: ["Okay"],

					//marker
					fullscreen: fullscreen,
				}).show();
			};

			return [
				new button({
					label: "Full screen",
					color: "primary",
					click: () => {
						fn(true);
					},
				}),
				new button({
					label: "Full screen below sm",
					color: "primary",
					click: () => {
						fn("sm-down");
					},
				}),
				new button({
					label: "Full screen below md",
					color: "primary",
					click: () => {
						fn("md-down");
					},
				}),
				new button({
					label: "Full screen below lg",
					color: "primary",
					click: () => {
						fn("lg-down");
					},
				}),
				new button({
					label: "Full screen below xl",
					color: "primary",
					click: () => {
						fn("xl-down");
					},
				}),
				new button({
					label: "Full screen below xxl",
					color: "primary",
					click: () => {
						fn("xxl-down");
					},
				}),
			];
		},
	},

	{
		title: "Event",
		msg: [
			new table.container({
				item: [
					["Option", "Description"],
					[
						"<code>onshow</code>",
						"This event fires immediately when the <code>show</code> instance method is called. If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.",
					],
					[
						"<code>onshown</code>",
						"This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete). If caused by a click, the clicked element is available as the <code>relatedTarget</code> property of the event.",
					],
					[
						"<code>onhide</code>",
						"This event is fired immediately when the <code>hide</code> instance method has been called.",
					],
					[
						"<code>onhidden</code>",
						"This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).",
					],
					[
						"<code>onhideprevented</code>",
						"This event is fired when the modal is shown, its backdrop is <code>static</code> and a click outside the modal or an escape key press is performed with the keyboard option or <code>data-keyboard</code> set to <code>false</code>.",
					],
				],
			}),
		],
		import: ["button", "toast", "modal"],
		code: () => {
			let fn = (sender, event) => `Modal <b>${core.elemInfo(sender)}</b> event <b>${event}</b> trigged`;

			return new button({
				label: "Show live modal dialog",
				color: "primary",
				click: () => {
					new modal({
						elem: "Modal event example",
						button: "Okay",

						//marker
						show: (event) => {
							new toast("i", fn(event.currentTarget, "onshow")).show();
						},
						shown: (event) => {
							new toast("/", fn(event.currentTarget, "onshown")).show();
						},
						hide: (event) => {
							new toast("!", fn(event.currentTarget, "onhide")).show();
						},
						hidden: (event) => {
							new toast("x", fn(event.currentTarget, "onhidden")).show();
						},
						hideprevented: (event) => {
							new toast("-", fn(event.currentTarget, "onhideprevented")).show();
						},
						//-
					}).show();
				},
			});
		},
	},
];
