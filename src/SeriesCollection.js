import { Record, OrderedMap, Map, List, OrderedSet } from "immutable";
import Point from './Point';
import Collection from './Collection';
import Series from './Series';

class SeriesCollection extends Collection {
  static fromPayloads(payloads, { pointDimensions, bandDimension }) {
    const series = payloads.map(it => 
      Series.fromPayloads({ 
        payloads: it.payloads, 
        dimensions: pointDimensions,
      }, { bandDimension }));
    const bands = (new OrderedSet())
      .union(...series.map(it => it.data.keySeq()))
      .sort();
    const data = new OrderedMap(
      series.map(it => [it, it.addBands(bands)])
    );
    return new SeriesCollection({ data });
  }
  constructor({ meta, data, selection, pointers }) {
    super({ meta, data, selection, pointers});
  }

  at(band) {
    return this.data.map((it) => it.at(band));
  }
}


export default SeriesCollection;
