const defaultDimensions = {
  x: 'x',
  y: 'y',
  z: 'z',
}

const computeDimension = function(obj, name) {
  return (typeof obj.dimensionFns[name] === 'string') ?
    obj.meta.payload[obj.dimensionFns[name]] :
    obj.dimensionFns[name](obj.meta.payload);
} 

class Point {

  constructor(payload, dimensions,
    { merge=true, formatters={}, id=null, dummy=false } = {}
  ) {
    this.computedDimensions = { };
    this.prepareDimensions(dimensions, merge);
    this.meta = { id, payload, dummy };
    this.formatters = formatters;
  }

  get id() {
    return this.meta.id;
  }

  get dummy() {
    return this.meta.dummy;
  }

  get payload() {
    return Object.assign({}, this.meta.payload);
  }

  prepareDimensions(dimensions, merge) {
    this.dimensionFns = merge ? 
      Object.assign({}, defaultDimensions, dimensions) :
      dimensions;
    Object.keys(this.dimensionFns).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          if (!(key in this.dimensionFns)) {
            throw new Error(`No getter for ${key}.`);
          }
          if (typeof this.computedDimensions[key] === 'undefined') {
            this.computedDimensions[key] = computeDimension(this, key);
          }
          return this.computedDimensions[key];
        },
      });
    });
  }
}

export default Point;
