"use strict";
import * as sample from "./sample.js";
import carousel from "../base/carousel.js";

export default [
	{
		title: "Carousel",
		msg: "A slideshow component for cycling through elements—images or slides of text—like a carousel.",
		anchor: false,
	},

	{
		title: "Slide only",
		sample: { "sample.img": sample.img },
		code: function () {
			return new carousel({
				item: [sample.img(), sample.img(), sample.img(), sample.img(), sample.img(), sample.img()],
			});
		},
	},

	{
		title: "With control",
		sample: { "sample.img": sample.img },
		code: function () {
			return new carousel({
				control: true,
				item: [sample.img(), sample.img(), sample.img(), sample.img(), sample.img(), sample.img()],
			});
		},
	},

	{
		title: "With indicator",
		sample: { "sample.img": sample.img },
		code: function () {
			return new carousel({
				control: true,
				indicators: true,
				item: [sample.img(), sample.img(), sample.img(), sample.img(), sample.img(), sample.img()],
			});
		},
	},

	{
		title: "With caption",
		sample: { "sample.img": sample.img },
		code: function () {
			return new carousel({
				control: true,
				indicators: true,
				item: [
					{
						caption: "Title #1",
						text: "This is text for image no #1",
						src: sample.img(),
					},
					{
						caption: "Title #2",
						text: "This is text for image no #2",
						src: sample.img(),
					},
					{
						caption: "Title #3",
						text: "This is text for image no #3",
						src: sample.img(),
					},
					{
						caption: "Title #4",
						text: "This is text for image no #4",
						src: sample.img(),
					},
					{
						caption: "Title #5",
						text: "This is text for image no #5",
						src: sample.img(),
					},
					{
						caption: "Title #6",
						text: "This is text for image no #6",
						src: sample.img(),
					},
				],
			});
		},
	},

	{
		title: "Crossfade",
		sample: { "sample.img": sample.img },
		code: function () {
			return new carousel({
				control: true,
				fade: true,
				item: [sample.img(), sample.img(), sample.img(), sample.img(), sample.img(), sample.img()],
			});
		},
	},

	{
		title: "Individual interval",
		sample: { "sample.img": sample.img },
		code: function () {
			return new carousel({
				control: true,
				indicators: true,
				item: [
					{ interval: 10000, src: sample.img() },
					{ interval: 2000, src: sample.img() },
					{ interval: 5000, src: sample.img() },
					{ interval: 1000, src: sample.img() },
					{ interval: 3000, src: sample.img() },
					{ interval: 7500, src: sample.img() },
				],
			});
		},
	},

	{
		title: "Disable touch swiping",
		sample: { "sample.img": sample.img },
		code: function () {
			return new carousel({
				control: true,
				touch: false,
				item: [sample.img(), sample.img(), sample.img(), sample.img(), sample.img(), sample.img()],
			});
		},
	},

	{
		title: "Dark variant",
		sample: { "sample.img": sample.img },
		code: function () {
			return new carousel({
				control: true,
				indicators: true,
				dark: true,
				item: [
					{
						caption: "Title #1",
						text: "This is text for image no #1",
						src: sample.img(),
					},
					{
						caption: "Title #2",
						text: "This is text for image no #2",
						src: sample.img(),
					},
					{
						caption: "Title #3",
						text: "This is text for image no #3",
						src: sample.img(),
					},
					{
						caption: "Title #4",
						text: "This is text for image no #4",
						src: sample.img(),
					},
					{
						caption: "Title #5",
						text: "This is text for image no #5",
						src: sample.img(),
					},
					{
						caption: "Title #6",
						text: "This is text for image no #6",
						src: sample.img(),
					},
				],
			});
		},
	},
];
