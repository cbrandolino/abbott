import { OrderedMap } from "immutable";
import Series from './Series';

class TimeSeries extends Series {

  constructor({ meta, data, selection, pointers}) {
    super({ meta, data, selection, pointers});
  }

}

export default Series;
