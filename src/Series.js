import * as Extendable from "extendable-immutable";
import { Record, OrderedMap } from "immutable";
import Point from './Point';

const Range = Record({ from: null, to: null });

const Meta = Record({
  bandDimension: "x",
  pointer: null,
  selected: Range,
  payloads: [],
  dimensions: {},
  pointOptions: {},
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
    const meta = new Meta({payloads, dimensions, pointOptions}).merge(settings);
    const data = dataFromPayloads(payloads, meta);
    return Object.assign(super(data), { meta });
  }

  load(payload) {
    return this.merge(dataFromPayloads(payload, this.meta))
      .sortBy(it => it[this.get(this.meta.bandDimension)]);
  }
}

export default Series;
