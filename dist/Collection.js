"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Collection=function(){function Collection(attributes){_classCallCheck(this,Collection);return Object.freeze(Object.assign(this,attributes));}_createClass(Collection,[{key:"copyWith",value:function copyWith(newAttributes){return new this.constructor(Object.assign({},this,newAttributes));}},{key:"first",value:function first(){return this.data.first();}},{key:"last",value:function last(){return this.data.last();}},{key:"fromSelection",value:function fromSelection(){return this.copyWith({data:this.selected});}},{key:"size",get:function get(){return this.data.size;}},{key:"map",get:function get(){return this.data.map;}}]);return Collection;}();exports.default=Collection;