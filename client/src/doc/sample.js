"use strict";
import * as container from "../dist/cl/base/container.js";
import * as db from "../dist/cl/base/api.js";
import file from "../dist/cl/base/file.js";
import input from "../dist/cl/base/input.js";
import * as list from "../dist/cl/base/list.js";
import small from "../dist/cl/base/small.js";
import toast from "../dist/cl/base/toast.js";
import * as core from "../dist/cl/base/core.js";
import ul from "../dist/cl/base/ul.js";
import pill from "../dist/cl/base/pill.js";

let dbstate = null;
const textdb = [
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur elit massa, elementum vel metus id, congue sollicitudin lectus. Praesent ultricies felis eget nisl volutpat gravida. In eleifend iaculis viverra. Proin ut gravida elit, id posuere velit. Nulla congue enim at odio eleifend accumsan. Curabitur felis quam, feugiat in tincidunt ac, pulvinar eu diam.",
	"Nam tempor maximus ante vel malesuada. Vivamus nibh neque, cursus finibus risus vel, porttitor accumsan lacus. Nulla facilisi. Sed sit amet sagittis magna, id cursus est. Quisque convallis vel magna quis vestibulum. Curabitur placerat diam odio, in tincidunt felis viverra ac. Aenean quis ante diam. Sed sit amet lectus rutrum tortor feugiat auctor.",
	"Donec vehicula elit vel purus euismod, et aliquet nisl molestie. Phasellus at porttitor neque. Donec et orci mi. Nulla a laoreet tortor. Cras ac massa ipsum. Suspendisse mi diam, sodales nec felis sit amet, ullamcorper aliquet tellus. In vitae urna ipsum. Donec cursus rutrum magna. Quisque sed nisi a lacus accumsan mollis.",
	"Cras felis orci, feugiat ac volutpat non, porttitor at leo. Mauris sit amet eros tincidunt, cursus felis sit amet, molestie erat. Cras rutrum mi sed nunc tempor, id viverra metus aliquet. Sed aliquet scelerisque rutrum. Donec blandit ante et mauris scelerisque, congue venenatis tortor vehicula. Sed ornare ipsum sed cursus euismod. Aenean placerat nibh nisi, ac pretium nulla aliquet vitae.",
	"Phasellus quis feugiat magna. Fusce placerat, metus eget tempor placerat, velit neque aliquam turpis, vel gravida ex leo sit amet diam. Aenean facilisis vulputate metus, ac dapibus felis vulputate non. Sed vehicula ante nec odio dapibus, id convallis libero auctor. Vivamus facilisis sed tellus a mattis. ",
	"Etiam faucibus orci id dui tempor volutpat sit amet id sem. Nam efficitur vestibulum lectus, vitae finibus dolor eleifend ac. Curabitur lacinia hendrerit dui et ultricies. In hac habitasse platea dictumst. Quisque massa arcu, venenatis at elementum non, sodales eu mi. Sed sit amet metus sem. In hac habitasse platea dictumst. Nam egestas aliquam ligula ut efficitur. Proin bibendum suscipit erat in rhoncus.",
	"Donec felis sapien, venenatis a facilisis at, porta scelerisque ligula. Mauris pretium condimentum orci non auctor. Cras malesuada eros eu ultricies convallis. In in ligula ac dui porta ullamcorper sit amet eu nibh. Vestibulum gravida, odio at auctor sodales, ipsum leo varius libero, in ultricies magna libero et libero. Aenean tincidunt, lorem at dignissim gravida, mauris eros pretium elit, quis scelerisque dolor urna nec mi.",
	"Integer urna felis, porttitor et nulla eu, fermentum vestibulum est. Nunc imperdiet magna nec lobortis aliquam. Curabitur risus dui, auctor vitae quam sed, iaculis interdum velit. Nullam augue odio, auctor eget porttitor at, convallis at diam. Mauris posuere nisl id interdum luctus.",
	"Suspendisse posuere nunc interdum tortor porttitor ultrices. Phasellus quis eleifend est, eget sodales dolor. Suspendisse congue lobortis sem, at iaculis eros elementum eu. Quisque tellus nunc, fringilla in est in, congue pharetra metus. Sed eros ligula, pretium eget orci vel, porttitor tincidunt nibh. Etiam bibendum fermentum lorem vel mollis. Fusce ullamcorper volutpat turpis, eu dictum ipsum ultrices vel.",
	"Morbi pulvinar tortor a arcu accumsan, at aliquam augue eleifend. Aenean ut blandit erat. Nullam lorem ante, fermentum ultrices velit dictum, auctor aliquet ex. Integer bibendum augue gravida congue efficitur.",
];

const shorttextdb = [
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

const svgdb = {};
const empty_svgdb = {};

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

const dbcolor = ["primary", "success", "danger", "warning", "info", "dark"];

const svgdata = (width, height, color) => {
	color = core.getcssvar(color);
	color = color || "#999";

	return `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="${width}pt" height="${height}pt" viewBox="0 0 300 283"
 style="background-color:rgba(0,0,0,.03);"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,283.000000) scale(0.100000,-0.100000)"
fill="${color}" stroke="none">
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
};

const empty_svgdata = (width, height) => {
	return `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="${width}pt" height="${height}pt" viewBox="0 0 300 283"
 style="background-color:rgba(0,0,0,.03);"
 preserveAspectRatio="xMidYMid meet">
</svg>`;
};

const dbicon = [
	"image",
	"compass",
	"hand-peace",
	"chess-queen",
	"face-grin-squint",
	"id-badge",
	"lightbulb",
	"snowflake",
	"circle-user",
	"star",
	"envelope",
	"paper-plane",

	"cable-car",
	"wand-magic-sparkles",
	"rocket",
	"gamepad",
	"earth-americas",
	"bug",
	"radio",

	"address-book",
	"bell",
	"calendar-alt",
	"chart-bar",
	"check-circle",
	"clipboard",
	"clock",
	"kiss-wink-heart",

	"music",
	"masks-theater",
	"award",
	"cake-candles",
	"mitten",
	"camera-retro",
	"spell-check",
	"pen-clip",
	"paintbrush",
];

const dbbrandicon = [
	"github",
	"css3",
	"html5",
	"js-square",
	"node-js",
	"font-awesome",
	"bootstrap",
	"edge",
	"firefox",
	"chrome",
	"yahoo",
	"waze",
	"ubuntu",
	"suse",
	"linux",
	"google",
	"apple",
	"android",
	"cloudflare",
	"safari",
	"opera",
	"fedora",
	"aws",
];

const fn = {
	usingclobject: () => {
		return new pill({
			icon: core.setting.icon("primary", "sm"),
			color: "primary",
			label: "Using CL Object",
			marginBottom: 3,
		});
	},
	resetindex: () => {
		textindex = 0;
		shorttextindex = 0;
		iconindex = 0;
	},
	img: (width = 300, height = 283, color = undefined) => {
		if (color === undefined) {
			color = core.randomdb("sample_color", dbcolor);
		}

		if (!svgdb.hasOwnProperty(`${width}_${height}_${color}`)) {
			svgdb[`${width}_${height}_${color}`] =
				"data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgdata(width, height, color));
		}

		return svgdb[`${width}_${height}_${color}`];
	},
	empty_img: (width = 300, height = 283) => {
		if (!empty_svgdb.hasOwnProperty(`${width}_${height}`)) {
			empty_svgdb[`${width}_${height}`] =
				"data:image/svg+xml;charset=UTF-8," + encodeURIComponent(empty_svgdata(width, height));
		}

		return empty_svgdb[`${width}_${height}`];
	},
	text: () => {
		return core.randomdb("sample_text", textdb);
	},
	shorttext: () => {
		return core.randomdb("sample_shorttext", shorttextdb);
	},
	icon: () => {
		return core.randomdb("sample_dbicon", dbicon);
	},
	brandicon: () => {
		return core.randomdb("sample_dbbrandicon", dbbrandicon);
	},
	badge: (color = "danger", marginTop = null) => {
		return {
			marginTop: marginTop,
			color: color,
			notification: true,
			label: "Message",
			rounded: "pill",
			hidelabel: true,
		};
	},
	badge2: (color = "danger", label = "99+", marginTop = null) => {
		return {
			marginTop: marginTop,
			label: label,
			color: color,
			notification: true,
		};
	},
	popover: (placement = "top", msg = "Example") => {
		return {
			title: core.setting.title,
			icon: core.setting.icon,
			msg: msg,
			placement: placement,
		};
	},
	tooltip: (placement = "top", msg = "Example") => {
		return {
			msg: msg,
			placement: placement,
		};
	},

	tagpropCl: (exclude) => {
		const tprop = ["elem", "badge", "popover", "tooltip"];

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
	tagpropCss: (exclude) => {
		const tprop = [
			"alignContent",
			"alignItem",
			"alignSelf",
			"animation",
			"animationDelay",
			"animationDirection",
			"animationDuration",
			"animationFillMode",
			"animationIterationCount",
			"animationName",
			"animationTimingFunction",
			"animationPlayState",
			"background",
			"backgroundAttachment",
			"backgroundColor",
			"backgroundImage",
			"backgroundPosition",
			"backgroundRepeat",
			"backgroundClip",
			"backgroundOrigin",
			"backgroundSize",
			"backfaceVisibility",
			"border",
			"borderBottom",
			"borderBottomColor",
			"borderBottomLeftRadius",
			"borderBottomRightRadius",
			"borderBottomStyle",
			"borderBottomWidth",
			"borderCollapse",
			"borderColor",
			"borderImage",
			"borderImageOutset",
			"borderImageRepeat",
			"borderImageSlice",
			"borderImageSource",
			"borderImageWidth",
			"borderLeft",
			"borderLeftColor",
			"borderLeftStyle",
			"borderLeftWidth",
			"borderRadius",
			"borderRight",
			"borderRightColor",
			"borderRightStyle",
			"borderRightWidth",
			"borderSpacing",
			"borderStyle",
			"borderTop",
			"borderTopColor",
			"borderTopLeftRadius",
			"borderTopRightRadius",
			"borderTopStyle",
			"borderTopWidth",
			"borderWidth",
			"bottom",
			"boxDecorationBreak",
			"boxShadow",
			"boxSizing",
			"captionSide",
			"caretColor",
			"clear",
			"clip",
			"color",
			"columnCount",
			"columnFill",
			"columnGap",
			"columnRule",
			"columnRuleColor",
			"columnRuleStyle",
			"columnRuleWidth",
			"columns",
			"columnSpan",
			"columnWidth",
			"content",
			"counterIncrement",
			"counterReset",
			"cursor",
			"direction",
			"display",
			"emptyCells",
			"filter",
			"flex",
			"flexBasis",
			"flexDirection",
			"flexFlow",
			"flexGrow",
			"flexShrink",
			"flexWrap",
			"cssFloat",
			"font",
			"fontFamily",
			"fontSize",
			"fontStyle",
			"fontVariant",
			"fontWeight",
			"fontSizeAdjust",
			"fontStretch",
			"hangingPunctuation",
			"height",
			"hyphens",
			"icon",
			"imageOrientation",
			"isolation",
			"justifyContent",
			"left",
			"letterSpacing",
			"lineHeight",
			"listStyle",
			"listStyleImage",
			"listStylePosition",
			"listStyleType",
			"margin",
			"marginBottom",
			"marginLeft",
			"marginRight",
			"marginTop",
			"maxHeight",
			"maxWidth",
			"minHeight",
			"minWidth",
			"navDown",
			"navIndex",
			"navLeft",
			"navRight",
			"navUp",
			"objectFit",
			"objectPosition",
			"opacity",
			"order",
			"orphans",
			"outline",
			"outlineColor",
			"outlineOffset",
			"outlineStyle",
			"outlineWidth",
			"overflow",
			"overflowX",
			"overflowY",
			"padding",
			"paddingBottom",
			"paddingLeft",
			"paddingRight",
			"paddingTop",
			"pageBreakAfter",
			"pageBreakBefore",
			"pageBreakInside",
			"perspective",
			"perspectiveOrigin",
			"position",
			"quotes",
			"resize",
			"right",
			"scrollBehavior",
			"tableLayout",
			"tabSize",
			"textAlign",
			"textAlignLast",
			"textDecoration",
			"textDecorationColor",
			"textDecorationLine",
			"textDecorationStyle",
			"textIndent",
			"textJustify",
			"textOverflow",
			"textShadow",
			"textTransform",
			"top",
			"transform",
			"transformOrigin",
			"transformStyle",
			"transition",
			"transitionProperty",
			"transitionDuration",
			"transitionTimingFunction",
			"transitionDelay",
			"unicodeBidi",
			"userSelect",
			"verticalAlign",
			"visibility",
			"whiteSpace",
			"width",
			"wordBreak",
			"wordSpacing",
			"wordWrap",
			"widows",
			"zIndex",
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
	tagpropHtml: (exclude) => {
		const tprop = [
			"accept",
			"accept-charset",
			"accesskey",
			"action",
			"align",
			"alt",
			"async",
			"autocomplete",
			"autofocus",
			"autoplay",
			"bgcolor",
			"border",
			"charset",
			"checked",
			"cite",
			"class",
			"color",
			"cols",
			"colspan",
			"content",
			"contenteditable",
			"controls",
			"coords",
			"data",
			"data-*",
			"datetime",
			"default",
			"defer",
			"dir",
			"dirname",
			"disabled",
			"download",
			"draggable",
			"enctype",
			"for",
			"form",
			"formaction",
			"headers",
			"height",
			"hidden",
			"high",
			"href",
			"hreflang",
			"http-equiv",
			"id",
			"ismap",
			"kind",
			"label",
			"lang",
			"list",
			"loop",
			"low",
			"max",
			"maxlength",
			"media",
			"method",
			"min",
			"multiple",
			"muted",
			"name",
			"novalidate",
			"open",
			"optimum",
			"pattern",
			"placeholder",
			"poster",
			"preload",
			"readonly",
			"rel",
			"required",
			"reversed",
			"rows",
			"rowspan",
			"sandbox",
			"scope",
			"selected",
			"shape",
			"size",
			"sizes",
			"span",
			"spellcheck",
			"src",
			"srcdoc",
			"srclang",
			"srcset",
			"start",
			"step",
			"style",
			"tabindex",
			"target",
			"title",
			"translate",
			"type",
			"usemap",
			"value",
			"width",
			"wrap",
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
	tagpropEvent: (exclude) => {
		const tprop = [
			"abort",
			"afterprint",
			"beforeprint",
			"beforeunload",
			"blur",
			"canplay",
			"canplaythrough",
			"change",
			"click",
			"contextmenu",
			"copy",
			"cuechange",
			"cut",
			"dblclick",
			"drag",
			"dragend",
			"dragenter",
			"dragleave",
			"dragover",
			"dragstart",
			"drop",
			"durationchange",
			"emptied",
			"ended",
			"error",
			"focus",
			"hashchange",
			"input",
			"invalid",
			"keydown",
			"keypress",
			"keyup",
			"load",
			"loadeddata",
			"loadedmetadata",
			"loadstart",
			"mousedown",
			"mousemove",
			"mouseout",
			"mouseover",
			"mouseup",
			"mousewheel",
			"offline",
			"online",
			"pagehide",
			"pageshow",
			"paste",
			"pause",
			"play",
			"playing",
			"popstate",
			"progress",
			"ratechange",
			"reset",
			"resize",
			"scroll",
			"search",
			"seeked",
			"seeking",
			"select",
			"stalled",
			"storage",
			"submit",
			"suspend",
			"timeupdate",
			"toggle",
			"unload",
			"volumechange",
			"waiting",
			"wheel",
			"any property with function as value",
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
	tagpropBootstrap: (exclude) => {
		let tprop = [
			"userSelect",
			"pointerEvent",
			"position",
			"overflow",
			"textAlign",
			"verticalAlign",
			"opacity",
			"bgOpacity",
			"textOpacity",
			"btnColor",
			"btnOutlineColor",
			"alertColor",
			"textBgColor",
			"textColor",
			"linkColor",
			"bgColor",
			"textTransform",
			"textDecoration",
			"lineHeight",
			"fontSize",
			"fontWeight",
			"top",
			"bottom",
			"start",
			"end",
			"tMiddle",
			"height",
			"width",
			"maxHeight",
			"maxWidth",
			"minViewHeight",
			"minViewWidth",
			"viewHeight",
			"viewWidth",
			"placeholderAnimation",
			"placeholderWeight",
			"shadow",
			"border",
			"borderNone",
			"borderColor",
			"borderOpacity",
			"borderWidth",
			"rounded",
			"roundedNone",
			"roundedSize",
			"padding",
			"paddingX",
			"paddingY",
			"paddingTop",
			"paddingBottom",
			"paddingStart",
			"paddingEnd",
			"margin",
			"marginX",
			"marginY",
			"marginTop",
			"marginBottom",
			"marginStart",
			"marginEnd",
			"gap",
			"gutter",
			"gutterX",
			"gutterY",
			"display",
			"print",
			"container",
			"flex",
			"float",
			"order",
			"offset",
			"alignContent",
			"justifyContent",
			"alignItem",
			"alignSelf",
			"visible",
			"textWrap",
			"fontItalic",
			"bgGradient",
			"wordBreak",
			"monospace",
			"placeholder",
			"row",
			"col",
			"rowCol",
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
	stackformcontainer: (elem) => {
		return new container.stackform(elem);
	},
	vstackcontainer: (elem) => {
		return new container.vstack(elem);
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
	list_container: (data, opt) => {
		return new ul({ class: "list-group", elem: opt.row(data, opt) });
	},
	list_row: (data, opt) => {
		let lastgroup = null;
		let result = [];
		data.forEach((i) => {
			if (dbstate) {
				if (i.state && lastgroup !== i.state) {
					lastgroup = i.state;
					let state_name = dbstate.filter((el) => {
						return el.value === i.state;
					})[0]?.label;

					result.push(
						opt.group(
							{
								key: i.state,
								name: state_name,
							},
							opt
						)
					);
				}
			}

			result.push(opt.item(i, opt));
		});

		return result;
	},
	list_item: (data, opt) => {
		return new list.item({
			view: opt.view,
			key: data._id,
			name: data.name,
			picture: data.picture,
			detail: new small([data.phone, data.dob, data.email].filter(Boolean).join(" | ")),
			allow_delete: opt.allow_delete,
			allow_copy: opt.allow_copy,
			allow_action: opt.allow_action,
			allow_more: opt.allow_more,
		});
	},
	list_group: (data, opt) => {
		return new list.group({ view: opt.view, key: data.key, name: data.name });
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
	reset_list_state: () => {
		dbstate = null;
	},
};

export default fn;
