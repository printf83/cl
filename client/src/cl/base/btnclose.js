"use strict";import css from"./css/btnclose.css";import*as core from"./core.js";import button from"./button.js";const defaultOption={label:"Close",dismiss:null,dark:!0,disabled:!1};export default class btnclose extends button{constructor(e){super(core.extend({},defaultOption,e))}get data(){return super.data}set data(e){e&&(e=core.extend({},defaultOption,e),delete(e=core.merge(e,{class:["btn-close",e.dark?null:"btn-close-white"],"data-bs-dismiss":e.dismiss,"aria-label":e.label})).dismiss,delete e.label,delete e.dark,super.data=e)}}