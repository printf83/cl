"use strict";import*as core from"./core.js";import tag from"./tag.js";const defaultOption={tag:"abbr"};export default class abbr extends tag{constructor(...t){super(...t)}get data(){return super.data}set data(t){super.data=core.extend({},defaultOption,t)}}