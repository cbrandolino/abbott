import { OrderedMap } from 'immutable';
import Point from './Point'

class Series {
  constructor(
    { payloads, dimensions, pointOptions={} },
    { keyDimension="x", id=null }
  ) {
    const points = payloads.forEach(() => new Point)
  }
}

export default Series;
