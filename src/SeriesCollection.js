import { Record, OrderedMap, Map } from "immutable";
import Point from './Point';
import Collection from './Collection'

class SeriesCollection extends Collection {
  static fromPayloads(payloads, { pointDimensions, bandDimension }) {
    console.log(bandDimension)
    return new SeriesCollection({});
  }
  constructor({ meta, data, selection, pointers}) {
    super({ meta, data, selection, pointers});
  }

}


export default SeriesCollection;
