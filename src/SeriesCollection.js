import { OrderedMap, OrderedSet } from "immutable";
import Collection from './Collection';
import Series from './Series';

class SeriesCollection extends Collection {
  static fromPayloads(seriesObjects, dimensions={}, pointOptions={}) {
    const data = seriesObjects.map(it =>
      Series.fromPayload(
        it.attributes,
        it.payload,
        dimensions,
        pointOptions
      ));
    return new SeriesCollection({}, data);
  }
  constructor({}, data) {
    const bands = (new OrderedSet())
      .union(...data.map(it => it.data.keySeq()))
      .sort();
    const completeData = new OrderedMap(
      data.map(it => [it, it.addBands(bands)]));
    super({ bands }, completeData );
  }

  equals(that) {
    this.data.equals(that.data);
  }

  at(band) {
    return this.data.map((it) => it.at(band));
  }
  get bands() {
    return this.attributes.bands;
  }
}


export default SeriesCollection;
