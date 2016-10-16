import { OrderedMap } from 'immutable';
import Point from './Point'

class Series {
  constructor(
    { payloads, dimensions={}, pointOptions={} },
    { keyDimension="x", id=null }
  ) {
    const points = payloads.map((p, i) =>
      new Point(p, dimensions, Object.assign({ id: i }, pointOptions)));
    this.data = new OrderedMap(points.map(p => 
      [ p[keyDimension], p ]));

  }
}

export default Series;
