"use strict";import*as core from"./core.js";import li from"./li.js";import tag from"./tag.js";const defaultOption={tag:"ul",item:null};export default class ul extends tag{constructor(...t){super(...t)}get data(){return super.data}set data(t){(t=core.extend({},defaultOption,t)).item&&!t.elem&&(t.item=Array.isArray(t.item)?t.item:[t.item],t.elem=t.item.map((t=>new li(t)))),delete t.item,super.data=t}}