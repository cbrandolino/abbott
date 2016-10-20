import { OrderedMap, Map, OrderedSet } from 'immutable';
import { Meta, Chunk } from './records'; 
import Point from './Point';
import Collection from './Collection'

class Series extends Collection {

  static fromPayloads(
    { payloads, dimensions={}, pointOptions={} }, settings) {
    const meta = new Meta({ 
      dimensions: new Map(dimensions), 
      pointOptions: new Map(pointOptions) }).merge(new Map(settings))
    return new Series({
      meta: meta,
      data: this.dataFromPayloads(payloads, meta),
      selection: new Chunk(),
    });
  }

  static dataFromPoints(points, bandDimension) {
    const bandPoints = points.map(p => (
      [ p[bandDimension], p ]));
    return new OrderedMap(bandPoints).sortBy(it => it[bandDimension]);
  }

  static dataFromPayloads(payloads, { dimensions, pointOptions, bandDimension}) {
    const points = this.pointsFromPayloads(payloads, dimensions, pointOptions)
    return this.dataFromPoints(points, bandDimension);
  }

  static pointsFromPayloads(payloads, dimensions, pointOptions) {
    return payloads.map(p =>
      new Point(p, dimensions.toObject(), pointOptions.toObject()))
  }

  constructor({ meta, data, selection, pointers}) {
    super({ meta, data, selection, pointers});
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

  at(band, onlySelection=false) {
    const source = onlySelection ? this.selected : this.data;
    return source.get(band, new Point());
  }

  select(start, end) {
    return this.copyWith({ selection: new Chunk({ start, end })});
  }

  load(payload) {
    const data = this.data.merge(Series.dataFromPayloads(payload, this.meta));
    return this.copyWith({ data });
  }

}

export default Series;
