"use strict";
import tag from "../base/tag.js";
import * as alert from "../base/alert.js";

export default [
	{
		title: "Interactions",
		msg: "Utility classes that change how users interact with contents of a website.",
		anchor: false,
	},

	{
		title: "Text selection",
		msg: ["Change the way in which the content is selected when the user interacts with it."],
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "p",
					elem: `This paragraph will be entirely selected when clicked by the user.`,

					//marker
					userselect: "all",
				}),
				new tag({
					tag: "p",
					elem: `This paragraph has default select behavior. Default is none`,

					//marker
					userselect: "auto",
				}),
				new tag({
					tag: "p",
					elem: `This paragraph will not be selectable when clicked by the user.`,

					//marker
					userselect: "none",
				}),
			];
		},
	},

	{
		title: "Pointer events",
		msg: [
			"Bootstrap provides {{pointerevent:none}} and {{pointerevent:auto}} property to prevent or add element interactions.",
		],
		import: ["tag"],
		code: () => {
			return [
				new tag({
					tag: "p",
					elem: [
						new tag({
							tag: "a",
							href: "#",
							attr: { tabindex: "-1", "aria-disabled": "true" },
							elem: "This link",

							//marker
							pointerevent: "none",
						}),

						" can not be clicked.",
					],
				}),
				new tag({
					tag: "p",
					elem: [
						new tag({
							tag: "a",
							href: "#",
							elem: "This link",
						}),
						" can be clicked (this is default behavior).",
					],
				}),
				new tag({
					tag: "p",
					pointerevent: "none",
					elem: [
						new tag({
							tag: "a",
							href: "#",
							attr: { tabindex: "-1", "aria-disabled": "true" },
							elem: "This link",

							//marker
							pointerevent: "none",
						}),
						" can not be clicked because the <code>pointerevent</code> property is inherited from its parent. However, ",
						new tag({
							tag: "a",
							href: "#",
							elem: "this link",

							//marker
							pointerevent: "auto",
						}),
						,
						" has a <code>pointerevent:auto</code> property and can be clicked.",
					],
				}),
			];
		},
	},

	{
		msg: new alert.container({
			color: "warning",
			elem: "The <code>pointerevent:none</code> property (and the pointer-events CSS property it sets) only prevents interactions with a pointer (mouse, stylus, touch). Links and controls with <code>pointerevent:none</code> are, by default, still focusable and actionable for keyboard users. To ensure that they are completely neutralized even for keyboard users, you may need to add further attributes such as <code>tabindex:-1</code> (to prevent them from receiving keyboard focus) and <code>aria-disabled:true</code> (to convey the fact they are effectively disabled to assistive technologies), and possibly use JavaScript to completely prevent them from being actionable. For form controls, consider using the <code>disabled</code> HTML attribute instead.",
		}),
	},
];
