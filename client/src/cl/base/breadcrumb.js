"use strict";import*as core from"./core.js";import nav from"./nav.js";import button from"./button.js";import ol from"./ol.js";import li from"./li.js";import label from"./label.js";import a from"./a.js";const defaultOption={label:"Breadcrumb",divider:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E\")",item:null},defaultItemOption={label:null,showlabel:null,hidelabel:null,iconafter:null,icon:null,current:!1};export default class breadcrumb extends nav{constructor(...e){super(...e)}get data(){return super.data}set data(e){if(e){(e=core.extend({},defaultOption,e)).item=e.item?Array.isArray(e.item)?e.item:[e.item]:null,e.item.find((e=>!0===e.current))||"object"!=typeof e.item[e.item.length-1]||(e.item[e.item.length-1].current=!0),delete(e=core.merge(e,{"aria-label":e.label,style:{"--bs-breadcrumb-divider":e.divider?e.divider:null},elem:e.item?new ol({margin:0,class:["breadcrumb"],elem:e.item.map((e=>{let l=(e=core.extend({},defaultItemOption,e)).current;delete e.current;let t=null;if(e.elem)t=e.elem;else if(l)t=new label(e);else if(e.href){let l=e.href;delete e.href,t=new a({href:l,elem:new label(e)})}else t=e.click?new button(e):new label(e);return new li({class:["breadcrumb-item",l?"active":null],"aria-current":l?"page":null,elem:t})}))}):null})).label,delete e.divider,delete e.item,super.data=e}}}