import * as Extendable from "extendable-immutable";
import { Record, OrderedMap, Map } from "immutable";
import Point from './Point';

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

class Series extends Extendable.Map {
  constructor(              
    { payloads, dimensions={}, pointOptions={} },
    settings
  ) {
    const meta = new Meta({ dimensions, pointOptions }).merge(settings);
    const data = dataFromPayloads(payloads, meta);
    super(data);
    this.meta = meta;
    this.selection = new Chunk();
    this.pointers = new Map();
  }

  __wrapImmutable(...args) {
    const res = super.__wrapImmutable(...args);
    return Object.assign(res, this)
  }

  select(limits) {
    this.selection = new Chunk(limits);
    return this.selected;
  }

  selected() {
    const start = this.selection.start === null ? 0 : this.selection.start;
    const end = this.selection.end === null ? this.size : this.selection.end;
    return this.entrySeq().slice(start, end);
  }

  load(payload) {
    const newMap = this.merge(dataFromPayloads(payload, this.meta))
    return Object.assign({}, this, newMap);
  }
}

export default Series;
