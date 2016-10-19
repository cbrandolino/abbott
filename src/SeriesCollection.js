import { Record, OrderedMap, Map } from "immutable";
import Point from './Point';
import Collection from './Collection'

const Meta = Record({
  bandDimension: "x",
  payloads: [],
  dimensions: {},
  pointOptions: {},
});

const Chunk = Record({
  start: null,
  end: null,
});

class SeriesCollection extends Collection {
  static fromPayloads(payloads, pointOptions) {
    return new SeriesCollection({});
  }
  constructor({ meta, data, selection, pointers}) {
    super({ meta, data, selection, pointers});
  }

}


export default SeriesCollection;
