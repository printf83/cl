"use strict";
import sample from "./sample.js";
import pill from "../base/pill.js";

export default [
	{
		title: "Pill",
		anchor: false,
	},
	{
		title: "Example",
		container: sample.stackcontainer,
		viewclass: "cl-transparent-preview",
		import: ["pill"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "dark", "transparent"].map((i) => {
				return new pill({
					color: i,

					//marker
					label: "Label",
					title: "Title",
				});
			});
		},
	},

	{
		title: "Icon",
		container: sample.stackcontainer,
		viewclass: "cl-transparent-preview",
		import: ["pill", "sample"],
		code: () => {
			return ["primary", "secondary", "success", "danger", "warning", "info", "dark", "transparent"].map((i) => {
				let t = sample.icon();
				return new pill({
					label: t,
					color: i,

					//marker
					icon: t,
				});
			});
		},
	},
	{
		title: "Base icon",
		container: sample.stackcontainer,
		import: ["pill"],
		code: () => {
			return ["i", "!", "/", "x", "-", "!!"].map((i) => {
				return new pill({
					label: `Icon : ${i}`,

					//marker
					icon: i,
				});
			});
		},
	},

	{
		title: "Weight",
		container: sample.stackcontainer,
		import: ["pill", "sample"],
		code: () => {
			return [
				{
					weight: "lg",
					color: "primary",
				},
				{
					weight: "md",
					color: "success",
				},
				{
					weight: "sm",
					color: "danger",
				},
			].map((i) => {
				return new pill({
					label: `Weight : ${i.weight}`,
					color: i.color,
					icon: sample.icon(),

					//marker
					weight: i.weight,
				});
			});
		},
	},

	{
		title: "Icon with title",
		container: sample.stackcontainer,
		import: ["pill", "sample"],
		code: () => {
			return [
				{ icon: "i", title: "Info" },
				{ icon: "!", title: "Warning" },
				{ icon: "/", title: "Success" },
				{ icon: "x", title: "Critical" },
				{
					icon: { icon: sample.icon(), shake: true },
					title: "Shake icon",
					color: "info",
				},
				{
					icon: { icon: sample.icon(), spin: true },
					title: "Spin icon",
					color: "warning",
				},
			].map((i, ix) => {
				return new pill({
					label: `Sample ${ix + 1}`,
					color: i.color,

					//marker
					icon: i.icon,
					title: i.title,
					//-
				});
			});
		},
	},
];
