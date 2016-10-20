import { Record, OrderedMap, Map, OrderedSet } from "immutable";
import Point from './Point';
import Collection from './Collection';
import Series from './Series';

class SeriesCollection  {
  static fromPayloads(payloads, { pointDimensions, bandDimension }) {
    const series = payloads.map(it => 
      Series.fromPayloads({ 
        payloads: it.payloads, 
        dimensions: pointDimensions,
      }, { bandDimension }));
    const bands = (new OrderedSet())
      .union(...series.map(it => it.data.keySeq()))
      .sort();

    return new SeriesCollection({ series, bands });
  }
  constructor({ meta, series, bands=[], selection, pointers}) {

  }
  
}


export default SeriesCollection;
