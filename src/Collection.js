class Collection {

  constructor(attributes) {
    return Object.freeze(Object.assign(this, attributes))
  }

  copyWith(newAttributes) {
    return new this.constructor(Object.assign({}, this, newAttributes));
  }

  get size() {
    return this.data.size;
  }

  first() {
    return this.data.first();
  }

  last() {
    return this.data.last();
  }

  fromSelection() {
    return this.copyWith({data: this.selected});
  }

}

export default Collection;
