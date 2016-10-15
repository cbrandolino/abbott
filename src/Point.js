const defaultDimensions = {
  x: (it) => it,
  y: (it) => it,
  z: (it) => it,
}

class Point {

  constructor(
    id, payload, dimensions, 
    { merge=true, formatters={} } = {}
  ) {
    this.prepareDimensions(dimensions, merge);
    this.meta = { 
      id,
      payload,
      formatters,
      dimensions: Object.keys(this.dimensions),
    };
  }

  get id() {
    return this.meta.id;
  }

  get payload() {
    return Object.assign({}, this.meta.payload);
  }

  get dimensionKeys() {
    return this.meta.dimensions.slice();
  }

  prepareDimensions(dimensions, merge) {
    this.dimensions = merge ? 
      Object.assign(defaultDimensions, dimensions) :
      dimensions;
  }
}

export default Point;
