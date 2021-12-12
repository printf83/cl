import * as card from "../base/card.js";

let imgindex = 0;
let textindex = 0;

let textdb = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit massa, elementum vel metus id, congue sollicitudin lectus. Praesent ultricies felis eget nisl volutpat gravida. In eleifend iaculis viverra. Proin ut gravida elit, id posuere velit. Nulla congue enim at odio eleifend accumsan. Curabitur felis quam, feugiat in tincidunt ac, pulvinar eu diam. Nullam non erat orci. Sed gravida, ante sed vestibulum accumsan, elit metus feugiat ex, in gravida dolor nunc fermentum magna.",
	"Nam tempor maximus ante vel malesuada. Vivamus nibh neque, cursus finibus risus vel, porttitor accumsan lacus. Nulla facilisi. Sed sit amet sagittis magna, id cursus est. Quisque convallis vel magna quis vestibulum. Curabitur placerat diam odio, in tincidunt felis viverra ac. Aenean quis ante diam. Sed sit amet lectus rutrum tortor feugiat auctor. Fusce euismod est nec posuere accumsan. Donec sodales cursus maximus. Nulla tincidunt quam quis lacus suscipit, ut lobortis erat fringilla. Praesent id diam nec metus mollis maximus. Nam vestibulum lectus quis velit dictum ornare. Phasellus vitae accumsan nisl, sed aliquet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
	"Donec vehicula elit vel purus euismod, et aliquet nisl molestie. Phasellus at porttitor neque. Donec et orci mi. Nulla a laoreet tortor. Cras ac massa ipsum. Suspendisse mi diam, sodales nec felis sit amet, ullamcorper aliquet tellus. In vitae urna ipsum. Donec cursus rutrum magna. Quisque sed nisi a lacus accumsan mollis.",
	"Cras felis orci, feugiat ac volutpat non, porttitor at leo. Mauris sit amet eros tincidunt, cursus felis sit amet, molestie erat. Cras rutrum mi sed nunc tempor, id viverra metus aliquet. Sed aliquet scelerisque rutrum. Donec blandit ante et mauris scelerisque, congue venenatis tortor vehicula. Sed ornare ipsum sed cursus euismod. Aenean placerat nibh nisi, ac pretium nulla aliquet vitae. Mauris vel mauris urna. Morbi ultrices enim tellus, quis volutpat velit feugiat vitae. Vivamus hendrerit consequat rhoncus. In at efficitur lectus, vel volutpat massa. Donec consectetur scelerisque lacinia. Sed tristique risus ac mi efficitur consequat.",
	"Phasellus quis feugiat magna. Fusce placerat, metus eget tempor placerat, velit neque aliquam turpis, vel gravida ex leo sit amet diam. Aenean facilisis vulputate metus, ac dapibus felis vulputate non. Sed vehicula ante nec odio dapibus, id convallis libero auctor. Vivamus facilisis sed tellus a mattis. Donec bibendum imperdiet dui eget porttitor. Nam aliquam mi a nunc luctus rutrum.",
];

export function img(width, height) {
	return `https://picsum.photos/seed/${imgindex++}/${width ? width : 800}/${height ? height : 400}.webp`;
}

export function text() {
	if (textindex >= textdb.length) {
		textindex = 0;
	}
	return textdb[textindex++];
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
