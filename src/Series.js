import { OrderedMap, Map, OrderedSet } from 'immutable';
import Point from './Point';
import Collection from './Collection';

class Series extends Collection {

  static fromPayload(attributes, payload, dimensions, pointOptions={}) {
    const series = new Series(
      Map(attributes),
      Series.dataFrompayload(payload, dimensions, pointOptions),
      {
        dimensions: new Map(dimensions),
        pointOptions: new Map(pointOptions),
      }
    );
    return series;
  }

  static dataFromPoints(points) {
    const bandPoints = points.map(p => (
      [ p.x, p ]));
    const pointMap = OrderedMap(bandPoints);
    return pointMap.sort();
  }

  static dataFrompayload(payload, dimensions, pointOptions) {
    const points = this.pointsFrompayload(payload, dimensions, pointOptions)
    return this.dataFromPoints(points);
  }

  static pointsFrompayload(payload, dimensions, pointOptions) {
    return payload.map(p =>
      new Point(p, dimensions, pointOptions))
  }

  constructor(attributes, data, { dimensions, pointOptions }){
    const sortedData = data.sortBy((v, k) => k);
    super(attributes, sortedData, { dimensions, pointOptions });
  }

  get bands() {
    return OrderedSet.fromKeys(this.data);
  }

  get segments() {
    const segments = [[]];
    this.data.forEach((it) => {
      const lastElement = segments[segments.length - 1];
      if (it.dummy) {
        segments.push([])
      } else {
        lastElement.push(it);
      }
    })
    return segments.filter(it => it.length);    
  }

  domain(dimension) {
    if (!this._domain[dimension]) {
      const dimensionValues = this.toArray().map(el => el[dimension]);
      this._domain[dimension] = [
        Math.min(...dimensionValues),
        Math.max(...dimensionValues),
      ];
    }
    return this._domain[dimension];
  }

  toArray() {
    return this.data.toArray()
  }

  addBands(bands) {
    const difference = bands.subtract(this.bands);
    if (!difference.size) {
      return this.copyWith({});
    }
    const y = this.options.dummyValue || 0;
    const newPoints = difference.map(it => [ 
      it,
      new Point({ id: it, x: it, y }, this.options.dimensions, {dummy: true}),
    ]);
    return this.merge(newPoints);
  }

  at(band, onlySelection=false) {
    const source = onlySelection ? this.selected : this.data;
    return source.get(band, new Point());
  }

  loadpayload(payload) {
    return this.merge(
      Series.dataFrompayload(
        payload, this.options.dimensions, this.options.pointOptions));
  }

  merge(newData) {
    const data = this.data.merge(newData);

    return this.copyWith({ _data: data });
  }

}

export default Series;
