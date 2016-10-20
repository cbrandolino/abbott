import { Record, OrderedMap, Map, OrderedSet } from "immutable";
import Point from './Point';
import Collection from './Collection';
import Series from './Series';

class SeriesCollection extends Collection {
  static fromPayloads(payloads, { pointDimensions, bandDimension }) {
    const originalSeries = payloads.map(it => 
      Series.fromPayloads({ 
        payloads: it.payloads, 
        dimensions: pointDimensions,
      }, { bandDimension }));
    const bands = (new OrderedSet())
      .union(...originalSeries.map(it => it.data.keySeq()))
      .sort();

    return new SeriesCollection({  bands });
  }
  constructor({ meta, data, bands=[], selection, pointers}) {
    super({ meta, data, selection, pointers});
  }

}


export default SeriesCollection;
