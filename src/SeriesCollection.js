import { Record, OrderedMap, Map } from "immutable";
import Point from './Point';
import Collection from './Collection'

class SeriesCollection extends Collection {
  static fromPayloads(payloads, pointOptions) {
    return new SeriesCollection();
  }
  constructor() {
    super();
  }

}


export default SeriesCollection;
