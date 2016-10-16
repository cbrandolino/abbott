import * as Extendable from "extendable-immutable";
import { Record, Map, Set } from "immutable";
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
  return new Map(bandPoints);
}

const dataFromPayloads = (payloads, meta ) => {
  const points = payloads.map(p =>
    new Point(p, meta.dimensions, meta.pointOptions))
  return dataFromPoints(points, meta.bandDimension);

}

class Series extends Extendable.Map {
  constructor(
    { payloads, dimensions={}, pointOptions={} },
    options
  ) {
    const meta = new Meta({payloads, dimensions, pointOptions, ...options});
    const data = new dataFromPayloads(payloads, meta);
    const bands = new Set();
    return super({ meta, data, bands });
  }

  load(payload) {
    return this.merge({ 
      data: this.data.merge(dataFromPayloads(payload, this.meta)),
    });
  }

  get data() {
    return this.get('data')
  }
  get bands() {
    return this.get('bands')
  }
  get meta() {
    return this.get('meta')
  }
}

export default Series;
