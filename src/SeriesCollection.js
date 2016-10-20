import { OrderedMap, OrderedSet } from "immutable";
import Collection from './Collection';
import Series from './Series';

class SeriesCollection extends Collection {
  static fromPayloads(seriesPayloads, dimensions, pointOptions={}) {
    const series = seriesPayloads.map(it =>
      Series.fromPayload(
        it.payload,
        it.attributes,
        dimensions,
        pointOptions,
      ));
    return new SeriesCollection({ series });
  }
  constructor({ series }) {
    const bands = (new OrderedSet())
      .union(...series.map(it => it.data.keySeq()))
      .sort();
    const data = new OrderedMap(
      series.map(it => [it, it.addBands(bands)]));
    super({ data, bands });
  }
  at(band) {
    return this.data.map((it) => it.at(band));
  }
}


export default SeriesCollection;
