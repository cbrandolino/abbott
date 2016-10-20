import { OrderedMap, OrderedSet } from "immutable";
import Collection from './Collection';
import Series from './Series';

class SeriesCollection extends Collection {
  static fromPayloads(payloads, { pointDimensions, bandDimension }) {
    const series = payloads.map(it => 
      Series.fromPayloads({ 
        payloads: it.payloads, 
        dimensions: pointDimensions,
      }, { bandDimension }));

    return new SeriesCollection({ series });
  }
  constructor({ meta, series }) {
    const bands = (new OrderedSet())
      .union(...series.map(it => it.data.keySeq()))
      .sort();
    const data = new OrderedMap(
      series.map(it => [it, it.addBands(bands)]));
    super({ meta, data, bands });
  }
  at(band) {
    return this.data.map((it) => it.at(band));
  }
}


export default SeriesCollection;
