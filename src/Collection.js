
class Collection {

  constructor(attributes, data, ...options) {
    this._data = data;
    this._attributes = attributes;
    this.options = options;
    return Object.freeze(this);
  }

  copyWith(newObject) {
    const { attributes, data, options } = Object.assign({}, this, newObject)
    return new this.constructor(attributes, data, ...options);
  }

  get size() {
    return this.data.size;
  }

  get data() {
    return this._data;
  }

  get attributes() {
    return this._attributes;
  }

  get(x) {
    return this._data.get(x);
  }

  [Symbol.iterator]() {
    let index = -1;
    return {
      next: () => ({ value: this.data.get(++index), done: !this.data.has(index) })
    };
  };

  equals(that) {
    return (this.attributes.equals(that.attributes)) &&
      (this.data.equals(that.data));
  }

  fromSelection() {
    return this.copyWith({data: this.selected});
  }

  toArray() {
    return this.data.toArray();
  }
    
}


export default Collection;
