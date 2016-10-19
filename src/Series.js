import { Record, OrderedMap, Map } from "immutable";
import Point from './Point';
import Collection from './Collection'

const Meta = Record({
  bandDimension: "x",
  payloads: [],
  dimensions: {},
  pointOptions: {},
});

const Chunk = Record({
  start: null,
  end: null,
});

const dataFromPoints = (points, bandDimension) => {
  const bandPoints = points.map(p => (
    [ p[bandDimension], p ]));
  return new OrderedMap(bandPoints).sortBy(it => it[bandDimension]);
}

const dataFromPayloads = (payloads, { dimensions, pointOptions, bandDimension}) => {
  const points = payloads.map(p =>
    new Point(p, dimensions, pointOptions))
  return dataFromPoints(points, bandDimension);
}

class Series extends Collection {

  static fromPayloads(
    { payloads, dimensions={}, pointOptions={} }, settings) {
    const meta = new Meta({ dimensions, pointOptions }).merge(settings)
    return new Series({
      meta: meta,
      data: dataFromPayloads(payloads, meta),
      selection: new Chunk(),
    });
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

  at(band, onlySelection=false) {
    const source = onlySelection ? this.selected : this.data;
    return source.get(band, new Point());
  }

  select(start, end) {
    return this.copyWith({ selection: new Chunk({ start, end })});
  }

  load(payload) {
    const data = this.data.merge(dataFromPayloads(payload, this.meta));
    return this.copyWith({ data });
  }

}

export default Series;
