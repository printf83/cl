"use strict";

const _setting = {
	debug: false,
};

export const setting = {
	get DEBUG() {
		return _setting.debug;
	},
	set DEBUG(value) {
		_setting.debug = value;
	},
};

const eventdb = {
	db: {},
	create: (fn) => {
		let id = UUID("fn_xxxxxxxxxxxxxxx");
		eventdb[id] = fn;
		return id;
	},
	call: (id) => eventdb[id],
	remove: (sender) => {
		sender.getAttributeNames().forEach((name) => {
			if (name.startsWith("cl.event.")) {
				delete eventdb[sender.getAttribute(name)];
			}
		});
	},
};

export function combineArray(arr, delimeter) {
	return removeEmptyArray(arr)?.join(delimeter);
}

function removeEmptyArray(arr) {
	return arr.filter(Boolean);
}

export function UUID(format) {
	return (format || "el_xxxxxxxxxxxx").replace(/[xy]/g, (c) => {
		let r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function isHTML(str) {
	if (typeof str === "string") {
		return /<\/?[a-z][\s\S]*>/i.test(str) || /\&\#\x\S{4}\;/i.test(str) || /\&\S+\;/i.test(str);
	}
}

export function setupEventListenerRemover(name, elem, fn) {
	if (elem.detachEventListener === undefined) {
		elem.detachEventListener = {};
	}
	elem.detachEventListener[name] = fn;

	if (setting.DEBUG) console.log(`Attach ${name} event to ${elemInfo(elem)}`);
}

export function deleteEventListener(name, elem, fn) {
	if (setting.DEBUG) console.log(`Remove ${name} event from ${elemInfo(elem)}`);
	elem.detachEventListener[name] = null;
	delete elem.detachEventListener[name];
	fn();
}

//attribute builder

const bootstrapSpacer = [
	0,
	1,
	2,
	3,
	4,
	5,
	"auto",
	"sm-0",
	"md-0",
	"lg-0",
	"xl-0",
	"xxl-0",
	"sm-1",
	"md-1",
	"lg-1",
	"xl-1",
	"xxl-1",
	"sm-2",
	"md-2",
	"lg-2",
	"xl-2",
	"xxl-2",
	"sm-3",
	"md-3",
	"lg-3",
	"xl-3",
	"xxl-3",
	"sm-4",
	"md-4",
	"lg-4",
	"xl-4",
	"xxl-4",
	"sm-5",
	"md-5",
	"lg-5",
	"xl-5",
	"xxl-5",
	"sm-auto",
	"md-auto",
	"lg-auto",
	"xl-auto",
	"xxl-auto",
];

const bootstrapDisplay = [
	"none",
	"inline",
	"inline-block",
	"block",
	"grid",
	"table",
	"table-cell",
	"table-row",
	"flex",
	"inline-flex",

	"sm-none",
	"sm-inline",
	"sm-inline-block",
	"sm-block",
	"sm-grid",
	"sm-table",
	"sm-table-cell",
	"sm-table-row",
	"sm-flex",
	"sm-inline-flex",

	"md-none",
	"md-inline",
	"md-inline-block",
	"md-block",
	"md-grid",
	"md-table",
	"md-table-cell",
	"md-table-row",
	"md-flex",
	"md-inline-flex",

	"lg-none",
	"lg-inline",
	"lg-inline-block",
	"lg-block",
	"lg-grid",
	"lg-table",
	"lg-table-cell",
	"lg-table-row",
	"lg-flex",
	"lg-inline-flex",

	"xl-none",
	"xl-inline",
	"xl-inline-block",
	"xl-block",
	"xl-grid",
	"xl-table",
	"xl-table-cell",
	"xl-table-row",
	"xl-flex",
	"xl-inline-flex",

	"xxl-none",
	"xxl-inline",
	"xxl-inline-block",
	"xxl-block",
	"xxl-grid",
	"xxl-table",
	"xxl-table-cell",
	"xxl-table-row",
	"xxl-flex",
	"xxl-inline-flex",
];

const bootstrapFlex = [
	"row",
	"row-reverse",
	"column",
	"column-reverse",
	"wrap",
	"wrap-reverse",
	"nowrap",
	"fill",
	"shrink-0",
	"shrink-1",
	"grow-0",
	"grow-1",

	"sm-row",
	"sm-row-reverse",
	"sm-column",
	"sm-column-reverse",
	"sm-wrap",
	"sm-wrap-reverse",
	"sm-nowrap",
	"sm-fill",
	"sm-shrink-0",
	"sm-shrink-1",
	"sm-grow-0",
	"sm-grow-1",

	"md-row",
	"md-row-reverse",
	"md-column",
	"md-column-reverse",
	"md-wrap",
	"md-wrap-reverse",
	"md-nowrap",
	"md-fill",
	"md-shrink-0",
	"md-shrink-1",
	"md-grow-0",
	"md-grow-1",

	"lg-row",
	"lg-row-reverse",
	"lg-column",
	"lg-column-reverse",
	"lg-wrap",
	"lg-wrap-reverse",
	"lg-nowrap",
	"lg-fill",
	"lg-shrink-0",
	"lg-shrink-1",
	"lg-grow-0",
	"lg-grow-1",

	"xl-row",
	"xl-row-reverse",
	"xl-column",
	"xl-column-reverse",
	"xl-wrap",
	"xl-wrap-reverse",
	"xl-nowrap",
	"xl-fill",
	"xl-shrink-0",
	"xl-shrink-1",
	"xl-grow-0",
	"xl-grow-1",

	"xxl-row",
	"xxl-row-reverse",
	"xxl-column",
	"xxl-column-reverse",
	"xxl-wrap",
	"xxl-wrap-reverse",
	"xxl-nowrap",
	"xxl-fill",
	"xxl-shrink-0",
	"xxl-shrink-1",
	"xxl-grow-0",
	"xxl-grow-1",
];

const bootstrapJustifyContent = [
	"start",
	"end",
	"center",
	"between",
	"around",
	"evenly",
	"sm-start",
	"sm-end",
	"sm-center",
	"sm-between",
	"sm-around",
	"sm-evenly",
	"md-start",
	"md-end",
	"md-center",
	"md-between",
	"md-around",
	"md-evenly",
	"lg-start",
	"lg-end",
	"lg-center",
	"lg-between",
	"lg-around",
	"lg-evenly",
	"xl-start",
	"xl-end",
	"xl-center",
	"xl-between",
	"xl-around",
	"xl-evenly",
	"xxl-start",
	"xxl-end",
	"xxl-center",
	"xxl-between",
	"xxl-around",
	"xxl-evenly",
];

const bootstrapAlign = [
	"start",
	"end",
	"center",
	"baseline",
	"stretch",
	"sm-start",
	"sm-end",
	"sm-center",
	"sm-baseline",
	"sm-stretch",
	"md-start",
	"md-end",
	"md-center",
	"md-baseline",
	"md-stretch",
	"lg-start",
	"lg-end",
	"lg-center",
	"lg-baseline",
	"lg-stretch",
	"xl-start",
	"xl-end",
	"xl-center",
	"xl-baseline",
	"xl-stretch",
	"xxl-start",
	"xxl-end",
	"xxl-center",
	"xxl-baseline",
	"xxl-stretch",
];

const bootstrapAlignContent = [
	"start",
	"end",
	"center",
	"between",
	"around",
	"stretch",
	"sm-start",
	"sm-end",
	"sm-center",
	"sm-between",
	"sm-around",
	"sm-stretch",
	"md-start",
	"md-end",
	"md-center",
	"md-between",
	"md-around",
	"md-stretch",
	"lg-start",
	"lg-end",
	"lg-center",
	"lg-between",
	"lg-around",
	"lg-stretch",
	"xl-start",
	"xl-end",
	"xl-center",
	"xl-between",
	"xl-around",
	"xl-stretch",
	"xxl-start",
	"xxl-end",
	"xxl-center",
	"xxl-between",
	"xxl-around",
	"xxl-stretch",
];

const bootstrapOrder = [
	"last",
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	"last",
	"sm-first",
	"sm-0",
	"sm-1",
	"sm-2",
	"sm-3",
	"sm-4",
	"sm-5",
	"sm-6",
	"sm-7",
	"sm-8",
	"sm-9",
	"sm-10",
	"sm-11",
	"sm-12",
	"sm-last",
	"md-first",
	"md-0",
	"md-1",
	"md-2",
	"md-3",
	"md-4",
	"md-5",
	"md-6",
	"md-7",
	"md-8",
	"md-9",
	"md-10",
	"md-11",
	"md-12",
	"md-last",
	"lg-first",
	"lg-0",
	"lg-1",
	"lg-2",
	"lg-3",
	"lg-4",
	"lg-5",
	"lg-6",
	"lg-7",
	"lg-8",
	"lg-9",
	"lg-10",
	"lg-11",
	"lg-12",
	"lg-last",
	"xl-first",
	"xl-0",
	"xl-1",
	"xl-2",
	"xl-3",
	"xl-4",
	"xl-5",
	"xl-6",
	"xl-7",
	"xl-8",
	"xl-9",
	"xl-10",
	"xl-11",
	"xl-12",
	"xl-last",
	"xxl-first",
	"xxl-0",
	"xxl-1",
	"xxl-2",
	"xxl-3",
	"xxl-4",
	"xxl-5",
	"xxl-6",
	"xxl-7",
	"xxl-8",
	"xxl-9",
	"xxl-10",
	"xxl-11",
	"xxl-12",
	"xxl-last",
];

const bootstrapGrid = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	"sm-0",
	"sm-1",
	"sm-2",
	"sm-3",
	"sm-4",
	"sm-5",
	"sm-6",
	"sm-7",
	"sm-8",
	"sm-9",
	"sm-10",
	"sm-11",
	"sm-12",
	"md-0",
	"md-1",
	"md-2",
	"md-3",
	"md-4",
	"md-5",
	"md-6",
	"md-7",
	"md-8",
	"md-9",
	"md-10",
	"md-11",
	"md-12",
	"lg-0",
	"lg-1",
	"lg-2",
	"lg-3",
	"lg-4",
	"lg-5",
	"lg-6",
	"lg-7",
	"lg-8",
	"lg-9",
	"lg-10",
	"lg-11",
	"lg-12",
	"xl-0",
	"xl-1",
	"xl-2",
	"xl-3",
	"xl-4",
	"xl-5",
	"xl-6",
	"xl-7",
	"xl-8",
	"xl-9",
	"xl-10",
	"xl-11",
	"xl-12",
	"xxl-0",
	"xxl-1",
	"xxl-2",
	"xxl-3",
	"xxl-4",
	"xxl-5",
	"xxl-6",
	"xxl-7",
	"xxl-8",
	"xxl-9",
	"xxl-10",
	"xxl-11",
	"xxl-12",
];

const bootstrapRowCol = [
	"auto",
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	"sm-auto",
	"sm-0",
	"sm-1",
	"sm-2",
	"sm-3",
	"sm-4",
	"sm-5",
	"sm-6",
	"sm-7",
	"sm-8",
	"sm-9",
	"sm-10",
	"sm-11",
	"sm-12",
	"md-auto",
	"md-0",
	"md-1",
	"md-2",
	"md-3",
	"md-4",
	"md-5",
	"md-6",
	"md-7",
	"md-8",
	"md-9",
	"md-10",
	"md-11",
	"md-12",
	"lg-auto",
	"lg-0",
	"lg-1",
	"lg-2",
	"lg-3",
	"lg-4",
	"lg-5",
	"lg-6",
	"lg-7",
	"lg-8",
	"lg-9",
	"lg-10",
	"lg-11",
	"lg-12",
	"xl-auto",
	"xl-0",
	"xl-1",
	"xl-2",
	"xl-3",
	"xl-4",
	"xl-5",
	"xl-6",
	"xl-7",
	"xl-8",
	"xl-9",
	"xl-10",
	"xl-11",
	"xl-12",
	"xxl-auto",
	"xxl-0",
	"xxl-1",
	"xxl-2",
	"xxl-3",
	"xxl-4",
	"xxl-5",
	"xxl-6",
	"xxl-7",
	"xxl-8",
	"xxl-9",
	"xxl-10",
	"xxl-11",
	"xxl-12",
];

const bootstrapFloat = [
	"start",
	"end",
	"none",
	"sm-start",
	"sm-end",
	"sm-none",
	"md-start",
	"md-end",
	"md-none",
	"lg-start",
	"lg-end",
	"lg-none",
	"xl-start",
	"xl-end",
	"xl-none",
	"xxl-start",
	"xxl-end",
	"xxl-none",
];

const bootstrapColor = [
	"primary",
	"secondary",
	"success",
	"danger",
	"warning",
	"info",
	"light",
	"dark",
	"body",
	"muted",
	"white",
	"black",
	"black-50",
	"white-50",
	"transparent",
	"link",
];

const bootstrapPositionView = [
	"start",
	"sm-start",
	"md-start",
	"lg-start",
	"xl-start",
	"center",
	"sm-center",
	"md-center",
	"lg-center",
	"xl-center",
	"end",
	"sm-end",
	"md-end",
	"lg-end",
	"xl-end",
];

const bootstrapPropertyDb = {
	userSelect: { format: "user-select-$1", value: ["all", "auto", "none"] },
	pointerEvent: { format: "pe-$1", value: ["auto", "none"] },
	position: { format: "position-$1", value: ["static", "relative", "absolute", "fixed", "sticky", "tooltip"] },
	overflow: { format: "overflow-$1", value: ["auto", "hidden", "visible", "scroll"] },

	textAlign: { format: "text-$1", value: bootstrapPositionView },
	verticalAlign: { format: "align-$1", value: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom"] },

	opacity: { format: "opacity-$1", value: [0, 25, 50, 75, 100] },
	bgOpacity: { format: "bg-opacity-$1", value: [10, 25, 50, 75, 100] },
	textOpacity: { format: "text-opacity-$1", value: [25, 50, 75, 100] },

	btnColor: { format: "btn-$1", value: bootstrapColor },
	btnOutlineColor: { format: "btn-outline-$1", value: bootstrapColor },
	alertColor: { format: "alert-$1", value: bootstrapColor },

	textBgColor: { format: "text-bg-$1", value: bootstrapColor },
	textColor: { format: "text-$1", value: bootstrapColor },
	linkColor: { format: "link-$1", value: bootstrapColor },
	bgColor: { format: "bg-$1", value: bootstrapColor },

	textTransform: { format: "text-$1", value: ["lowercase", "uppercase", "capitalize"] },
	textDecoration: { format: "text-decoration-$1", value: ["underline", "line-through", "none"] },
	lineHeight: { format: "lh-$1", value: [1, "sm", "base", "lg"] },

	fontSize: { format: "fs-$1", value: [1, 2, 3, 4, 5, 6] },
	fontWeight: { format: "fw-$1", value: ["bold", "bolder", "normal", "light", "lighter"] },

	top: { format: "top-$1", value: [0, 50, 100] },
	bottom: { format: "bottom-$1", value: [0, 50, 100] },
	start: { format: "start-$1", value: [0, 50, 100] },
	end: { format: "end-$1", value: [0, 50, 100] },
	tMiddle: { format: "translate-middle-$1", formatTrue: "translate-middle", value: [true, "x", "y"] },

	height: { format: "h-$1", value: ["auto", 25, 50, 75, 100] },
	width: { format: "w-$1", value: ["auto", 25, 50, 75, 100] },
	maxHeight: { format: "mh-$1", value: [100] },
	maxWidth: { format: "mw-$1", value: [100] },
	minViewHeight: { format: "min-vh-$1", value: [100] },
	minViewWidth: { format: "min-vw-$1", value: [100] },
	viewHeight: { format: "vh-$1", value: [100] },
	viewWeight: { format: "vw-$1", value: [100] },

	placeholderAnimation: { format: "placeholder-$1", value: ["glow", "wave"] },
	placeholderWeight: { format: "placeholder-$1", formatValue: "placeholder $1", value: ["lg", "sm", "xs"] },

	shadow: {
		format: "shadow-$1",
		formatTrue: "shadow",
		formatFalse: "shadow-none",
		value: [true, false, "none", "sm", "lg", "inset"],
	},

	border: {
		format: "border-$1",
		formatTrue: "border",
		formatFalse: "border-0",
		value: [true, false, "top", "end", "bottom", "start"],
	},

	borderNone: {
		format: "border-$1-0",
		formatTrue: "border-0",
		formatValue: "border",
		value: [true, "top", "end", "bottom", "start"],
	},

	borderColor: {
		format: "border-$1",
		formatValue: "border",
		value: bootstrapColor,
	},

	borderOpacity: {
		format: "border-opacity-$1",
		formatValue: "border",
		value: [10, 25, 50, 70],
	},

	borderWidth: {
		format: "border-$1",
		formatValue: "border",
		value: [1, 2, 3, 4, 5],
	},

	rounded: {
		format: "rounded-$1",
		formatTrue: "rounded",
		formatFalse: "rounded-0",
		value: [true, false, "top", "end", "bottom", "start", "circle", "pill"],
	},

	roundedNone: {
		format: "rounded-$1-0",
		formatTrue: "rounded-0",
		formatFalse: "rounded",
		formatValue: "rounded",
		value: [true, false, "top", "end", "bottom", "start"],
	},

	roundedSize: {
		format: "rounded-$1",
		formatValue: "rounded",
		value: [0, 1, 2, 3, 4, 5],
	},

	padding: { format: "p-$1", value: bootstrapSpacer },
	paddingX: { format: "px-$1", value: bootstrapSpacer },
	paddingY: { format: "py-$1", value: bootstrapSpacer },
	paddingTop: { format: "pt-$1", value: bootstrapSpacer },
	paddingBottom: { format: "pb-$1", value: bootstrapSpacer },
	paddingStart: { format: "ps-$1", value: bootstrapSpacer },
	paddingEnd: { format: "pe-$1", value: bootstrapSpacer },

	margin: { format: "m-$1", value: bootstrapSpacer },

	marginX: { format: "mx-$1", value: bootstrapSpacer },
	marginY: { format: "my-$1", value: bootstrapSpacer },
	marginTop: { format: "mt-$1", value: bootstrapSpacer },
	marginBottom: { format: "mb-$1", value: bootstrapSpacer },
	marginStart: { format: "ms-$1", value: bootstrapSpacer },
	marginEnd: { format: "me-$1", value: bootstrapSpacer },

	gap: { format: "gap-$1", value: bootstrapSpacer },
	gutter: { format: "g-$1", value: bootstrapSpacer },
	gutterX: { format: "gx-$1", value: bootstrapSpacer },
	gutterY: { format: "gy-$1", value: bootstrapSpacer },

	display: { format: "d-$1", value: bootstrapDisplay },
	print: { format: "d-print-$1", value: bootstrapDisplay },
	container: {
		format: "container-$1",
		formatTrue: "container",
		value: [true, "xs", "sm", "md", "lg", "xl", "xxl", "fluid"],
	},

	flex: {
		format: "flex-$1",
		value: bootstrapFlex,
	},

	float: {
		format: "float-$1",
		value: bootstrapFloat,
	},

	order: {
		format: "order-$1",
		value: bootstrapOrder,
	},

	offset: {
		format: "offset-$1",
		value: bootstrapGrid,
	},

	alignContent: {
		format: "align-content-$1",
		value: bootstrapAlignContent,
	},

	justifyContent: {
		format: "justify-content-$1",
		value: bootstrapJustifyContent,
	},

	alignItem: {
		format: "align-items-$1",
		value: bootstrapAlign,
	},
	alignSelf: {
		format: "align-self-$1",
		value: bootstrapAlign,
	},

	visible: {
		formatTrue: "visible",
		formatFalse: "invisible",
		value: [true, false],
	},
	textWrap: {
		formatTrue: "text-wrap",
		formatFalse: "text-nowrap",
		value: [true, false],
	},
	fontItalic: {
		formatTrue: "fst-italic",
		formatFalse: "fst-normal",
		value: [true, false],
	},
	bgGradient: {
		formatTrue: "bg-gradient",
		value: [true],
	},
	wordBreak: {
		formatTrue: "text-break",
		value: [true],
	},
	monospace: {
		formatTrue: "font-monospace",
		value: [true],
	},
	placeholder: {
		formatTrue: "placeholder",
		value: [true],
	},

	row: {
		formatTrue: "row",
		value: [true],
	},

	col: {
		format: "col-$1",
		formatTrue: "col",
		value: [true, ...bootstrapRowCol],
	},

	rowCol: {
		format: "row-cols-$1",
		value: bootstrapRowCol,
	},
};

function attachBootstrap(key, elem, opt) {
	if (bootstrapPropertyDb.hasOwnProperty(key)) {
		if (Array.isArray(opt[key])) {
			let itsBootstrapAttr = false;
			opt[key].forEach((i) => {
				if (bootstrapPropertyDb[key].value.indexOf(i) > -1) {
					itsBootstrapAttr = true;
					if (bootstrapPropertyDb[key].hasOwnProperty("formatValue")) {
						elem.classList.add(bootstrapPropertyDb[key].formatValue);
					}

					if (i === true) {
						if (bootstrapPropertyDb[key].hasOwnProperty("formatTrue")) {
							elem.classList.add(bootstrapPropertyDb[key].formatTrue);
						}
					} else if (i === false) {
						if (bootstrapPropertyDb[key].formatFalse) {
							elem.classList.add(bootstrapPropertyDb[key].hasOwnProperty("formatFalse"));
						}
					} else {
						if (bootstrapPropertyDb[key].hasOwnProperty("format")) {
							elem.classList.add(bootstrapPropertyDb[key].format.replace(/\$1/g, i));
						}
					}
				} else {
					console.info(`${i} is not supported value for bootstrap ${key} property`);
				}
			});

			if (itsBootstrapAttr) {
				delete opt[key];
			}
		} else {
			if (bootstrapPropertyDb[key].value.indexOf(opt[key]) > -1) {
				if (bootstrapPropertyDb[key].hasOwnProperty("formatValue")) {
					elem.classList.add(bootstrapPropertyDb[key].formatValue);
				}

				if (opt[key] === true) {
					if (bootstrapPropertyDb[key].hasOwnProperty("formatTrue")) {
						elem.classList.add(bootstrapPropertyDb[key].formatTrue);
					}
				} else if (opt[key] === false) {
					if (bootstrapPropertyDb[key].hasOwnProperty("formatFalse")) {
						elem.classList.add(bootstrapPropertyDb[key].formatFalse);
					}
				} else {
					if (bootstrapPropertyDb[key].hasOwnProperty("format")) {
						elem.classList.add(bootstrapPropertyDb[key].format.replace(/\$1/g, opt[key]));
					}
				}

				delete opt[key];
			} else {
				console.info(`${opt[key]} is not supported value for bootstrap ${key} property`);
			}
		}
	}

	return { opt, elem };
}

const stylePropertyDb = [
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

function attachStyle(key, elem, opt) {
	if (stylePropertyDb.indexOf(key) > -1) {
		elem.style[key] = opt[key];

		delete opt[key];
	}

	return { opt, elem };
}

function attachManualStyle(key, elem, opt) {
	if (key === "style") {
		let styleKeys = Object.keys(opt[key]);
		if (styleKeys) {
			for (let x = 0; x < styleKeys.length; x++) {
				if (opt[key][styleKeys]) {
					elem.style.setProperty(styleKeys, opt[key][styleKeys]);
				}
			}
		}

		delete opt[key];
	}

	return { opt, elem };
}

function attachEvent(key, elem, opt) {
	if (typeof opt[key] === "function") {
		elem.addEventListener(key, opt[key], false);

		setupEventListenerRemover(key, elem, () => {
			deleteEventListener(key, elem, () => {
				elem.removeEventListener(key, opt[key], false);
			});
		});

		delete opt[key];
	}

	return { opt, elem };
}

function attachClass(key, elem, opt) {
	if (key === "class") {
		let i = [];
		try {
			if (Array.isArray(opt[key])) {
				i = opt[key];
			} else {
				i = [opt[key]];
			}

			//remove null
			i = i.filter(Boolean);

			//make sure every class not have whitespace
			if (i && i.length > 0) {
				for (let x = 0; x < i.length; x++) {
					if (i[x].indexOf(" ") > -1) {
						i[x] = i[x].split(" ");
						i[x] = i[x].filter(Boolean);

						if (i[x] && i[x].length > 0) {
							for (let y = 0; y < i[x].length; y++) {
								elem.classList.add(i[x][y]);
							}
						}
					} else {
						elem.classList.add(i[x]);
					}
				}
			}
		} catch (error) {
			console.error(`Fail to add class ${i}`, error);
		}

		delete opt[key];
	}

	return { opt, elem };
}

const booleanAttr = [
	"allowfullscreen",
	"allowpaymentrequest",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"indeterminate",
	"controls",
	"default",
	"defer",
	"disabled",
	"formnovalidate",
	"novalidate",
	"noValidate",
	"hidden",
	"ismap",
	"itemscope",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"open",
	"playsinline",
	"readOnly",
	"required",
	"reversed",
	"selected",
	"truespeed",
];
function attachBoolean(key, elem, opt) {
	if (booleanAttr.indexOf(key) > -1) {
		if (opt[key] === true) {
			elem[key] = true;
		} else {
			console.warn(`Attribute ${key}:${opt[key]} is not boolean`);
		}

		delete opt[key];
	}

	return { opt, elem };
}

function attachData(key, elem, opt) {
	if (key.startsWith("data")) {
		elem.setAttribute(
			key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()),
			opt[key]
		);

		delete opt[key];
	}

	return { opt, elem };
}

function attachAria(key, elem, opt) {
	if (key.startsWith("aria")) {
		elem.setAttribute(
			key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()),
			opt[key]
		);

		delete opt[key];
	}

	return { opt, elem };
}

function attachOther(key, elem, opt) {
	let i = Array.isArray(opt[key]) ? opt[key].join(" ") : opt[key];
	elem.setAttribute(key, i);

	delete opt[key];

	return { opt, elem };
}

function cleanupAttr(key, elem, opt) {
	if ((opt[key] === undefined || opt[key]) === null) {
		// console.log(`${key}:${opt[key]} is null or undefined. Delete it`);
		delete opt[key];
	} else {
		// console.log(`${key}:${opt[key]} isNot null and undefined`);
	}

	return { opt, elem };
}

const notAttr = ["tag", "elem"];
const fnAttr = {
	cleanupAttr: cleanupAttr,
	attachBoolean: attachBoolean,
	attachData: attachData,
	attachAria: attachAria,
	attachBootstrap: attachBootstrap,
	attachEvent: attachEvent,
	attachStyle: attachStyle,
	attachManualStyle: attachManualStyle,
	attachClass: attachClass,
	attachOther: attachOther,
};

const fnAttrDb = [
	"cleanupAttr",
	"attachBoolean",
	"attachData",
	"attachAria",
	"attachBootstrap",
	"attachEvent",
	"attachStyle",
	"attachManualStyle",
	"attachClass",
	"attachOther",
];

function attachAttr(elem, opt) {
	try {
		if (elem && opt) {
			let keys = Object.keys(opt);
			if (keys) {
				let keyLength = keys.length;
				let fnAttrDbLength = fnAttrDb.length;

				for (let x = 0; x < keyLength; x++) {
					if (notAttr.indexOf(keys[x]) === -1) {
						for (let y = 0; y < fnAttrDbLength; y++) {
							if (opt.hasOwnProperty(keys[x]) && opt[keys[x]] !== null && opt[keys[x]] !== undefined) {
								if (y === fnAttrDbLength - 1) {
									console.log(`Treat ${keys[x]}:${opt[keys[x]]} as another attribute.`);
								}

								let r = fnAttr[fnAttrDb[y]](keys[x], elem, opt);
								opt = r.opt;
								elem = r.elem;
							}
						}
					}
				}
			}
		}
	} catch (error) {
		console.error("Something broken", error);
	}

	return elem;
}

//attribute builder - end

//merge

function mergeStyle(existingStyle, newStyle) {
	if (existingStyle !== null && newStyle !== null && existingStyle !== undefined && newStyle !== undefined) {
		let c = {};
		Object.keys(existingStyle).forEach((i) => {
			// if (newStyle.hasOwnProperty(i)) {
			// 	// if (existingStyle[i] !== newStyle[i]) {
			// 	// 	console.warn(
			// 	// 		`Same property ${i} provided in 'existingStyle' and 'newStyle'. Using style from 'existingStyle' insted.`,
			// 	// 		{ existingStyle: existingStyle[i], newStyle: newStyle[i] }
			// 	// 	);
			// 	// }

			// 	c[i] = existingStyle[i]; //used newStyle insted
			// } else {
			c[i] = existingStyle[i];
			// }
		});
		Object.keys(newStyle).forEach((i) => {
			if (!existingStyle.hasOwnProperty(i)) {
				c[i] = newStyle[i];
			}
		});
		return c;
	} else if (existingStyle !== null && existingStyle !== undefined) {
		return existingStyle;
	} else if (newStyle !== null && newStyle !== undefined) {
		return newStyle;
	} else {
		return null;
	}
}

function mergeClass(existingClass, newClass) {
	if (existingClass !== null && newClass !== null && existingClass !== undefined && newClass !== undefined) {
		let aT = typeof existingClass;
		let bT = typeof newClass;
		let aR = Array.isArray(existingClass);
		let bR = Array.isArray(newClass);

		if (!aR && !bR && aT === "string" && bT === "string") {
			return [existingClass, newClass];
		} else if (!aR && bR && aT === "string") {
			newClass.push(existingClass);
			return newClass;
		} else if (aR && !bR && bT === "string") {
			existingClass.push(newClass);
			return existingClass;
		} else if (aR && bR) {
			return [...existingClass, ...newClass];
		} else {
			console.error("Unhandle class rules", [aT, bT, aR, bR]);
			return null;
		}
	} else if (existingClass !== null && existingClass !== undefined) {
		return existingClass;
	} else if (newClass !== null && newClass !== undefined) {
		return newClass;
	} else {
		return null;
	}
}

export function mergeObject(existingObject, newObject, rules) {
	if ((existingObject || newObject) && !(existingObject && newObject)) {
		return existingObject || newObject;
	} else if (existingObject && newObject) {
		let result = {};
		Object.keys(existingObject).forEach((i) => {
			if (newObject.hasOwnProperty(i)) {
				if (i === "class") {
					result[i] = mergeClass(existingObject[i], newObject[i]);
				} else if (i === "style") {
					result[i] = mergeStyle(existingObject[i], newObject[i]);
				} else {
					if (rules && rules.hasOwnProperty(i)) {
						result[i] = rules[i](existingObject[i], newObject[i]);
					} else {
						// if (existingObject[i] !== newObject[i]) {
						// 	console.warn(
						// 		`No rules provided for merging ${i} attribute. Using ${i} from 'existingObject' insted.`,
						// 		{ existingObject: existingObject[i], newObject: newObject[i] }
						// 	);
						// }

						result[i] = existingObject[i]; //used newObject insted
					}
				}
			} else {
				result[i] = existingObject[i];
			}
		});

		Object.keys(newObject).forEach((i) => {
			if (!existingObject.hasOwnProperty(i)) {
				if (newObject[i]) {
					result[i] = newObject[i];
				}
			}
		});

		return result;
	} else {
		return null;
	}
}

//merge - end

//multiple option constructor class
const fnA = {
	defaultRule: {
		rule: null,
		fn: null,
	},
	compareRulesAndArg: (a, b) => {
		if (b === null) {
			if (a === null) {
				return true;
			}
		} else {
			if (a) {
				if (a.length === b.length) {
					for (let i = 0; i < a.length; i++) {
						if (typeof a[i] === "function") {
							if (a[i](b[i]) === true) {
								return true;
							}
						} else {
							if (a[i].indexOf("|") >= 0) {
								//multiple
								let c = a[i].split("|");

								for (let j = 0; j < c.length; j++) {
									if (c[j] === b[i] || c[j] === "any") {
										return true;
										break;
									}
								}
							} else {
								//single
								if (a[i] === b[i] || a[i] === "any") {
									return true;
									break;
								}
							}
						}
					}
				}
			} else {
				console.warn("a is null");
			}
		}

		return false;
	},
	getFunction: (ruleSetting, argType) => {
		if (ruleSetting && ruleSetting.length > 0) {
			for (var i = 0; i < ruleSetting.length; i++) {
				if (fnA.compareRulesAndArg(ruleSetting[i].rule, argType)) {
					return ruleSetting[i].fn;
					break;
				}
			}
		}

		return null;
	},
	checkArgType: (obj) => {
		if (obj === undefined) {
			return "undefined";
		}

		if (obj === null) {
			return "null";
		}

		if (Array.isArray(obj)) {
			if (obj.length > 0) {
				return `${fnA.checkArgType(obj[0])}[]`;
			} else {
				return "any[]";
			}
		} else {
			let t = typeof obj;
			if (t === "object") {
				if (obj.hasOwnProperty("cl") && obj.cl === 1) {
					return "cl";
				} else if (obj === { debug: true }) {
					return "debug";
				} else {
					return t;
				}
			} else {
				return t;
			}
		}
	},
	getArgType: (obj) => {
		if (obj && obj.length > 0) {
			let result = [];
			obj.forEach((i) => {
				result.push(fnA.checkArgType(i));
			});
			return result;
		} else {
			return null;
		}
	},
	main: (rules, caller, ...obj) => {
		let a = fnA.getArgType(...obj);
		let f = fnA.getFunction(rules, a);
		if (f) {
			return f(...obj);
		} else {
			console.error(`${caller} argument ${a.join(", ")} not supported by any rules`, {
				obj: a,
				rule: rules
					? rules.map((i) => {
							return i?.rule?.join(", ");
					  })
					: null,
			});
			return null;
		}
	},
};

export const multipleConstructorClass = fnA.main;
//multiple option constructor class - end

export function extend(out) {
	out = out || {};

	for (let i = 1; i < arguments.length; i++) {
		if (!arguments[i]) continue;

		for (let key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
		}
	}

	return out;
}

export function elemInfo(elem) {
	let a1 = elem.localName;
	let a2 = elem.id ? `#${elem.id}` : "";
	let a3 = !a2
		? elem.classList && elem.classList.length > 0
			? "." + [].slice.apply(elem.classList).join(".")
			: ""
		: "";
	let a4 = !a2 && !a3 ? (elem.name ? `[name='${elem.name}']` : "") : "";
	let a5 = !a2 && !a3 && !a4 ? (elem.innerText ? ` [${elem.innerText}]` : "") : "";

	return `${a1}${a2}${a3}${a4}${a5}`;
}

function build(container, arg) {
	if (arg) {
		arg = Array.isArray(arg) ? arg : [arg];

		if (arg.length > 0) {
			let hasContainer = container ? true : false;
			container = container || document.createElement("div");

			arg.forEach((e) => {
				let element = e.data.tag ? document.createElement(e.data.tag) : container;
				// element = attachAttr(element, e.data.attr); //V1
				element = attachAttr(element, e.data); //V2

				if (e.data.elem) {
					e.data.elem = Array.isArray(e.data.elem) ? e.data.elem : [e.data.elem];
					e.data.elem.forEach((i) => {
						if (i) {
							let iType = typeof i;
							if (iType === "string" || iType === "number" || iType === "boolean") {
								if (e.data.tag !== "pre" && isHTML(i)) {
									element.insertAdjacentHTML("beforeend", i);
								} else if (Array.isArray(i)) {
									console.error(
										"i is array. This happen when you set elem: [[tag],tag]. It should be elem:[tag,tag]",
										i
									);
								} else {
									element.appendChild(document.createTextNode(i));
								}
							} else if (i.hasOwnProperty("cl")) {
								let t = build(element, i);
								element = t ? t : element;
							} else {
								console.error("i is not elem or [elem] or string or number or boolean", i);
							}
						}
					});
				}

				//add to data dom
				e.dom = element;

				if (e.data.tag) container.appendChild(element);
			});

			if (hasContainer) {
				return container;
			} else {
				let result = container.childNodes;
				container = null;
				return result;
			}
		}
	}
	return null;
}

export function detachEventListener(elem) {
	if (elem) {
		let c = elem?.childNodes;
		if (c?.length > 0) {
			c.forEach((item) => {
				detachEventListener(item);

				if (item.detachEventListener) {
					Object.keys(item.detachEventListener).forEach((i) => {
						item.detachEventListener[i]();
					});
				}
			});
		}
		if (elem.detachEventListener) {
			Object.keys(elem.detachEventListener).forEach((i) => {
				elem.detachEventListener[i]();
			});
		}
	}
}

export function removeChildElement(elem) {
	while (elem.firstChild) {
		detachEventListener(elem.firstChild);
		elem.firstChild.remove();
	}
}

export function removeElement(elem) {
	detachEventListener(elem);
	elem.remove();
}

export function appendChild(container, data) {
	if (setting.DEBUG) console.time("appendChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.appendChild(n);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach((i) => {
			container.appendChild(i);
		});
	}
	if (setting.DEBUG) console.timeEnd("appendChild");
	return container.lastChild;
}

export function prependChild(container, data) {
	if (setting.DEBUG) console.time("prependChild");
	let n = node(data);
	if (Node.prototype.isPrototypeOf(n)) {
		container.insertBefore(n, container.firstChild);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach((i) => {
			container.insertBefore(i, container.firstChild);
		});
	}
	if (setting.DEBUG) console.timeEnd("prependChild");
	return container.firstChild;
}

export function replaceWith(elem, data) {
	if (setting.DEBUG) console.time("replaceWith");
	removeChildElement(elem);

	let r = null;
	let n = node(data);
	let parent = elem.parentNode;
	if (Node.prototype.isPrototypeOf(n)) {
		r = parent.insertBefore(n, elem);
	} else if (NodeList.prototype.isPrototypeOf(n)) {
		n.forEach((i) => {
			r = parent.insertBefore(i, elem);
		});
	}

	removeElement(elem);

	if (setting.DEBUG) console.timeEnd("replaceWith");
	return r;
}

export function replaceChild(container, data) {
	if (setting.DEBUG) console.time("replaceChild");
	removeChildElement(container);

	build(container, data);
	if (setting.DEBUG) console.timeEnd("replaceChild");
	return container.childNodes;
}

export function node(data) {
	return build(null, data);
}

export function html(data) {
	let container = document.createElement("div");
	container = build(container, data);
	let html = container.innerHTML;
	container = null;
	return html;
}

function attacheventdb(elem, eventname) {
	let eventID = elem.getAttribute(`cl.event.${eventname}`);
	if (eventID) {
		let fn = (event) => {
			eventdb.call(eventID)(event);
		};

		elem.addEventListener(eventname, fn, false);

		setupEventListenerRemover(eventname, elem, () => {
			deleteEventListener(eventname, elem, () => {
				elem.removeEventListener(eventname, fn, false);
			});
		});
	}
}

export function init(container) {
	let popoverTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="popover"]'));
	popoverTriggerList.map((popoverTriggerEl) => {
		let elem = new bootstrap.Popover(popoverTriggerEl);

		attacheventdb(popoverTriggerEl, "show.bs.popover");
		attacheventdb(popoverTriggerEl, "shown.bs.popover");
		attacheventdb(popoverTriggerEl, "hidden.bs.popover");
		attacheventdb(popoverTriggerEl, "inserted.bs.popover");

		setupEventListenerRemover("popover", popoverTriggerEl, () => {
			deleteEventListener("popover", popoverTriggerEl, () => {
				bootstrap.Popover.getInstance(popoverTriggerEl)?.dispose();
			});
		});

		return elem;
	});

	let tooltipTriggerList = [].slice.call(container.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map((tooltipTriggerEl) => {
		let elem = new bootstrap.Tooltip(tooltipTriggerEl);

		attacheventdb(tooltipTriggerEl, "show.bs.tooltip");
		attacheventdb(tooltipTriggerEl, "shown.bs.tooltip");
		attacheventdb(tooltipTriggerEl, "hidden.bs.tooltip");
		attacheventdb(tooltipTriggerEl, "inserted.bs.tooltip");

		setupEventListenerRemover("tooltip", tooltipTriggerEl, () => {
			deleteEventListener("tooltip", tooltipTriggerEl, () => {
				bootstrap.Tooltip.getInstance(tooltipTriggerEl)?.dispose();
			});
		});

		return elem;
	});
}
