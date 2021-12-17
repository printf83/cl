"use strict";
import * as card from "../base/card.js";
import listgroup from "../base/listgroup.js";
import toast from "../base/toast.js";
import input from "../base/input.js";
import * as container from "../base/container.js";
import modal from "../base/modal.js";
import div from "../base/div.js";
import badge from "../base/badge.js";

let imgindex = 0;
let textindex = 0;

let textdb = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit massa, elementum vel metus id, congue sollicitudin lectus. Praesent ultricies felis eget nisl volutpat gravida. In eleifend iaculis viverra. Proin ut gravida elit, id posuere velit. Nulla congue enim at odio eleifend accumsan. Curabitur felis quam, feugiat in tincidunt ac, pulvinar eu diam. Nullam non erat orci. Sed gravida, ante sed vestibulum accumsan, elit metus feugiat ex, in gravida dolor nunc fermentum magna.",
	"Nam tempor maximus ante vel malesuada. Vivamus nibh neque, cursus finibus risus vel, porttitor accumsan lacus. Nulla facilisi. Sed sit amet sagittis magna, id cursus est. Quisque convallis vel magna quis vestibulum. Curabitur placerat diam odio, in tincidunt felis viverra ac. Aenean quis ante diam. Sed sit amet lectus rutrum tortor feugiat auctor. Fusce euismod est nec posuere accumsan. Donec sodales cursus maximus. Nulla tincidunt quam quis lacus suscipit, ut lobortis erat fringilla. Praesent id diam nec metus mollis maximus. Nam vestibulum lectus quis velit dictum ornare. Phasellus vitae accumsan nisl, sed aliquet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
	"Donec vehicula elit vel purus euismod, et aliquet nisl molestie. Phasellus at porttitor neque. Donec et orci mi. Nulla a laoreet tortor. Cras ac massa ipsum. Suspendisse mi diam, sodales nec felis sit amet, ullamcorper aliquet tellus. In vitae urna ipsum. Donec cursus rutrum magna. Quisque sed nisi a lacus accumsan mollis.",
	"Cras felis orci, feugiat ac volutpat non, porttitor at leo. Mauris sit amet eros tincidunt, cursus felis sit amet, molestie erat. Cras rutrum mi sed nunc tempor, id viverra metus aliquet. Sed aliquet scelerisque rutrum. Donec blandit ante et mauris scelerisque, congue venenatis tortor vehicula. Sed ornare ipsum sed cursus euismod. Aenean placerat nibh nisi, ac pretium nulla aliquet vitae. Mauris vel mauris urna. Morbi ultrices enim tellus, quis volutpat velit feugiat vitae. Vivamus hendrerit consequat rhoncus. In at efficitur lectus, vel volutpat massa. Donec consectetur scelerisque lacinia. Sed tristique risus ac mi efficitur consequat.",
	"Phasellus quis feugiat magna. Fusce placerat, metus eget tempor placerat, velit neque aliquam turpis, vel gravida ex leo sit amet diam. Aenean facilisis vulputate metus, ac dapibus felis vulputate non. Sed vehicula ante nec odio dapibus, id convallis libero auctor. Vivamus facilisis sed tellus a mattis. Donec bibendum imperdiet dui eget porttitor. Nam aliquam mi a nunc luctus rutrum.",
];

export function resetindex() {
	imgindex = 0;
	textindex = 0;
}

export function img(width, height) {
	return `https://picsum.photos/seed/${imgindex++}/${width ? width : 800}/${height ? height : 400}.webp`;
}

export function text() {
	if (textindex >= textdb.length) {
		textindex = 0;
	}
	return textdb[textindex++];
}

export function optionitem() {
	return [
		{ value: "", label: "Open this select menu", selected: true },
		{ value: "1", label: "One" },
		{ value: "2", label: "Two" },
		{ value: "3", label: "Three" },
	];
}

export function dropdownitem() {
	return [
		{ href: "#", label: "Action" },
		{
			href: "#",
			label: "Another action",
		},
		{
			href: "#",
			label: "Something else here",
		},
		{ value: "-" },
		{
			href: "#",
			label: "Separated link",
		},
	];
}

export function form() {
	return new container.form([
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
	]);
}

export function accordionitem() {
	return [
		{
			label: "Accordion Item 1",
			elem: ["<b>This is the first item's accordion body.</b> ", text()],
		},
		{
			label: "Accordion Item 2",
			elem: ["<b>This is the second item's accordion body.</b> ", text()],
		},
		{
			label: "Accordion Item 3",
			elem: ["<b>This is the third item's accordion body.</b> ", text()],
		},
	];
}

export function cardwithimg() {
	return [
		new card.container({
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
						}),
					],
				}),
			],
		}),
		new card.container({
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This card has supporting text below as a natural lead-in to additional content.",
						}),
					],
				}),
			],
		}),
		new card.container({
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This card has supporting text below as a natural lead-in to additional content.",
						}),
					],
				}),
			],
		}),
		new card.container({
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
						}),
					],
				}),
			],
		}),
	];
}

export function cardwithfooter() {
	return [
		new card.container({
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
						}),
					],
				}),
				new card.footer({ elem: "Last updated 3 mins ago" }),
			],
		}),
		new card.container({
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This card has supporting text below as a natural lead-in to additional content.",
						}),
					],
				}),
				new card.footer({ elem: "Last updated 3 mins ago" }),
			],
		}),
		new card.container({
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
						}),
					],
				}),
				new card.footer({ elem: "Last updated 3 mins ago" }),
			],
		}),
	];
}

export function cardh100() {
	return [
		new card.container({
			class: "h-100",
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
						}),
					],
				}),
			],
		}),
		new card.container({
			class: "h-100",
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This card has supporting text below as a natural lead-in to additional content.",
						}),
					],
				}),
			],
		}),
		new card.container({
			class: "h-100",
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
						}),
					],
				}),
			],
		}),
	];
}

export function cardwithfooterh100() {
	return [
		new card.container({
			class: "h-100",
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.",
						}),
					],
				}),
				new card.footer({ elem: "Last updated 3 mins ago" }),
			],
		}),
		new card.container({
			class: "h-100",
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This card has supporting text below as a natural lead-in to additional content.",
						}),
					],
				}),
				new card.footer({ elem: "Last updated 3 mins ago" }),
			],
		}),
		new card.container({
			class: "h-100",
			elem: [
				new card.img({
					placement: "top",
					src: img(),
				}),
				new card.body({
					elem: [
						new card.title({ elem: "Card Title" }),
						new card.text({
							elem: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
						}),
					],
				}),
				new card.footer({ elem: "Last updated 3 mins ago" }),
			],
		}),
	];
}

export function listgroupitem() {
	return [
		{ elem: "An item" },
		{ elem: "A second item" },
		{ elem: "A third item" },
		{ elem: "A fourth item" },
		{ elem: "And a fifth one" },
	];
}

export function listgroupitemcustomcontent() {
	return [
		new div({
			class: "ms-2 me-auto",
			elem: [new div({ class: "fw-bold", elem: "Subheading" }), "Cras justo odio"],
		}),
		new badge({
			pill: true,
			color: "primary",
			label: "14",
		}),
	];
}

export function listgroupitem3() {
	return [{ elem: "An item" }, { elem: "A second item" }, { elem: "A third item" }];
}

export function dlgFn(recipient) {
	new modal({
		title: "Modal title",
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
				onclick: function (event, data) {
					new toast("i", `Result from dialog is <b>${JSON.stringify(data)}</b>`).show();
				},
			},
			"Close",
		],
	}).show();
}

export function dlgFullscreenFn(fullscreen) {
	new modal({
		fullscreen: fullscreen,
		title: "Modal title",
		elem: `Dialog with <code>fullscreen : <b>${fullscreen}</b></code> option`,
		button: ["Okay"],
	}).show();
}

export function dlgSizeFn(size) {
	new modal({
		size: size,
		title: "Modal title",
		elem: `Dialog with <code>size : <b>${size}</b></code> option`,
		button: ["Okay"],
	}).show();
}

export function tab() {
	return [
		{ label: "First", elem: "This is first tab. " + text() },
		{ label: "Second", elem: "This is second tab. " + text() },
		{ label: "Third", elem: "This is third tab. " + text() },
		{ label: "Disabled", disabled: true, elem: "This is last tab. " + text() },
	];
}

export function dropdowntab() {
	return [
		{ label: "First", elem: "This is first tab. " + text() },
		{
			label: "Second",
			elem: "This is second tab. " + text(),
			option: [
				{ href: "#", label: "Action" },
				{ href: "#", label: "Another action" },
				{ value: "-", label: "" },
				{ href: "#", label: "Something else here" },
			],
		},
		{ label: "Third", elem: "This is third tab. " + text() },
		{ label: "Disabled", disabled: true, elem: "This is last tab. " + text() },
	];
}
