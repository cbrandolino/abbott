'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _immutable=require('immutable');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var defaultDimensions={x:'x',y:'y',z:'z'};var computeDimension=function computeDimension(obj,name){var dimension=obj.dimensionFns.get(name);return typeof dimension==='string'?obj.payload.get(dimension):dimension(obj.payload);};var Point=function(){function Point(payload,dimensions){var _ref=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var _ref$merge=_ref.merge;var merge=_ref$merge===undefined?true:_ref$merge;var _ref$formatters=_ref.formatters;var formatters=_ref$formatters===undefined?{}:_ref$formatters;var _ref$id=_ref.id;var id=_ref$id===undefined?null:_ref$id;var _ref$dummy=_ref.dummy;var dummy=_ref$dummy===undefined?false:_ref$dummy;_classCallCheck(this,Point);this._payload=(0,_immutable.Map)(payload);this._computedDimensions={};this.prepareDimensions(dimensions,merge);this.meta={id:id,payloadHash:(0,_immutable.Map)(payload).hashCode(),dummy:dummy};this.formatters=formatters;}_createClass(Point,[{key:'equals',value:function equals(that){return this.meta.payloadHash===that.meta.payloadHash&&this.dimensionFns.equals(that.dimensionFns);}},{key:'prepareDimensions',value:function prepareDimensions(dimensions,merge){var _this=this;this.dimensionFns=(0,_immutable.Map)(merge?Object.assign({},defaultDimensions,dimensions):dimensions);this.dimensionFns.keySeq().forEach(function(key){Object.defineProperty(_this,key,{get:function get(){if(!_this.dimensionFns.has(key)){throw new Error('No getter for '+key+'.');}if(typeof _this._computedDimensions[key]==='undefined'){_this._computedDimensions[key]=computeDimension(_this,key);}return _this._computedDimensions[key];}});});}},{key:'id',get:function get(){return this.meta.id;}},{key:'dummy',get:function get(){return this.meta.dummy;}},{key:'payload',get:function get(){return(0,_immutable.Map)(this._payload);},set:function set(data){throw new Error('Attempt to modify payload. Input: '+data);}}]);return Point;}();exports.default=Point;