"use strict";import*as core from"./core.js";import tag from"./tag.js";const defaultOption={tag:"hr"};export default class hr extends tag{constructor(t){super(core.extend({},defaultOption,t))}get data(){return super.data}set data(t){delete(t=core.extend({},defaultOption,t)).elem,super.data=t}}