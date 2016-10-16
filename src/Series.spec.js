/* global describe:true it:true */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */
import { Map } from 'immutable';
import { expect } from 'chai';
import Series from './Series';
import Point from './Point';


const pointPayloads = [
  { bucket: 3, value: 6 },
  { bucket: 5, value: 10 },
];

const morePayloads = [
  { bucket: 7, value: 14 },
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

  describe('constructor: .data with default options', function() {
    const s = new Series(pointsObj, {});
    it('initializes .data as an Map of points', function() {
      expect(s.data).to.be.instanceOf(Map);
      expect(s.data.first()).to.be.instanceOf(Point);
    });
    it('sets keys to x dimension of points', function() {
      expect(s.data.keySeq().first()).to.equal(3);
    });
  });

  describe('constructor: .data with custom bandDimension', function() {
    const s = new Series(pointsObj, { bandDimension: 'y' });
    it('sets keys to dimension specified in bandDimension', function() {
      expect(s.data.keySeq().first()).to.equal(6);
    });
  });

  describe('#addPoints()', function() {
    const s = new Series(pointsObj);
    const s2 = s.addPoints(morePayloads);
    it('Returns a copy', function() {
      expect(s)
    })
  })

});
