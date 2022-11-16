"use strict";import*as core from"./core.js";import tag from"./tag.js";import label from"./label.js";const defaultOption={tag:"button",type:"button",label:null,showlabel:null,hidelabel:!1,iconafter:!1,icon:null,weight:null,outline:!1,color:null,toggle:!1};export default class button extends tag{constructor(...e){super(...e)}get data(){return super.data}set data(e){if(e){e=core.extend({},defaultOption,e);let l=core.getBaseIcon(e.icon);l&&(e.icon={icon:l.icon,type:l.type},e.color=e.color||l.color),(e.placeholder||e.disabled)&&(e.disabled=e.disabled||!0),"checkbox"!==e.type&&"radio"!==e.type||(e.outline=e.outline||!0),"transparent"===e.color&&(e.border=e.border||!1,e.shadow=e.shadow||!1,e.textBgColor=e.textBgColor||e.color),e.href?(e.tag="a",e.role="button",e.textDecoration=e.textDecoration||"none"):e.color||e.outline||e.weight?e.tag="button":(e.tag="div",e.role="button"),e.toggle&&(e["data-bs-toggle"]=e["data-bs-toggle"]?e["data-bs-toggle"]:"button"),(e.href||"checkbox"===e.type||"radio"===e.type)&&(e.type=e.type||null);let t=null;"checkbox"===(e=core.merge(e,{class:[e.color||e.outline||e.weight?"btn":null,e.weight?`btn-${e.weight}`:null,e.color?e.outline?`btn-outline-${e.color}`:`btn-${e.color}`:null,e.toggle&&e.active?"active":null,e.floating?"btn-floating":null],autocomplete:e.toggle?"off":null,"aria-pressed":e.toggle&&e.active?"true":null,"aria-label":e.hidelabel&&e.label?e.label:null})).type||"radio"===e.type?(e.id=e.id||core.UUID(),t=new label({badge:e.badge,tooltip:e.tooltip,popover:e.popover,for:e.id,class:e.class,elem:[e.label||e.icon?new label({showlabel:e.showlabel,hidelabel:e.hidelabel,iconafter:e.iconafter,label:e.label,icon:e.icon}):null]}),e.tag="input",e.class="btn-check",e.autocomplete=e.autocomplete||"off",delete e.badge,delete e.tooltip,delete e.popover):e.elem||(e.elem=[e.label||e.icon?new label({showlabel:e.showlabel,hidelabel:e.hidelabel,iconafter:e.iconafter,label:e.label,icon:e.icon}):null]),delete e.label,delete e.showlabel,delete e.hidelabel,delete e.iconafter,delete e.icon,delete e.weight,delete e.outline,delete e.color,delete e.toggle,super.data=t?{elem:[new tag(e),t]}:e}}}