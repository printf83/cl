"use strict";
import $ from "../component.js";
let dbstate = null;
let textindex = 0;
let textdb = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit massa, elementum vel metus id, congue sollicitudin lectus. Praesent ultricies felis eget nisl volutpat gravida. In eleifend iaculis viverra. Proin ut gravida elit, id posuere velit. Nulla congue enim at odio eleifend accumsan. Curabitur felis quam, feugiat in tincidunt ac, pulvinar eu diam. Nullam non erat orci. Sed gravida, ante sed vestibulum accumsan, elit metus feugiat ex, in gravida dolor nunc fermentum magna.",
	"Nam tempor maximus ante vel malesuada. Vivamus nibh neque, cursus finibus risus vel, porttitor accumsan lacus. Nulla facilisi. Sed sit amet sagittis magna, id cursus est. Quisque convallis vel magna quis vestibulum. Curabitur placerat diam odio, in tincidunt felis viverra ac. Aenean quis ante diam. Sed sit amet lectus rutrum tortor feugiat auctor. Fusce euismod est nec posuere accumsan. Donec sodales cursus maximus. Nulla tincidunt quam quis lacus suscipit, ut lobortis erat fringilla. Praesent id diam nec metus mollis maximus. Nam vestibulum lectus quis velit dictum ornare. Phasellus vitae accumsan nisl, sed aliquet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
	"Donec vehicula elit vel purus euismod, et aliquet nisl molestie. Phasellus at porttitor neque. Donec et orci mi. Nulla a laoreet tortor. Cras ac massa ipsum. Suspendisse mi diam, sodales nec felis sit amet, ullamcorper aliquet tellus. In vitae urna ipsum. Donec cursus rutrum magna. Quisque sed nisi a lacus accumsan mollis.",
	"Cras felis orci, feugiat ac volutpat non, porttitor at leo. Mauris sit amet eros tincidunt, cursus felis sit amet, molestie erat. Cras rutrum mi sed nunc tempor, id viverra metus aliquet. Sed aliquet scelerisque rutrum. Donec blandit ante et mauris scelerisque, congue venenatis tortor vehicula. Sed ornare ipsum sed cursus euismod. Aenean placerat nibh nisi, ac pretium nulla aliquet vitae. Mauris vel mauris urna. Morbi ultrices enim tellus, quis volutpat velit feugiat vitae. Vivamus hendrerit consequat rhoncus. In at efficitur lectus, vel volutpat massa. Donec consectetur scelerisque lacinia. Sed tristique risus ac mi efficitur consequat.",
	"Phasellus quis feugiat magna. Fusce placerat, metus eget tempor placerat, velit neque aliquam turpis, vel gravida ex leo sit amet diam. Aenean facilisis vulputate metus, ac dapibus felis vulputate non. Sed vehicula ante nec odio dapibus, id convallis libero auctor. Vivamus facilisis sed tellus a mattis. Donec bibendum imperdiet dui eget porttitor. Nam aliquam mi a nunc luctus rutrum.",
];
let svgdb = {};

function isListed(val, listed) {
	if (listed) {
		if (Array.isArray(listed) && listed.includes(val)) {
			return true;
		} else {
			return listed === val;
		}
	} else {
		return false;
	}
}

const fn = {
	resetindex: () => {
		textindex = 0;
	},
	img: (width = 300, height = 283) => {
		// style="background-color:rgba(0,0,0,.125);"

		if (!svgdb.hasOwnProperty(`${width}_${height}`)) {
			let svgdata = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="${width}pt" height="${height}pt" viewBox="0 0 300 283"
 style="background-color:rgba(0,0,0,.125);"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,283.000000) scale(0.100000,-0.100000)"
fill="#999" stroke="none">
<path d="M606 2161 c-15 -10 -37 -32 -47 -47 -18 -28 -19 -59 -19 -685 l0
-656 23 -34 c49 -74 -12 -70 982 -67 l890 3 33 23 c65 47 62 16 62 727 0 717
2 694 -65 735 -32 20 -47 20 -931 20 -864 0 -900 -1 -928 -19z m1832 -15 c15
-8 36 -24 47 -36 20 -22 20 -36 20 -679 0 -640 0 -657 -20 -683 -11 -15 -33
-32 -50 -38 -44 -16 -1775 -14 -1809 2 -14 6 -34 23 -43 37 -17 24 -18 74 -20
676 l-2 650 26 33 c14 19 35 37 47 42 11 5 416 9 899 9 735 1 882 -1 905 -13z"/>
<path d="M783 2062 c-67 -2 -105 -7 -112 -15 -18 -22 -10 -1211 8 -1230 9 -10
1703 -9 1713 1 4 4 10 279 14 612 6 531 5 607 -8 617 -11 10 -185 13 -764 15
-412 2 -795 2 -851 0z m1602 -390 l0 -369 -45 38 c-211 177 -527 227 -802 126
-102 -37 -175 -84 -255 -164 l-72 -73 -63 16 c-125 32 -320 3 -420 -62 -21
-13 -40 -24 -43 -24 -3 0 -5 198 -5 440 l0 440 853 0 852 0 0 -368z m-375
-197 c98 -23 228 -83 293 -137 32 -26 65 -48 73 -48 12 0 14 -39 14 -235 l0
-235 -855 0 -855 0 0 166 c0 127 3 165 12 162 7 -3 41 10 75 28 34 19 74 36
87 38 14 3 30 7 36 11 11 7 214 8 245 1 11 -2 33 -9 48 -15 26 -10 32 -7 104
64 43 41 80 75 84 75 4 0 14 6 21 14 38 37 203 103 292 116 89 13 258 10 326
-5z"/>
<path d="M1054 1810 c-139 -31 -193 -200 -96 -304 110 -118 313 -39 315 122 2
115 -109 207 -219 182z m113 -39 c61 -28 79 -70 74 -178 0 -18 -12 -45 -28
-63 -42 -50 -100 -67 -168 -49 -67 18 -96 50 -109 121 -24 133 104 226 231
169z"/>
</g>
</svg>`;

			svgdb[`${width}_${height}`] = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgdata);
		}

		return svgdb[`${width}_${height}`];
	},
	text: () => {
		if (textindex >= textdb.length) {
			textindex = 0;
		}
		return textdb[textindex++];
	},
	optionitem: () => {
		return [
			{ value: "", label: "Open this select menu", selected: true },
			{ value: "1", label: "One" },
			{ value: "2", label: "Two" },
			{ value: "3", label: "Three" },
		];
	},
	dropdownitem: () => {
		return [
			{ href: "#", label: "Action" },
			{ href: "#", label: "Another action" },
			{ href: "#", label: "Something else here" },
			{ value: "-" },
			{ href: "#", label: "Separated link" },
		];
	},
	form: () => {
		return new $.container.form([
			new $.input({
				label: "Name",
				required: true,
				invalid: "Please provide name",
				name: "name",
				type: "text",
			}),
			new $.input({
				label: "Age",
				required: true,
				invalid: "Please provide age",
				name: "age",
				type: "number",
				min: 13,
				max: 100,
				after: "Years old",
			}),
			new $.listgroup({
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
			new $.listgroup({
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
			new $.input({
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
		]);
	},
	accordionitem: () => {
		return [
			{
				label: "Accordion Item 1",
				elem: ["<b>This is the first item's accordion body.</b> ", fn.text()],
			},
			{
				label: "Accordion Item 2",
				elem: ["<b>This is the second item's accordion body.</b> ", fn.text()],
			},
			{
				label: "Accordion Item 3",
				elem: ["<b>This is the third item's accordion body.</b> ", fn.text()],
			},
		];
	},
	cardwithimg: () => {
		return [
			new $.card.container({
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
						],
					}),
				],
			}),
			new $.card.container({
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						],
					}),
				],
			}),
			new $.card.container({
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						],
					}),
				],
			}),
			new $.card.container({
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
							),
						],
					}),
				],
			}),
		];
	},
	cardwithfooter: () => {
		return [
			new $.card.container({
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
							),
						],
					}),
					new $.card.footer("Last updated 3 mins ago"),
				],
			}),
			new $.card.container({
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						],
					}),
					new $.card.footer("Last updated 3 mins ago"),
				],
			}),
			new $.card.container({
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
						],
					}),
					new $.card.footer("Last updated 3 mins ago"),
				],
			}),
		];
	},
	cardh100: () => {
		return [
			new $.card.container({
				class: "h-100",
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
							),
						],
					}),
				],
			}),
			new $.card.container({
				class: "h-100",
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						],
					}),
				],
			}),
			new $.card.container({
				class: "h-100",
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
						],
					}),
				],
			}),
		];
	},
	cardwithfooterh100: () => {
		return [
			new $.card.container({
				class: "h-100",
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action."
							),
						],
					}),
					new $.card.footer("Last updated 3 mins ago"),
				],
			}),
			new $.card.container({
				class: "h-100",
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This card has supporting text below as a natural lead-in to additional content."
							),
						],
					}),
					new $.card.footer("Last updated 3 mins ago"),
				],
			}),
			new $.card.container({
				class: "h-100",
				elem: [
					new $.card.img({
						placement: "top",
						src: fn.img(415, 207),
					}),
					new $.card.body({
						elem: [
							new $.card.title("Card Title"),
							new $.card.text(
								"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
							),
						],
					}),
					new $.card.footer("Last updated 3 mins ago"),
				],
			}),
		];
	},
	listgroupitem: () => {
		return [
			{ elem: "An item" },
			{ elem: "A second item" },
			{ elem: "A third item" },
			{ elem: "A fourth item" },
			{ elem: "And a fifth one" },
		];
	},
	listgroupitemcustomcontent: () => {
		return [
			new $.div({
				class: "ms-2 me-auto",
				elem: [new $.div("fw-bold", "Subheading"), "Cras justo odio"],
			}),
			new $.badge({
				pill: true,
				color: "primary",
				label: "14",
			}),
		];
	},
	listgroupitem3: () => {
		return [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }];
	},
	dlgFn: (recipient) => {
		new $.modal({
			title: "Modal title",
			elem: new $.container.form([
				new $.input({
					type: "text",
					name: "recipient",
					label: "Recipient:",
					value: recipient,
				}),
				new $.input({
					type: "textarea",
					name: "message",
					label: "Message:",
					value: "",
				}),
			]),
			button: [
				{
					label: "Send message",
					onclick: (event, data) => {
						new $.toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
					},
				},
				"Close",
			],
		}).show();
	},
	dlgFullscreenFn: (fullscreen) => {
		new $.modal({
			fullscreen: fullscreen,
			title: "Modal title",
			elem: `Dialog with <code>fullscreen : <b>${fullscreen}</b></code> option`,
			button: ["Okay"],
		}).show();
	},
	dlgSizeFn: (size) => {
		new $.modal({
			size: size,
			title: "Modal title",
			elem: `Dialog with <code>size : <b>${size}</b></code> option`,
			button: ["Okay"],
		}).show();
	},
	tab: () => {
		return [
			{ label: "First", elem: "This is first tab. " + fn.text() },
			{ label: "Second", elem: "This is second tab. " + fn.text() },
			{ label: "Third", elem: "This is third tab. " + fn.text() },
			{ label: "Disabled", disabled: true, elem: "This is last tab. " + fn.text() },
		];
	},
	dropdowntab: () => {
		return [
			{ label: "First", elem: "This is first tab. " + fn.text() },
			{
				label: "Second",
				elem: "This is second tab. " + fn.text(),
				option: [
					{ href: "#", label: "Action" },
					{ href: "#", label: "Another action" },
					{ value: "-", label: "" },
					{ href: "#", label: "Something else here" },
				],
			},
			{ label: "Third", elem: "This is third tab. " + fn.text() },
			{ label: "Disabled", disabled: true, elem: "This is last tab. " + fn.text() },
		];
	},
	navbaritem: (id, title) => {
		return [
			new $.navbar.toggle({
				target: `#${id}`,
				toggle: "collapse",
			}),

			new $.navbar.brand({
				label: title ? title : "Navbar",
			}),

			new $.navbar.collapsecontainer({
				id: id,
				elem: [
					new $.navbar.itemcontainer({
						parenttype: "collapse",
						elem: [
							new $.navbar.item({ label: "Home", active: true }),
							new $.navbar.item({ label: "Link" }),
							new $.navbar.item({
								label: "Dropdown",
								option: fn.dropdownitem(),
							}),
							new $.navbar.item({ label: "Disabled", disabled: true }),
						],
					}),
					new $.navbar.formcontainer([
						new $.input({
							type: "search",
							placeholder: "Search",
							hiddenlabel: "Search",
							class: "me-2",
						}),
						new $.button({ label: "Search", color: "success", outline: true }),
					]),
				],
			}),
		];
	},
	offcanvasbody: () => {
		return new $.div({
			elem: [
				new $.p({
					elem: "Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.",
				}),
				new $.dropdown({
					label: "Drowdown button",
					color: "secondary",
					option: fn.dropdownitem(),
				}),
			],
		});
	},
	table: (header, footer) => {
		let rtn = [
			["1/6/2020", "East", "Jones", "Pencil", "95", "1.99", "189.05"],
			["1/23/2020", "Central", "Kivell", "Binder", "50", "19.99", "999.50"],
			["2/9/2020", "Central", "Jardine", "Pencil", "36", "4.99", "179.64"],
			["2/26/2020", "Central", "Gill", "Pen", "27", "19.99", "539.73"],
			["3/15/2020", "West", "Sorvino", "Pencil", "56", "2.99", "167.44"],
			["4/1/2020", "East", "Jones", "Binder", "60", "4.99", "299.40"],
			["4/18/2020", "Central", "Andrews", "Pencil", "75", "1.99", "149.25"],
		];

		if (header) {
			rtn.unshift(["OrderDate", "Region", "Rep", "Item", "Units", "UnitCost", "Total"]);
		}

		if (footer) {
			rtn.push(["", "", "", "", "", "Total", "2,524.01"]);
		}
		return rtn;
	},
	tagprop: (exclude) => {
		let tprop = [
			"id",
			"name",
			"class",
			"style",
			"attr",
			"href",
			"onclick",
			"onchange",
			"onfocus",
			"onblur",
			"userselect",
			"pointerevent",
			"visible",
			"align",
			"valign",
			"wrap",
			"wordbreak",
			"texttransform",
			"fontsize",
			"fontweight",
			"fontitalic",
			"lineheight",
			"monospace",
			"textdecoration",
			"position",
			"overflow",
			"opacity",
			"display",
			"float",
			"alignitem",
			"alignself",
			"aligncontent",
			"justifycontent",
			"shadow",
			"gradient",
			"coloropacity",
			"color",
			"linkcolor",
			"textcolor",
			"textopacity",
			"padding",
			"paddingx",
			"paddingy",
			"paddingtop",
			"paddingbottom",
			"paddingstart",
			"paddingend",
			"margin",
			"marginx",
			"marginy",
			"margintop",
			"marginbottom",
			"marginstart",
			"marginend",
			"border",
			"bordercolor",
			"borderweight",
			"flex",
			"order",
			"row",
			"col",
			"rowcol",
			"gap",
			"rounded",
			"roundedtype",
			"tmiddle",
			"top",
			"bottom",
			"start",
			"end",
			"elem",
		];

		let f = tprop
			.map((i) => {
				if (!isListed(i, exclude)) {
					return `<code>${i}</code>`;
				} else {
					return null;
				}
			})
			.filter(Boolean);

		let l = f.pop();
		return f.join(", ") + " and " + l;
	},
	formcontainer: (elem) => {
		return new $.container.form(elem);
	},
	stackcontainer: (elem) => {
		return new $.container.stack(elem);
	},
	query_setting: (dbstate) => {
		return {
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
	},
	query_data: {
		filter: null,
		sort: { state: 1, name: 1 },
		field: { __v: 0 },
		limit: 10,
		skip: 0,
	},
	query_data_view: () => {
		return {
			filter: null,
			sort: { state: 1, name: 1 },
			field: { __v: 0 },
			limit: 10,
			skip: 0,
		};
	},
	list_editor: (data) => {
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
				required: true,
				option: dbstate,
				value: data ? data.state : null,
			}),
		];
	},
	list_items: (data, item, group) => {
		let lastgroup = null;
		let result = [];
		data.forEach((i) => {
			if (dbstate) {
				if (i.state && lastgroup !== i.state) {
					lastgroup = i.state;
					let state_name = dbstate.filter((el) => {
						return el.value === i.state;
					})[0]?.label;

					result.push(group({ key: i.state, name: state_name }));
				}
			}

			result.push(item(i));
		});

		return result;
	},
	list_item: (data) => {
		return new $.list.item({
			key: data._id,
			name: data.name,
			picture: data.picture,
			detail: new $.small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
			allow_delete: true,
			allow_copy: true,
			allow_action: true,
			allow_more: true,
		});
	},
	list_group: (data) => {
		return new $.list.group({ key: data.key, name: data.name });
	},
	list_more: (sender, id) => {
		new $.toast("i", `Call from id:${id}`).show();
	},
	list_state: (callback, sender) => {
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
				(result) => {
					if (result) {
						dbstate = result;
						callback(dbstate);
					}
				}
			);
		} else {
			callback(dbstate);
		}
	},
};

export default fn;
