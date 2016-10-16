/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { OrderedMap } from 'immutable';
import { expect } from 'chai';
import Series from './Series';

const pointPayloads = [
  { bucket: 3, value: 3 },
  { bucket: 5, value: 5 },
];

const pointDimensions = {
  x: 'bucket',
  y: 'value',
}

const pointOptions = {
  id: 10,
}

const pointsObj = {
  payloads: pointPayloads,
  dimensions: pointDimensions,
}

describe('Types: Series', function() {

  describe('Initialize: data', function() {
    const s = new Series(pointsObj, {});
    it('data is initialized as an OrderedMap of points', function() {
      expect(s.data).to.be.instanceOf(OrderedMap);
    });
  });
});
