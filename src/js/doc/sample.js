"use strict";
import * as container from "../base/container.js";
import * as db from "../base/api.js";
import file from "../base/file.js";
import input from "../base/input.js";
import * as list from "../base/list.js";
import small from "../base/small.js";
import toast from "../base/toast.js";

let dbstate = null;
let textindex = 0;
let textdb = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit massa, elementum vel metus id, congue sollicitudin lectus. Praesent ultricies felis eget nisl volutpat gravida. In eleifend iaculis viverra. Proin ut gravida elit, id posuere velit. Nulla congue enim at odio eleifend accumsan. Curabitur felis quam, feugiat in tincidunt ac, pulvinar eu diam.",
	"Nam tempor maximus ante vel malesuada. Vivamus nibh neque, cursus finibus risus vel, porttitor accumsan lacus. Nulla facilisi. Sed sit amet sagittis magna, id cursus est. Quisque convallis vel magna quis vestibulum. Curabitur placerat diam odio, in tincidunt felis viverra ac. Aenean quis ante diam. Sed sit amet lectus rutrum tortor feugiat auctor.",
	"Donec vehicula elit vel purus euismod, et aliquet nisl molestie. Phasellus at porttitor neque. Donec et orci mi. Nulla a laoreet tortor. Cras ac massa ipsum. Suspendisse mi diam, sodales nec felis sit amet, ullamcorper aliquet tellus. In vitae urna ipsum. Donec cursus rutrum magna. Quisque sed nisi a lacus accumsan mollis.",
	"Cras felis orci, feugiat ac volutpat non, porttitor at leo. Mauris sit amet eros tincidunt, cursus felis sit amet, molestie erat. Cras rutrum mi sed nunc tempor, id viverra metus aliquet. Sed aliquet scelerisque rutrum. Donec blandit ante et mauris scelerisque, congue venenatis tortor vehicula. Sed ornare ipsum sed cursus euismod. Aenean placerat nibh nisi, ac pretium nulla aliquet vitae.",
	"Phasellus quis feugiat magna. Fusce placerat, metus eget tempor placerat, velit neque aliquam turpis, vel gravida ex leo sit amet diam. Aenean facilisis vulputate metus, ac dapibus felis vulputate non. Sed vehicula ante nec odio dapibus, id convallis libero auctor. Vivamus facilisis sed tellus a mattis. ",
	"Etiam faucibus orci id dui tempor volutpat sit amet id sem. Nam efficitur vestibulum lectus, vitae finibus dolor eleifend ac. Curabitur lacinia hendrerit dui et ultricies. In hac habitasse platea dictumst. Quisque massa arcu, venenatis at elementum non, sodales eu mi. Sed sit amet metus sem. In hac habitasse platea dictumst. Nam egestas aliquam ligula ut efficitur. Proin bibendum suscipit erat in rhoncus.",
	"Donec felis sapien, venenatis a facilisis at, porta scelerisque ligula. Mauris pretium condimentum orci non auctor. Cras malesuada eros eu ultricies convallis. In in ligula ac dui porta ullamcorper sit amet eu nibh. Vestibulum gravida, odio at auctor sodales, ipsum leo varius libero, in ultricies magna libero et libero. Aenean tincidunt, lorem at dignissim gravida, mauris eros pretium elit, quis scelerisque dolor urna nec mi.",
	"Integer urna felis, porttitor et nulla eu, fermentum vestibulum est. Nunc imperdiet magna nec lobortis aliquam. Curabitur risus dui, auctor vitae quam sed, iaculis interdum velit. Nullam augue odio, auctor eget porttitor at, convallis at diam. Mauris posuere nisl id interdum luctus.",
	"Suspendisse posuere nunc interdum tortor porttitor ultrices. Phasellus quis eleifend est, eget sodales dolor. Suspendisse congue lobortis sem, at iaculis eros elementum eu. Quisque tellus nunc, fringilla in est in, congue pharetra metus. Sed eros ligula, pretium eget orci vel, porttitor tincidunt nibh. Etiam bibendum fermentum lorem vel mollis. Fusce ullamcorper volutpat turpis, eu dictum ipsum ultrices vel.",
	"Morbi pulvinar tortor a arcu accumsan, at aliquam augue eleifend. Aenean ut blandit erat. Nullam lorem ante, fermentum ultrices velit dictum, auctor aliquet ex. Integer bibendum augue gravida congue efficitur. Nam eu feugiat quam. Ut ex urna, consectetur sed tincidunt nec, volutpat a lorem.",
];

let shorttextindex = 0;
let shorttextdb = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	"Nam tempor maximus ante vel malesuada.",
	"Donec vehicula elit vel purus euismod, et aliquet nisl molestie.",
	"Cras felis orci, feugiat ac volutpat non, porttitor at leo.",
	"Phasellus quis feugiat magna.",
	"Etiam faucibus orci id dui tempor volutpat sit amet id sem.",
	"Donec felis sapien, venenatis a facilisis at, porta scelerisque ligula.",
	"Integer urna felis, porttitor et nulla eu, fermentum vestibulum est.",
	"Suspendisse posuere nunc interdum tortor porttitor ultrices.",
	"Morbi pulvinar tortor a arcu accumsan, at aliquam augue eleifend.",
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

const svgdata = (width, height) => `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
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

const fn = {
	resetindex: () => {
		textindex = 0;
	},
	img: (width = 300, height = 283) => {
		// style="background-color:rgba(0,0,0,.125);"

		if (!svgdb.hasOwnProperty(`${width}_${height}`)) {
			svgdb[`${width}_${height}`] =
				"data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgdata(width, height));
		}

		return svgdb[`${width}_${height}`];
	},
	text: () => {
		if (textindex >= textdb.length) {
			textindex = 0;
		}
		return textdb[textindex++];
	},
	shorttext: () => {
		if (shorttextindex >= shorttextdb.length) {
			shorttextindex = 0;
		}
		return shorttextdb[shorttextindex++];
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
			"accesskey",
			"contenteditable",
			"dir",
			"draggable",
			"hidden",
			"lang",
			"spellcheck",
			"tabindex",
			"title",
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
		return new container.form(elem);
	},
	stackcontainer: (elem) => {
		return new container.stack(elem);
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
			new input({
				type: "text",
				label: "Name",
				name: "name",
				required: true,
				value: data ? data.name : null,
			}),
			new input({
				type: "date",
				label: "Date of birth",
				name: "dob",
				value: data ? data.dob : null,
			}),
			new input({
				type: "text",
				label: "Phone",
				name: "phone",
				value: data ? data.phone : null,
			}),
			new file({ label: "Picture", name: "picture", value: data ? data.picture : null }),
			new input({
				type: "email",
				label: "Email",
				name: "email",
				value: data ? data.email : null,
			}),
			new input({
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
		return new list.item({
			key: data._id,
			name: data.name,
			picture: data.picture,
			detail: new small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
			allow_delete: true,
			allow_copy: true,
			allow_action: true,
			allow_more: true,
		});
	},
	list_group: (data) => {
		return new list.group({ key: data.key, name: data.name });
	},
	list_more: (sender, id) => {
		new toast("i", `Call from id:${id}`).show();
	},
	list_state: (callback, sender) => {
		if (!dbstate) {
			//get record
			db.api.option(
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
