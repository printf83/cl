"use strict";
import cont from "./cont.js";

/**
 * class,style,elem
 * class,elem
 * [elem]
 * opt : {attr,class,style,id,name,onclick,elem}
 */
export default class a extends cont {
	constructor(...arg) {
		super("a", ...arg);
	}

	get data() {
		return super.data;
	}
	set data(arg) {
		super.data = arg;
	}
}
// "use strict";
// import * as core from "./core.js";
// import button from "./button.js";

// /**
//  * label, href
//  * label, onclick
//  * class, label, href
//  * class, label, onclick
//  * option : {attr,id,name,class,style,type,label,icon,badge,value,checked,color,textcolor,weight,disabled,outline,hidelabel,nowarp,onclick,href}
//  */
// export default class a extends button {
// 	constructor(...arg) {
// 		super();
// 		if (arg && arg.length > 0) {
// 			let t = {
// 				label: null,
// 				class: null,
// 				href: null,
// 				onclick: null,
// 			};
// 			if (arg && arg.length === 3) {
// 				if (arg[2] instanceof Function) {
// 					t.class = arg[0];
// 					t.label = arg[1];
// 					t.onclick = arg[2];
// 				} else {
// 					t.class = arg[0];
// 					t.label = arg[1];
// 					t.href = arg[2];
// 				}
// 			} else if (arg && arg.length === 2) {
// 				if (arg[1] instanceof Function) {
// 					t.label = arg[0];
// 					t.onclick = arg[1];
// 				} else {
// 					t.label = arg[0];
// 					t.href = arg[1];
// 				}
// 			} else {
// 				t = arg[0];
// 			}

// 			this.data = core.extend(
// 				{},
// 				{
// 					attr: null,

// 					id: null,
// 					name: null,
// 					class: null,
// 					style: null,

// 					type: "button",
// 					label: null,
// 					icon: null,
// 					badge: null,
// 					value: null,
// 					checked: false,

// 					color: null,
// 					textcolor: null,
// 					weight: null,
// 					disabled: false,
// 					outline: false,
// 					hidelabel: false,
// 					nowarp: false,

// 					onclick: null,
// 					href: null,
// 				},
// 				t
// 			);
// 		} else {
// 			this.data = null;
// 		}
// 	}

// 	get data() {
// 		return super.data;
// 	}
// 	set data(arg) {
// 		super.data = arg;
// 	}
// }
