"use strict";
import * as sample from "./sample.js";
import $ from "../component.js";

export default [
	{
		title: "Offcanvas",
		msg: "Build hidden sidebars into your project for navigation, shopping carts, and more with a few classes and our JavaScript plugin.",
		anchor: false,
	},

	{
		title: "Offcanvas",
		sample: { "sample.offcanvasbody": sample.offcanvasbody },
		code: function () {
			return new $.button({
				label: "Show offcanvas",
				color: "primary",
				onclick: function () {
					new $.offcanvas({
						close: true,
						backdrop: true,
						color: "light",
						title: "Offcanvas",
						elem: sample.offcanvasbody(),
					}).show();
				},
			});
		},
	},

	{
		title: "Placement",
	},

	{
		title: "Top",
		sample: { "sample.offcanvasbody": sample.offcanvasbody },
		code: function () {
			return new $.button({
				label: "Show top offcanvas",
				color: "primary",
				onclick: function () {
					new $.offcanvas({
						close: true,
						backdrop: true,
						placement: "top",
						color: "light",
						title: "Top Offcanvas",
						elem: sample.offcanvasbody(),
					}).show();
				},
			});
		},
	},

	{
		title: "Bottom",
		label: "Show bottom offcanvas",
		sample: { "sample.offcanvasbody": sample.offcanvasbody },
		code: function () {
			return new $.button({
				label: "Show bottom offcanvas",
				color: "primary",
				onclick: function () {
					new $.offcanvas({
						close: true,
						backdrop: true,
						placement: "bottom",
						color: "light",
						title: "Bottom Offcanvas",
						elem: sample.offcanvasbody(),
					}).show();
				},
			});
		},
	},

	{
		title: "End",
		label: "Show end offcanvas",
		sample: { "sample.offcanvasbody": sample.offcanvasbody },
		code: function () {
			return new $.button({
				label: "Show end offcanvas",
				color: "primary",
				onclick: function () {
					new $.offcanvas({
						close: true,
						backdrop: true,
						placement: "end",
						color: "light",
						title: "End Offcanvas",
						elem: sample.offcanvasbody(),
					}).show();
				},
			});
		},
	},

	{
		title: "Backdrop",
		container: $.container.stack,
		sample: { "sample.offcanvasbody": sample.offcanvasbody },
		code: function () {
			return [
				new $.button({
					label: "Enable body scrolling",
					color: "primary",
					onclick: function () {
						new $.offcanvas({
							close: true,
							scroll: true,
							backdrop: false,
							color: "light",
							title: "Offcanvas",
							elem: sample.offcanvasbody(),
						}).show();
					},
				}),

				new $.button({
					label: "Enable backdrop",
					color: "primary",
					onclick: function () {
						new $.offcanvas({
							close: true,
							scroll: false,
							backdrop: true,
							color: "light",
							title: "Offcanvas",
							elem: sample.offcanvasbody(),
						}).show();
					},
				}),

				new $.button({
					label: "Enable both scrolling & backdrop",
					color: "primary",
					onclick: function () {
						new $.offcanvas({
							close: true,
							backdrop: true,
							scroll: true,
							color: "light",
							title: "Offcanvas",
							elem: sample.offcanvasbody(),
						}).show();
					},
				}),
			];
		},
	},
];
