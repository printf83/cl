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

let shorttextindex = 0;
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

let iconindex = 0;
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
];

// let svgiconindex = 0;
// const dbsvgicon = [
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-2.8-5.6-5.6-11.2-9.8-16.8l-50.6 58.8s-81.4-103.6-87.1-110.6C133.1 243.8 112 273.2 112 306.8C112 375.4 162.6 416 225.7 416z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48zm368-48c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M32 0C46.3 0 58.4 9.4 62.5 22.3l.1 0-.1 .1 .1 .3 0-.4C89.8 11.5 128.1 0 168 0c38.8 0 74.6 9.1 105.7 17C306 25.2 332.9 32 360 32c26.8 0 52.9-6.8 73-14.1c9.9-3.6 17.9-7.2 23.4-9.8c2.7-1.3 4.8-2.4 6.2-3.1c.7-.4 1.1-.6 1.4-.8l.2-.1c9.9-5.6 22.1-5.6 31.9 .2S512 20.6 512 32V320c0 12.1-6.8 23.2-17.7 28.6L480 320c14.3 28.6 14.3 28.6 14.3 28.6l0 0 0 0-.1 0-.2 .1-.7 .4c-.6 .3-1.5 .7-2.5 1.2c-2.2 1-5.2 2.4-9 4c-7.7 3.3-18.5 7.6-31.5 11.9C424.5 374.9 388.8 384 352 384c-37 0-65.2-9.4-89-17.3l-1-.3c-24-8-43.7-14.4-70-14.4c-27.9 0-64.7 7.2-96.2 15c-12.1 3-23 6-31.8 8.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352 72 32C0 14.3 14.3 0 32 0zM64 158.4c17.5-4.9 40.4-10.7 64-15.2V68.8c-15 3.3-29.3 8.1-42 13c-8.5 3.4-16 6.7-22 9.6v67zm0 80v70.8c5.1-1.4 10.6-2.8 16.2-4.2c14.3-3.6 30.8-7.3 47.8-10.4V223.1c21.9-4.2 44.4-7.1 64-7.1c5.6 0 10.9 .2 16 .7v71.9c29.5 2.2 53 10 73.3 16.8l.9 .3c2 .7 3.9 1.3 5.8 1.9v-69-1.4c19 5.9 39.1 10.8 64 10.8c5.3 0 10.7-.2 16-.6v71.9c22-2 43.9-7.6 61.9-13.6c6.8-2.3 12.9-4.6 18.1-6.6V229.2c-20.9 7.5-49.9 15.8-80 18.1v-80c30.1-2.3 59.1-10.6 80-18.1V80.5c-21.6 7.3-49.5 14.3-80 15.4v71.5c-5.3 .4-10.7 .6-16 .6c-24.9 0-45-4.9-64-10.8V86.5c-9.3-2.1-18.3-4.4-27-6.7l-3.1-.8c-17.4-4.4-33.8-8.5-49.9-11.3v69c-5.1-.4-10.4-.7-16-.7c-19.6 0-42.1 3-64 7.1v80c-23.6 4.5-46.5 10.3-64 15.2zM208 136.7v80c24.4 2.1 44.3 8.7 64.2 15.3l0 0c5.2 1.7 10.5 3.5 15.8 5.2v-80c-5.3-1.7-10.6-3.4-15.8-5.2l0 0c-19.9-6.6-39.8-13.2-64.2-15.3z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M287.6 .1c-19.7 0-38.3 9.1-50.4 24.6L205.9 64.9c-17.9 23-46 35.6-75.1 33.7L59.1 94c-13.5-.9-26.9 3.2-37.7 11.6C-1.3 123.2-6.7 155.2 8.8 179.4l44.5 69.2c7.1 11 10.8 23.8 10.8 36.8c0 11.9-3.1 23.5-9 33.8L27.4 367.7c-10 17.5-10 39.1 0 56.6c12.1 21.2 36.4 32.3 60.4 27.7l67-13c5.5-1.1 11.2-1.6 16.8-1.6H180c20.9 0 41 7.4 56.9 20.9l45 38.2c11.8 10 26.9 15.6 42.4 15.6c37.8 0 67.7-31.9 65.4-69.6l-3.1-50.6c-1-16.8 6.6-32.9 20.1-42.8l82.5-60.2c14.2-10.4 22.7-27 22.7-44.6c0-23.2-14.5-43.9-36.3-51.8l-58.2-21.2c-24.4-8.9-42.9-29.1-49.7-54.2L349.3 47.4C341.8 19.5 316.5 .1 287.6 .1z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M428.3 3c11.6-6.4 26.2-2.3 32.6 9.3l4.8 8.7c19.3 34.7 19.8 75.7 3.4 110C495.8 159.6 512 197.9 512 240c0 18.5-3.1 36.3-8.9 52.8c-6.1 17.3-28.5 16.3-36.8-.1l-11.7-23.4c-4.1-8.1-12.4-13.3-21.5-13.3H360c-13.3 0-24-10.7-24-24V152c0-13.3-10.7-24-24-24l-17.1 0c-21.3 0-30-23.9-10.8-32.9C304.7 85.4 327.7 80 352 80c28.3 0 54.8 7.3 77.8 20.2c5.5-18.2 3.7-38.4-6-55.8L419 35.7c-6.4-11.6-2.3-26.2 9.3-32.6zM171.2 345.5L264 160l40 0v80c0 26.5 21.5 48 48 48h76.2l23.9 47.8C372.3 443.9 244.3 512 103.2 512H44.4C19.9 512 0 492.1 0 467.6c0-20.8 14.5-38.8 34.8-43.3l49.8-11.1c37.6-8.4 69.5-33.2 86.7-67.7z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4h87c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31H476.3c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240h-132c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9H16c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1v5.8c0 16.9-2.8 33.5-8.3 49.1z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M275.2 38.4c-10.6-8-25-8.5-36.3-1.5S222 57.3 224.6 70.3l9.7 48.6c-19.4 9-36.9 19.9-52.4 31.5c-15.3 11.5-29 23.9-40.7 36.3L48.1 132.4c-12.5-7.3-28.4-5.3-38.7 4.9S-3 163.3 4.2 175.9L50 256 4.2 336.1c-7.2 12.6-5 28.4 5.3 38.6s26.1 12.2 38.7 4.9l93.1-54.3c11.8 12.3 25.4 24.8 40.7 36.3c15.5 11.6 33 22.5 52.4 31.5l-9.7 48.6c-2.6 13 3.1 26.3 14.3 33.3s25.6 6.5 36.3-1.5l77.6-58.2c54.9-4 101.5-27 137.2-53.8c39.2-29.4 67.2-64.7 81.6-89.5c5.8-9.9 5.8-22.2 0-32.1c-14.4-24.8-42.5-60.1-81.6-89.5c-35.8-26.8-82.3-49.8-137.2-53.8L275.2 38.4zM448 256c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M320 128V49.1L186.6 .3c-11.4-4.2-24 .9-29.5 11.7L71.8 181.1c-30.8 61-8 133.8 48.1 167.4l-28 77.4L32.1 403.9C19.7 399.4 6 405.8 1.4 418.3s1.9 26.3 14.3 30.8l164.6 60.3c12.4 4.5 26.1-1.9 30.6-14.4s-1.9-26.3-14.3-30.8l-59.9-21.9 28-77.3c68.1 11.6 135.7-32.8 150.1-103.6l5.1-24.8 5.1 24.8c14.5 70.8 82 115.2 150.1 103.6l28 77.3-59.9 21.9c-12.4 4.5-18.8 18.3-14.3 30.8s18.2 18.9 30.6 14.4l164.6-60.3c12.4-4.5 18.8-18.3 14.3-30.8s-18.2-18.9-30.6-14.4l-59.9 21.9-28-77.4c56.1-33.6 78.8-106.4 48.1-167.4L482.9 12C477.4 1.1 464.7-3.9 453.4 .3L320 49.1V128h0zm-35.7 44.4L153.9 124.6l36.3-71.9L300.6 93.1l-16.2 79.3zm71.3 0L339.4 93.1 449.8 52.7l36.3 71.9L355.7 172.4z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M86.6 64C119 35.5 158.6 15 202.3 5.6C206 19.1 208 33.3 208 48c0 38.4-13.5 73.7-36.1 101.3L86.6 64zM64 86.6l85.2 85.2C121.7 194.5 86.4 208 48 208c-14.7 0-28.9-2-42.4-5.7C15 158.6 35.5 119 64 86.6zM256 0c64.9 0 124.2 24.2 169.4 64L256 233.4 194.6 172C222.9 138.5 240 95.3 240 48c0-16.2-2-32-5.8-47.1C241.4 .3 248.7 0 256 0zM48 240c47.3 0 90.5-17.1 124-45.4L233.4 256 64 425.4C24.2 380.2 0 320.9 0 256c0-7.3 .3-14.6 .9-21.8C16 238 31.8 240 48 240zm463.1 37.8C496 274 480.2 272 464 272c-47.3 0-90.5 17.1-124 45.4L278.6 256 448 86.6c39.8 45.1 64 104.4 64 169.4c0 7.3-.3 14.6-.9 21.8zm-4.7 31.9C497 353.4 476.5 393 448 425.4l-85.2-85.2C390.3 317.5 425.6 304 464 304c14.7 0 28.9 2 42.4 5.7zM340.1 362.7L425.4 448C393 476.5 353.4 497 309.7 506.4C306 492.9 304 478.7 304 464c0-38.4 13.5-73.7 36.1-101.3zM317.4 340C289.1 373.5 272 416.7 272 464c0 16.2 2 32 5.8 47.1c-7.2 .6-14.5 .9-21.8 .9c-64.9 0-124.2-24.2-169.4-64L256 278.6 317.4 340z"/></svg>`,
// 	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#999"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 96C0 43 43 0 96 0h96V190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5V0h32 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32z"/></svg>`,
// ];

const fn = {
	resetindex: () => {
		textindex = 0;
		shorttextindex = 0;
		iconindex = 0;
	},
	img: (width = 300, height = 283) => {
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
	icon: () => {
		if (iconindex >= dbicon.length) {
			iconindex = 0;
		}
		return dbicon[iconindex++];
	},
	// svgicon: () => {
	// 	if (svgiconindex >= dbsvgicon.length) {
	// 		svgiconindex = 0;
	// 	}
	// 	return dbsvgicon[svgiconindex++];
	// },
	tagprop: (exclude) => {
		let tprop = [
			"id",
			"name",
			"class",
			"style",
			"attr",
			"href",
			"onclick",
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
			"textbg",
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
