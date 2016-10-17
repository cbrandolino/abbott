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
  from: 0,
  to: 0,
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
    this.selection = new Chunk({ to: this.size });
    this.pointers = new Map();
  }

  select(limits) {
    this.selection = new Chunk(limits);
    return this.selected;
  }

  selected() {
    return this.entrySeq().slice(this.selection.from, this.selection.to)
  }

  load(payload) {
    return this.merge(dataFromPayloads(payload, this.meta))
      .sortBy(it => it[this.get(this.meta.bandDimension)]);
  }
}

export default Series;
