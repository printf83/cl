"use strict";import*as core from"./core.js";import tag from"./tag.js";const defaultOption={tag:"img",src:null,alt:"Image",fluid:!1,thumbnail:!1,caption:null,captionalign:null};export default class img extends tag{constructor(...t){super(),this.data=core.args([{rule:["string|string[]","string|string[]"],fn:()=>({class:t[0],src:t[1]})},{rule:["string|string[]"],fn:()=>({src:t[0]})},{rule:["object"],fn:()=>t[0]}],"img",t)}get data(){return super.data}set data(t){if(t){t=core.extend({},defaultOption,t),delete(t=core.merge(t,{class:[t.fluid?"img-fluid":null,t.thumbnail?"img-thumbnail":null]})).fluid,delete t.thumbnail;let e=null;t.caption&&(e={tag:"figure",class:"figure",elem:[new tag(t),new tag({tag:"figcaption",class:"figure-caption",align:t.captionalign,elem:t.caption})]},delete t.captionalign,delete t.caption),super.data=e||t}}}