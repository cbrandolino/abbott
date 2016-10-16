import { Map, Record, Set } from 'immutable';
import Point from './Point'

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

class Series extends Map {
  constructor(
    { payloads, dimensions={}, pointOptions={} },
    options
  ) {
    const meta = new Meta({payloads, dimensions, pointOptions, ...options});
    const points = new pointsFromPayloads(payloads, meta);
    const data = new Map(dataFromPoints(points, meta.bandDimension));
    const bands = new Set();
    super({meta, data, bands})
    this.data = this.get('data');
  }

  get data() {
    this.get('data');
  }  

  get pointer() {
    this.meta.get('pointer')
  }
  get selectedFrom() {
    this.meta.get('selectedFrom')
  }
  get selectedTo() {
    this.meta.get('selectedTo')
  }
}

Series.prototype.addPayloads =(payloads) =>
  this.addPoints(
    pointsFromPayloads(payloads, this.meta, this.bands.size - 1));

Series.prototype.addPoints = (newPoints) => {
  const processedPoints = newPoints.map(p => (
    [ p[this.meta.bandDimension], p ]));
  const data = this.data.merge(processedPoints);
  const bands = this.bands.union(processedPoints.map(it => it.band))
  return this.merge({ data, bands })
}

export default Series;
