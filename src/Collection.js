//@flow
import { OrderedMap, Map } from 'immutable';


class Collection {
  _data: OrderedMap<number, *>;
  _attributes: OrderedMap<string, *>;
  options: Map<*>;

  constructor(attributes:OrderedMap<string, *>, data:OrderedMap<number, *>, ...options:any) {
    this._data = data;
    this._attributes = attributes;
    this.options = options;
    this._domain = []
    return Object.freeze(this);
  }

  copyWith(newParams:Object) {
    const newObj = Object.assign({}, this, newParams)
    return new this.constructor(newObj._attributes, newObj._data, ...newObj.options);
  }

  get size():number {
    return this.data.size;
  }

  get data():OrderedMap<number, *> {
    return this._data;
  }

  get attributes():OrderedMap<string, *> {
    return this._attributes;
  }

  map(fn:Function):any {
    return this.data.map(fn);
  }

  [Symbol.iterator]() {
    let index = -1;
    return {
      next: () => ({ value: this.data.get(++index), done: !this.data.has(index) })
    };
  };

  equals(that:any) {
    return (this.attributes.equals(that.attributes)) &&
      (this.data.equals(that.data));
  }

  toArray() {
    return this.data.toArray();
  }
    
}

export default Collection;
