import { Map } from 'immutable';

const defaultDimensions = {
  x: 'x',
  y: 'y',
  z: 'z',
}

const computeDimension = function(obj, name) {
  const dimension = obj.dimensionFns.get(name);
  return (typeof dimension === 'string') ?
    obj.payload.get(dimension) :
    dimension(obj.payload);
}

class Point {

  constructor(payload, dimensions,
    { merge=true, formatters={}, id=null, dummy=false } = {}
  ) {
    this._payload = Map(payload);
    this._computedDimensions = { };
    this.prepareDimensions(dimensions, merge);
    this.meta = { id, payloadHash: Map(payload).hashCode(), dummy };
    this.formatters = formatters;
  }

  get id() {
    return this.meta.id;
  }

  get dummy() {
    return this.meta.dummy;
  }

  get payload() {
    return Map(this._payload);
  }

  set payload(data) {
    throw new Error(`Attempt to modify payload. Input: ${data}`);
  }

  equals(that) {
    return this.meta.payloadHash === that.meta.payloadHash &&
      this.dimensionFns.equals(that.dimensionFns);
  }

  prepareDimensions(dimensions, merge) {
    this.dimensionFns = Map(merge ? 
      Object.assign({}, defaultDimensions, dimensions) :
      dimensions);
    this.dimensionFns.keySeq().forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          if (!this.dimensionFns.has(key)) {
            throw new Error(`No getter for ${key}.`);
          }
          if (typeof this._computedDimensions[key] === 'undefined') {
            this._computedDimensions[key] = computeDimension(this, key);
          }
          return this._computedDimensions[key];
        },
      });
    });
  }
}

export default Point;
