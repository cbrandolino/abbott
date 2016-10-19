'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _immutable=require('immutable');var _Point=require('./Point');var _Point2=_interopRequireDefault(_Point);var _Collection2=require('./Collection');var _Collection3=_interopRequireDefault(_Collection2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Meta=(0,_immutable.Record)({bandDimension:"x",payloads:[],dimensions:{},pointOptions:{}});var Chunk=(0,_immutable.Record)({start:null,end:null});var dataFromPoints=function dataFromPoints(points,bandDimension){var bandPoints=points.map(function(p){return[p[bandDimension],p];});return new _immutable.OrderedMap(bandPoints).sortBy(function(it){return it[bandDimension];});};var dataFromPayloads=function dataFromPayloads(payloads,_ref){var dimensions=_ref.dimensions;var pointOptions=_ref.pointOptions;var bandDimension=_ref.bandDimension;var points=payloads.map(function(p){return new _Point2.default(p,dimensions,pointOptions);});return dataFromPoints(points,bandDimension);};var Series=function(_Collection){_inherits(Series,_Collection);_createClass(Series,null,[{key:'fromPayloads',value:function fromPayloads(_ref2,settings){var payloads=_ref2.payloads;var _ref2$dimensions=_ref2.dimensions;var dimensions=_ref2$dimensions===undefined?{}:_ref2$dimensions;var _ref2$pointOptions=_ref2.pointOptions;var pointOptions=_ref2$pointOptions===undefined?{}:_ref2$pointOptions;var meta=new Meta({dimensions:dimensions,pointOptions:pointOptions}).merge(settings);return new Series({meta:meta,data:dataFromPayloads(payloads,meta),selection:new Chunk()});}}]);function Series(_ref3){var meta=_ref3.meta;var data=_ref3.data;var selection=_ref3.selection;var pointers=_ref3.pointers;_classCallCheck(this,Series);return _possibleConstructorReturn(this,(Series.__proto__||Object.getPrototypeOf(Series)).call(this,{meta:meta,data:data,selection:selection,pointers:pointers}));}// TODO: SLICE RIGHT
_createClass(Series,[{key:'at',value:function at(band){var onlySelection=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var source=onlySelection?this.selected:this.data;return source.get(band,new _Point2.default());}},{key:'select',value:function select(start,end){return this.copyWith({selection:new Chunk({start:start,end:end})});}},{key:'load',value:function load(payload){var data=this.data.merge(dataFromPayloads(payload,this.meta));return this.copyWith({data:data});}},{key:'selected',get:function get(){var start=this.selection.start===null?0:this.selection.start;var end=this.selection.end===null?this.size:this.selection.end;return new _immutable.OrderedMap(this.data.entrySeq().slice(start,end));}}]);return Series;}(_Collection3.default);exports.default=Series;