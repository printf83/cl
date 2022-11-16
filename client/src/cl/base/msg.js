"use strict";import*as core from"./core.js";import icon from"./icon.js";import div from"./div.js";import h from"./h.js";const defaultOption={icon:null,weight:"md",elem:null};export default class msg extends div{constructor(...e){super(...e)}get data(){return super.data}set data(e){if(e){switch((e=core.extend({},defaultOption,e)).weight){case"sm":case"md":e.display="flex",e.alignItem="stretch",e.gap=2,e.elem=[e.icon?new div({display:"flex",alignItem:"start",marginEnd:2,elem:new div({class:"sm"===e.weight?"fs-5":"display-4",elem:new icon(e.icon)})}):null,new div({display:"flex",alignItem:"center",elem:new div({class:"text-break",elem:e.elem})})];break;case"lg":e.icon&&"object"==typeof e.icon&&(e.icon.weight="2x"),e.elem=[e.icon?new h({level:1,class:"display-1",textAlign:"center",marginX:3,elem:new icon(e.icon)}):null,new div({textAlign:"center",elem:new div({class:"text-break",elem:e.elem})})];break;default:console.error("Unsupported weight",e.weight)}delete e.weight,delete e.icon,super.data=e}}}