import * as Extendable from "extendable-immutable";
import { Record, Map, Set } from "immutable";
import Point from './Point'

const SeriesRecord = Record({
  meta: null,
  points: null,
  data: null,
  bands: null,
})

const Range = Record({ from: null, to: null });

const Meta = Record({
  bandDimension: "x",
  pointer: null,
  selected: Range,
  payloads: [],
  dimensions: {},
  pointOptions: {},
});

const pointsFromPayloads = (payloads, { dimensions, pointOptions }, start=0) =>
  payloads.map((p, i) =>
    new Point(p, dimensions, Object.assign({ id: i + start }, pointOptions)));

const dataFromPoints = (points, bandDimension) =>
  points.map(p => (
    [ p[bandDimension], p ]));

class Series extends Extendable.Map {
  constructor(
    { payloads, dimensions={}, pointOptions={} },
    options
  ) {
    const meta = new Meta({payloads, dimensions, pointOptions, ...options});
    const points = new pointsFromPayloads(payloads, meta);
    const data = new Map(dataFromPoints(points, meta.bandDimension));
    const bands = new Set();
    return super({ meta, data, bands });
  }

  get data() {
    return this.get('data')
  }
  get points() {
    return this.get('data')
  }
  get bands() {
    return this.get('data')
  }

  addPoints(points) {
    return this;
  }
}

export default Series;
