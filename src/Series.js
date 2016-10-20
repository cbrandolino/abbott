import { OrderedMap, Map, OrderedSet } from 'immutable';
import Point from './Point';
import Collection from './Collection'

class Series extends Collection {

  static fromPayload(payload, attributes, dimensions, pointOptions={}) {
    return new Series({
      attributes: new Map(attributes),
      data: this.dataFrompayload(payload, dimensions, pointOptions),
      dimensions: new Map(dimensions),
      pointOptions: new Map(pointOptions),
    });
  }

  static dataFromPoints(points) {
    const bandPoints = points.map(p => (
      [ p.x, p ]));
    return new OrderedMap(bandPoints).sortBy(it => it.x);
  }

  static dataFrompayload(payload, dimensions, pointOptions) {
    const points = this.pointsFrompayload(payload, dimensions, pointOptions)
    return this.dataFromPoints(points);
  }

  static pointsFrompayload(payload, dimensions, pointOptions) {
    return payload.map(p =>
      new Point(p, dimensions, pointOptions))
  }

  constructor({ data, attributes, dimensions, pointOptions }){
    const sortedData = data.sortBy((v, k) => k);
    super({ data: sortedData, attributes, dimensions, pointOptions });
  }

  // TODO: SLICE RIGHT
  get selected() {
    const start = this.selection.start === null ? 0 : this.selection.start;
    const end = this.selection.end === null ? this.size : this.selection.end;
    return new OrderedMap(this.data.entrySeq().slice(start, end));
  }

  get bands() {
    return OrderedSet.fromKeys(this.data);
  }

  get segments() {

  }

  addBands(bands) {
    const difference = bands.subtract(this.bands);
    if (!difference.size) {
      return this.copyWith({});
    }
    const y = this.pointOptions.dummyValue || 0;
    const newPoints = difference.map(it => [ 
      it, 
      new Point({ id: it, dummy: true, x: it, y }, this.dimensions),
    ]);
    return this.merge(newPoints);
  }

  at(band, onlySelection=false) {
    const source = onlySelection ? this.selected : this.data;
    return source.get(band, new Point());
  }

  loadpayload(payload) {
    return this.merge(Series.dataFrompayload(payload, this.dimensions, this.pointOptions));
  }

  merge(newData) {
    const data = this.data.merge(newData);
    return this.copyWith({ data });
  }

}

export default Series;
